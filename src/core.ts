import { writable, Writable } from "svelte/store";
import EventWather from "./event";
import { deepClone } from "./helper";
import {
    bindStateCallback,
    getterRegiste,
    registeStatement,
    context
} from "./type";

export declare type storePlugin = (store: Store) => void;
export declare type storeType = Store;

export default class Store extends EventWather {
    /**
     * current store manager name.
     */
    public name: string;
    public _state: Writable<any>;
    private _cache: object;
    private _getters: getterRegiste;
    private _mutations: registeStatement;
    private _actions: registeStatement;

    constructor(initial: any, name?: string) {
        super();
        this._init(initial, name);
        this._initGlobalPlugin();
    }

    private _init(initial: any, name?: string) {
        if (name) {
            this.name = name;
        }
        if (Object.prototype.toString.call(initial) === "[object Object]") {
            this._state = writable(initial);
            this._cache = undefined;
            this.state((val: object) => this._cache = val);
        } else {
            throw new Error("state expect object type");
        }
    }

    /**
     * use prototype plugins while init instance.
     */
    private _initGlobalPlugin() {
        if ((this as any)._globalPlugins) {
            for (const plugin of (this as any)._globalPlugins) {
                this.use(plugin);
            }
        }
    }

    /**
     * get current state or bind svelte component varible to current state.
     * 
     * @param bindValueCallback if undefined, will return state value, usually use in js file. Else bind varible with callback function, usually use in svelte component, since you have to add reactivity to svelte varible.
     */
    state(bindValueCallback?: bindStateCallback): any {
        try {
            /**
             * derectly call will return state value, usually use in js file.
             */
            if (bindValueCallback === undefined) {
                return deepClone(this._cache);
            }
            /**
             * bind varible with callback function, usually use in svelte component, since you have to add reactivity to svelte varible.
             */
            else {
                this._state.subscribe((v: object) => {
                    bindValueCallback(deepClone(v));
                });
            }
        } catch (error) {
            console.log("[get state error]:", error);
        }
    }

    registerGetter(getters: getterRegiste) {
        if (Object.prototype.toString.call(getters) !== "[object Object]") {
            throw new Error("getters expect object type");
        }
        this._getters = getters;
    }

    registerMutation(mutations: registeStatement) {
        if (Object.prototype.toString.call(mutations) !== "[object Object]") {
            throw new Error("mutations expect object type");
        }
        this._mutations = mutations;
    }

    registerAction(actions: registeStatement) {
        if (Object.prototype.toString.call(actions) !== "[object Object]") {
            throw new Error("actions expect object type");
        }
        this._actions = actions;
    }

    /**
     * use store plugin.
     * 
     * @param plugin
     */
    use(plugin: storePlugin) {
        if (typeof plugin === "function") {
            plugin(this);
        } else {
            throw new Error("plugin must be a function");
        }
    }

    /**
     * get getter value or bind svelte component varible to getter value.
     * 
     * @param key required, registed key.
     * @param bindValueCallback  if undefined, will return getter value, usually use in js file. Else bind varible with callback function, usually use in svelte component, since you have to add reactivity to svelte varible.
     */
    getter(key: string, bindValueCallback?: bindStateCallback): any {
        try {
            /**
             * derectly call will return getter value, usually use in js file.
             */
            if (bindValueCallback === undefined) {
                return this._getters[key](deepClone(this._cache));
            }
            /**
             * bind varible with callback function, usually use in svelte component, since you have to add reactivity to svelte varible.
             */
            else {
                this.state(v => {
                    const getterVal = this._getters[key](deepClone(v));
                    if (getterVal === undefined) {
                        throw new Error("getter must return a valid value but not undefined");
                    }
                    bindValueCallback(getterVal);
                });
            }
        } catch (error) {
            console.log("[getter error]:", error);
        }
    }

    /**
     * the only way to change store state, usually change syncly.
     * 
     * @param key required, registed key.
     * @param payload
     */
    commit(key: string, ...payload: any[]) {
        try {
            const setState = (values: object) => {
                this._state.update((v: any) => {
                    for (const key of Object.keys(values)) {
                        if (this._cache.hasOwnProperty(key)) {
                            v[key] = values[key];
                        } else {
                            console.warn(`property '${key}' is not existed on store state`);
                            continue;
                        }
                    }
                    return v;
                });
            }

            const ctx: context = {
                state: deepClone(this._cache),
                setState,
                /**
                 * must call this point bind instacne.
                 */
                getter: (key) => this.getter.call(this, key)
            }
            this._mutations[key](ctx, ...payload);
            this.$emit("mutation", { type: key, payload });
        } catch (error) {
            console.log("[commit error]:", error);
        }
    }

    /**
     * change store state asyncly.
     * 
     * @param key required, registed key.
     * @param payload
     */
    dispatch(key: string, ...payload: any[]) {
        try {
            const ctx: context = {
                state: deepClone(this._cache),
                /**
                 * must call this point bind instacne.
                 */
                getter: (key) => this.getter.call(this, key),
                commit: (newKey, ...newPayload) => this.commit.call(this, newKey, ...newPayload),
                dispatch: (newKey, ...newPayload) => this.dispatch.call(this, newKey, ...newPayload)
            };
            this._actions[key](ctx, ...payload);
            this.$emit("action", { type: key, payload });
        } catch (error) {
            console.log("[dispatch error]:", error);
        }
    }
}