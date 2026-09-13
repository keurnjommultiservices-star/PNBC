module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("images");
  eleventyConfig.addPassthroughCopy({ "src/styles.css": "styles.css" });
  eleventyConfig.addPassthroughCopy({ "src/app.js": "app.js" });
  eleventyConfig.addPassthroughCopy("admin");

  eleventyConfig.addFilter("initials", (name) => {
    if (!name) return "?";
    return name.split(" ").map((w) => w[0]).filter(Boolean).slice(0, 2).join("").toUpperCase();
  });

  eleventyConfig.addFilter("dateFr", (value) => {
    if (!value) return "";
    const d = new Date(value);
    return d.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
  });

  eleventyConfig.addCollection("actualites", (collectionApi) => {
    return collectionApi.getFilteredByGlob("src/actualites/*.md").sort((a, b) => b.date - a.date);
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data"
    }
  };
};
