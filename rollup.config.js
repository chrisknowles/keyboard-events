import babel from 'rollup-plugin-babel';

export default {
  input: 'src/keyboard-events.js',
  output: [
    {
      file: 'dist/index.js',
      format: 'cjs'
    },
    {
      file: 'dist/keyboard-events.js',
      name: 'Keyboard',
      format: 'umd'
    }
  ],
  plugins: [
    babel({
      exclude: 'node_modules/**'
    })
  ]
};
