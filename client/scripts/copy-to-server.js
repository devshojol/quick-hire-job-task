import fs from "fs";
import path from "path";

const src = path.resolve(process.cwd(), "out");
const dest = path.resolve(process.cwd(), "..", "server", "public");

async function copyDir(srcDir, destDir) {
  await fs.promises.mkdir(destDir, { recursive: true });
  const entries = await fs.promises.readdir(srcDir, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(srcDir, entry.name);
    const destPath = path.join(destDir, entry.name);
    if (entry.isDirectory()) {
      await copyDir(srcPath, destPath);
    } else {
      await fs.promises.copyFile(srcPath, destPath);
    }
  }
}

async function main() {
  try {
    // clean dest
    await fs.promises.rm(dest, { recursive: true, force: true });
    await copyDir(src, dest);
    console.log(`Copied ${src} -> ${dest}`);
  } catch (err) {
    console.error("Failed to copy static export to server/public:", err);
    process.exit(1);
  }
}

main();
