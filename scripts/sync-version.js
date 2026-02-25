const { readFileSync, writeFileSync } = require("fs");
const { resolve } = require("path");

const root = resolve(__dirname, "..");
const pkg = JSON.parse(readFileSync(resolve(root, "package.json"), "utf-8"));
const libraryPath = resolve(root, "src/b1/slick/.library");

let library = readFileSync(libraryPath, "utf-8");
library = library.replace(
    /<version>.*?<\/version>/,
    `<version>${pkg.version}</version>`
);
writeFileSync(libraryPath, library, "utf-8");

console.log(`[sync-version] .library version synced to ${pkg.version}`);
