import babel from 'rollup-plugin-babel';

const globals = {
  'vue': 'Vue',
};

export default {
  external: ['vue'],
  input: 'src/Portal.js',
  output: [
    {
      name: 'Portal',
      file: 'dist/Portal.umd.js',
      format: 'umd',
      globals
    },
    {
      file: 'dist/Portal.esm.js',
      format: 'es',
      globals
    },
    {
      name: 'Portal',
      file: 'dist/Portal.min.js',
      format: 'iife',
      globals
    },
  ],
  plugins: [
    babel({exclude: 'node_modules/**'})
  ]
};