const m = window.m;
const { makeState, inject, callAction } = window.mState;

const Todo = makeState("Todo", {
  todos: []
}).withActions({
  ADD_TODO(state, todo) {
    state.todos.push(todo);
  }
});

const addTodo = vnode => {
  const task = document.getElementById("todo").value;
  vnode.attrs.Todo._call("ADD_TODO", task);
};

const App = inject(
  {
    view(vnode) {
      const { todos } = vnode.attrs.Todo;
      return m("#counter", [
        m("h1", `Todos: ${todos.length}`),
        m("div", [
          m("input#todo", { placeholder: "enter todo" }),
          m("button", { onclick: () => addTodo(vnode) }, "add")
        ]),
        m("ul", todos.map(todo => m("li", todo)))
      ]);
    }
  },
  ["Todo"]
);

const root = document.getElementById("app");
m.mount(root, App);
