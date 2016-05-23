# My-word-memo

##### 我的单词背诵器

### Main function

- 自动完成从文件中批量导入词表


- 词表乱序输出


- 隐藏／显示中文，方便检查背诵效果


- 生词记录／重现

### Requirements

需要在[node.js](http://nodejs.org)环境中运行

 需要先安装[MongoDB](http://mongodb.org)， 并搭建本地数据库。

### Install

```
npm install
```

### Run

```
npm start
```

**NOTE:** 默认端口为3000，如果需要自定义，可将端口号作为命令行参数， 如：

```
npm start 4000
```

### Models

##### 主页：http://localhost:3000

* 单词文件存放在` ./models/list`文件夹中，每次进入主页，将自动获取文件夹中所有词表文件的数据，保存在数据库中，等待调用。


* 在主页调用词表时，在词表名称处输入词表名称**（词表所在文件夹名）**，如`gre`；在词表编号处输入词表编号**（文件名）**，如`1`。

**NOTE:** 文件中词表应按照以下格式录入保存，才能被正确读取：**中英文间用”:“隔开，单词与单词间需要换行**。

>demotic: adj. 民众的，通俗的
>delude: v. 欺骗，哄骗
>demean: v. 贬抑，降低





