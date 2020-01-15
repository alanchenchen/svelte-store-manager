# logger
> 实时打印mutation的状态，自带快照功能，与vuex的logger一致

## usage
```js
// 全局使用
import { useGlobalPlugins } from "@alanchenchen/svelte-store";
import logger from "@alanchenchen/svelte-store/dist/plugins/logger";

useGlobalPlugins([
    logger()
]);
```

```js
// 分模块使用
// a.js
import { createStore } from "@alanchenchen/svelte-store";
import logger from "@alanchenchen/svelte-store/dist/plugins/logger";

const a = createStore({name: "A"});
a.use(logger());
// b.js
import { createStore } from "@alanchenchen/svelte-store";
import logger from "@alanchenchen/svelte-store/dist/plugins/logger";

const b = createStore({name: "B"});
b.use(logger());
```

## options
logger的参数是个对象，格式如下：
* filter - 过滤某些不需要显示log的情况，回调函数，参数如下：
    * type - mutation的类型
    * prev - 快照的前一个状态，即commit前的数据
    * next - 快照的后一个状态，即commit之后，当前的数据
* collapsed - 是否默认折叠log，布尔值，默认true