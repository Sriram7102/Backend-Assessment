const { readFile } = require("node:fs/promises")
const sample = require("../sample.csv")

exports.getDataFromCSV(async()=>{
try{
const filePath = new URL(sample, import.meta.url);
  const contents = await readFile(filePath, { encoding: 'utf8' });
  return contents;
} catch (err) {
  console.error(err.message);
}
});