import fse from 'fs-extra';
import optionsPageConfig from './src/options-page/rollup.config';
import tagsAppConfig from './src/tags-app/rollup.config';

fse.removeSync('./build');
fse.copySync('./public', './build');

export default [
    tagsAppConfig,
    optionsPageConfig
];
