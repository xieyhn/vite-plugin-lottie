# vite-plugin-lottie

A vite plugin for bundle lottie files.

## Install

```bash
pnpm install vite-plugin-lottie -D
```

## Usage

vite.config.ts

```ts
import { defineConfig } from 'vite'
import { lottie } from 'vite-plugin-lottie'

export default defineConfig({
  plugins: [
    lottie()
  ],
})
```

app.vue

```vue
<script setup>
import Lottie from 'lottie-web'
import animationData from './animation.json?lottie'

onMounted(() => {
  Lottie.loadAnimation({
    // ...
    animationData,
  })
})
</script>
```

## Types

dts

```ts
/// <reference types="vite-plugin-lottie/client" />
```

## License

[MIT](./LICENSE)
