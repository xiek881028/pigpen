# pigpen

pigpen是一个轻量级纯前端架构。适用于层级关系较简单，页面量较少的小型项目。[bagazhu.com](http://www.bagazhu.com)（未来会替换成pigpen的vue版）以及[不务正业系列](http://demo.bagazhu.com)基于此框架构建。

pigpen使用的html模版为pug(jade)，css模版为scss，js依赖jquery。支持ES6写法。

pigpen默认引入的jquery版本为v1.11.1，是为了使浏览器默认支持至IE8。未来将会整理出基于vue的版本，希望不是有生之年系列...

pigpen译为猪栏...八嘎猪用的框架 = 猪栏，没毛病。

## 快速开始

开始前请确保已经安装[`node`](http://nodejs.cn/)（>=v8.5.0）和npm（一般随node安装，无需单独安装）。

- 由于自定义shell使用了fs.copyFile方法，所以node版本需要>=v8.5.0。如果不需要使用自定义shell，可以将根目录下的shell.js删除并将根目录下的package.json中devDependencies的yargs一项删除即可。删除后框架可在node版本>=v6.10.0下正常运行，更低的node版本能否正常运行需要您自己去测试。
- 由于npm的源在国外，速度较慢。推荐使用[`淘宝NPM镜像`](https://npm.taobao.org/)，速度更快更稳定。
- 所有命令都在项目根目录下运行。

```sh
# 下载依赖组件
# (使用了淘宝镜像)
cnpm i
#或者不使用淘宝镜像
npm i

# 框架初始化
npm run shell -- --init

# 页面编译
npm start
```

现在，项目根目录的dist目录下会生成index.html文件，用浏览器查看你的“hello world”吧。

## 常用命令

项目shell命令分为两部分。npm命令定义在package.json中，自定义shell命令定义在shell.js中。您可以根据实际项目需求自行添加删改。

```sh
# 项目开发(生成未压缩js、css文件，方便开发调试。命令挂载，终止命令后将停止编译)
npm start

# 项目发布(生成js、css的min文件，用于线上生产环境)
npm release

# 添加页面模块(同步生成pug、scss、js文件，自动添加头部注释，自动引入相关依赖)
npm run shell -- --add --name <页面名称>

# 删除页面模块(同步删除pug、scss、js文件)
npm run shell -- --del --name <页面名称>
```

## 目录说明

### dist

用于存放编译后的项目代码，也是最终项目开发完成用于交付的文件夹。

***
目录下的assets用于存放项目插件依赖，依赖在框架初始化时注入。

目录下的css用于存放生成的样式文件。

目录下的font用于存放生成的字体文件。

目录下的images用于存放生成的图片文件。

目录下的js用于存放生成的交互文件。
***

### node_modules

存放项目依赖包，删除后可用快速开始第一步的“npm i”重新进行安装。

### src

存放开发源码，基本上所有开发工作都在这个文件夹下进行。

***
目录下的css用于存放scss源文件。

目录下的font用于存放使用的字体文件。

目录下的html用于存放pug源文件。

目录下的images用于存放开发使用的图片文件。

目录下的js用于存放开发js文件。
***

- css目录下的reset.scss存放了css的初始化样式。_common.scss用于存放公共样式。
- js目录下的_common.js用于存放公用交互。
- images文件夹下图片需要平级存放，不可以在images下建立文件夹归类存放。以目前的逻辑，如果images存在二级目录，程序会将二级目录下的图片组合成一张以文件夹名字命名的图片存放于images目录下，即CSS Sprite技术。如果不想使用CSS Sprite，将根目录下的webpack.config.js内67~75行注释，解开76行注释即可。
- 图片目前支持的格式有gif、jpg、jpeg、png，如果需要添加修改请去修改webpack.config.js文件。
- 字体目前支持的格式有ttc、ttf、woff，如果需要添加修改请去修改webpack.config.js文件。
- 新建或删除页面推荐使用shell命令，否则请自行理清相关的依赖关系。

### .babelrc

es6写法转义标准定义文件。修改时记得同步修改webpack.config.js中的引入包。

### .gitignore

git管理忽略文件，默认只忽略node_modules文件夹。

### config.local.js

全局配置文件。文件内的pageignore项为配置页面忽略列表。定义在列表内的页面在编译时将不会生成独立的html页面。默认忽略layout。

### package.json

npm配置文件。文件内定义了项目基础信息，快捷命令，各种引入包信息。具体细则请自行百度学习，不再赘述。

### postcss.config.js

scss编译配置文件。目前定义了CSS Sprite相关逻辑。

### publicFn.js

定义项目内使用的公共方法。目前只有数组判断和文件树结构循环两个方法。

### README.md

帮助文件。您现在看到的这些文字就存放于这个文件中。

### shell.js

自定义shell命令。目前包含4条命令。

- npm run shell -- --h（查看shell帮助）
- npm run shell -- --init（开发环境初始化）
- npm run shell -- --add --name <页面名称>（添加页面模块）
- npm run shell -- --del --name <页面名称>（删除页面模块）

### webpack.config.js

webpack编译配置文件。定义了不同类型文件的编译规则。具体细则请自行百度学习，不再赘述。

## 主要技术

- [`node`](https://nodejs.org) 一个基于 Chrome V8 引擎的 JavaScript 运行环境
- [`webpack`](http://webpack.github.io/) 一个现代JavaScript应用程序的模块打包器(module bundler)
- [`pug`](https://pugjs.org) 一个用JavaScript实现的高性能的模板引擎
- [`scss`](http://www.sasschina.com/) 成熟、稳定、强大的 CSS 扩展语言解析器
- [`jquery`](http://jquery.com/) 一个快速、简洁的JavaScript框架，一个伟大的JavaScript框架
- [`yargs`](https://www.npmjs.com/package/yargs) 一个用于处理命令行参数的node库

## 感谢者

[xiewulong](https://github.com/xiewulong)

## 许可证（License）

GPL
