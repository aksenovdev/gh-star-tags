import * as path from 'path';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import css from 'rollup-plugin-css-only';
import svelte from 'rollup-plugin-svelte';
import { terser } from 'rollup-plugin-terser';
import sveltePreprocess from 'svelte-preprocess';
import copy from 'rollup-plugin-copy'
import alias from '@rollup/plugin-alias';

const production = !process.env.ROLLUP_WATCH;
const projectRootDir = path.resolve('../..');

export default [
    {
        input: 'src/options-page/main.ts',
        output: {
            sourcemap: !production,
            name: 'optionsPage',
            format: "iife",
            file: 'build/options-page/options-page.js'
        },
        plugins: [
            svelte({
                preprocess: sveltePreprocess({ sourceMap: !production }),
                compilerOptions: {
                    // enable run-time checks when not in production
                    dev: !production
                }
            }),
            // we'll extract any component CSS out into
            // a separate file - better for performance
            css({ output: 'options-page.css' }),

            // If you have external dependencies installed from
            // npm, you'll most likely need these plugins. In
            // some cases you'll need additional configuration -
            // consult the documentation for details:
            // https://github.com/rollup/plugins/tree/master/packages/commonjs
            resolve({
                browser: true,
                dedupe: ['svelte']
            }),
            commonjs(),
            typescript({
                sourceMap: !production,
                inlineSources: !production
            }),
            copy({
                targets: [
                    { src: 'src/options-page/options-page.html', dest: 'build/options-page/' },
                ]
            }),

            alias({
                entries: [
                    { find: "@tags-api", replacement: path.resolve(projectRootDir, 'src', 'tags-api') },
                    { find: "@storage-data", replacement: path.resolve(projectRootDir, 'src', 'storage-data') },
                ]
            }),

            // If we're building for production (npm run build
            // instead of npm run dev), minify
            production && terser()
        ],
        watch: {
            clearScreen: false
        }
    }
];
