import { describe, expect, it } from "vitest";
import { applySecurityHeaders } from "./security-headers";

describe("applySecurityHeaders", () => {
  it("sets every expected security header", () => {
    const response = new Response("hello", {
      status: 200,
      headers: { "content-type": "text/plain" },
    });
    const result = applySecurityHeaders(response);
    expect(result.headers.get("X-Content-Type-Options")).toBe("nosniff");
    expect(result.headers.get("X-Frame-Options")).toBe("DENY");
    expect(result.headers.get("Referrer-Policy")).toBe(
      "strict-origin-when-cross-origin",
    );
    expect(result.headers.get("Cross-Origin-Opener-Policy")).toBe(
      "same-origin",
    );
    expect(result.headers.get("Strict-Transport-Security")).toContain(
      "max-age=31536000",
    );
    expect(result.headers.get("Content-Security-Policy")).toContain(
      "default-src 'self'",
    );
  });

  it("preserves the original status, statusText, body, and unrelated headers", async () => {
    const response = new Response("hello", {
      status: 404,
      statusText: "Not Found",
      headers: { "content-type": "text/plain" },
    });
    const result = applySecurityHeaders(response);
    expect(result.status).toBe(404);
    expect(result.statusText).toBe("Not Found");
    expect(result.headers.get("content-type")).toBe("text/plain");
    expect(await result.text()).toBe("hello");
  });
});
