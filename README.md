# svelte-store-manager


![](https://img.shields.io/npm/v/@alanchenchen/svelte-store.svg)
![](https://img.shields.io/npm/dt/@alanchenchen/svelte-store.svg)
[![LICENSE](https://img.shields.io/badge/license-Anti%20996-blue.svg)](https://github.com/996icu/996.ICU/blob/master/LICENSE)

A store manager like vuex for svelte 3 with svelte/store
> Author：Alan Chen

> Version: 0.0.6

> Date: 2020/1/15

## features
1. 仿vuex和redux的api。
2. 自带plugin接口，可以开发基于store的plugin，内置logger插件。
3. 基于svelte/store开发，本身自带响应性，实现svelte中变量绑定store。
4. 体积小，压缩后仅3.4k，只自带核心功能，为了开发调试方便，将logger内置，建议当项目上线时可以去掉logger。
5. 虽然和vuex相似，但是不自带module功能，因为每个store均是一个module，如果想实现集中式管理，可以参考[案例](./example/README.md)。

## installation
`npm install --save @alanchenchen/svelte-store` or `yarn add @alanchenchen/svelte-store`

## usage
```js
// moduleAlan.js
import { createStore, useGlobalPlugins } from "@alanchenchen/svelte-store";

// 初始化store，name可选，主要暴露给插件使用。
const store = createStore({
    firstname: "alan",
    lastname: "chen",
    age: 25
}, "alan-module");

// 单独使用插件，也可以通过useGlobalPlugins全局使用插件。
store.use();

// 注册getter，详细方法见api文档和案例。
store.registerGetter();

// 注册mutaion...
store.registerMutation();

// 注册action...
store.registerAction()

```

```html
// App.Svelte
<script>
    import store from "../store/moduleAlan";

    let firstname;
    let double;
    let age;

    // 在svelte组件内，如果需要使用store，必须先声明变量，然后给变量赋值，由于svelte响应性的原理限制，只有3种数据在组件内存在响应性，一是变量，二是$:紧跟的变量（相当于computed），三是$紧跟的svelte/store。
    store.state(v => age = v.age);
    store.state(v => firstname = v.firstname);
    store.getter("NUM_GETTER", v => double = v);

    // 其实store本身是自带响应性的，但是组件内的响应性受svelte限制，必须这么做，或者你可以直接访问store._state私有属性，该属性是一个svelte/store，可以直接通过$符号在组件内使用，只有这两种方式才能响应渲染dom。
    const state = store._state;
    
    const increaseNum = () => store.commit("increaseNum");
    const decreaseNum = () => store.commit("decreaseNum");
    const delayNum = () => store.dispatch("randomNum", 1000);
    $: {
        console.log(store);
    };
</script>

<!-- markup (zero or more items) goes here -->
<button on:click={increaseNum}>click age + 1</button>
<button on:click={decreaseNum}>click age - 1</button>
<button on:click={delayNum}>click delay</button>
<h4>now store getter double is {double}</h4>
<h4>now store state age is {age}</h4>
<h4>$state age is {$state.age}</h4>
```

## example
[案例](./example/README.md)

## api docs
[传送门](./docs/index.md)

## plugins
* [logger](./src/plugins/README.md) - 内置在当前npm包内
* [@alanchenchen/svelte-store-persisted](https://github.com/alanchenchen/svelte-store-persisted) - 将store数据通过localStorage或sessionStorage持久化。

## build
1. `git clone https://github.com/alanchenchen/svelte-store-manager.git`
2. 然后`yarn`安装好依赖
3. 接着使用下面的脚本命令即可，目前入口文件是src/index.ts

<!-- ## api
[传送门](./doc/api.md) -->

## scripts

1. `npm run build`编译ts文件到dist目录.

## license
* Anti 996(996.ICU)
