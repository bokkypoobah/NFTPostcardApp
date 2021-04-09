Vue.use(Vuex);
Vue.use(VueApexCharts);

Vue.component('apexchart', VueApexCharts);
Vue.component('connection', Connection);
Vue.component('governance', Governance);
Vue.component('tokens', Tokens);
Vue.component('payoff', Payoff);
Vue.component('feeds', Feeds);
Vue.component('optinoFactory', OptinoFactory);
// Vue.component('optinoFactory', OptinoFactory, {
//     name: 'optinoFactory'
// });
Vue.component('flat-pickr', VueFlatpickr);

// hljs.registerLanguage('solidity', window.hljsDefineSolidity);
// hljs.initHighlightingOnLoad();

const router = new VueRouter({
  // mode: 'history', // https://stackoverflow.com/questions/45201014/how-to-handle-anchors-bookmarks-with-vue-router
  routes: routes,
});

const storeVersion = 1;
const store = new Vuex.Store({
  strict: false, // TODO Set to true to test, false to disable _showDetails & vuex mutations
  // state: {
  //   username: 'Jack',
  //   phrases: ['Welcome back', 'Have a nice day'],
  // },
  // getters: {
  //   getMessage(state) {
  //     return state.route.name === 'top' ?
  //       `${state.phrases[0]}, ${state.username}` :
  //       `${state.phrases[1]}, ${state.username}`;
  //   },
  // },
  mutations: {
    initialiseStore(state) {
      // Check if the store exists
    	if (localStorage.getItem('store')) {
    		let store = JSON.parse(localStorage.getItem('store'));

    		// Check the version stored against current. If different, don't
    		// load the cached version
    		if(store.version == storeVersion) {
          // logDebug("store.initialiseStore BEFORE", JSON.stringify(state, null, 4));
    			this.replaceState(
    				Object.assign(state, store.state)
    			);
          // logDebug("store.initialiseStore AFTER", JSON.stringify(state, null, 4));
    		} else {
    			state.version = storeVersion;
    		}
    	}
    }
  },
  modules: {
    connection: connectionModule,
    feeds: feedsModule,
    feedsExplorer: feedsExplorerModule,
    governance: governanceModule,
    governanceExplorer: governanceExplorerModule,
    optinoExplorer: optinoExplorerModule,
    optinoFactory: optinoFactoryModule,
    payoff: payoffModule,
    tokens: tokensModule,
    tokensExplorer: tokensExplorerModule,
  }
});

// Subscribe to store updates
store.subscribe((mutation, state) => {
  let store = {
		version: storeVersion,
		state: state,
	};
  // logDebug("store.updated", JSON.stringify(store, null, 4));
	localStorage.setItem('store', JSON.stringify(store));
});

// sync store and router by using `vuex-router-sync`
sync(store, router);

const app = new Vue({
  router,
  store,
  beforeCreate() {
    setLogLevel(1); // 0 = NONE, 1 = INFO (default), 2 = DEBUG
    logDebug("index.js", "app:beforeCreate()");
		this.$store.commit('initialiseStore');
	},
  data() {
    return {
      // connected: false,
      count: 0,
      spinnerVariant: "success",
      statusSidebar: false,
      lastBlockTimeDiff: null,
      reschedule: false,

      name: 'BootstrapVue',
      show: true,
    };
  },
  computed: {
    connect() {
      return store.getters['connection/connect'];
    },
    spinnerVariant1() {
      var sv = store.getters['connection/spinnerVariant'];
      logInfo("index.js - computed.spinnerVariant", sv);
      return sv;
      // return "danger";
    },
    moduleName () {
      return this.$route.name;
    },
  },
  mounted() {
    // logInfo("app", "mounted() Called");
    if (localStorage.getItem('connect')) {
      var c = localStorage.getItem('connect');
      store.dispatch('connection/setConnect', c);
    }
    this.reschedule = true;
    this.timeoutCallback();
  },
  destroyed() {
    // logInfo("app", "destroyed() Called");
    this.reschedule = false;
  },
  methods: {
    powerOn() {
      store.dispatch('connection/setConnect', true);
      localStorage.setItem('connect', true);
      var t = this;
      setTimeout(function() {
        t.statusSidebar = true;
      }, 1500);
    },
    powerOff() {
      store.dispatch('connection/setConnect', false);
      localStorage.setItem('connect', false);
      var t = this;
      setTimeout(function() {
        t.statusSidebar = false;
      }, 1500);
    },
    timeoutCallback() {
      // logInfo("app", "timeoutCallback() Called");

      if (store.getters['connection/block'] != null) {
        this.lastBlockTimeDiff = getTimeDiff(store.getters['connection/block'].timestamp);
        var secs = parseInt(new Date() / 1000 - store.getters['connection/block'].timestamp);
        if (secs > 90) {
          this.spinnerVariant = "danger";
        } else if (secs > 60) {
          this.spinnerVariant = "warning";
        } else {
          this.spinnerVariant = "success";
        }
      } else {
        this.spinnerVariant = "danger";
      }

      if (this.reschedule) {
        var t = this;
        setTimeout(function() {
          t.timeoutCallback();
        }, 1000);
      }
    }
  },
  components: {
  // OptinoFactory
  //   "network": Network,
  //   "account": Account,
  },
}).$mount('#app');
