/**
 * https://stackoverflow.com/a/61934195/3416691
 */
export const FORCE_HTTPS = (url: string) =>
  url.replace(/^(?:(.*:)?\/\/)?(.*)/i, (match, schema, nonSchemaURL) => (schema ? match : `https://${nonSchemaURL}`));

/**
 * https://stackoverflow.com/a/19709846/3416691
 */
export const EXTERNAL_URL_REGEX = new RegExp("^(?:[a-z]+:)?//", "i");

/**
 * Returns an URL to proxy request via flyyer network.
 *
 * Use this to bypass CORS issues when creating flyyers.
 *
 * @example <caption>Example with https://github.com/useflyyer/use-smartcrop</caption>
 * import { proxy } from "@flyyer/proxy";
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
    const isAbsolute = EXTERNAL_URL_REGEX.test(src);
    if (isAbsolute) {
      // Ensure protocol
      src = FORCE_HTTPS(src);
    }
    const url = new URL(src);
    const isFlyyer = url.hostname === "cdn.flyyer.io";

    // TODO: add list of CORS enabled services so proxy is not necessary.
    if (isAbsolute && !isFlyyer) {
      return "https://cdn.flyyer.io/proxy/v1?url=" + encodeURIComponent(src);
    } else {
      return src;
    }
  } catch {
    return src;
  }
}
