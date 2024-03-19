import { expect, test, describe } from "bun:test";
import { makeTextStreamLineIterator } from "./stream";

function buildStream(...stringArr: string[]): ReadableStream {
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    start(controller) {
      for (const data of stringArr) {
        controller.enqueue(encoder.encode(data));
      }
      controller.close();
    },
  });
  return stream;
}

describe("makeTextStreamLineIterator", async () => {
  test("one line", async () => {
    const stream = makeTextStreamLineIterator(buildStream("hello", "world"))
    const result: string[] = [];
    for await (const chunk of stream) {
      result.push(chunk)
    }
    expect(result.length).toBe(1)
    expect(result[0]).toBe("helloworld")
  });

  test("muti line", async () => {
    const stream = makeTextStreamLineIterator(buildStream("hello\n", "world\n", "\n"))
    const result: string[] = [];
    for await (const chunk of stream) {
      result.push(chunk)
    }
    expect(result.length).toBe(3)
    expect(result[0]).toBe("hello")
    expect(result[1]).toBe("world")
  });
});