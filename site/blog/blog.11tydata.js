// Set to true for development environment, false for production. 
// When true, developers can see all posts (including drafts and future-dated posts) 
// without having to manually change each post's front matter.
const isDevEnv = false
const todaysDate = new Date();

function showDraft(data) {
	const isDraft = 'draft' in data && data.draft !== false;
	const isFutureDate = data.page.date > todaysDate;
	return isDevEnv || (!isDraft && !isFutureDate);
}

module.exports = {
	layout: "layouts/blog-single.liquid",
	eleventyComputed: {
		eleventyExcludeFromCollections: function(data) {
			if (showDraft(data)) {
				return data.eleventyExcludeFromCollections;
			} else {
				return true;
			}
		},
		post_permalink: function(data) {
			if (showDraft(data)) {
				if (data.post_permalink) {
					return data.post_permalink;
				} else {
					return "/blog/{{ title | slugify }}/";
				}
			} else {
				return false;
			}
		}
	}
};
