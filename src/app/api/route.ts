import fs from "node:fs";

export function GET() {
  const response = fs.readFileSync(
    `${process.cwd()}/src/data/file-data.json`,
    "utf-8"
  );
  const data = JSON.parse(response);

  return Response.json(data);
}
