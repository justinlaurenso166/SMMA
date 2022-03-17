import { createStore } from "vuex"
import createPersistedState from "vuex-persistedstate"

//create a new store instance
const store = createStore({
    plugins: [createPersistedState({
        path: ["user_data"],
    })],

    state: () => ({
        user_data: {},
    }),
    mutations: {
        MUTATE_USER_DATA(state, payload) {
            if (payload !== null) {
                state.user_data = payload[0];
            } else {
                state.user_data = {};
            }
        },
    },
    actions: {

    },
    getters: {

    }
})

export default store;