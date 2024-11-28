import path from 'node:path'
import { defineConfig } from 'vite'
import { lottie } from '../src'

export default defineConfig({
  root: path.resolve(__dirname, './'),
  plugins: [
    lottie(),
  ],
})
