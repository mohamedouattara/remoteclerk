import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';



const setUserDetails = ({commit}, user) => {
    commit('LOGIN', true);
    commit('USER', user);
};

const logout = ({commit, dispatch}) => {
    firebase.auth().signOut().then(() => {
        commit('USER', {});
        commit('LOGOUT');
    }, function (error) {
        console.error('error during sign out: ' + error);
    });

};

const setLoggedIn = ({commit}, isLoggedIn) => {
    commit('LOGIN', isLoggedIn);
};

const registerCompany = ({state}, company) => {
    const docRef = firebase.firestore().collection('companies');
    const upvotesForUser = docRef.doc(company.id);
    if (upvotesForUser) {
        upvotesForUser.collection('admin').set(state.user.uid);
    }
}


export default {
    logout,
    setUserDetails,
    setLoggedIn,
    registerCompany,
}
