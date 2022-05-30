export function wrapperEnv(envConfig: Recordable): ViteEnv {
  const ret: any = {}

  for (const envName of Object.keys(envConfig)) {
    let realValue = envConfig[envName].replace(/\\n/g, '\n')
    realValue = realValue === 'true' ? true : realValue === 'false' ? false : realValue

    if (envName === 'VITE_PORT') {
      realValue = Number(realValue)
    }
    if (envName === 'VITE_PROXY' && realValue) {
      try {
        realValue = JSON.parse(realValue.replace(/'/g, '"'))
      } catch (error) {
        realValue = ''
      }
    }
    ret[envName] = realValue
    if (typeof realValue === 'string') {
      process.env[envName] = realValue
    } else if (typeof realValue === 'object') {
      process.env[envName] = JSON.stringify(realValue)
    }
  }
  return ret
}
