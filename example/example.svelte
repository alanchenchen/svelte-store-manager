<script>
    import store from "./storeMagager";

    const state = store.moduleNum._state;
    let num;
    let age;
    let double;
    store.moduleAge.state(v => age = v.age);
    store.moduleNum.state(v => num = v.num);
    store.moduleNum.getter("NUM_GETTER", v => double = v);
    
    const increaseNum = () => store.moduleNum.commit("increaseNum");
    const decreaseNum = () => store.moduleNum.commit("decreaseNum");
    const delayNum = () => store.moduleNum.dispatch("randomNum", 1000);
    const increaseAge = () => store.moduleAge.commit("increaseAge");
    const decreaseAge = () => store.moduleAge.commit("decreaseAge");
    $: {
        console.log(store);
    };
</script>

<style>
    /* your styles go here */
</style>

<!-- markup (zero or more items) goes here -->
<h3>this is A page</h3>
<button on:click={increaseNum}>click num + 1</button>
<button on:click={decreaseNum}>click num - 1</button>
<button on:click={delayNum}>click delay</button>
<button on:click={increaseAge}>click age + 1</button>
<button on:click={decreaseAge}>click age - 1</button>
<h4>now store state num is {num}</h4>
<h4>now store age num is {age}</h4>
<p>{double}</p>
<h4>author is {$state.author}</h4>