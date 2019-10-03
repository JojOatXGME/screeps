'use strict';

// Do this first, so that any code reading it knows the right env.
process.env.BABEL_ENV   = 'production';
process.env.NODE_ENV    = 'production';

// Makes the script crash on unhandled rejections.
process.on('unhandledRejection', err => {
    console.error(err);
    process.exit(1);
});


const webpack = require('webpack');
const cli = require('./common/cli');


let compiler = webpack(require('../config/webpack.config'));
compiler.run((err, stats) => {
    cli.showBuildResult(err, stats);
    process.exit();
});
