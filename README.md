# pigpen

pigpen是一个轻量级纯前端架构。适用于层级关系较简单，页面量较少的小型项目。

pigpen使用的html模版为pug(jade)，css模版为scss，js依赖jquery。支持ES6写法。

pigpen默认引入的jquery版本为v1.11.1，IE浏览器支持至IE8。

## 快速开始

开始前请确保已经安装[`node`](http://nodejs.cn/)（>=v8.5.0）和npm。

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
# 项目开发
npm start

# 项目发布
npm release

# 项目初始化
npm run shell -- --init
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

项目依赖包。

### src

开发源码，基本上所有开发工作都在这个文件夹下进行。

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

### .babelrc

babel配置文件。

### .gitignore

git忽略文件，默认忽略node_modules与dist文件夹。

### config.local.js

全局配置文件。文件内的pageignore项为配置页面忽略列表。定义在列表内的页面在编译时将不会生成独立的html页面。默认忽略layout。

### package.json

npm配置文件。

### postcss.config.js

postcss配置文件。

### tools

项目工具包。index为通用方法，node为基于node的编译时使用的方法。

### README.md

帮助文件。

### shell.js

自定义shell命令。目前包含2条命令。

- npm run shell -- --h（查看shell帮助）
- npm run shell -- --init（开发环境初始化）

### webpack.config.js

webpack编译配置文件。

## 许可证（License）

MIT
