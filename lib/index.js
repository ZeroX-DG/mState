import m from "mithril";

const globalState = {};
const listeners = {};
const globalActions = {};

/**
 * Make a state object
 * @param {String} stateName Name of the state
 * @param {Object} state Object containing states
 */
export const makeState = (stateName, state) => {
  const handler = {
    get(target, property) {
      const isPropertyObject =
        target[property] && typeof target[property] === "object";
      return isPropertyObject
        ? new Proxy(target[property], handler)
        : target[property];
    },
    set(target, property, value) {
      if (target[property] !== value) {
        target[property] = value;
        if (listeners[stateName]) {
          listeners[stateName].forEach(fn => fn());
        }
      }
      return true;
    }
  };
  const resultState = new Proxy(state, handler);
  return _registerState(stateName, resultState);
};

/**
 * Register a state in the global state
 * @param {String} stateName Name of state
 * @param {Object} content Result object from makeState function
 */
const _registerState = (stateName, content) => {
  globalState[stateName] = content;
  return {
    withActions(actions) {
      globalActions[stateName] = actions;
    }
  };
};

/**
 * Call an action registered with a state
 * @param {String} stateName Name of the state
 * @param {String} action Name of the action that registered with the state
 * @param {any} data Data to pass to action
 */
export const callAction = (stateName, action, data) => {
  globalActions[stateName][action](globalState[stateName], data);
};

/**
 * Subscribe to state change
 * @param {String} stateName Name of the state
 * @param {Function} callback Callback when the state changed
 */
const _subscribe = (stateName, callback) => {
  (listeners[stateName] = listeners[stateName] || []).push(callback);
};

/**
 * Inject a list of states to component
 * @param {Mithril component} component Mithril component to inject state
 * @param {String[]} stateNames Name of states to inject
 */
export const inject = (component, stateNames) => {
  let state = null;
  return {
    oninit() {
      state = stateNames.reduce((init, stateName) => {
        init[stateName] = globalState[stateName];
        if (init[stateName]) {
          init[stateName]._call = (action, data) =>
            globalActions[stateName][action](globalState[stateName], data);
        }
        return init;
      }, {});
      stateNames.map(stateName => _subscribe(stateName, m.redraw));
    },
    view(vnode) {
      state = Object.assign({}, vnode.attrs, state);
      return m(component, state);
    }
  };
};
