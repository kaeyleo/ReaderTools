# ReaderTools

一款小而美的移动端web博客插件，简单轻量无依赖。

A tiny js lib to create reader tools for your website. No dependencies.

[DEMO](http://liaokeyu.com/readerTools) 

![](review.gif)

该插件仅支持移动端web应用，请使用手机查看：

![](qrcode.png)

## Features

- Day-night Mode 夜间模式
- Scroll to top 返回顶部

## Build

本项目使用 `gulp` 构建，在 `dist` 文件夹中开发，先手动下载或者 `git clone` 本项目，然后在根目录下 `$ npm install` 安装开发所需的依赖，最后 `$ gulp` 启动项目，并在 `http://localhost:8080/demo` 预览。

ReaderTools uses `gulp` to build a development and dist versions. 

First you need install all dependencies, in repo's root:

`$ npm install`

Then run:

 `$ gulp` 
 
 The result is available in `build/` folder.

## Use

引入 dist 文件夹中的 `readerTools.min.css` 和 `readerTools.min.js`，需要引入icon图标 `<link rel="stylesheet" href="//at.alicdn.com/t/font_y9cm7lu8dnpqr529.css">` ，示例：

```html
......
<head>
<link rel="stylesheet" href="//at.alicdn.com/t/font_y9cm7lu8dnpqr529.css">
<link rel="stylesheet" href="../dist/css/readerTools.min.css">
</head>
<body>
	<!--文章页面-->
    <div class="page">
        <!--文章内容-->
    </div>
    <script src="../dist/js/readerTools.min.js"></script>
    <script>
    	 // 文章部分的父容器
        var el = document.querySelector('.page');
        // 初始化，并传入文章节点的父容器，和可选配置
        readerTools.init(el, {
            'tools': ['top', 'mode'] // 默认值
        });
    </script>
</body>
......
```

## License

MIT