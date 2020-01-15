### 插件开发主要是编写函数
> 插件会接收store作为参数来调用store的一系列方法。

### demo
```ts
// 大部分时候，只会用到name属性和$subscribe方法，有时也会用到_state属性，直接update初始化值，例如@alanchenchen/svelte-store-persisted插件

export default () => {
    return (store: Store) => {
        /**
         * 无论是监听mutation还是action事件，回调函数都只有一个，对象的type表示mutation或action的类型，payload则是传入的参数列表.
         */
        store.$subscribe("mutation", ({ type, payload }) => {
            console.log("当前store是：", store.name);
            console.log("当前mutation类型是：", type);
            console.log("当前mutation参数列表是：", payload);
            console.log("mutation之后的状态是：", store.state());
        });
    }
}
```