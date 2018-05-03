import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
	    selected: 'notLook'
	},
	mutations: {
	    changeSelected(state, id) {
	    	state.selected = id;
	    }
	}
});

export default store