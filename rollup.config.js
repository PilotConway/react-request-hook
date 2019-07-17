import resolve from 'rollup-plugin-node-resolve';
import builtins from 'rollup-plugin-node-builtins';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import { eslint } from 'rollup-plugin-eslint';
import { terser } from 'rollup-plugin-terser';
import pkg from './package.json';

const external = ['react', 'react-dom'];

const resolveOptions = {
  extensions: ['.js', '.jsx', '.json'],
  browser: true,
  customResolveOptions: {
    moduleDirectory: ['node_modules', '../../node_modules'],
  },
};

const commonjsOptions = {
  include: /node_modules/,
  namedExports: {
    '../../node_modules/react-is/index.js': ['ForwardRef'],
  },
};

const babelOptions = {
  root: './',
  exclude: /node_modules/,
  runtimeHelpers: true,
};

export default [
  // browser-friendly UMD build
  {
    input: 'src/index.js',
    output: {
      name: pkg.productName,
      file: pkg.browser,
      format: 'umd',
    },
    external,
    plugins: [
      eslint(),
      builtins(),
      resolve(resolveOptions),
      babel(babelOptions),
      commonjs(commonjsOptions),
      terser(),
    ],
  },
];
