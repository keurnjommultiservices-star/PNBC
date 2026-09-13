const fs = require("fs");
const path = require("path");

module.exports = () => {
  const dir = path.join(__dirname, "players-src");
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".json"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(dir, file), "utf8");
      const data = JSON.parse(raw);
      const slug = file.replace(/\.json$/, "");
      return Object.assign({ slug }, data);
    })
    .sort((a, b) => (a.name || "").localeCompare(b.name || ""));
};
