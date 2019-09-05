import { UserService, AuthenticationError } from '../services/user.service';
import { TokenService } from '../services/storage.service';
import router from '../router';
import ApiService from "../services/api.service";


const state =  {
    user: [],
    authenticating: false,
    accessToken: TokenService.getToken(),
    authenticationErrorCode: 0,
    authenticationError: '',
    ErrorMessage:'',
    registerErrorCode: 0,
    registerError: '',
    refreshTokenPromise: null,
    getUserError: '',

};

const getters = {
    loggedIn: (state) => {
        return state.accessToken ? true : false
    },

    authenticationErrorCode: (state) => {
        return state.authenticationErrorCode
    },

    authenticationError: (state) => {
        return state.authenticationError
    },

    registerError: (state) => {
        return state.registerError
    },

    authenticating: (state) => {
        return state.authenticating
    },

    fetchUser: (state) => {
        return state.user;
    }
};

const actions = {
    async login({ commit }, {email, password}) {
        commit('loginRequest');

        try {
            const token = await UserService.login(email, password);

            commit('loginSuccess', token);

            // Redirect the user to the page he first tried to visit or to the home view
            await router.push(router.history.current.query.redirect || '/');

            return true
        } catch (e) {
            if (e instanceof AuthenticationError) {
                commit('loginError', {errorCode: e.errorCode, errorMessage: e.message})
            }

            return false
        }
    },

    async register({ commit }, {name, email, password}) {
        commit('loginRequest');

        try {
            const token = await UserService.register(name, email, password);

            commit('loginSuccess', token);

            // Redirect the user to the page he first tried to visit or to the home view
            await router.push(router.history.current.query.redirect || '/');

            return true
        } catch (e) {
            if (e instanceof AuthenticationError) {
                commit('RegisterError', {errorCode: e.errorCode, errorMessage: e.message})
            }

            return false
        }
    },

    async updateUser({ commit }, {id, name, email, avatar}) {
        try {
            await UserService.updateUser(id, name, email, avatar);

            // Redirect the user to the page he first tried to visit or to the home view
            await router.push('/profile');

            return true
        } catch (e) {
            if (e instanceof AuthenticationError) {
                commit('RegisterError', {errorCode: e.errorCode, errorMessage: e.message})
            }

            return false
        }
    },


    logout: function ({commit}) {
        UserService.logout();
        commit('logoutSuccess');
        router.push('/login');
    },

    refreshToken({ commit, state }) {
        // If this is the first time the refreshToken has been called, make a request
        // otherwise return the same promise to the caller
        if(!state.refreshTokenPromise) {
            const p = UserService.refreshToken()
            commit('refreshTokenPromise', p)

            // Wait for the UserService.refreshToken() to resolve. On success set the token and clear promise
            // Clear the promise on error as well.
            p.then(
                response => {
                    commit('refreshTokenPromise', null)
                    commit('loginSuccess', response)
                },
                error => {
                    commit('refreshTokenPromise', null)
                }
            )
        }

        return state.refreshTokenPromise
    },

    async getUser({ commit }) {

        try {
            const user = await UserService.getUser();

            commit('setUser', user);
        } catch (e) {
            if (e instanceof AuthenticationError) {
                commit('getUserError', {errorMessage: e.message})
            }
        }
    }
};

const mutations = {
    loginRequest(state) {
        state.authenticating = true;
        state.authenticationError = '';
        state.authenticationErrorCode = 0
    },

    loginSuccess(state, accessToken) {
        state.accessToken = accessToken.token;
        state.authenticating = false;
    },

    loginError(state, {errorCode, errorMessage}) {
        state.authenticating = false;
        state.authenticationErrorCode = errorCode;
        state.authenticationError = errorMessage
    },

    RegisterError(state, {errorCode, errorMessage}) {
        state.authenticating = false;
        state.registerErrorCode = errorCode;
        state.registerError = errorMessage
    },

    getUserError(state, {errorMessage}) {
        state.getUserError = errorMessage;
    },

    logoutSuccess(state) {
        state.user = '';
        state.accessToken = '';
    },

    refreshTokenPromise(state, promise) {
        state.refreshTokenPromise = promise;
    },

    setUser(state, user) {
        state.user = user;
    },

    clearError(state){
        state.authenticationError = ''
    },
};

export const auth = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};
