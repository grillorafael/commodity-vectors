var gulp = require('gulp');

var clean = require('gulp-clean');
var runSequence = require('run-sequence');
var minifyHTML = require('gulp-minify-html');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var cssmin = require('gulp-cssmin');
var autoprefixer = require('gulp-autoprefixer');
var uglify = require('gulp-uglify');
var browserSync = require('browser-sync').create();

gulp.task('serve', function() {
    browserSync.init({
        server: "./www"
    });

    gulp.watch("www/css/**/*.css").on('change', browserSync.reload);
    gulp.watch("www/views/**/*.html").on('change', browserSync.reload);
    gulp.watch("www/js/**/*.js").on('change', browserSync.reload);
});

gulp.task('build', function(callback) {
    runSequence(
        'clean-dist',
        'copy-build',
        'clean-libs',
        'minify-views',
        'build-scripts',
        'minify-images',
        'minify-index',
        'build-css',
        'clean-not-compiled-scripts',
        callback
    );
});

gulp.task('clean-not-compiled-scripts', function() {
    gulp.src('./dist/js/controllers').pipe(clean());
    gulp.src('./dist/js/services').pipe(clean());
    gulp.src('./dist/js/app.js').pipe(clean());
    return;
});

gulp.task('build-css', function() {
    return gulp.src('./dist/css/**/*.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(cssmin())
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('minify-images', function() {
    return gulp.src('./dist/img/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{
                removeViewBox: false
            }],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('./dist/img'));
});

gulp.task('minify-index', function() {
    return gulp.src('./dist/index.html')
        .pipe(minifyHTML())
        .pipe(gulp.dest('./dist/'));
});

gulp.task('minify-views', function() {
    return gulp.src('./dist/views/**/*.html')
        .pipe(minifyHTML())
        .pipe(gulp.dest('./dist/views'));
});

gulp.task('copy-build', function() {
    return gulp.src('./www/**/*').pipe(gulp.dest('./dist'));
});

gulp.task('clean-dist', function() {
    return gulp.src('./dist').pipe(clean());
});

gulp.task('clean-libs', function() {
    return gulp.src('./dist/libs').pipe(clean());
});

gulp.task('build-scripts', function() {
    var fs = require('fs');
    var cheerio = require('cheerio');
    var mkdirp = require('mkdirp');

    var version = new Date().getTime();

    var destFolder = "./dist";
    var buildRoot = "./www";
    var buildIndex = "index.html";

    var index = fs.readFileSync(buildRoot + '/' + buildIndex, "utf8");
    var $ = cheerio.load(index);
    var scripts = $('script');

    try {
        fs.rmdirSync(destFolder);
        fs.mkdirSync(destFolder);
    } catch (e) {}

    var scriptsCreated = {};
    var scriptPathToSrc = {};
    Array.prototype.forEach.call(scripts, function(script, i) {
        var buildDest = script.attribs['build-dest'];
        if (buildDest) {
            var fullPath = destFolder + buildDest;
            var fileFolder = fullPath.split('/');
            fileFolder.pop();

            var scriptContent = fs.readFileSync(buildRoot + script.attribs.src, "utf8");

            if (scriptsCreated[fullPath] === undefined) {
                mkdirp.sync(fileFolder.join('/'));
                scriptsCreated[fullPath] = scriptContent;
            } else {
                scriptsCreated[fullPath] += "\n" + scriptContent;
            }

            scriptPathToSrc[fullPath] = buildDest;
        }

        if (buildDest || script.attribs['no-build'] !== undefined) {
            $(script).remove();
        }
    });

    Object.keys(scriptsCreated).forEach(function(script) {
        var fileFolder = script.split('/');
        fileFolder.pop();
        fs.writeFileSync(script, scriptsCreated[script], 'utf8');

        gulp.src(script).pipe(uglify({mangle: false})).pipe(gulp.dest(fileFolder.join('/')));

        $('body').append('<script src="' + scriptPathToSrc[script] + '?v=' + version + '"></script>');
    });

    fs.writeFileSync(destFolder + "/" + buildIndex, $.html(), 'utf8');

    return;
});

gulp.task('default', ['serve']);
