export const SITE_URL = process.env.baseUrl
export const disqusShortname = process.env.disqusShortname

export const state = () => ({
  package_page: {
    packages: null,
    count: null,
    nextUrl: null,
    previousUrl: null
  },
  search_key: '',
  package: { name: '', id: null },
  reload: true,
  loading: true,
  api_urls: {
    packages: `${SITE_URL}/api/packages/`,
    api: `${SITE_URL}/api`,
    home: SITE_URL
  },
  title: '',
  disqus_shortname: disqusShortname
})

export const mutations = {
  updatePackagePage: (state, data) => {
    state.loading = false
    state.package_page = data
  },

  updateSearchKey: (state, key) => {
    state.search_key = key
  },

  disableLoading: state => {
    state.loading = false
  }
}
