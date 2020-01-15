# 集中化管理store模块
> 因为我并喜欢vuex那种默认就是模块集中，所以我把store本身设计成一个个模块。如果只是为了集中管理，其实也很简单，vuex里的getter，commit和dispatch里都会出现局部state和全局state。这在我们这个store里并不需要这么复杂，你只需要引入对应的store模块，即可操作其state。

## usage
1. 正如example目录里一样，首先你需要新建一个index.js作为模块集中管理的唯一入口，入口文件只导入store模块，然后根据你需要的模块名导出即可。
2. 如果你使用了多个store，并且每个store需要使用同样的插件，那么你必然会用到`useGlobalPlugins`方法，但是这个方法有一个注意点，必须在每个store模块初始化前使用。
3. 为了保证`useGlobalPlugins`方法优先运行，我们新建一个js文件用来管理所有的插件。
4. 接着就可以新建一个module目录来管理各个store模块。
