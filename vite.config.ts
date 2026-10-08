import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import tailwind from '@tailwindcss/vite'
import path from 'node:path'

// GitHub Pages serves project websites below /<repository>/.
// Local development and a future custom domain continue to use /.
const base=process.env.GITHUB_PAGES==='true'?'/restway/':'/'

export default defineConfig({
  base,
  plugins:[react(),tailwind()],
  resolve:{alias:{'@':path.resolve(__dirname,'src')}},
  server:{proxy:{'/api':'http://127.0.0.1:5174'}}
})
