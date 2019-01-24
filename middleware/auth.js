export default function ({ store, redirect }) {
  if (!store.getters['localStorage/isAuthenticated']) {
    return redirect('/')
  } else {
    store.state.token = 'qweqwe'
  }
}
