"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const store_1 = require("./store");
const action_1 = require("./store/action");
const reducer_1 = require("./store/reducer");
const store = new store_1.Store({
    users: [
        {
            id: 1,
            name: 'John'
        },
        {
            id: 2,
            name: 'Alice'
        }
    ],
    settings: {
        language: ['fr', 'en']
    }
});
const addLanguage = action_1.createAction('Add language');
const removeLanguage = action_1.createAction('Remove language');
const reducers = reducer_1.createReducers([
    [
        addLanguage,
        () => {
            return { id: 1 };
        }
    ],
    [
        removeLanguage,
        () => {
            return { id: 1 };
        }
    ]
]);
store.registerReducers(reducers);
store.dispatch(addLanguage);
console.log('state?', store.getState());
//# sourceMappingURL=index.js.map