import { nodeResolve } from '@rollup/plugin-node-resolve';
import json from '@rollup/plugin-json';
import terser from '@rollup/plugin-terser';
import esbuild from 'rollup-plugin-esbuild';

const dev = process.env.ROLLUP_WATCH === 'true';

export default {
  input: 'src/androidtv-plus-card.ts',
  output: {
    file: 'dist/androidtv-plus-card.js',
    format: 'es',
    inlineDynamicImports: true,
    sourcemap: dev,
  },
  plugins: [
    nodeResolve(),
    json(),
    esbuild({ target: 'es2021', minify: false }),
    !dev &&
      terser({
        format: { comments: false },
        compress: { passes: 2 },
      }),
  ],
  watch: {
    clearScreen: false,
  },
};
