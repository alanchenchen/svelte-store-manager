# api文档
npm包导出两个函数，分别是`createStore`和`useGlobalPlugins`:
* `createStore` - 创建store，所有的操作都基于此，第一个参数必选，是初始化数据，第二个参数可选，是store的名称。
* `useGlobalPlugins` - 全局使用插件，全局使用的意思是使用插件后，所有通过createStore生成的store实例均会应用这些插件。参数必选，是一个数组。如果需要全局使用，必须保证该方法在`createStore`创建Store实例前。
> 提示：`useGlobalPlugins`会将插件作用于所有store实例，不提供过滤功能，如果特定的插件只希望给特定的store生效，需要在插件内部实现，插件需要暴露一个方法来过滤store.name。

### 核心api(method)
* `state` - 获取当前store的state状态，参数可选，是个回调函数，如果在js文件里获取，省略参数即可，如果在组件内使用，或者需要在js文件里实现watch操作，则需要在参数里绑定数据。
* `registerGetter` - 注册getter，参数是一个对象，对象的key是后续getter方法的key，对象的value是回调函数，必须返回一个非undefined的值，回调函数参数如下：
    * state - 当前state的深度拷贝，只读
* `registerMutation` - 注册mutaion，参数是一个对象，对象的key是后续commit方法的key，对象的value是回调函数，回调函数参数有两个，第一个是对象，第二个是payload多参数，参数一如下：
    * state - 当前state的深度拷贝，只读
    * setState - 改变state的函数，使用方法和react的setState一致
    * getter - 同实例的getter方法，但是省略了第二个参数回调函数
* `registerAction` - 注册action，参数是一个对象，对象的key是后续dispatch方法的key，对象的value是回调函数，回调函数参数有两个，第一个是对象，第二个是payload多参数，参数一如下：
    * state - 当前state的深度拷贝，只读
    * getter - 同实例的getter方法，但是省略了第二个参数回调函数
    * commit - 同实例的commit方法
    * dispatch - 同实例的dispatch方法
* `getter` - 获取state的计算结果，和vuex的getter类似，参数一必选，是注册的key，参数二可选，是个回调函数，如果在js文件里获取，省略参数即可，如果在组件内使用，或者需要在js文件里实现watch操作，则需要在参数里绑定数据。
* `commit` - 提交mutation，同步更改状态，参数一必选，是注册的key，参数二可选，可以是多个参数，支持rest参数，rest参数将会在`registerMutation`的payload里触发。
* `dispatch` - 提交action，异步更改状态，参数一必选，是注册的key，参数二可选，可以是多个参数，支持rest参数，rest参数将会在`registerMutation`的payload里触发。
* `use` - 使用插件，参数必选，插件必须是一个函数，函数的第一个参数是store实例。
* `$subscribe` - 监听事件，主要用于插件开发，目前提供两种事件监听： mutation和action。

### 核心api(property)
* name - 当前store的名称，用于插件开发。
* _state - 当前store的svelte/store，用于直接在svelte组件内展示或插件开发。
* willUseGlobalPlugin - 当前store是否使用了`useGlobalPlugins`来挂载全局插件，用于插件开发，插件内部可以通过该字段来区分单独模块调用和全局调用的逻辑。

### 开发插件api
[doc](./plugin.md)