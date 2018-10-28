# mState

_A dead simple state management library for Mithril.js_

## Why mState?

mState is a dead simple solution for state management for Mithril.js. While the core is really simple `< 100 lines`, mState is very flexible and it's actually only `~8kb minified`.

## Concept

The following diagram illustrate how mState works.

![](https://raw.githubusercontent.com/ZeroX-DG/mState/master/assets/mState.png)

As you can see the global state can be modified using action called from the component or directly modifed by the component (for simplicity). That means you can completely drop the actions.

## Example

The first step to do is to initialize a state and some actions and register them with mState

**CounterStore.js**

```js
import { makeState, registerState } from "mState";

const state = makeState({
  counter: 0
});

const actions = {
  INCREASE(state, amount) {
    state.counter += amount;
  }
};

export default () => {
  registerState("CounterStore", state).withActions(actions);
};
```

**App.js**

```js
import registerCounterStore from "./CounterStore";
registerCounterStore();
// mounting to #root/#app element...
```

After that you can inject it to any component with `inject()`. After injecting, the state will be available in `vnode.attrs`.

**MyComponent.js**

```js
import { inject, callAction } from "mState";

const increaseCounter = vnode => {
  // you can modify state in 3 ways
  // action call with _call function in injected state
  vnode.attrs.CounterStore.counter._call("INCREASE", 1);
  // action call with callAction function from mState
  callAction("CounterStore", "INCREASE", 1);
  // directly modify the state
  vnode.attrs.CounterStore.counter += 1;
};

// closure component
const myComponent = () => {
  return {
    view(vnode) {
      const { counter } = vnode.attrs.CounterStore;
      return m(
        "h1",
        { onclick: () => increaseCounter(vnode) },
        `Counter: ${counter}`
      );
    }
  };
};
export default inject(myComponent, ["CounterStore"]);
```

## Author

- [Hung Nguyen](https://github.com/ZeroX-DG) ([twitter](https://twitter.com/ZeroX_Hung))

## License

[MIT](LICENSE.md)
