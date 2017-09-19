import babel from 'rollup-plugin-babel';
import butternut from 'rollup-plugin-butternut';

export default {
  input: 'src/keyboard-events.js',
  output: [
    {
      file: 'dist/keyboard-events.min.js',
      name: 'Keyboard',
      format: 'umd',
      sourcemap: true
    }
  ],
  plugins: [
    butternut(),
    babel({
      exclude: 'node_modules/**'
    })
  ]
};
