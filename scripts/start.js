'use strict';

// Do this first, so that any code reading it knows the right env.
process.env.BABEL_ENV   = 'development';
process.env.NODE_ENV    = 'development';

// Makes the script crash on unhandled rejections.
process.on('unhandledRejection', err => {
    console.error(err);
    process.exit(1);
});


const webpack = require('webpack');
const cli = require('./common/cli');


let compiler = webpack(require('../config/webpack.config'));
compiler.plugin('invalid', () => {
    cli.clear();
    console.log('Compiling...');
});

let watching = compiler.watch({}, (err, stats) => {
    cli.clear();
    cli.showBuildResult(err, stats);
});

for (let sig of ['SIGINT', 'SIGTERM']) {
    process.on(sig, function() {
        watching.close(() => {
            process.exit();
        });
    });
}
