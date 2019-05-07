import resolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import minify from 'rollup-plugin-babel-minify'

const config = {
  input: 'src/index.js',
  plugins: [
    resolve(),
    babel({exclude: 'nodeModules/**'}),
    minify({
      comments: false,
    }),
  ]
}

export default [
  Object.assign({}, config, {
    output: {
      file: 'dist/online-listener.esm.js',
      format: 'esm',
      sourcemap: true,
    },
  }),
  Object.assign({}, config, {
    output: {
      file: 'dist/online-listener.umd.js',
      format: 'umd',
      name: 'online-listener',
      sourcemap: true,
      globals: {
        'rxjs': 'rxjs',
      }
    },
  }),
]
