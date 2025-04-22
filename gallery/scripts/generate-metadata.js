#!/usr/bin/env node

// import required modules
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { execSync } from "child_process";

// get the directory name of the current module
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// set images root directory
const IMAGES_ROOT = path.resolve(__dirname, "../src/data/images");

// set metadata file path
const METADATA_FILE = path.resolve(__dirname, "../src/data/metadata.json");

// supported image extensions
const IMAGE_EXTENSIONS = [".jpg", ".jpeg", ".png", ".gif", ".webp"];

// function to get file creation/modification date
function getFileDate(filePath) {
  try {
    // try to get git commit date first
    const gitDate = execSync(
      `git log -1 --format=%cd --date=short "${filePath}"`,
      {
        cwd: path.dirname(filePath),
        encoding: "utf8",
        stdio: ["pipe", "pipe", "ignore"],
      },
    ).trim();
    if (gitDate) return gitDate;
  } catch (e) {
    // fallback to file stats
  }
  const stats = fs.statSync(filePath);
  return stats.mtime.toISOString().split("T")[0];
}

// function to generate a title from filename
function generateTitle(filename) {
  // remove extension
  const nameWithoutExt = path.basename(filename, path.extname(filename));
  // replace hyphens and underscores with spaces
  const withSpaces = nameWithoutExt.replace(/[-_]/g, " ");
  // capitalize first letter of each word
  return withSpaces
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

// function to recursively find all image files in a directory
function findImagesRecursive(dir) {
  let results = [];
  const list = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of list) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results = results.concat(findImagesRecursive(fullPath));
    } else if (
      entry.isFile() &&
      IMAGE_EXTENSIONS.includes(path.extname(entry.name).toLowerCase())
    ) {
      results.push(fullPath);
    }
  }
  return results;
}

// main function
async function main() {
  console.log("scanning for new images and updating metadata...");

  // read existing metadata
  let metadata = [];
  try {
    const metadataContent = fs.readFileSync(METADATA_FILE, "utf8");
    metadata = JSON.parse(metadataContent);
  } catch (e) {
    console.log(
      "no existing metadata.json found or error reading it. creating new file.",
    );
  }

  // find all images recursively in collections
  const files = findImagesRecursive(IMAGES_ROOT);

  // get list of existing filenames in metadata (with collection)
  const existingKeys = new Set(
    metadata.map((item) => `${item.collection}/${item.filename}`),
  );

  let newEntries = 0;

  // scan images directory and update/add entries for current files
  for (const filePath of files) {
    const relPath = path.relative(IMAGES_ROOT, filePath);
    const collection = path.dirname(relPath);
    const filename = path.basename(filePath);

    const key = `${collection}/${filename}`;
    if (!existingKeys.has(key)) {
      const fileDate = getFileDate(filePath);
      const newEntry = {
        collection,
        filename,
        title: generateTitle(filename),
        description: "",
        tags: [],
        date: fileDate,
      };
      metadata.push(newEntry);
      newEntries++;
      console.log(`added metadata for: ${key}`);
    }
  }

  // remove entries from metadata for files that no longer exist
  const currentKeys = new Set(
    files.map((filePath) => {
      const relPath = path.relative(IMAGES_ROOT, filePath);
      const collection = path.dirname(relPath);
      const filename = path.basename(filePath);
      return `${collection}/${filename}`;
    }),
  );

  const before = metadata.length;
  metadata = metadata.filter((entry) =>
    currentKeys.has(`${entry.collection}/${entry.filename}`),
  );
  const removedEntries = before - metadata.length;

  if (removedEntries > 0) {
    console.log(`removed ${removedEntries} entries for missing files.`);
  }

  // sort metadata by date (newest first)
  metadata.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  // write updated metadata
  fs.writeFileSync(METADATA_FILE, JSON.stringify(metadata, null, 2), "utf8");

  console.log(
    `done! added ${newEntries} new entries and removed ${removedEntries} missing entries from metadata.json`,
  );
}

// run the script
main().catch((err) => {
  console.error("error:", err);
  process.exit(1);
});
