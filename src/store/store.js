import Vue from 'vue';
import Vuex from 'vuex';
import State from '@/store/state';
import Getters from '@/store/getters';
import Actions from '@/store/actions';
import Mutations from './mutations';

Vue.use(Vuex);

export default new Vuex.Store({
    state: State,
    getters: Getters,
    mutations: Mutations,
    actions: Actions,
    modules: {},
});
