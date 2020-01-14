import { Writable } from "svelte/store";
declare class EventWather {
    private _eventList;
    /**
     * subscribe event handler.
     *
     * @param key
     * @param handler
     */
    $subscribe(key: string, handler: Function): void;
    /**
     * emit target event.
     *
     * @param key
     * @param payload
     */
    $emit(key: string, ...payload: any[]): void;
    /**
     * get all event names.
     */
    $events(): string[];
    /**
     * remove target event handler.
     *
     * @param key
     * @param handler
     */
    $remove(key: string, handler: Function): void;
}
type bindStateCallback = (v: object) => void;
type bindGetterCallback = (v: object) => object;
type getter = (key: string, bindValueCallback?: bindStateCallback) => any;
type getterRegiste = {
    [T: string]: bindGetterCallback;
};
type setState = (val: object) => void;
type commit = (key: string, ...payload: any[]) => void;
type dispatch = (key: string, ...payload: any[]) => void;
interface context {
    state: object;
    setState?: setState;
    getter: getter;
    commit?: commit;
    dispatch?: dispatch;
}
type registeStatement = {
    [T: string]: (ctx: context, ...payload: any[]) => void;
};
type storePlugin = (store: Store) => void;
declare class Store extends EventWather {
    /**
     * current store manager name.
     */
    name: string;
    _state: Writable<any>;
    private _cache;
    private _getters;
    private _mutations;
    private _actions;
    constructor(initial: any, name?: string);
    private _init;
    /**
     * use prototype plugins while init instance.
     */
    private _initGlobalPlugin;
    /**
     * get current state or bind svelte component varible to current state.
     *
     * @param bindValueCallback if undefined, will return state value, usually use in js file. Else bind varible with callback function, usually use in svelte component, since you have to add reactivity to svelte varible.
     */
    state(bindValueCallback?: bindStateCallback): any;
    registerGetter(getters: getterRegiste): void;
    registerMutation(mutations: registeStatement): void;
    registerAction(actions: registeStatement): void;
    /**
     * use store plugin.
     *
     * @param plugin
     */
    use(plugin: storePlugin): void;
    /**
     * get getter value or bind svelte component varible to getter value.
     *
     * @param key
     * @param bindValueCallback  if undefined, will return getter value, usually use in js file. Else bind varible with callback function, usually use in svelte component, since you have to add reactivity to svelte varible.
     */
    getter(key: string, bindValueCallback?: bindStateCallback): any;
    /**
     * the only way to change store state, usually change syncly.
     *
     * @param key
     * @param payload
     */
    commit(key: string, ...payload: any[]): void;
    /**
     * change store state asyncly.
     *
     * @param key
     * @param payload
     */
    dispatch(key: string, ...payload: any[]): void;
}
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
declare const createStore: (initial: any, name?: string) => Store;
/**
 * use global plugin, will effect all store instance.
 *
 * @param pluginList
 */
declare const useGlobalPlugins: (pluginList: storePlugin[]) => void;
export { createStore, useGlobalPlugins };
