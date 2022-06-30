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
pnpm i @element-plus/icons-vue @vueuse/core pinia vue-router element-plus
pnpm i -D unplugin-auto-import unplugin-vue-components @types/node sass
```

devDependencies & dependencies list:
```json
{
  "dependencies": {
    "@element-plus/icons-vue": "^2.0.6",
    "@vueuse/core": "^8.7.5",
    "element-plus": "^2.2.6",
    "js-cookie": "^3.0.1",
    "pinia": "^2.0.14",
    "vue": "^3.2.37",
    "vue-router": "^4.0.16"
  },
  "devDependencies": {
    "@antfu/eslint-config": "^0.25.2",
    "@types/js-cookie": "^3.0.2",
    "@types/node": "^16.11.41",
    "@vitejs/plugin-vue": "^2.3.3",
    "@vue/tsconfig": "^0.1.3",
    "eslint": "^8.18.0",
    "npm-run-all": "^4.1.5",
    "sass": "^1.53.0",
    "typescript": "~4.7.4",
    "unplugin-auto-import": "^0.9.1",
    "unplugin-vue-components": "^0.20.1",
    "vite": "^2.9.12",
    "vue-tsc": "^0.38.1"
  }
}
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
