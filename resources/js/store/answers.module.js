import ApiService from "../services/api.service";
import router from "../router";

const state = {
    answers:[],
    answer: [],
    errorMessage:[]
};

const getters = {
    fetchAnswers:(state) => {
        return state.answers
    },

};

const actions = {
    getAnswers({commit}, question) {
        ApiService.get('/api/questions/question/'+question+'/answers').then(response => {
            commit('setAnswers', response.data.data.answers);
        })
    },

    async storeAnswer({state, commit}, {body, question_id, user_id}) {
        try {
            const answer =  await ApiService.post('/api/answers/answer/store', {
                body:body, question_id:question_id, user_id:user_id
            });
            return answer.data;

        } catch (e) {
            commit('setError', {errorMessage: e.response.data.errors})
        }
    },


    async updateAnswer({state, commit}, {id, body, question_id, user_id}) {
        try {
            const answer =  await ApiService.post('/api/answers/answer/'+id+'/update', {
                body:body, question_id:question_id, user_id:user_id
            });
            return answer.data;

        } catch (e) {
            commit('setError', {errorMessage: e.response.data.errors})
        }
    },


    removeAnswer({commit}, answer) {
        ApiService.post('/api/answers/answer/'+answer+'/delete');
    },
};

const mutations = {
    setAnswers(state, answers) {
        state.answers = answers
    },

    setAnswer(state, answer) {
        state.answer = answer;
    },

    setError(state, {errorMessage}) {
        state.errorMessage = errorMessage;
    },

    clearError(state){
        state.errorMessage = ''
    }
};

export const answer = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};
