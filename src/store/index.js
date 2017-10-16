/**
 * Created by daesubkim on 10/11/17.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import firebaseConfig from '@/config/firebase'
import { firebaseMutations, firebaseAction } from 'vuexfire'

Vue.use(Vuex)

// 저장소의 상태를 저장
const state = {
  notes: [],
  currentNote: {}
}

// 저장소 상태에 대한 변이를 정의 (순수하게 상태에 접근)
const mutations = {
  ...firebaseMutations, // ... [ a:{firebaseMutations[0]}, b:{firebaseMutations[1]}, c:{firebaseMutations[2]}} ]
  selectNote(state, payload) {
    state.currentNote = state.notes.find(
      note => (note['.key'] == payload)
    )
  },

  updateNote(state, payload) {
    state.currentNote = payload
  }
}

/*  ... 문법  */
var nums, chars, string;
nums = [1,2,3]
chars = ['a', 'b', 'c']
string = 'cat'

var arr = nums.concat(chars, string)
// [1, 2, 3, 'a', 'b', 'c', 'cat']

var arr2 = [...nums, ...chars, string]
// [1, 2, 3, 'a', 'b', 'c', 'cat']
/*  ... 문법 ends  */


// 저장소의 액션을 실행 (로직전개)
const actions = {
  // firebase db의 notes Table을 참조할 수 있도록 setting
  setNotesReference: firebaseAction(({ bindFirebaseRef }) => {
    return new Promise((resolve, reject) => {
      bindFirebaseRef('notes', firebaseConfig.notesRef, {
        readyCallback: () => {
          resolve()
        }
      })
    })

  }),

  // add Note action
  commitCurrentNote: (context) => {
    const current = context.state.currentNote
    const key = current['.key']

    delete current['.key']

    if (key === undefined) {
      // if no key
      let res = firebaseConfig.notesRef.push(current)
      context.state.currentNote['.key'] = res.getKey()
    } else {
      firebaseConfig.notesRef.child(key).set(current) // set() 수정된 data를 저장
    }
  },

  // delete Note action
  removeCurrentNote: ( {state} ) => {
    const key = state.currentNote['.key']
    firebaseConfig.notesRef.child(key).remove()
    state.currentNote = state.notes[0] || {} // state.note[0] 가 없으면 빈 Object
  }
}

// getters : state 의 변화를 감지할 수 있는 watch, state에 접근할때 함수 (getter, setter)로 접근
// getters 는 state의 변화에 추가적인 로직을 줄때 ex) sort, filter...
const getters = {
  notes: state => {
    return state.notes.sort((a, b) => b.updated_at - a.updated_at) // 시간순
  }
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
