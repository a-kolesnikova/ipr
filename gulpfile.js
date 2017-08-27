'use strict';
var gulp = require('gulp'),
watch = require('gulp-watch'),
prefixer = require('gulp-autoprefixer'),
less = require('gulp-less'),
uglify = require('gulp-uglify'),
sourcemaps = require('gulp-sourcemaps'),
cssmin = require('gulp-minify-css'),
imagemin = require('gulp-imagemin'),
pngquant = require('imagemin-pngquant'),
clean = require('gulp-clean');

var path = {
    build: {
        html: 'build/',
        components: 'build/components/',
        js: 'build/boot/',
        core: 'build/core/',
        css: 'build/css/',
        img: 'build/images/',
        favicon: 'build/'
    },
    src: {
        html: 'app/*.html',
        components: 'app/components/**/*.{html,js}',
        js: 'app/boot/**',
        style: 'app/styles/styles.less',
        core: 'app/core/**',
        img: 'app/images/**/*.*',
        favicon: 'app/favicon.ico'
    },
    watch: {
        html: 'app/**/*.html',
        components: 'app/components/**/*.*',
        js: 'app/boot/**',
        style: 'app/styles/**/*.less',
        img: 'app/images/**/*.*'
    }
};

gulp.task('html:build', function () {
    gulp.src(path.src.html)
        .pipe(gulp.dest(path.build.html))
    });

gulp.task('components:build', function () {
    gulp.src(path.src.components)
        .pipe(gulp.dest(path.build.components))
    });

gulp.task('style:build', function () {
    gulp.src(path.src.style)
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(prefixer())
        .pipe(cssmin())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.css))
    });

gulp.task('js:build', function () {
    gulp.src(path.src.js).pipe(gulp.dest(path.build.js))
    gulp.src(path.src.core).pipe(gulp.dest(path.build.core)) 
});

gulp.task('image:build', function () {
    gulp.src(path.src.img).pipe(imagemin({
        progressive: true,
        svgoPlugins: [{removeViewBox: false}],
        use: [pngquant()],
        interlaced: true
    })).pipe(gulp.dest(path.build.img))
    gulp.src(path.src.favicon).pipe(gulp.dest(path.build.favicon)) 
});


gulp.task('build', [
    'html:build',
    'components:build',
    'js:build',
    'style:build',
    'image:build'
]);

gulp.task('watch', function(){
    watch([path.watch.html], function(event, cb) {
        gulp.start('html:build');
    });
    watch([path.watch.style], function(event, cb) {
        gulp.start('style:build');
    });
    watch([path.watch.js], function(event, cb) {
        gulp.start('js:build');
    });
    watch([path.watch.img], function(event, cb) {
        gulp.start('image:build');
    });
    watch([path.watch.components], function(event, cb) {
        gulp.start('components:build');
        gulp.start('style:build');
    });
});

gulp.task('clean-dist', function() {
    gulp.src('build/')
        .pipe(clean());
});

gulp.task('npm-start', ['clean-dist']);
gulp.task('default', ['build','watch']);