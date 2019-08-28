import { TokenService } from '../services/storage.service';
import store from '../store/index';

const ApiService = {

    // Stores the 401 interceptor position so that it can be later ejected when needed
    _401interceptor: null,

    init(baseURL) {
        window.axios.defaults.baseURL = baseURL;
    },

    setHeader() {
        window.axios.defaults.headers.common["Authorization"] = `Bearer ${TokenService.getToken()}`
    },

    removeHeader() {
        window.axios.defaults.headers.common = {}
    },

    get(resource) {
        return window.axios.get(resource)
    },

    post(resource, data) {
        return window.axios.post(resource, data)
    },

    put(resource, data) {
        return window.axios.put(resource, data)
    },

    delete(resource) {
        return window.axios.delete(resource)
    },

    /**
     * Perform a custom Axios request.
     *
     * data is an object containing the following properties:
     *  - method
     *  - url
     *  - data ... request payload
     *  - auth (optional)
     *    - email
     *    - password
     **/
    customRequest(data) {
        return window.axios(data)
    },

    mount401Interceptor() {
        this._401interceptor = axios.interceptors.response.use(
            (response) => {
                return response
            },
            async (error) => {
                if (error.request.status === 401) {
                    if (error.config.url.includes('/o/token/')) {
                        // Refresh token has failed. Logout the user
                        store.dispatch('auth/logout');
                        throw error
                    } else {
                        // Refresh the access token
                        try{
                            await store.dispatch('auth/refreshToken');
                            // Retry the original request
                            return this.customRequest({
                                method: error.config.method,
                                url: error.config.url,
                                data: error.config.data
                            })
                        } catch (e) {
                            // Refresh has failed - reject the original request
                            throw error
                        }
                    }
                }

                // If error was not 401 just reject as is
                throw error
            }
        )
    },

    unmount401Interceptor() {
        // Eject the interceptor
        axios.interceptors.response.eject(this._401interceptor)
    }
};

export default ApiService;
