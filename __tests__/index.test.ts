import { proxy } from "../src/proxy";

describe("proxy", () => {
  it("wraps URL that may required proxy", () => {
    const proxied = proxy("https://example.com");
    expect(proxied).toEqual("https://flayyer.io/proxy/v1?url=https%3A%2F%2Fexample.com");
  });
  it("wraps URL protocol-relative absolute URLs", () => {
    const proxied = proxy("//google.com");
    expect(proxied).toEqual("https://flayyer.io/proxy/v1?url=https%3A%2F%2Fgoogle.com");
  });
  it("doesn't wraps local URLs", () => {
    const proxied = proxy("/image.png");
    expect(proxied).toEqual("/image.png");
  });
});
