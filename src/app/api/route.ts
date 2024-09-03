import fs from "node:fs";

export function GET() {
    const res = fs.readFileSync(`${process.cwd()}/src/data/file-data.json`, "utf-8");
    const data = JSON.parse(res);
    
    return Response.json(data);
}
