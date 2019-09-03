import Router from 'vue-router';
import { TokenService } from './services/storage.service';

import HomeView from "./views/HomeView";
import LoginView from "./views/auth/LoginView";
import RegisterView from "./views/auth/RegisterView";
import ProfileView from "./views/profile/ProfileView";
import QuestionView from "./views/questions/Show";
import CreateQuestionView from "./views/questions/CreateQuestionView";
import EditQuestionView from "./views/questions/EditQuestionView";
import ProfileAnswersView from "./views/profile/ProfileAnswersView";
import ProfileSettingsView from "./views/profile/ProfileSettingsView";
import ListCategoriesView from "./views/categories/ListCategoriesView";
import ShowCategoryView from "./views/categories/ShowCategoryView";

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

        {
            path: '/profile/settings',
            name: 'profileSettings',
            component: ProfileSettingsView,
            meta: {
                public: false,  // Allow access to even if not logged in
                onlyWhenLoggedIn:true
            }
        },

        {
            path: '/profile/answers',
            name: 'profileAnswers',
            component: ProfileAnswersView,
            meta: {
                public: false,  // Allow access to even if not logged in
                onlyWhenLoggedIn:true
            }
        },

        {
            path: '/profile/bookmarks',
            name: 'profileBookmarks',
            component: ProfileView,
            meta: {
                public: false,  // Allow access to even if not logged in
                onlyWhenLoggedIn:true
            }
        },

        {
            path: '/questions/question/create',
            name: 'questionCreate',
            component: CreateQuestionView,
            meta: {
                public: false,  // Allow access to even if not logged in
                onlyWhenLoggedIn:true
            }
        },

        {
            path: '/questions/question/:id',
            name: 'question',
            component: QuestionView,
            meta: {
                public: true,  // Allow access to even if not logged in
            }
        },

        {
            path: '/questions/question/:id/edit',
            name: 'questionEdit',
            component: EditQuestionView,
            meta: {
                public: true,  // Allow access to even if not logged in
            }
        },

        {
            path: '/categories/category/:id',
            name: 'categoryShow',
            component: ShowCategoryView,
            meta: {
                public: true,  // Allow access to even if not logged in
            }
        },

        {
            path: '/categories',
            name: 'categoriesList',
            component: ListCategoriesView,
            meta: {
                public: true,  // Allow access to even if not logged in
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
