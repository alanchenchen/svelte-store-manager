import { createStore } from "@alanchenchen/svelte-store";

const store = createStore("module-Age", {
    age: 26
});

store.registerGetter({
    AGE_GETTER(state) {
        return state.age * 2;
    }
});

store.registerMutation({
    increaseAge({ state, setState, getter }, payload) {
        const targetVal = payload || state.age + 1;
        setState({ age: targetVal });
    },
    decreaseAge({ state, setState }) {
        setState({ age: state.age - 1 });
    }
});

store.registerAction({
    async randomAge({ commit }, payload) {
        await delay(payload);
        commit("increaseAge", Math.floor(Math.random() * 5 + 15));
    }
});

export default store;