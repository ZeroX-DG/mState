const m = window.m;
const { makeState, inject, callAction } = window.mState;

const Counter = makeState("Counter", {
  counter: 0
}).withActions({
  INCREASE(state, amount) {
    state.counter += amount;
  }
});

const increase = vnode => {
  callAction("Counter", "INCREASE", 1);
  //vnode.attrs.Counter._call("INCREASE", 1);
};

const App = inject(
  {
    view(vnode) {
      const { counter } = vnode.attrs.Counter;
      return m("#counter", [
        m("h1", `Counter: ${counter}`),
        m("button", { onclick: () => increase(vnode) }, "increase 1")
      ]);
    }
  },
  ["Counter"]
);

const root = document.getElementById("app");
m.mount(root, App);
