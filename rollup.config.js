import babel from 'rollup-plugin-babel';

export default {
  input: 'src/Portal.js',
  output: [
    {
      name: 'Portal',
      file: 'dist/Portal.umd.js',
      format: 'umd'
    },
    {
      file: 'dist/Portal.esm.js',
      format: 'es'
    },
    {
      name: 'Portal',
      file: 'dist/Portal.min.js',
      format: 'iife'
    },
  ],
  plugins: [
    babel({exclude: 'node_modules/**'})
  ]
};