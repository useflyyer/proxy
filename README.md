# @flyyer/proxy

Helper function to proxy images via flyyer network to bypass CORS with Typescript support.

We made this for [Flyyer.io](https://flyyer.io?ref=github) to enable developers to create content-aware marketing and social images. Beware this is intended to use inside flyyer templates created with [`create-flyyer-app`](https://github.com/useflyyer/create-flyyer-app).

**Note: This proxy service is only available and allowed for flyyer templates where bypassing CORS is necessary for images or data.**

## Usage

Install this dependency:

```sh
yarn add @flyyer/proxy
```

Common case usage:

```tsx
import { proxy } from "@flyyer/proxy";

export default function MainTemplate({ variables }) {
  const src = proxy(variables["image"]);
  return <img src={src} />
}
```

### Smartcrop

![example image](https://github.com/useflyyer/use-smartcrop/raw/main/.github/image.jpeg)

Usage with [`use-smartcrop`](https://github.com/useflyyer/use-smartcrop).

```tsx
import { proxy } from "@flyyer/proxy";
import { useSmartcrop } from "use-smartcrop";

export default function MainTemplate({ width, height, variables }) {
  const src = proxy(variables["image"]);
  const cropped = useSmartcrop(src, { width, height, minScale: 1 })
  return <img src={cropped.src} />
}
```
