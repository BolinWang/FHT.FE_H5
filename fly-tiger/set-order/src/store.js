import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
	    roomList: [],
	    sessionId: '',
	    selected: 'room-list'
	},
	mutations: {
	    increment(state, n) {
	        state.roomList[n].isChecked = true;
	    },
	    SAVE_ROOMLIST(state, roomList) {
	    	state.roomList = roomList;
	    },
	    SAVE_SESSIONID(state, sessionId) {
	    	state.sessionId = sessionId;
	    },
	    addOrder(state, roomId) {
	    	state.roomList.forEach((item, index) => {
	    		if(item.roomInfoFormat.id == roomId){
	    		  item.isChecked = true;
	    		  return ;
	    		}
	    	})
	    	console.log(state.roomList);
	    },
	    changeSelected(state, id) {
	    	state.selected = id;
	    }
	},
	actions: {
	    SaveRoomList({ commit }, roomList){
	    	commit('SAVE_ROOMLIST', roomList)
	    },
	    SaveSessionId({ commit }, sessionId){
	    	commit('SAVE_SESSIONID', sessionId)
	    }
	}
});

export default store