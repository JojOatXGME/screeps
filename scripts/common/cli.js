'use strict';

const chalk = require('chalk');


module.exports = {
    clear: clear,
    showBuildResult: showBuildResult,
};


function clear() {
    if (process.stdout.isTTY) {
        if (process.platform === 'win32') {
            process.stdout.write('\x1B[2J\x1B[0f');
        }
        else {
            process.stdout.write('\x1B[2J\x1B[3J\x1B[H');
        }
    }
}

function showBuildResult(err, stats) {
    if (err) {
        console.error(err);
        return;
    }
    console.log(stats.toString({
        chunks: false,  // Makes the build much quieter
        colors: true    // Shows colors in the console
    }));
    if (stats.hasErrors()) {
        console.log(chalk.red('Failed to compile.\n'));
    } else if (stats.hasWarnings()) {
        console.log(chalk.yellow('Compiled with warnings.\n'));
    } else {
        console.log(chalk.green('Compiled successfully!\n'));
    }
}
