const path = require('path')
const SpritesmithPlugin = require('webpack-spritesmith')
function resolve (dir) {
    return path.join(__dirname, dir)
}
module.exports = {
  assetsDir: './',
  // 引入全局的 scss 变量
  css: {
    loaderOptions: {
      // 给 sass-loader 传递选项
      sass: {
        // @/ 是 src/ 的别名
        // 所以这里假设你有 `src/variables.scss` 这个文件
        data: `@import "~@/common/sass/variables.scss";`
      }
    }
  },
  chainWebpack: config => {
    config.resolve.alias
      .set("@", resolve("src"))  //  配置常用目录别名
      .set("common", resolve("src/common"))
      .set("components", resolve("src/components"));
    config.module.rule('pug')
      .test(/\.pug$/)
      .use('pug-html-loader')
      .loader('pug-html-loader')
      .end();
    config.module
      .rule('scss')
        .test(/\.scss$/)
        .oneOf('vue')
        .resourceQuery(/\?vue/)
        .use('px2rem-loader')
          .loader('px2rem-loader')
          .before('postcss-loader')
          .options({
            remUnit: 75
          })
  },
  configureWebpack: {
    plugins: [
      new SpritesmithPlugin({
        src: {
          cwd: path.resolve(__dirname, 'src/common/images/sprite'),
          glob: '*.png'
        },
        target: {
          image: path.resolve(__dirname, 'src/common/sprite.png'),
          css: path.resolve(__dirname, 'src/common/sprite.css')
        },
        apiOptions: {
          cssImageRef: './sprite.png'
        },
        spritesmithOptions: {
          // algorithm: 'top-down',
          padding: 4
        }
      })
    ]
  },
}
