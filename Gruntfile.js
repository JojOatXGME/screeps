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
                pretty: process.stdout.isTTY,
            },
            dev: {
                outDir: 'dist/',
                tsconfig: true,
                options: {
                    sourceMap: true,
                    inlineSourceMap: true,
                    fast: 'always',
                },
            },
            prod: {
                outDir: 'dist/',
                tsconfig: true,
                options: {
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
