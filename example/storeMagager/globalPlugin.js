import { useGlobalPlugins } from "@alanchenchen/svelte-store";
import logger from "@alanchenchen/svelte-store/dist/plugins/logger";
import persisted from "@alanchenchen/svelte-store-persisted";

/**
 * 必须要写成一个模块，并导出，在index.js里导入，这是为了保证useGlobalPlugins在每个store模块初始化前使用！！
 */
useGlobalPlugins([
    logger(),
    persisted({
        // paths: ["num", "author"]
    })
]);