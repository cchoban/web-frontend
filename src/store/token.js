export const actions = {
  generate({ commit }) {
    return new Promise((resolve, reject) => {
      this.$axios.post('/token/').then(response => {
        const responseData = response.data
        this.$auth.setToken('local', `Token ${responseData.key}`)
        this.$axios.setToken(`Token ${responseData.key}`)

        return resolve(responseData)
      }).catch(err => {
        return reject(err.response.data)
      })
    })
  }
}
