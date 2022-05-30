import { defineConfig, loadEnv } from 'vite'
import { wrapperEnv } from './build/utils'
import { createProxy } from './build/vite/proxy'
import { createVitePlugins } from './build/vite/plugins'
import { resolve } from 'path'

function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir)
}

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // console.log('command:', command); // serve / build
  // console.log('mode:', mode); // development / production
  const isBuild = command === 'build'
  const root = process.cwd()

  // 根据当前工作目录中的 `mode` 加载 .env 文件
  // 设置第三个参数为 '' 来加载所有环境变量，而不管是否有 `VITE_` 前缀。
  const env = loadEnv(mode, root)

  const viteEnv = wrapperEnv(env)

  // console.log(viteEnv);

  const { VITE_PORT, VITE_PUBLIC_PATH, VITE_PROXY, VITE_DROP_CONSOLE, VITE_BUILD_OUTPUT_DIR } =
    viteEnv

  return {
    root,
    base: VITE_PUBLIC_PATH,
    resolve: {
      alias: [
        {
          find: /@\//,
          replacement: pathResolve('src') + '/',
        },
        {
          find: /#\//,
          replacement: pathResolve('types') + '/',
        },
      ],
    },
    // development
    server: {
      // Listening on all local IPs
      host: true,
      port: VITE_PORT,
      // Load proxy configuration from .env
      proxy: createProxy(VITE_PROXY),
    },
    // production
    build: {
      target: 'es2015',
      outDir: VITE_BUILD_OUTPUT_DIR,
      // terserOptions: {
      //   compress: {
      //     keep_infinity: true,
      //     // Used to delete console in production environment
      //     drop_console: VITE_DROP_CONSOLE,
      //   },
      // },
      // Turning off brotliSize display can slightly reduce packaging time
      brotliSize: false,
      chunkSizeWarningLimit: 2000,
    },
    plugins: createVitePlugins(viteEnv, isBuild),
  }
})
