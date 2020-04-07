import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';


const setUserDetails = ({commit}, user) => {
    commit('LOGIN', true);
    commit('USER', user);
};

const logout = ({commit}) => {
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
    return new Promise((resolve, reject) => {
        const docRef = firebase.firestore().collection('companies');
        company.users = [state.user.uid];
        docRef.doc(company.id).set(company).then(() => {
            resolve();
        }).catch(error => reject(error));
    });
};

const loadCompany = ({commit, state}) => {
    firebase.firestore().collection("companies").where('users', 'array-contains-any', [state.user.uid]).get().then((querySnapshot) => {
        commit('COMPANY', querySnapshot.docs.map(d => d.data())[0]);
    });

};


export default {
    logout,
    setUserDetails,
    setLoggedIn,
    registerCompany,
    loadCompany
}
