import { UserService, AuthenticationError } from '../services/user.service';
import { TokenService } from '../services/storage.service';
import router from '../router';

const state =  {
    user: null,
    authenticating: false,
    accessToken: TokenService.getToken(),
    ErrorCode: 0,
    ErrorMessage: '',
    registerErrorCode: 0,
    registerError: '',
    refreshTokenPromise: null,

};

const getters = {
    loggedIn: (state) => {
        return !!state.accessToken
    },

    getErrorCode: (state) => {
        return state.ErrorCode
    },

    getErrorMessage: (state) => {
        return state.ErrorMessage
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
                commit('registerError', {errorCode: e.errorCode, errorMessage: e.message})
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
            const p = UserService.refreshToken();
            commit('refreshTokenPromise', p);

            // Wait for the UserService.refreshToken() to resolve. On success set the token and clear promise
            // Clear the promise on error as well.
            p.then(
                response => {
                    commit('refreshTokenPromise', null);
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
        state.ErrorCode = errorCode;
        state.ErrorMessage = errorMessage
    },

    registerError(state, {errorCode, errorMessage}) {
        state.authenticating = false;
        state.ErrorCode = errorCode;
        state.ErrorMessage = errorMessage;
    },

    getUserError(state, {errorMessage}) {
        state.ErrorMessage = errorMessage;
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
        state.ErrorCode = '';
        state.ErrorMessage = '';
    },
};

export const auth = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};
