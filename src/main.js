import Vue from 'vue'
import App from './App.vue'
import router from './router'

import store from './store'

//element ui
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en'

// import utils from './utils'

//markdown
import VueMarkdownEditor from '@kangc/v-md-editor'
import '@kangc/v-md-editor/lib/style/base-editor.css'
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js'
import '@kangc/v-md-editor/lib/theme/style/github.css'

import hljs from 'highlight.js/lib/core';
// languages
import json from 'highlight.js/lib/languages/json';

hljs.registerLanguage('json', json);

VueMarkdownEditor.use(githubTheme, {
  Hljs: hljs,
});

Vue.use(VueMarkdownEditor)

// preview
import VMdpreview from '@kangc/v-md-editor/lib/preview'
import '@kangc/v-md-editor/lib/style/preview.css'

VMdpreview.use(githubTheme, {
  Hljs: hljs,
})
Vue.use(VMdpreview)

//swiper
import VueAwesomeSwiper from 'vue-awesome-swiper'
Vue.use(VueAwesomeSwiper)

Vue.use(Element, {locale})
Vue.config.productionTip = false
// Vue.prototype.utils=utils

Vue.directive('title',{
  inserted (dom){
    document.title = dom.dataset.title
  }
})

// seo
import MetaInfo from 'vue-meta'
Vue.use(MetaInfo)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
