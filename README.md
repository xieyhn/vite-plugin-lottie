# vite-plugin-lottie

> Work in progress!

## Install

```bash
pnpm install vite-plugin-lottie
```

## Usage

vite.config.ts

```ts
import lottie from 'vite-plugin-lottie'

export default defineConfig({
  plugins: [lottie()],
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
