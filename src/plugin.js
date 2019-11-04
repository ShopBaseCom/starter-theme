import { setCoreMixins } from './shared/mixin'
import { setCoreFilters } from './shared/filter'
import LayoutDefault from './layouts/Default'

export const ShopBaseThemePlugin = {
  install(Vue, options) {
    if (options && options.localMixins) {
      setCoreMixins(options.localMixins)
    }

    if (options && options.globalFilters) {
      Object.keys(options.globalFilters).forEach((key) => {
        Vue.filter(key, options.globalFilters[key])
      })
      setCoreFilters(options.globalFilters)
    }

    // Init global components
    Vue.component('WebImage', () => import('./components/WebImage'))

    // Register layout components
    Vue.component('LayoutDefault', LayoutDefault)

    // Register router components
    Vue.component('PageHome', () => import('./pages/Home'))
    Vue.component('PageCollections', () => import('./pages/Collections'))
    Vue.component('PageCollection', () => import('./pages/Collection'))
    Vue.component('PageProduct', () => import('./pages/Product'))
    Vue.component('PageCart', () => import('./pages/Cart'))
    Vue.component('PageOther', () => import('./pages/Other'))
    Vue.component('PagePolicies', () => import('./pages/Policy'))
    Vue.component('PageSearch', () => import('./pages/Search'))
    Vue.component('PageLogin', () => import('./pages/Login'))
    Vue.component('PageRegister', () => import('./pages/Register'))
    Vue.component('PageResetPassword', () => import('./pages/ResetPassword'))
    Vue.component('PageActiveAccount', () => import('./pages/ActiveAccount'))
    Vue.component('PageMyAccount', () => import('./pages/MyAccount'))
    Vue.component('PageMyProfile', () => import('./blocks/MyAccount/MyProfile'))
    Vue.component('PageMyAddresses', () =>
      import('./blocks/MyAccount/MyAddresses')
    )
    Vue.component('PageMyOrders', () => import('./blocks/MyAccount/MyOrders'))
    Vue.component('PageMyOrder', () => import('./blocks/MyAccount/MyOrder'))
    Vue.component('PageNotFound', () => import('./pages/NotFound'))
  },
}
