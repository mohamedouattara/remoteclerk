export const mutations = {
    'LOGIN': (state, isLoggedIn) => {
        state.loggedIn = isLoggedIn;
    },
    'LOGOUT': (state) => {
        state.loggedIn = false;
    },
    'USER': (state, user) => {
        state.user = user;
    },
};

export default mutations;
