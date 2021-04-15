/**
 * Returns an URL to proxy request via Flayyer network.
 *
 * Use this to bypass CORS issues when creating Flayyers.
 *
 * @example <caption>Example with https://github.com/flayyer/use-smartcrop</caption>
 * import { proxy } from "@flayyer/proxy";
 * import { useSmartcrop } from "use-smartcrop";
 *
 * export default function MainTemplate({ width, height, variables }) {
 *   const src = proxy(variables["image"]);
 *   const cropped = useSmartcrop(src, { width, height, minScale: 1 })
 *   return <img src={cropped.src} />
 * }
 */
export function proxy(src: string): string {
  if (!src) return src;
  try {
    const url = new URL(src);
    const isHTTP = url.protocol === "http:" || url.protocol === "https:";
    const isFlayyer = url.hostname === "flayyer.io" || url.hostname === "flayyer.ai";
    // TODO: add list of CORS enabled services so proxy is not necessary.
    if (isHTTP && !isFlayyer) {
      return "https://flayyer.io/proxy/v1?url=" + encodeURIComponent(src);
    } else {
      return src;
    }
  } catch {
    return src;
  }
}
