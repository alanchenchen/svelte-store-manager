import { createStore } from "@alanchenchen/svelte-store";

const store = createStore("module-Num", {
    num: 0,
    author: "alan"
});

const delay = (timeout = 1000) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, timeout);
    });
}

store.registerGetter({
    NUM_GETTER(state) {
        return state.num * 2;
    }
});

store.registerMutation({
    increaseNum({ state, setState, getter }, payload) {
        const targetVal = payload || state.num + 1;
        setState({ num: targetVal });
    },
    decreaseNum({ state, setState }) {
        setState({ num: state.num - 1 });
    }
});

store.registerAction({
    async randomNum({ commit }, payload) {
        await delay(payload);
        commit("increaseNum", Math.floor(Math.random() * 5 + 15));
    }
});

export default store;