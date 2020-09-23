## webpack 实践
[实践源码]()
### 一、 环境准备
 ** 在安装 Webpack 前，本地环境需要支持 node.js。**
 - node下载地址：[https://nodejs.org/en/download/](https://nodejs.org/en/download/)
 
 <img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a443eb28101148bb8ebdda106d9b12ff~tplv-k3u1fbpfcp-zoom-1.image" width="400">
- 打开下载的安装包，下一步、下一步 无需更改配置，到安装完成
- 检测 node 和 npm 版本 **` node -v `** **` npm -v `**

 <img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f7c211ac788543eeb642d74bdd2d1cc1~tplv-k3u1fbpfcp-zoom-1.image" width="300">
 
** 由于 npm 安装速度慢，建议使用淘宝的镜像及其命令 cnpm** 
 - cnpm 是中国 npm 镜像的客户端。
  
  - 安装淘宝镜像的命令：
  ```javascript
npm install -g cnpm --registry=https://registry.npm.taobao.org
  ```
  - 检测cnpm是否安装成功, 执行命令: <font color=#f90>**` cnpm -v `**</font>
  ![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1c0aa5359e624206912de3141eef1275~tplv-k3u1fbpfcp-zoom-1.image)
### 2. 初始化项目
- 新建项目文件夹，并使用命令行工具打开该文件夹

  <img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e03f9fe40a0546ab86a38d7784b3ce05~tplv-k3u1fbpfcp-zoom-1.image" width="400">
  <img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/60fd377e755a4646bc5752d71919f1a7~tplv-k3u1fbpfcp-zoom-1.image" width="400">
  <img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9b8a6b19055347b08dfd6221c1043cfd~tplv-k3u1fbpfcp-zoom-1.image" width="400">
  
- 初始化 **`package.json`**（包描述文件）
	```javascript
 //在刚打开的命令行工具中 执行如下命令
 npm init
    ```
 <img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b584c75719b64ea1926b18c60185a59b~tplv-k3u1fbpfcp-zoom-1.image" width="500">
 
 
 > 使用npm init命令可以初始化一个package.json文件。在初始化的过程中，会叫用户输入name, version等等信息，当然，你都可以忽略。一路点回车，就生成了下面这样一个初始化的package.json。
  这个文件主要是用来记录这个项目的详细信息的，同时npm的所有行为都与package.json中的字段息息相关
  
  ```json
  {
    "name": "webpack_0916demo",
    "version": "1.0.0",
    "description": "webpack_demo",
    "main": "index.js",
    "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1"
    },
    "author": "k",
    "license": "ISC"
  }
    ``` 
  
  
    - package.json 常用配置项
       - name：项目名称。
       - varsion ： 版本号。
       - author：项目作者。 
       - description：项目描述。
       - license：开源许可。
       - **main**：包的入口文件。
       - **scripts**：npm提供给我们运行shell命令的入口
        ```javascript
        "scripts": {
          "dev": "webpack-dev-server --open",
          "build": "webpack",
          "serve": "node serve.js"
        },
        ```
        > 通过npm run xxx 来执行scripts中的命令。 在命令行输入：npm run dev , 对应的命令 `webpack-dev-server --open` 就会被执行。这里有一个地方需要注意，当执行npm run xxx的时候，node_modules/.bin/目录会在运行时被加入系统的PATH变量。上面的例子，当我们在命令行输入：npm run build时，其实真正执行的命令是node_modules/.bin/webpack而不是webpack。所以，当你的webpack并未全局安装时，直接在命令行输入：webpack是会报错的。因为你的webapck是安装在node_modules/.bin/下面的。
        - **dependencies**：项目依赖的模块列表（生产环境）。
        > 通过 npm install **--save** xxx 下载的模块，会被添加到该属性中
        - **devDependencies**：一些模块只在开发时需要依赖
        > 通过 npm install **--save-dev** xxx 下载的模块，会被添加到该属性中

        > dependencies与devDependencies看起来差不多，他们都是标注项目的依赖列表
        不同的是，dependencies是项目运行时必要依赖，而devDependencies是项目开发时所需依赖
        明确了以上的不同，就可以很清晰知道把项目依赖放在哪里了. 

   
 - 初始化项目目录结构（自定义），下面是我的目录结构
 ```
 |-- src           // 源码目录
 |   |--index.js   // 源码主文件
 |-- index.html    // 页面入口
 |-- package.json  // 包描述文件
  
 ```
### 3. 安装webpack
使用cnpm安装webpack
```javascript
cnpm install --save-dev webpack webpack-cli
```
 > 注意：这里是下载了 webpack 和 webpack-cli 两个模块，npm一次下载多个模块，模块名中间用空格隔开。 

### 4. 配置webpack
 - 在根目录下新建 **`webpack.config.js`**
   ```
 |-- node_modules  // 依赖模块（执行下载命令后自动生成）
 |-- src           // 源码目录
 |   |--index.js   // 源码主文件
 |-- index.html    // 页面入口
 |-- package.json  // 包描述文件
 |-- webpack.config.js  //webpack配置文件
 ```

 
  
  ```javascript
 /** webpack.config.js */
 const path = require('path');
 module.exports = {
      entry: './src/index.js',   //入口文件
      output: { 
          path: path.resolve(__dirname,'dist'), //打包后的文件路径
          filename: 'js/main.js'   //打包后的文件名称
      }
 }
 ```
### 5. 第一次打包
 - 配置 **`package.json`**
 ```json
 /** package.json  */
 "scripts": {
  	//...
    "build": "webpack --mode=production",     //添加打包命令
  },
 ```
 > **注意： package.json中不能写注释，只要是json文件都不可以写注释 **
 
 - 编辑**`src/index.js`**
 ```javascript
 /** src/index.js  */
 document.write('hellow webpack')
 ```
 - 执行打包命令
 ```
 npm run build
 ```
 
  <img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c95d838908714d2785815fcaa342791e~tplv-k3u1fbpfcp-zoom-1.image" width="500">
 
 打包后的`main.js` 被放入 `dist/js` 中
  
  - 在`index.html`中引入打包后的`main.js`
  ```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>webpack_demo</title>
	</head>
	<body>
		<script src="./dist/js/main.js" type="text/javascript" charset="utf-8"></script>
	</body>
</html>
  ```
  打开index.html
  
  <img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/15b9a7b3e70d4e8dac3bb8ef3e835158~tplv-k3u1fbpfcp-zoom-1.image" width="500" style="border: 1px solid #000"> 
  
### 6. loader 预处理器

> ** webpack默认只识别普通javascript文件，loader 用于对模块的源代码进行转换，来帮助webpack识别它们。 例如，Babel loader可以将JSX/ES6文件转换为普通JS文件.下面我们给出几个市理** [**查看更多 loader ...**](https://www.webpackjs.com/loaders/#%E6%A8%A1%E6%9D%BF-templating-)

- **使用 `Babel loader` 处理 ES6 及更高版本的JS语法**
   - 安装 babel loader
   
    在需要安装的包名后面跟 **@x.x.x** 可以下载指定版本
    ```javascript
    cnpm install --save-dev babel-loader@7.1.1 babel-core babel-preset-env
    ```
    
     - [babel-loader](https://webpack.js.org/loaders/babel-loader)：转换JavaScript文件,我在这里安装了v7.1.1版本，因为最新版本的babel在编译的时候报错。
     - [babel-core](https://webpack.js.org/loaders/babel-loader)：babel-loader依赖的api。
     - [babel-preset-env](https://webpack.js.org/loaders/babel-loader)：告诉babel使用哪种转码规则进行文件处理。
   - 配置 **`webpack.config.js`**
   	```javascript
     /** webpack.config.js */
     module.exports = {
       // ... 省略代码
       module: {
          rules: [
              //es6 语法转换;
              {
                  test: /\.js$/,   //文件匹配
                  loader: 'babel-loader',  //loader名
                  exclude: /node_modules/,   //不转换 node_modules 里的js 
              }
          ]
      },
    }
     ```
     
   - 在`package.json`中配置 babel 
   ```javascript
   /** package.json */
   {
      "name": "bundle_js",
      "version": "1.0.0",
      "description": "webpack_test4",
      ...
      "babel":{
        "presets": ["env"]
      }
  }
   ```
   
   > 配置完后，我们就可以开心的使用高版本的js 语法，
  
 - **使用 `css loader` 处理 css 样式**
   
   - 安装loader
      ```javascript
      cnpm install --save-dev style-loader css-loader sass-loader node-sass
      ```
     - [style-loader](https://webpack.js.org/loaders/style-loader)：会将css样式挂载到head的style标签中
     - [css-loader](https://webpack.js.org/loaders/css-loader): 查清css文件的引用关系，并把他们打合并到一起
     - [sass-loader](https://webpack.js.org/loaders/sass-loader)：将scss编译成 css （scss-loader 依赖于 node-scss）
   - 配置 **`webpack.config.js`**
   	```javascript
   /** webpack.config.js */
   module.exports = {
     // ... 省略代码
     module: {
		rules: [
			{
				test: /\.(css|scss)$/,
				use: [{
						loader: "style-loader",
					},{
						loader: "css-loader",
						options: {
							sourceMap: true,  //开启sourceMap方便调试
						},
					},{
						loader: "sass-loader",
						options: {
							sourceMap: true
						},
					}],
			},
		]
	},
  }
   ```
   - 测试css-babel
    ```
 |-- src           // 源码目录
 |   |--index.js   // 源码主文件
 |   |--index.scss //新建样式文件
  ```
  
  编辑`src/index.scss`
  ```javascript
  body{
		background: red
 }
  ```
  
  引入`src/index.scss`
  	```javascript
    /** src/index.js */
    import './index.scss';
    
    document.write(`hello webpack`);
    ```
 执行打包，在浏览器查看效果
 
  <img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b77c5acd76584fe78865d5006b4012ae~tplv-k3u1fbpfcp-zoom-1.image" style="border: 1px solid #000">
  
 - 处理图片
   - 安装 loader
     ```javascript
     cnpm install --save-dev file-loader url-loader
     ```
  	   - [file-loader](https://webpack.js.org/loaders/file-loader/#root)：帮助webpack打包处理一系列的图片文件
       - [url-loader](https://webpack.js.org/loaders/url-loaderr/#root)： 依赖file-loader, 可以将指定大小（limit属性）及以下的图片文件转成base64编码,如果图片超过指定大小则使用file-loader处理
       
    - 配置 **`webpack.config.js`**
    	```javascript
       /** webpack.config.js */
       module.exports = {
         // ... 省略代码
         module: {
            rules: [
                // ... 省略代码
                {
                    test: /\.(png|jpe?g|gif|svg|cur)(\?.*)?$/,
                    loader: 'url-loader',
                    options: {
                        limit: 10000,    //如果被打包图片小于 10000kb，则被处理为bese64编码， 反之则存为静态资源
                        name: 'images/[name].[ext]',   //打包后的位置及名称
                    }
                },
            ]
        },
      }
       ```
   - 图片处理测试
  
      ```
     |-- src           // 源码目录
     |   |-- images
         |   |-- prop.jpg  //测试图片
     |   |--index.js   // 源码主文件
     |   |--index.scss //新建样式文件
      ```
      
      编辑 `src/index.scss`
      ```javascript
      body{
      	background: url('./images/prop.jpg')
      }
      ```
      执行打包， 在浏览器查看效果
      
      <img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2e8fff5d42ad4522b5ecae0c11cf77f6~tplv-k3u1fbpfcp-zoom-1.image" style="border: 1px solid #000">
      
      背景图片渲染成功
      
      
   
 
### 7. 开发环境
> **上面我们完成了第一次打包， 当然我们一定不想每编辑一段代码，就手动执行一次打包操作。 为了方便调试，我们需要配置开发环境**


  - **安装`webpack-dev-server` 及 `html-webpack-plugin`**
  ```javascript
  cnpm install --save-dev webpack-dev-server html-webpack-plugin
  ```
    - [html-webpack-plugin](https://www.webpackjs.com/plugins/html-webpack-plugin/): 为html文件中引入的外部资源如script、link动态添加每次compile后的hash，防止引用缓存的外部文件问题 
    - [webpack-dev-server](https://webpack.js.org/configuration/dev-server/#root): 轻量级web服务器 
- **配置` webpack.config.js `**
  ```javascript
  /** webpack.config.js */
  
  
  module.exports = {
  
    //...省略代码
    
    // 开发环境 服务
    devServer:{
        port: 8080,
        publicPath: '/',
        historyApiFallback: {
          rewrites: [
            { from: /.*/, to: 'index.html' }
          ],
        },
    },
    plugins: [	
      	// html 自动更改引用路径
      	new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: true
      	}),
  	]
  }
  
  ```
  
- ** 在`package.json` 中配置启动开发环境命令**
 ```json
 /** package.json  */
 "scripts": {
  	//...
    "dev": "webpack-dev-server --open",     //添加开发环境命令
  },
 ```
 
 - **执行 `npm run dev`**启动开发环境
 
 执行后的浏览器效果（如果执行命令后 页面没有自动在浏览器打开， 就手动输入 `localhost:8080`） 8080是自己定义的服务端口。启动成功后每次编辑保存，视图都会自动更新
 
 <img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e29e8362a2b747b38c9ecdfc653a08ca~tplv-k3u1fbpfcp-zoom-1.image" width="400" style="border: 1px solid #000">

