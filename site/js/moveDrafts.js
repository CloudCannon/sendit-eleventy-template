const fs = require('fs');
const path = require('path');
const util = require('util');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const unlink = util.promisify(fs.unlink);

const blogPath = './site/blog';
const draftsPath = './site/blog/drafts';

// Parse front matter from a markdown file content
function parseFrontMatter(content) {
    if (content.startsWith('---')) {
        const endOfFrontMatter = content.indexOf('---', 3);
        if (endOfFrontMatter !== -1) {
            const frontMatterContent = content.substring(3, endOfFrontMatter);
            const lines = frontMatterContent.split('\n');
            const frontMatter = {};
            lines.forEach(line => {
                const [key, value] = line.split(':');
                if (value) {
                    frontMatter[key.trim()] = value.trim();
                }
            });
            return frontMatter;
        }
    }
    return null;
}


// Move file from source to destination
async function moveFile(src, dest) {
    const content = await readFile(src, 'utf-8');
    await writeFile(dest, content);
    await unlink(src);
}

async function moveDrafts() {
    fs.readdir(blogPath, async (err, files) => {
        if (err) throw err;
        for (const file of files) {
            if (path.extname(file) === '.md') {
                const filePath = path.join(blogPath, file);
                const content = await readFile(filePath, 'utf-8');
                const frontMatter = parseFrontMatter(content);
                if (frontMatter && frontMatter.draft === 'true') {
                    const destPath = path.join(draftsPath, file);
                    await moveFile(filePath, destPath);
                }
            }
        }
    });

    fs.readdir(draftsPath, async (err, files) => {
        if (err) throw err;
        for (const file of files) {
            if (path.extname(file) === '.md') {
                const filePath = path.join(draftsPath, file);
                const content = await readFile(filePath, 'utf-8');
                const frontMatter = parseFrontMatter(content);
                if (frontMatter && frontMatter.draft === 'false') {
                    const destPath = path.join(blogPath, file);
                    await moveFile(filePath, destPath);
                }
            }
        }
    });
}

moveDrafts();
