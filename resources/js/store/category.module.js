import ApiService from "../services/api.service";
import router from "../router";

const state = {
    categories:[],
    category:[],
    errorMessage:[]
};

const getters = {
    fetchCategories:(state) => {
       return state.categories
    },

    fetchCategory:(state) => {
        return state.category
    }
};

const actions = {
    getCategories({commit}) {
        ApiService.get('/api/categories').then(response => {
            commit('setCategories', response.data.data);
        })
    },

    getCategory({commit}, category) {
        ApiService.get('/api/categories/category/'+category).then(response => {
            commit('setCategory', response.data.data)
        });
    },

    async storeCategory({commit}, {name, image}) {
        try {
            const category =  await ApiService.post('/api/categories/category/store', {
                name:name, image:image,
            });

            commit('pushCategory', category.data);

            // Redirect the user to the page he first tried to visit or to the home view
            await router.push({ path: `/` });

            return category.data

        } catch (e) {
            commit('setError', {errorMessage: e.response.data.errors})
        }
    },
};

const mutations = {
    setCategories(state, categories) {
        state.categories = categories
    },

    setCategory(state, category) {
        state.category = category
    },

    pushCategory(state, category) {
        state.category = category
    },

    setError(state, {errorMessage}) {
        state.errorMessage = errorMessage;
    },

    clearError(state){
        state.errorMessage = ''
    }
};

export const category = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};
