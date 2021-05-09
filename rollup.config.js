import fse from 'fs-extra';
import optionsPageConfigs from './src/options-page/rollup.config';
import tagsAppConfigs from './src/tags-app/rollup.config';

fse.removeSync('./build');
fse.copySync('./public', './build');

export default [
    ...tagsAppConfigs,
    ...optionsPageConfigs
];
