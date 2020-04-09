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

const loadCompanyById = ({commit, state}, companyId) => {
    return new Promise((resolve, reject) => {
        firebase.firestore().collection("companies").where('id', '==', companyId).get().then((querySnapshot) => {
            commit('COMPANY', querySnapshot.docs.map(d => d.data())[0]);
            resolve();
        }).catch((error) => reject(error));
    });

};

const createSession = ({state}, session) => {
    return new Promise((resolve, reject) => {
        const docRef = firebase.firestore().collection('companies');
        docRef.doc(state.company.id).update({sessions: [...state.company.sessions || [], session]}).then(() => {
            console.log('session created');
            resolve();
        }).catch(error => reject(error));
    });
};



export default {
    logout,
    setUserDetails,
    setLoggedIn,
    registerCompany,
    loadCompany,
    createSession,
    loadCompanyById
}
