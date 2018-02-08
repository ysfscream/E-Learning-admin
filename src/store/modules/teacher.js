const TEACHER_LOGIN = 'TEACHER_LOGIN'
const TEACHER_LOGOUT = 'TEACHER_LOGOUT'

const state = {
  teacher: JSON.parse(localStorage.getItem('teacher'))
            || JSON.parse(sessionStorage.getItem('teacher'))
              || {},
}

const mutations = {
  [TEACHER_LOGIN](loginState, teacher) {
    Object.assign(loginState.teacher, teacher)
  },
  [TEACHER_LOGOUT](logoutState) {
    Object.assign(logoutState.teacher, {})
  },
}

const actions = {
  [TEACHER_LOGIN]({ commit }, payload) {
    if (payload.remember) {
      localStorage.setItem('teacher', JSON.stringify(payload.teacher))
    } else {
      sessionStorage.setItem('teacher', JSON.stringify(payload.teacher))
    }
    commit(TEACHER_LOGIN, payload.teacher)
  },
  [TEACHER_LOGOUT]({ commit }) {
    localStorage.removeItem('teacher')
    sessionStorage.removeItem('teacher')
    commit(TEACHER_LOGOUT)
  },
}

export default {
  state,
  mutations,
  actions,
}
