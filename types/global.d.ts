declare type Recordable<T = any> = Record<string, T>

// vite环境变量
declare interface ViteEnv {
  VITE_GLOB_APP_TITLE: string // 应用标题
  VITE_PUBLIC_PATH: string
  VITE_PORT: number // 开发服务端口
  VITE_PROXY: [string, string][]
  VITE_DROP_CONSOLE: boolean
  VITE_USE_MOCK: boolean
  VITE_USE_PWA: boolean
  VITE_USE_CDN: boolean
  VITE_BUILD_OUTPUT_DIR: string
  VITE_BUILD_COMPRESS: 'gzip' | 'brotli' | 'none'
  VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE: boolean
  VITE_LEGACY: boolean
  VITE_USE_IMAGEMIN: boolean
  VITE_GENERATE_UI: string
}
