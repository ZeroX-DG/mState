# mState api

## Overview

mState is a state management library for mithril.js. It's small and extremely simple.

### makeState(stateName, state)

Make a new state

- stateName <[String]> Name of the state
- state <[Object]> Object containing state content

**Return**

- <[Object]> Actions to apply with the created state
  - withActions(actions)
    - actions <[Object]> An object containing a list of actions

### callAction(stateName, action, data)

Call an action registered with a state

- stateName <[String]> Name of the state that the action is registered with
- action <[String]> Name of the action
- data <[any]> Data to pass to the action

### inject(component, stateNames)

Inject states to a component

- component <[Mithril component]> Mithril component to inject
- stateNames <[Array]<[String]>> Names of created states

**Return**

- component <[Mithril component]> A component to render

[string]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String
[object]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object
[array]: https://developer.mozilla.org/en-US/docs/Glossary/array
[mithril component]: https://mithril.js.org/#components
