import type { Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueSetupExtend from 'vite-plugin-vue-setup-extend'
import legacy from '@vitejs/plugin-legacy'

export function createVitePlugins(viteEnv: ViteEnv, isBuild: boolean): (Plugin | Plugin[])[] {
  const { VITE_LEGACY } = viteEnv

  const vitePlugins: (Plugin | Plugin[])[] = [
    // vue3
    vue(),
    // vue3 with jsx
    vueJsx(),
    // support define name on setup <script></script> directly
    vueSetupExtend(),
  ]

  VITE_LEGACY && isBuild && vitePlugins.push(legacy())

  return vitePlugins
}
