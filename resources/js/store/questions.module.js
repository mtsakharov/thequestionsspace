import ApiService from "../services/api.service";
import router from "../router";

const state = {
    questions: [],
    question:[],
    answers:[],
    ErrorMessage:[],
    links: []
};

const getters = {
    fetchQuestions: (state) => {
        return state.questions
    },

    fetchQuestion: (state) => {
        return state.question
    },

    fetchAnswers: (state) => {
        return state.answers
    },
};

const actions = {
    getQuestions({commit}) {
        ApiService.get('/api/questions').then(response => {
            commit('setQuestions', response);

        })
    },

    getQuestion({commit}, question) {
        ApiService.get('/api/questions/question/'+question).then(response => {
            commit('setQuestion', response.data.data);
            commit('setAnswers', response.data.data.answers)
        });
    },

    async storeQuestion({ commit }, {body, image, category_id, user_id}) {
        try {
            const question =  await ApiService.post('/api/questions/question/store', {
                body:body, image:image, user_id:user_id, category_id:category_id
            });

            commit('pushQuestion', question.data);

            // Redirect the user to the page he first tried to visit or to the home view
            await router.push({ path: `/` });

            return question.data

        } catch (e) {
            commit('setError', {errorMessage: e.response.data.errors})
        }
    },

    async updateQuestion({ commit }, {id, body, image, category_id, user_id}) {
        try {
            const question =  await ApiService.post('/api/questions/question/'+id+'/update', {
                body:body, image:image, user_id:user_id, category_id:category_id
            });

            commit('pushQuestion', question.data);

            // Redirect the user to the page he first tried to visit or to the home view
            await router.push({ path: `/` });

            return question.data

        } catch (e) {
            commit('setError', {errorMessage: e.response.data.errors})
        }
    },
};

const mutations = {
    setQuestions(state, response) {
        state.questions = response.data.data;
        state.links = response.data.links;
    },

    setQuestion(state, question) {
        state.question = question
    },

    setAnswers(state, answers) {
        state.answers = answers
    },

    setError(state, {errorMessage}) {
        state.ErrorMessage = errorMessage;
    },

    clearError(state){
        state.errorMessage = ''
    }
};

export const question = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};
