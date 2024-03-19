export async function readFile(path: string): Promise<string> {
  const f = Bun.file(path);
  const text = await f.text();
  return text;
}

export async function readFileStream(path: string): Promise<ReadableStream> {
  const f = Bun.file(path);
  const stream = await f.stream();
  return stream;
}
