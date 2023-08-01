const currentEnv = process.env.ELEVENTY_ENV || "development"
const isDevEnv = currentEnv !== 'production';
const todaysDate = new Date();

function showDraft(data) {
	const isDraft = 'draft' in data && data.draft !== false;
	const isFutureDate = data.page.date > todaysDate;
	return isDevEnv || (!isDraft && !isFutureDate);
}

module.exports = {
	layout: "layouts/blog.liquid",
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