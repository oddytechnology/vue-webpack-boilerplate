import Vue from 'vue';

// Automatically register any .vue component under components directory
// Directory is scanned recursively.
const files = require.context('./components', true, /\.vue$/i);
files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default));

//import { Field,Datepicker,Switch,Select, Button } from 'buefy';

var buefyOpts = {
	defaultIconPack: 'fas'
}


import Buefy from 'buefy';

Vue.use(Buefy, buefyOpts);

// Or use invidual packages as required
/*
Vue.use(Field, buefyOpts);
Vue.use(Datepicker, buefyOpts);
Vue.use(Switch, buefyOpts);
Vue.use(Select, buefyOpts);
Vue.use(Button, buefyOpts);
*/

// Uncommet for language support, remember to require package
/*
const lang = document.documentElement.lang.substr(0, 2);

import i18next from 'i18next';
import intervalPlural from 'i18next-intervalplural-postprocessor';
import VueI18Next from '@panter/vue-i18next';

Vue.use(VueI18Next);

const locale_en = require('../lang/en.json');
const locale_fi = require('../lang/fi.json');
i18next
	.use(intervalPlural)
	.init({
    lng: lang,
    resources: {
        en: { translation: locale_en },
        fi: { translation: locale_fi }
    }
});

const i18n = new VueI18Next(i18next);
*/

// Initialize Vue app
const app = new Vue({
    //i18n,
    el: '#app',
})
