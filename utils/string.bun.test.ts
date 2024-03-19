import { expect, test, describe } from "bun:test";
import { isAlphanumeric } from "./string";

describe("isAlphanumeric", () => {
  test("a", () => {
    expect(isAlphanumeric("a")).toBe(true);
  });

  test("space", () => {
    expect(isAlphanumeric(" ")).toBe(false);
  });
});