# @flayyer/proxy

Helper function to proxy images via Flayyer network to bypass CORS with Typescript support.

We made this for [Flayyer.com](https://flayyer.com?ref=github) to enable developers to create content-aware marketing and social images. Beware this is intended to use inside Flayyer templates created with [`create-flayyer-app`](https://github.com/flayyer/create-flayyer-app).

**Note: This proxy service is only available and allowed for Flayyer templates where bypassing CORS is necessary for images or data.**

## Usage

Install this dependency:

```sh
yarn add @flayyer/proxy
```

Common case usage:

```tsx
import { proxy } from "@flayyer/proxy";

export default function MainTemplate({ variables }) {
  const src = proxy(variables["image"]);
  return <img src={src} />
}
```

### Smartcrop

![example image](https://github.com/flayyer/use-smartcrop/raw/main/.github/image.jpeg)

Usage with [`use-smartcrop`](https://github.com/flayyer/use-smartcrop).

```tsx
import { proxy } from "@flayyer/proxy";
import { useSmartcrop } from "use-smartcrop";

export default function MainTemplate({ width, height, variables }) {
  const src = proxy(variables["image"]);
  const cropped = useSmartcrop(src, { width, height, minScale: 1 })
  return <img src={cropped.src} />
}
```
