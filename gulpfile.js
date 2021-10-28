// Code by Ida Gundhammar 2021-10-28, student at Mittuniversitetet, HT2020.

// Declaring variables
const {src, dest, parallel, series, watch} = require('gulp');
const concat = require('gulp-concat');
const terser = require('gulp-terser');
const imagemin = require('gulp-imagemin');
const server = require('gulp-server-livereload');
const sass = require('gulp-sass')(require('sass'));

// File paths
const files = {
    htmlPath: "src/**/*.html",
    jsPath: "src/js/*.js",
    imagePath: "src/images/*",
    sassPaths: "src/sass/**/*",
    sassPath: "src/sass/main.scss"
}

// HTML-task to copy and transfer HTML-files
function copyHTML() {
    return src(files.htmlPath)
        .pipe(dest('public'));
}


// JS-task to concatenate, minimize and transfer JS-files
function copyJS() {
    return src(files.jsPath)
        .pipe(concat('main.js'))
        .pipe(terser())
        .pipe(dest('public/js'));
}

// Image-task to minimize and transfer images
function copyImage() {
    return src(files.imagePath)
        .pipe(imagemin())
        .pipe(dest('public/images'));
}

// Live-server reload with settings to enable browser reload
function reloadPage() {
    return src('public/')
    .pipe(server({
        livereload: true,
        open: true
    }));
}

//  Sass-task to compress scss-files and transfer to css-folder
function copySass() {
    return src(files.sassPath)
        .pipe(sass({outputStyle: 'compressed'}).on("error", sass.logError))
        .pipe(dest("public/css"));
}

// Watch-task to discover changes on the files and run functions if there are changes
function watchTask() {
    watch([files.htmlPath, files.jsPath, files.imagePath, files.sassPaths], parallel(copyHTML, copyJS, copyImage, copySass));
}

// Set default gulp command to run functions
exports.default = series(
    parallel(copyHTML, copyJS, copyImage, copySass), reloadPage,
    watchTask
);
