# 我的图书前端

**提供用户上传管理 pdf 图书的功能，并且可进行阅读。在打开阅读器阅读时，会开启定时任务，每 10s 向服务端更新当前阅读进度。**

[我的图书服务端](https://github.com/cenganhui/cgh-library-server)

**参考资料**

[Vue.js](https://cn.vuejs.org/)
[Vue CLI](https://cli.vuejs.org/zh/guide/)
[Element UI](https://element.eleme.cn/#/zh-CN)
[PDF.js](http://mozilla.github.io/pdf.js/)
[Animate.css](https://animate.style/)

### 注册页面
![cenganhui/TOIMGae1f80812033110N.png](http://akumacgh.cn:8088/cenganhui/TOIMGae1f80812033110N.png)

### 登录页面
![cenganhui/TOIMG85a090812032853N.png](http://akumacgh.cn:8088/cenganhui/TOIMG85a090812032853N.png)

### 普通用户页面内容
没有用户管理和全局图书管理。
![cenganhui/TOIMG206440812033014N.png](http://akumacgh.cn:8088/cenganhui/TOIMG206440812033014N.png)

### 管理员页面内容
具有用户管理和全局图书管理，可以修改用户管理员权限和用户信息，可删除用户与图书。
![cenganhui/TOIMG1ca3f0812032954N.png](http://akumacgh.cn:8088/cenganhui/TOIMG1ca3f0812032954N.png)

### 个人信息页面
个人信息内容较少，因此只有修改昵称和修改密码。
![cenganhui/TOIMGcbc7d0812032918N.png](http://akumacgh.cn:8088/cenganhui/TOIMGcbc7d0812032918N.png)

### 个人图书管理页面
可对自己的图书进行管理，可以每次上传一个 pdf 到服务器，目前该页面的下载还有问题，还需修改。
![cenganhui/TOIMG08a9c0812033034N.png](http://akumacgh.cn:8088/cenganhui/TOIMG08a9c0812033034N.png)

### 阅读页面
由于 pdf 文件一般比较大，因此在第一次打开图书阅读时可能会因 pdf 较大而加载较慢，请耐心等待一下。另外，可以在阅读器的右上角对该图书进行下载。
![cenganhui/TOIMG540740812033058N.png](http://akumacgh.cn:8088/cenganhui/TOIMG540740812033058N.png)