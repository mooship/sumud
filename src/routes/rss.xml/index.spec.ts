import { describe, expect, it, vi } from "vitest";
import type { RequestEvent } from "@builder.io/qwik-city";
import { onGet } from "./index";

describe("routes/rss.xml onGet", () => {
  it("sends an RSS feed with the right content type and cache headers", async () => {
    const send = vi.fn();
    const cacheControl = vi.fn();
    const headers = new Headers();
    await onGet({ send, headers, cacheControl } as unknown as RequestEvent);

    expect(cacheControl).toHaveBeenCalledWith({
      staleWhileRevalidate: 60 * 60 * 24 * 7,
      maxAge: 60 * 60,
    });
    expect(headers.get("Content-Type")).toBe(
      "application/rss+xml; charset=utf-8",
    );
    expect(send).toHaveBeenCalledWith(200, expect.stringContaining("<rss"));
  });
});
