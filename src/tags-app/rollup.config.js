import * as path from 'path';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import css from 'rollup-plugin-css-only';
import svelte from 'rollup-plugin-svelte';
import { terser } from 'rollup-plugin-terser';
import sveltePreprocess from 'svelte-preprocess';
import scss from 'rollup-plugin-scss'
import json from '@rollup/plugin-json';
import alias from '@rollup/plugin-alias';

const production = !process.env.ROLLUP_WATCH;
const projectRootDir = path.resolve('../..');

export default [{
    input: 'src/tags-app/main.ts',
    output: {
        sourcemap: !production,
        name: 'tagsApp',
        format: "iife",
        file: 'build/tags-app/tags-app.js'
    },
    plugins: [
        svelte({
            preprocess: sveltePreprocess({ sourceMap: !production }),
            compilerOptions: {
                // enable run-time checks when not in production
                dev: !production
            }
        }),
        scss(),

        // we'll extract any component CSS out into
        // a separate file - better for performance
        css({ output: 'tags-app.css' }),

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
        json(),

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
}];
