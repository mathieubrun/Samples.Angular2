/// <binding AfterBuild='ts, copy' ProjectOpened='watch' />
module.exports = function (grunt) {
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks("grunt-shell");

    grunt.initConfig({
        watch: {
            static_files : {
                files: [
                    'src/html/**/*.html',
                    'src/html/**/*.ico'
                ],
                tasks: ['copy']
            },

            ts_files: {
                files: [
                    'src/ts/**/*.ts'
                ],
                tasks: ['ts']
            }
        },

        copy: {
            vendor_js: {
                expand: true, flatten: true,
                src: [
                    'node_modules/angular2/bundles/angular2-polyfills.js',
                    'node_modules/angular2/bundles/angular2.dev.js',
                    'node_modules/angular2/bundles/router.dev.js',
                    'node_modules/angular2/es6/dev/src/testing/shims_for_IE.js',
                    'node_modules/rxjs/bundles/Rx.js',
                    'node_modules/core-js/client/core.js',
                    'node_modules/systemjs/dist/system.js',
                    'node_modules/systemjs/dist/system-polyfills.js'],
                dest: 'wwwroot/vendor'
            },
            app_html: {
                expand: true, flatten: true,
                src: [
                    'src/html/**/*.html',
                    'src/html/**/*.ico',
                    'src/css/**/*.css'
                ],
                dest: 'wwwroot'
            },
            app: {
                expand: true,
                cwd: 'src/ts',
                src: [
                   '**/*.html',
                   '**/*.css'
                ],
                dest: 'wwwroot/app'
            }
        },

        shell:{
            tsc: 'tsc -p src/ts'
        }
    });
};