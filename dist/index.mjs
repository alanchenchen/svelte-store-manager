function t(){}const e=[];const s=t=>JSON.parse(JSON.stringify(t));class i extends class{constructor(){this._eventList={}}$subscribe(t,e){Array.isArray(this._eventList[t])||(this._eventList[t]=[]),this._eventList[t].push(e)}$emit(t,...e){this._eventList[t]&&this._eventList[t].forEach(t=>{t(...e)})}$events(){return Object.keys(this._eventList)}$remove(t,e){if(e){const s=this._eventList[t].findIndex(t=>t.toString()===e.toString());s>=0&&this._eventList[t].splice(s,1)}else t&&!e&&delete this._eventList[t]}}{constructor(t,e){super(),this._init(t,e),this._initGlobalPlugin()}_init(s,i){if(i&&(this.name=i),"[object Object]"!==Object.prototype.toString.call(s))throw new Error("state expect object type");this._state=function(s,i=t){let o;const r=[];function n(t){if(n=t,((i=s)!=i?n==n:i!==n||i&&"object"==typeof i||"function"==typeof i)&&(s=t,o)){const t=!e.length;for(let t=0;t<r.length;t+=1){const i=r[t];i[1](),e.push(i,s)}if(t){for(let t=0;t<e.length;t+=2)e[t][0](e[t+1]);e.length=0}}var i,n}return{set:n,update:function(t){n(t(s))},subscribe:function(e,c=t){const h=[e,c];return r.push(h),1===r.length&&(o=i(n)||t),e(s),()=>{const t=r.indexOf(h);-1!==t&&r.splice(t,1),0===r.length&&(o(),o=null)}}}}(s),this._cache=void 0,this.state(t=>this._cache=t)}_initGlobalPlugin(){if(this._globalPlugins)for(const t of this._globalPlugins)this.use(t)}state(t){try{if(void 0===t)return s(this._cache);this._state.subscribe(e=>{t(s(e))})}catch(t){console.log("[get state error]:",t)}}registerGetter(t){if("[object Object]"!==Object.prototype.toString.call(t))throw new Error("getters expect object type");this._getters=t}registerMutation(t){if("[object Object]"!==Object.prototype.toString.call(t))throw new Error("mutations expect object type");this._mutations=t}registerAction(t){if("[object Object]"!==Object.prototype.toString.call(t))throw new Error("actions expect object type");this._actions=t}use(t){if("function"!=typeof t)throw new Error("plugin must be a function");t(this)}getter(t,e){try{if(void 0===e)return this._getters[t](s(this._cache));this.state(i=>{const o=this._getters[t](s(i));if(void 0===o)throw new Error("getter must return a valid value but not undefined");e(o)})}catch(t){console.log("[getter error]:",t)}}commit(t,...e){try{const i=t=>{this._state.update(e=>{for(const s of Object.keys(t)){if(!this._cache.hasOwnProperty(s)){console.warn(`property '${s}' is not existed on store state`);break}e[s]=t[s]}return e})},o={state:s(this._cache),setState:i,getter:t=>this.getter.call(this,t)};this._mutations[t](o,...e),this.$emit("mutation",{type:t,payload:e})}catch(t){console.log("[commit error]:",t)}}dispatch(t,...e){try{const i={state:s(this._cache),getter:t=>this.getter.call(this,t),commit:(t,...e)=>this.commit.call(this,t,...e),dispatch:(t,...e)=>this.dispatch.call(this,t,...e)};this._actions[t](i,...e),this.$emit("action",{type:t,payload:e})}catch(t){console.log("[dispatch error]:",t)}}}
/**!
 * @name svelte/storeManager
 * @author Alan chen
 * @since 2020/1/14
 * @license Anti996
 */const o=(t,e)=>new i(t,e),r=t=>{i.prototype._globalPlugins=t};export{o as createStore,r as useGlobalPlugins};