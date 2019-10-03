module.exports = function(grunt) {
    const config = grunt.file.readJSON('.screeps.json');

    grunt.initConfig({
        clean: {
            dist: ['dist', '.tscache'],
        },
        screeps: {
            options: {
                email: grunt.option('email') || config.email,
                password: grunt.option('password') || config.password,
                branch: grunt.option('branch') || config.branch,
                ptr: grunt.option('ptr') ? true : config.ptr,
            },
            dist: {
                src: ['dist/*.js'],
            },
        },
        ts: {
            options: {
                target: 'es6',
                module: 'commonjs',
                allowJs: true,
                isolatedModules: true,
                noImplicitReturns: true,
                noImplicitThis: true,
                strictFunctionTypes: true,
                strictNullChecks: true,
                strictPropertyInitialization: true,
                pretty: process.stdout.isTTY,
            },
            dev: {
                src: ['src/**'],
                outDir: 'dist/',
                options: {
                    rootDir: 'src/',
                    sourceMap: true,
                    inlineSourceMap: true,
                    fast: 'always',
                },
            },
            prod: {
                src: ['src/**'],
                outDir: 'dist/',
                options: {
                    rootDir: 'src/',
                    sourceMap: false,
                    inlineSourceMap: false,
                    fast: 'never',
                },
            },
        },
        watchloop: {
            scripts: {
                files: ['src/**/*'],
                tasks: ['ts:dev', 'screeps'],
                options: {
                    spawn: false,
                },
            },
        },
    });

    grunt.loadNpmTasks('grunt-contrib-clean')
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-screeps');
    grunt.loadNpmTasks("grunt-ts");

    grunt.task.renameTask('watch', 'watchloop');
    grunt.registerTask('default', ['clean', 'ts:prod', 'screeps']);
    grunt.registerTask('watch', ['clean', 'ts:dev', 'screeps', 'watchloop']);
}
