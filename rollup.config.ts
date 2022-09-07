import { babel } from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import replace from '@rollup/plugin-replace'
import typescript from '@rollup/plugin-typescript'
import { bundleSize } from '@sosukesuzuki/rollup-plugin-bundle-size'
import livereload from 'rollup-plugin-livereload'
import serve from 'rollup-plugin-serve'
import { terser } from 'rollup-plugin-terser'

import type { RollupOptions, Plugin } from 'rollup'

const env = process.env.NODE_ENV || 'production'
const isDevelopment = env === 'development'

const plugins: Plugin[] = [
  nodeResolve(),
  replace({
    preventAssignment: true,
    exclude: 'node_modules/**',
    'process.env.NODE_ENV': JSON.stringify(env),
  }),
  typescript(),
  babel({
    exclude: 'node_modules/**',
    babelHelpers: 'bundled',
  }),
  commonjs(),
  !isDevelopment && terser(),
  !isDevelopment && bundleSize(),
  isDevelopment &&
    serve({
      verbose: true,
      contentBase: ['public'],
      host: 'localhost',
      port: '3000',
    }),
  isDevelopment &&
    livereload({
      watch: ['public'],
    }),
].filter((x): x is Exclude<typeof x, false> => !!x)

const config: RollupOptions[] = [
  {
    input: 'pages/app.tsx',
    output: {
      file: 'public/app.js',
      format: 'esm',
      sourcemap: isDevelopment,
    },
    plugins,
  },
]

export default config
