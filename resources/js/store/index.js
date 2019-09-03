import {auth} from './auth.module';
import {question} from './questions.module';
import {category} from './category.module';
import {answer} from './answers.module';


import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        auth,
        question,
        category,
        answer
    }
});

export default store;
