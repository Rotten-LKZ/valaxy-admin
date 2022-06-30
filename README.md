# valaxy-admin

Admin for blogs using [Valaxy](https://github.com/YunYouJun/valaxy)

Just code for UI, the code in this repo can't run directly.

If you wanna run these code, give apis which are declared in `global.d.ts`, and it will import `api(/index.xxx)` under its parent directory automatically.

Two versions are using:
  - [valaxy-admin-web](https://github.com/Rotten-LKZ/valaxy-admin-web)
  - [valaxy-admin-desktop](https://github.com/Rotten-LKZ/valaxy-admin-desktop)

## Usage

1. Install dependencies

```bash
pnpm i @element-plus/icons-vue @vueuse/core pinia vue-router
pnpm i -D unplugin-auto-import unplugin-vue-components
```

2. Config for Vite

`vite.config.ts`

```typescript
import { URL, fileURLToPath } from 'url'
import { defineConfig } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/styles/global.scss";',
      },
    },
  },
})
```

3. *Recommend:* eslint

```bash
pnpm i -D @antfu/eslint-config eslint
```

`.eslintrc`
```json
{
  "extends": "@antfu"
}
```

`package.json`
```
{
  "lint": "eslint .",
  "lint:fix": "eslint . --fix"
}
```
