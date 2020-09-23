import { src, dest, watch, series, parallel } from 'gulp'
import browserSync from 'browser-sync'
import concat from 'gulp-concat'
import del from 'del'
import webpack from 'webpack-stream'
import named from 'vinyl-named'
import yargs from 'yargs'

const PRODUCTION = yargs.argv.prod

var paths = {
  src: {
    html: './src/*.html',
    css: ['./src/css/**/*'],
    js: { entry: './src/js/index.js', all: './src/js/**/*' },
    img: ['./src/img/**/*'],
  },
  dist: './dist',
}

const server = browserSync.create()

export const serve = (done) => {
  server.init({
    server: {
      baseDir: paths.dist,
      https: true,
    },
  })
  done()
}

export const reload = (done) => {
  server.reload()
  done()
}

export const clean = () => del(paths.dist)

export const html = () => {
  return src(paths.src.html).pipe(dest(paths.dist))
}

export const css = () => {
  return src(paths.src.css)
    .pipe(concat('styles.css'))
    .pipe(dest(paths.dist + '/assets/css'))
}

export const js = () => {
  return src(paths.src.js.entry)
    .pipe(named())
    .pipe(
      webpack({
        module: {
          rules: [
            {
              test: /\.js$/,
              use: {
                loader: 'babel-loader',
                options: {
                  presets: [],
                },
              },
            },
          ],
        },
        mode: PRODUCTION ? 'production' : 'development',
        devtool: !PRODUCTION ? 'inline-source-map' : false,
        output: {
          filename: '[name].js',
        },
        // externals: {
        //   jquery: 'jQuery',
        // },
      })
    )
    .pipe(dest(paths.dist + '/assets/js'))
}

export const img = () => {
  return src(paths.src.img).pipe(dest(paths.dist + '/assets/img'))
}

export const watchForChanges = () => {
  watch(paths.src.html, series(html, reload))
  watch(paths.src.css, series(css, reload))
  watch(paths.src.js.all, series(js, reload))
  watch(paths.src.img, series(img, reload))
}

export const build = series(clean, parallel(html, css, js, img))

export const dev = series(
  clean,
  parallel(html, css, js, img),
  serve,
  watchForChanges
)

export default dev
