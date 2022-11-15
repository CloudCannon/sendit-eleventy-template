const pluginBookshop = require("@bookshop/eleventy-bookshop");
const { DateTime } = require("luxon");
const emojiReadTime = require("@11tyrocks/eleventy-plugin-emoji-readtime");
const { wordCount } = require("eleventy-plugin-wordcount");
const MarkdownIt = require("markdown-it"),
  md = new MarkdownIt();

module.exports = function (eleventyConfig) {
  eleventyConfig.addFilter("length", (input) => {
    return input.length;
  });
  eleventyConfig.addFilter("postDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_MED);
  });
  eleventyConfig.addPlugin(emojiReadTime, {
    showEmoji: false,
  });
  eleventyConfig.addPlugin(wordCount);
  eleventyConfig.addFilter("markdownify", (markdown) => md.render(markdown));
  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);
  eleventyConfig.htmlTemplateEngine = "liquid";
  eleventyConfig.addPlugin(
    pluginBookshop({
      bookshopLocations: ["component-library"],
      pathPrefix: "",
    })
  );
  eleventyConfig.addPassthroughCopy("site/css");
  eleventyConfig.addPassthroughCopy("site/fonts");
  eleventyConfig.addPassthroughCopy("site/images");
  eleventyConfig.addPassthroughCopy("site/js");
  eleventyConfig.addPassthroughCopy("site/vendor");
  return {
    dir: {
      input: "site",
      pages: "pages",
    },
  };
};
