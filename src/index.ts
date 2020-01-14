import Store, { storePlugin } from "./core";

/**!
 * @name svelte/storeManager
 * @author Alan chen
 * @since 2020/1/14
 * @license Anti996
 */

/**
 * create a store manager.All operations depend on it.
 * 
 * @param initial
 */
export const createStore = (initial: any, name?: string) => new Store(initial, name);

/**
 * use global plugin, will effect all store instance.
 * 
 * @param pluginList
 */
export const useGlobalPlugins = (pluginList: storePlugin[]) => {
    (Store.prototype as any)._globalPlugins = pluginList;
}