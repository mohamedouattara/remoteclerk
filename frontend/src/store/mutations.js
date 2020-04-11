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
    'COMPANY': (state, company) => {
        state.company = company;
    },
    'CURRENT_SESSION': (state, session) => {
        state.currentSession = session;
    },
};

export default mutations;
