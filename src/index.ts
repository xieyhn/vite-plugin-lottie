import fsp from 'node:fs/promises'
import path from 'node:path'
import { normalizePath, type Plugin, type ResolvedConfig } from 'vite'

const lottieReg = /(\?|&)lottie(&|$)/
const postfixRE = /[?#].*$/
function cleanUrl(url: string): string {
  return url.replace(postfixRE, '')
}

function replaceExtname(id: string, extname: string) {
  let [path, query] = id.split('?')
  path = path.replace(/\.[^.]+$/, extname)
  return query ? `${path}?${query}` : path
}

export function lottie(): Plugin {
  let config: ResolvedConfig

  return {
    name: 'vite-plugin-lottie',
    enforce: 'pre',

    configResolved(_config) {
      config = _config
    },

    async resolveId(id, importer) {
      if (!lottieReg.test(id))
        return

      if (config.command === 'serve')
        return this.resolve(id.replace(lottieReg, '$1url$2'), importer, { skipSelf: true })

      if (path.extname(cleanUrl(id)) === '.lottie')
        return id

      const resolved = await this.resolve(id, importer, { skipSelf: true })

      if (resolved) {
        // Change file extension to prevent other plugins from processing this file
        return replaceExtname(resolved.id, '.lottie')
      }
    },

    async load(id) {
      if (!lottieReg.test(id))
        return

      id = replaceExtname(cleanUrl(normalizePath(id)), '.json')
      this.addWatchFile(id)

      const json = JSON.parse(await fsp.readFile(id, 'utf-8'))

      if (json.assets) {
        for (let i = 0; i < json.assets.length; i++) {
          const asset = json.assets[i]
          if (asset.p && /\.png|jpe?g$/.test(asset.p)) {
            const assetId = path.resolve(path.dirname(id), path.join(asset.u || '', asset.p))
            this.addWatchFile(assetId)
            const referenceId = this.emitFile({
              type: 'asset',
              source: await fsp.readFile(assetId),
              name: path.basename(assetId),
            })
            Reflect.deleteProperty(asset, 'u')
            asset.p = `$import.meta.ROLLUP_FILE_URL_${referenceId}`
          }
        }
      }

      const str = JSON.stringify(json)
        .replaceAll(/"\$(import\.meta\.ROLLUP_FILE_URL_\w+)"/g, (_, raw) => raw)

      return `export default ${str}`
    },
  }
}
