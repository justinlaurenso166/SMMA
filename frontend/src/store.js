import { createStore } from "vuex"
import createPersistedState from "vuex-persistedstate"

//create a new store instance
const store = createStore({
    plugins: [createPersistedState({
        path: ["user_data", "mesin_anomali"],
    })],

    state: () => ({
        user_data: null,
        mesin_anomali: [],
    }),
    mutations: {
        MUTATE_USER_DATA(state, payload) {
            if (payload !== null) {
                state.user_data = payload[0];
            } else {
                state.user_data = null;
            }
        },
        MUTATE_MESIN_ANOMALI(state, payload) {
            state.mesin_anomali = payload;
        }
    },
    actions: {
        resetAllStore({ commit }) {
            commit("MUTATE_USER_DATA", null);
            commit("MUTATE_MESIN_ANOMALI", []);
        }
    },
    getters: {

    }
})

export default store;