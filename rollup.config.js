import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import sveltePreprocess from 'svelte-preprocess';
import css from 'rollup-plugin-css-only';
import { mdsvex } from 'mdsvex';
import pkg from './package.json';

const production = !process.env.ROLLUP_WATCH;

export default {
  input: 'src/main.js',
  output: {
    sourcemap: true,
    format: 'iife',
    name: 'app',
    file: 'public/build/bundle.js',
  },
  plugins: [
    replace({
      preventAssignment: true,
      YAHTZEE_VERSION: pkg.version,
      YAHTZEE_SHA: process.env.COMMIT_REF || 'local',
      'process.env.NODE_ENV': production
          ? JSON.stringify('production')
          : JSON.stringify('development')
    }),
    svelte({
      extensions: ['.svelte', '.md'],
      preprocess: [
        mdsvex({ extension: '.md', layout: './src/components/Markdown.svelte' }),
        sveltePreprocess({ postcss: true }),
      ],
      compilerOptions: {
        dev: !production,
      },
    }),
    css({ output: 'bundle.css' }),
    // If you have external dependencies installed from
    // npm, you'll most likely need these plugins. In
    // some cases you'll need additional configuration -
    // consult the documentation for details:
    // https://github.com/rollup/plugins/tree/master/packages/commonjs
    resolve({
      browser: true,
      dedupe: ['svelte'],
    }),
    commonjs(),

    // In dev mode, call `npm run start` once
    // the bundle has been generated
    !production && serve(),

    // Watch the `public` directory and refresh the
    // browser on changes when not in production
    !production && livereload('public'),

    // If we're building for production (npm run build
    // instead of npm run dev), minify
    production && terser(),
  ],
  watch: {
    clearScreen: false,
  },
};

function serve() {
  let started = false;

  return {
    writeBundle() {
      if (!started) {
        started = true;

        require('child_process').spawn('npm', ['run', 'start', '--', '--dev'], {
          stdio: ['ignore', 'inherit', 'inherit'],
          shell: true,
        });
      }
    },
  };
}
