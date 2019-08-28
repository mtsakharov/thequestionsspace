import Router from 'vue-router';
import { TokenService } from './services/storage.service';

import HomeView from "./views/HomeView";
import LoginView from "./views/auth/LoginView";
import RegisterView from "./views/auth/RegisterView";
import ProfileView from "./views/auth/ProfileView";

Vue.use(Router);

const router =  new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
            meta: {
                public: true,  // Allow access to even if not logged in
            }
        },

        {
            path: '/login',
            name: 'login',
            component: LoginView,
            meta: {
                public: true,  // Allow access to even if not logged in
                onlyWhenLoggedOut: true
            }
        },

        {
            path: '/register',
            name: 'register',
            component: RegisterView,
            meta: {
                public: true,  // Allow access to even if not logged in
                onlyWhenLoggedOut: true
            }
        },

        {
            path: '/profile',
            name: 'profile',
            component: ProfileView,
            meta: {
                public: false,  // Allow access to even if not logged in
                onlyWhenLoggedIn:true
            }
        },
    ]
});

router.beforeEach((to, from, next) => {
    const isPublic = to.matched.some(record => record.meta.public);
    const onlyWhenLoggedOut = to.matched.some(record => record.meta.onlyWhenLoggedOut);
    const onlyWhenLoggedIn = to.matched.some(record => record.meta.onlyWhenLoggedIn);

    const loggedIn = !!TokenService.getToken();

    if (!isPublic && !loggedIn) {
        return next({
            path:'/login',
            query: {redirect: to.fullPath}  // Store the full path to redirect the user to after login
        });
    }

    // Do not allow user to visit login page or register page if they are logged in
    if (loggedIn && onlyWhenLoggedOut) {
        return next('/')
    }

    // Do not allow user to visit login page or register page if they are logged in
    if (!loggedIn && onlyWhenLoggedIn) {
        return next('/')
    }

    next();
});


export default router;
