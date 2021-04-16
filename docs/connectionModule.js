// ----------------------------------------------------------------------------
// Network           Network Id   Chain Id
// Mainnet                    1          1
// Ropsten                    3          3
// Rinkeby                    4          4
// Kovan                     42         42
// Görli                      5          5
// Truffle Develop Network 4447
// Ganache Blockchain      5777
// Testnet   | Explorers                     | Testnet ETH Faucets
// :-------- |:----------------------------- |:-------------------------
// Ropsten   | https://ropsten.etherscan.io/ | https://faucet.metamask.io/<br />https://twitter.com/BokkyPooBah/status/1099498823699714048
// Kovan     | https://kovan.etherscan.io/   | https://faucet.kovan.network/<br />https://github.com/kovan-testnet/faucet<br />https://faucet.kovan.radarrelay.com/
// Rinkeby   | https://rinkeby.etherscan.io/ | https://faucet.metamask.io/<br />https://faucet.rinkeby.io/
// Görli     | https://goerli.etherscan.io/  | https://faucet.goerli.mudit.blog/<br />https://goerli-faucet.slock.it/<br />https://bridge.goerli.com/
// ----------------------------------------------------------------------------
var networks = {
  "-1" : { "id": "-1", "name": "Network Unknown", "explorer": "", "faucets": {} },
  "1" : { "id": "1", "name": "Ethereum Mainnet", "explorer": "https://etherscan.io/", "faucets": {} },
  "2" : { "id": "2", "name": "Morden Testnet (deprecated)", "explorer": "https://morden.etherscan.io/", "faucets": {} },
  "3" : { "id": "3", "name": "Ropsten Testnet", "explorer": "https://ropsten.etherscan.io/", "faucets": { "faucet.metamask.io": "https://faucet.metamask.io/" /*, "BokkyPooBah's VIP": "https://twitter.com/BokkyPooBah/status/1099498823699714048/" */ } },
  "4" : { "id": "4", "name": "Rinkeby Testnet", "explorer": "https://rinkeby.etherscan.io/", "faucets": { "faucet.metamask.io": "https://faucet.metamask.io/", "faucet.rinkeby.io": "https://faucet.rinkeby.io/" } },
  "42" : { "id": "42", "name": "Kovan Testnet", "explorer": "https://kovan.etherscan.io/", "faucets": { "faucet.kovan.network": "https://faucet.kovan.network/", "github.com/kovan-testnet": "https://github.com/kovan-testnet/faucet" } },
  "5" : { "id": "5", "name": "Görli Testnet", "explorer": "https://goerli.etherscan.io/", "faucets": { "faucet.goerli.mudit.blog": "https://faucet.goerli.mudit.blog/", "goerli-faucet.slock.it": "https://goerli-faucet.slock.it/" } },
  "1337" : { "id": "1337", "name": "Geth Devnet", "explorer": "(none)", "faucets": [] },
  "4447" : { "id": "4447", "name": "Truffle Devnet", "explorer": "(none)", "faucets": [] },
  "5777" : { "id": "5777", "name": "Ganache Devnet", "explorer": "(none)", "faucets": [] },
};

function getNetworkDetails(network) {
  return networks[network] || networks[-1];
}

function getTimeDiff(ts) {
  if (ts > 0) {
    var secs = parseInt(new Date() / 1000 - ts);
    var mins = parseInt(secs / 60);
    secs = secs % 60;
    var hours = parseInt(mins / 60);
    mins = mins % 60;
    var days = parseInt(hours / 24);
    hours = hours % 24;
    var s = "";
    if (days > 0) {
      s += days + "d ";
    }
    if (hours > 0) {
      s += hours + "h ";
    }
    if (mins > 0) {
      s += mins + "m ";
    }
    if (secs > 0) {
      s += secs + "s";
    }
    return "-" + s;
  } else {
    return "";
  }
}

// ----------------------------------------------------------------------------
// Convenience function
// ----------------------------------------------------------------------------
const promisify = (inner) =>
  new Promise((resolve, reject) =>
    inner((err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    })
  );


// ----------------------------------------------------------------------------
// Web3 connection, including coinbase and coinbase balance
// ----------------------------------------------------------------------------
const Connection = {
  template: `
    <div>
      <b-card header-class="warningheader" v-if="!connected" header="Web3 Connection Not Detected">
        <b-card-text>
          Please use the <b-link href="https://metamask.io" target="_blank">MetaMask</b-link> addon with Firefox, Chromium, Opera or Chrome, or any other other web3 browser to view this page
        </b-card-text>
      </b-card>
      <b-button v-b-toggle.connection size="sm" block variant="outline-info" v-if="connected">{{ networkName }} <b-spinner class="float-right mt-1" :variant="spinnerVariant" style="animation: spinner-grow 3.75s linear infinite;" small type="grow" label="Spinning" /></b-button>
      <b-collapse id="connection" visible class="mt-2">
        <b-card no-body class="border-0" v-if="connected">
          <b-row>
            <b-col cols="4" class="small">Block</b-col>
            <b-col class="small truncate" cols="8" >
              <b-link :href="explorer + 'block/' + blockNumber" class="card-link" target="_blank">{{ blockNumberString }}</b-link>&nbsp;&nbsp;<font size="-3">{{ lastBlockTimeDiff }}</font>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="4" class="small">My account</b-col><b-col class="small truncate" cols="8"><b-link :href="explorer + 'address/' + coinbase" class="card-link" target="_blank">{{ coinbase == null ? '' : coinbase.substring(0, 12) }}</b-link> <b-link v-b-popover.hover="'View on OpenSea.io'" :href="'https://opensea.io/accounts/'+ coinbase" target="_blank"><img src="images/381114e-opensea-logomark-flat-colored-blue.png" width="20px" /></b-link></b-col>
          </b-row>
          <b-row>
            <b-col cols="4" class="small">My balance</b-col><b-col class="small truncate" cols="8"><b-link :href="explorer + 'address/' + coinbase" class="card-link" target="_blank">{{ balanceString }}</b-link></b-col>
          </b-row>
          <b-row v-show="Object.keys(faucets).length">
            <b-col cols="4" class="small">Faucet(s)</b-col>
            <b-col class="small truncate" cols="8">
              <span v-for="(url, name) in faucets">
                <b-link :href="url" class="card-link" target="_blank">{{ name }}</b-link><br />
              </span>
            </b-col>
          </b-row>
          <b-row v-show="Object.keys(txs).length">
            <b-col cols="4" class="small">
              Transactions
            </b-col>
            <b-col class="truncate" cols="8">
              <span v-for="(key, hash) in txs">
                <b-row>
                <b-col class="small truncate">
                  <b-link href="#" v-b-popover.hover="'Clear transaction ' + hash" @click="removeTx(hash)" class="card-link">x</b-link>
                  <b-link :href="explorer + 'tx/' + hash" class="card-link" target="_blank">{{ hash }}</b-link>
                </b-col>
                </b-row>
              </span>
            </b-col>
          </b-row>
          <b-row v-show="txError.length > 0">
            <b-col cols="4" class="small">
              Last Error
            </b-col>
            <b-col class="small truncate" cols="8">
              <b-link href="#" v-b-popover.hover="'Clear error ' + txError" @click="clearTxError()" class="card-link">x</b-link>
              {{ txError }}
            </b-col>
          </b-row>
        </b-card>
      </b-collapse>
    </div>
  `,
  data: function () {
    return {
      count: 0,
      provider: null,
      signer: null,
      lastNetworkChainId: -1,
      lastCoinbase: null,
      lastBalance: null,
      lastBlockHash: null,
      spinnerVariant: "success",
      lastBlockTimeDiff: "establishing network connection",
      reschedule: false,
    }
  },
  computed: {
    connected() {
      return store.getters['connection/connection'] != null && store.getters['connection/connection'].connected;
    },
    error() {
      return store.getters['connection/connection'] == null ? null : store.getters['connection/connection'].error;
    },
    connectionType() {
      return store.getters['connection/connection'] == null ? null : store.getters['connection/connection'].connectionType;
    },
    network() {
      return store.getters['connection/network'];
    },
    networkName() {
      return store.getters['connection/networkName'];
    },
    explorer() {
      return store.getters['connection/explorer'];
    },
    faucets() {
      return store.getters['connection/faucets'] || [];
    },
    coinbase() {
      return store.getters['connection/coinbase'];
    },
    balance() {
      return store.getters['connection/balance'];
    },
    balanceString() {
      return store.getters['connection/balance'] == null ? "" : new BigNumber(store.getters['connection/balance']).shift(-18).toString();
    },
    block() {
      return store.getters['connection/block'];
    },
    blockNumber() {
      return store.getters['connection/block'] == null ? 0 : store.getters['connection/block'].number;
    },
    blockNumberString() {
      return store.getters['connection/block'] == null ? "" : formatNumber(store.getters['connection/block'].number);
    },
    // blockTimestampString() {
    //   if (store.getters['connection/block'] == null) {
    //     return "";
    //   } else {
    //     var date = new Date(store.getters['connection/block'].timestamp * 1000);
    //     return new Intl.DateTimeFormat('default', {hour: 'numeric', minute: 'numeric', second: 'numeric'}).format(date) + " " +
    //       new Intl.DateTimeFormat('default', {weekday: 'short', year: 'numeric', month: 'short', day: 'numeric'}).format(date);
    //   }
    // },
    txs() {
      return store.getters['connection/txs'];
    },
    txError() {
      return store.getters['connection/txError'];
    },
  },
  methods: {
    removeTx(tx) {
      logInfo("Connection", "removeTx");
      store.dispatch('connection/removeTx', tx);
    },
    clearTxError(tx) {
      logInfo("Connection", "clearTxError");
      store.dispatch('connection/setTxError', "");
    },
    async execWeb3() {
      logInfo("Connection", "execWeb3() start[" + this.count + "]");

      if (!store.getters['connection/connection'] || !store.getters['connection/connection'].connected) {
        logInfo("Connection", "execWeb3() Attempting connection");

        // logInfo("Connection", "execWeb3() window.ethereum: " + JSON.stringify(window.ethereum));
        if (window.ethereum) {
          if (!window.ethereum.isConnected() || !window.ethereum['isUnlocked']) {
              // window.ethereum.enable();
              const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
              // logInfo("Connection", "execWeb3() accounts: " + JSON.stringify(accounts));
          }
        }
        // logInfo("Connection", "execWeb3() ethereum: " + JSON.stringify(ethereum));
        // logInfo("Connection", "execWeb3() ethereum.isConnected(): " + window.ethereum.isConnected());

        if (this.provider == null) {
          try {
            this.provider = new ethers.providers.Web3Provider(window.ethereum);
            // logInfo("Connection", "execWeb3() provider: " + JSON.stringify(this.provider));
            this.signer = this.provider.getSigner();
            // logInfo("Connection", "execWeb3() signer: " + JSON.stringify(this.signer));
            store.dispatch('connection/setConnected', { provider: this.provider, signer: this.signer, connectionType: "MetaMask / Modern dapp browsers" });
          } catch (error) {
            store.dispatch('connection/setDisconnected', JSON.stringify(error.message));
            this.provider = null;
            this.signer = null;
          }
        }
      }

      var networkChanged = false;
      if (store.getters['connection/connection'] && store.getters['connection/connection'].connected) {
        try {
          let network = await this.provider.getNetwork();
          logInfo("Connection", "execWeb3() network: " + JSON.stringify(network));
          if (network.chainId != this.lastNetworkChainId) {
            store.dispatch('connection/setNetwork', network);
            logInfo("Connection", "execWeb3() Network updated from " + this.lastNetworkChainId + " to " + network.chainId + ": " + getNetworkDetails(network.chainId).name);
            this.lastNetworkChainId = network.chainId;
            networkChanged = true;
          }
        } catch (error) {
          store.dispatch('connection/setDisconnected', JSON.stringify(error.message));
        }
      }

      var coinbaseChanged = false;
      var coinbase = null;
      if (store.getters['connection/connection'] && store.getters['connection/connection'].connected) {
        try {
          coinbase = await this.signer.getAddress();
          // logInfo("Connection", "execWeb3() coinbase: " + JSON.stringify(coinbase));
          if (coinbase != this.lastCoinbase) {
            store.dispatch('connection/setCoinbase', coinbase);
            logInfo("Connection", "execWeb3() Coinbase updated from " + this.lastCoinbase + " to " + coinbase);
            this.lastCoinbase = coinbase;
            coinbaseChanged = true;
          }
        } catch (error) {
          store.dispatch('connection/setDisconnected', JSON.stringify(error.message));
        }
      }

      var balance = null;
      if (store.getters['connection/connection'] && store.getters['connection/connection'].connected) {
        if (coinbase != null) {
          try {
            balance = await this.provider.getBalance(coinbase);
            // logDebug("Connection", "execWeb3() balance: " + ethers.utils.formatUnits(balance, 18));
            if (this.lastBalance == null || balance == null || !balance.eq(this.lastBalance)) {
              store.dispatch('connection/setBalance', balance);
              logInfo("Connection", "execWeb3() Coinbase balance updated from " + (this.lastBalance == null ? "null" : ethers.utils.formatUnits(this.lastBalance)) + " to " + (balance == null ? "null" : ethers.utils.formatUnits(balance)));
              this.lastBalance = balance;
            }
          } catch (error) {
            store.dispatch('connection/setDisconnected', JSON.stringify(error.message));
            balance = null;
          }
        }
      }

      var block = null;
      if (store.getters['connection/connection'] && store.getters['connection/connection'].connected) {
        try {
          block = await this.provider.getBlock();
          // logInfo("Connection", "execWeb3() block: " + JSON.stringify(block.number));
        } catch (error) {
          store.dispatch('connection/setDisconnected', JSON.stringify(error.message));
        }
      }
      var blockChanged = false;
      if (block == null) {
        if (this.lastBlockHash != null) {
          store.dispatch('connection/setBlock', null);
          logInfo("Connection", "execWeb3() Block hash updated from " + this.lastBlockHash + " to " + null);
          this.lastBlockHash = null;
          blockChanged = true;
        }
      } else {
        if (block.hash !== this.lastBlockHash) {
          store.dispatch('connection/setBlock', block);
          logInfo("Connection", "execWeb3() Block updated from " + (this.lastBlockHash ? this.lastBlockHash.substring(0, 10) : null) + " to " + (block.hash ? block.hash.substring(0, 10) : null) + " @ " + block.number + " " + new Date(block.timestamp * 1000).toLocaleString() + " " + getTimeDiff(block.timestamp));
          this.lastBlockHash = block.hash;
          blockChanged = true;
        }
      }

      if (store.getters['connection/connection'] && store.getters['connection/connection'].connected) {
        store.dispatch('tokens/execWeb3', { count: this.count, networkChanged, blockChanged, coinbaseChanged });
      //   // await store.dispatch('tokenContract/execWeb3', { count: this.count, networkChanged, blockChanged, coinbaseChanged });
      //   // if (this.$route.name == "DeployTokenContract") {
      //   //   await store.dispatch('deployTokenContract/execWeb3', { count: this.count, networkChanged, blockChanged, coinbaseChanged });
      //   // } else if (this.$route.name == "TokenContractExplorer" /* || this.$route.name == "GoblokStatus" */) {
      //   //   await store.dispatch('tokenContractExplorer/execWeb3', { count: this.count, networkChanged, blockChanged, coinbaseChanged });
      //   // }
      }
      logInfo("Connection", "execWeb3() end[" + this.count + "]");
    },
    timeoutCallback() {
      var t = this;
      if (store.getters['connection/powerOn']) {
        if (this.count++ % 15 == 0) {
          t.execWeb3();
        }
      }
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
        setTimeout(function() {
          t.timeoutCallback();
        }, 1000);
      }
    }
  },
  mounted() {
    logDebug("Connection", "mounted() Called");
    this.reschedule = true;
    this.timeoutCallback();
  },
  destroyed() {
    logDebug("Connection", "destroyed() Called");
    this.reschedule = false;
  },
};


const connectionModule = {
  namespaced: true,
  state: {
    powerOn: false,
    connection: {
      connected: false,
      provider: null,
      signer: null,
      connectionType: null,
      error: null,
    },
    network: null,
    networkName: null,
    explorer: null,
    faucets: null,
    coinbase: null,
    balance: null,
    block: null,
    txs: {},
    txError: "",
  },
  getters: {
    powerOn: state => state.powerOn,
    connection: state => state.connection,
    network: state => state.network,
    networkName: state => state.networkName,
    explorer: state => state.explorer,
    faucets: state => state.faucets,
    coinbase: state => state.coinbase,
    balance: state => state.balance,
    block: state => state.block,
    txs: state => state.txs,
    txError: state => state.txError,
  },
  mutations: {
    setPowerOn(state, c) {
      state.powerOn = c;
    },
    setConnected(state, data) {
      logInfo("connectionModule", "mutations.setConnected()");
      state.connection.connected = true;
      state.connection.provider = data.provider;
      state.connection.signer = data.signer;
      state.connection.connectionType = data.connectionType;
      state.connection.error = null;
    },
    setDisconnected(state, error) {
      logInfo("connectionModule", "mutations.setDisconnected() - error: " + error);
      state.connection.connected = false;
      state.connection.provider = null;
      state.connection.signer = null;
      state.connection.connectionType = null;
      state.connection.error = error;
    },
    setNetwork(state, n) {
      state.network = n;
      var networkDetails = getNetworkDetails(n.chainId);
      state.networkName = networkDetails.name;
      logInfo("connectionModule", "mutations.setNetwork() - networkName: " + state.networkName);
      state.explorer = networkDetails.explorer;
      state.faucets = networkDetails.faucets;
    },
    setCoinbase(state, cb) {
      state.coinbase = cb;
    },
    setBalance(state, b) {
      state.balance = b;
    },
    setBlock(state, b) {
      state.block = b;
    },
    addTx(state, tx) {
      logInfo("connectionModule", "mutations.addTx(): " + tx);
      Vue.set(state.txs, tx, tx);
    },
    removeTx(state, tx) {
      logInfo("connectionModule", "mutations.removeTx(): " + tx);
      Vue.delete(state.txs, tx);
    },
    setTxError(state, txError) {
      logInfo("connectionModule", "mutations.setTxError(): " + txError);
      state.txError = txError;
    },
  },
  actions: {
    setPowerOn(context, c) {
      logInfo("connectionModule", "actions.setPowerOn(" + c + ")");
      context.commit('setPowerOn', c);
    },
    setConnected(context, data) {
      logInfo("connectionModule", "actions.setConnected()");
      context.commit('setConnected', data);
    },
    setDisconnected(context, data) {
      logInfo("connectionModule", "actions.setDisconnected()");
      context.commit('setDisconnected', data);
    },
    setNetwork(context, n) {
      context.commit('setNetwork', n);
    },
    setCoinbase(context, cb) {
      context.commit('setCoinbase', cb);
    },
    setBalance(context, b) {
      context.commit('setBalance', b);
    },
    setBlock(context, b) {
      context.commit('setBlock', b);
    },
    addTx(context, tx) {
      logInfo("connectionModule", "actions.addTx(): " + tx);
      context.commit('addTx', tx);
    },
    removeTx(context, tx) {
      logInfo("connectionModule", "actions.removeTx(): " + tx);
      context.commit('removeTx', tx);
    },
    setTxError(context, txError) {
      logInfo("connectionModule", "actions.setTxError(): " + txError);
      context.commit('setTxError', txError);
    },
  },
};
