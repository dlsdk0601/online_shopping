import path from "path";
import fs from "fs";

function tempDelete() {
  const tempPath = path.join(__dirname, "..", "src", "temp");
  const entries = fs.readdirSync(tempPath, { withFileTypes: true });
  try {
    for (let i = 0; i < entries.length; i++) {
      fs.unlinkSync(`${tempPath}/${entries[i].name}`);
    }
  } catch (err) {
    console.error(`Error deleting file`);
  }
}

tempDelete();
