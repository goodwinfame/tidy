# TypeScript Next.js project

This is a typescript next.js example, integrated some modules like less, ant design and redux-observable.

## How to start?

### Using `git clone` this repo

```bash
cd tidy
```

Install dependencies with:

```bash
npm install
# or
yarn install
```

### Run it

```bash
npm run dev
# or
yarn dev
```

## This project is based on next.js examples

with-typescript [@zeit/with-typescript](https://github.com/zeit/next.js/tree/canary/examples/with-typescript) 

and 

with-redux-observable [@zeit/with-redux-observable](https://github.com/zeit/next.js/tree/canary/examples/with-redux-observable)


## 更新日志
1.0.0
框架集成

1.0.1
model中加入getter
getter接受全局state并返回结果
结果放入model state

## Why name tidy?
Just like [@dvajs/dva](https://github.com/dvajs/dva), models handle the business, I placed epics and reducers together in model, this form of model structure makes the business more clear and the project tidy.
This is just the begining, it will be continually updated.


😅😅😅

英文说明以后补充。
先用中文说明下，
这个项目解决了next官方示例没有解决或没有提到的一些问题，例如：antd样式动态加载（ts环境），cssModules影响antd样式等问题。

当然，做这个项目不希望仅仅只是整合，
也希望能够成为一个效率高，结构简单，用法简单的业务框架。

### 项目扩展方向：


在使用dva的过程中，觉得model的设计太突出了，把react项目中零碎的业务逻辑都整合起来，业务变得清晰易维护。
所以，我想试着用dva中model的形式来组织redux-observable代码。


另外，我也会试着在model中加入一些其他实用方法。
在使用dva的过程中，我感觉从model中取值往往很繁琐，尤其是在state结构复杂或相关联之后。
vuex的getter不错，将一些状态的提取公式化，这样就不用担心state复杂后，使用繁琐了。


同时，对应不同的业务场景，model的state设计会有区别，
但有一些不错的设计模式，我觉得可以集成到model中，避免model中有过多的胶水代码。


model的按需加载。
按照next.js的规则。model应跟随路由加载。
