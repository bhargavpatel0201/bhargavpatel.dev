/**
 * Creates bhargav_portfolio.zip with everything needed for Namecheap cPanel.
 * Run: npm run deploy
 * Then upload bhargav_portfolio.zip to public_html and extract it.
 */
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const projectRoot = path.join(__dirname, "..");
const distDir = path.join(projectRoot, "dist");
const zipName = "bhargav_portfolio.zip";

if (!fs.existsSync(distDir)) {
  console.error("dist folder not found. Run: npm run build");
  process.exit(1);
}

try {
  process.chdir(projectRoot);
  execSync(
    'powershell -NoProfile -Command "Compress-Archive -Path \'.\\dist\\*\' -DestinationPath \'.\\bhargav_portfolio.zip\' -Force"',
    { stdio: "inherit" }
  );
  console.log("\nDone! Created: " + zipName);
  console.log("\nNext steps:");
  console.log("  1. Log in to Namecheap cPanel");
  console.log("  2. Open File Manager -> public_html");
  console.log("  3. Upload " + zipName);
  console.log("  4. Right-click the zip -> Extract");
  console.log("  5. Delete the zip after extracting");
} catch (e) {
  console.error("Zip failed. Upload the contents of the 'dist' folder manually to public_html.");
  process.exit(1);
}
