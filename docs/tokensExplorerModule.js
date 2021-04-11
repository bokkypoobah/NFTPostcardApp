const TokensExplorer = {
  template: `
    <div class="mt-5 pt-3">
      <b-card no-body header="Adoption Centre" class="border-0" header-class="p-1">
        <b-card no-body class="border-0 m-0 mt-2">
          <b-card-body class="p-0">

            <!--
            <div>
              <b-container class="bv-example-row">
                <b-row>
                  <b-col>
                    <b-form-group label-cols="3" label-size="sm" label="Baby #" label-for="all-tokens-list-id">
                      <b-form-input list="all-tokens-list-id" size="sm"></b-form-input>
                      <datalist id="all-tokens-list-id">
                        <option>None</option>
                        <option v-for="tokenId in allTokenIds">{{ tokenId }}</option>
                      </datalist>
                    </b-form-group>
                  </b-col>
                  <b-col>
                    <b-form-group label-cols="3" label-size="sm" label="Parent #" label-for="all-parents-list-id">
                      <b-form-input list="all-parents-list-id" size="sm"></b-form-input>
                      <datalist id="all-parents-list-id">
                        <option v-for="parent in allParents">{{ parent }}</option>
                      </datalist>
                    </b-form-group>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col>
                    <b-form-group label-cols="3" label-size="sm" label="Attributes" label-for="all-attributes-list-id">
                      <b-form-input list="all-attributes-list-id" size="sm"></b-form-input>
                      <datalist id="all-attributes-list-id">
                        <option v-for="attribute in allAttributes">{{ attribute }}</option>
                      </datalist>
                    </b-form-group>
                  </b-col>
                  <b-col>
                    <b-form-group label-cols="3" label-size="sm" label="Ancient DNA" label-for="all-ancientdnas-list-id">
                      <b-form-input list="all-ancientdnas-list-id" size="sm"></b-form-input>
                      <datalist id="all-ancientdnas-list-id">
                        <option v-for="ancientDNA in allAncientDNAs">{{ ancientDNA }}</option>
                      </datalist>
                    </b-form-group>
                  </b-col>
                </b-row>
              </b-container>
            </div>
            -->

            <div>
              <b-card-group deck class="m-2">
                <div v-for="tokenId in allTokenIds">
                  <b-card :img-src="'nfts/media/' + nftData.tokens[tokenId].imageName" img-alt="Image" img-top style="max-width: 15rem;" class="m-1 p-2">
                      <b-card-text>
                        <b>#{{ tokenId }}</b> =
                        <span v-for="(parentId, parentIndex) in nftData.tokens[tokenId].parents">
                          <span v-if="parentIndex > 0">
                           +
                          </span>
                          <b-avatar variant="light" size="1.5rem" :src="'nfts/media/punk' + parentId + '.png'"></b-avatar>
                        </span><br />
                        <span v-for="attribute in nftData.tokens[tokenId].attributes"><b-badge pill variant="success">{{ attribute }}</b-badge></span>
                        <span v-for="ancientDNA in nftData.tokens[tokenId].ancientDNA"><b-badge pill variant="warning">🧬 {{ ancientDNA }}</b-badge></span>
                    </b-card-text>
                  </b-card>
                </div>
              </b-card-group deck class="m-2">
            </div>

          </b-card-body>
        </b-card>
      </b-card>
    </div>
  `,
  data: function () {
    return {
      count: 0,
      reschedule: false,

      search: null,
      currentPage: 1,
      perPage: 10,
      pageOptions: [
        { text: "5", value: 5 },
        { text: "10", value: 10 },
        { text: "25", value: 25 },
        { text: "50", value: 50 },
        { text: "All", value: 0 },
      ],

      addTokenTabIndex: 0,

      tokenPickerMap: {},
      tokenPickerList: [],
      tokenPickerLoadingRow: null,
      tokenPickerTotalRows: null,

      commonTokenMap: {},
      fakeTokenMap: {},
      searchCommon: null,
      searchFake: null,
      selectedTokens: {},

      tokenInfo: {
        address: "0x7E0480Ca9fD50EB7A3855Cf53c347A1b4d6A2FF5",
        symbol: null,
        name: null,
        decimals: null,
        totalSupply: null,
        balance: null,
        allowance: null,
        ok: null,
      },
      newAllowance: "0",

      addTokenTableFields: [
        { key: 'symbol', label: 'Symbol', sortable: true },
        { key: 'name', label: 'Name', sortable: true },
        { key: 'decimals', label: 'Decimals', sortable: true, tdClass: 'text-right' },
        { key: 'totalSupply', label: 'Total Supply', sortable: true, tdClass: 'text-right' },
        { key: 'balance', label: 'Balance', sortable: true, tdClass: 'text-right' },
        { key: 'allowance', label: 'Allowance', sortable: true, tdClass: 'text-right' },
        { key: 'address', label: 'Address', sortable: true },
        { key: 'selected', label: 'Select', sortable: false },
      ],

      tokenDataFields: [
        { key: 'symbol', label: 'Symbol', sortable: true },
        { key: 'name', label: 'Name', sortable: true },
        { key: 'decimals', label: 'Decimals', sortable: true, thClass: 'text-right', tdClass: 'text-right' },
        { key: 'totalSupply', label: 'Total Supply', sortable: true, thClass: 'text-right', tdClass: 'text-right' },
        { key: 'balance', label: 'Balance', sortable: true, thClass: 'text-right', tdClass: 'text-right' },
        { key: 'allowance', label: 'Allowance', sortable: true, thClass: 'text-right', tdClass: 'text-right' },
        { key: 'address', label: 'Address', sortable: true, thClass: 'text-right', tdClass: 'text-right' },
        { key: 'extra', label: '', sortable: false },
      ],
      show: true,
    }
  },
  computed: {
    explorer () {
      return store.getters['connection/explorer'];
    },
    coinbase() {
      return store.getters['connection/coinbase'];
    },
    networkName() {
      return store.getters['connection/networkName'];
    },

    nftData() {
      return store.getters['tokens/nftData'];
    },
    allTokenIds() {
      return store.getters['tokens/allTokenIds'];
    },
    allParents() {
      return store.getters['tokens/allParents'];
    },
    allAttributes() {
      return store.getters['tokens/allAttributes'];
    },
    allAncientDNAs() {
      return store.getters['tokens/allAncientDNAs'];
    },

    owner() {
      return store.getters['priceFeed/owner'];
    },
    tokenData() {
      return store.getters['tokens/tokenData'];
    },
    tokenDataSorted() {
      var results = [];
      var tokenData = store.getters['tokens/tokenData'];
      for (token in tokenData) {
        results.push(tokenData[token]);
      }
      results.sort(function(a, b) {
        return ('' + a.symbol + a.name).localeCompare(b.symbol + a.name);
      });
      return results;
    },
    commonTokenList() {
      var tokenData = store.getters['tokens/tokenData'];
      var results = [];
      this.tokenPickerList.forEach(function(e) {
        // logInfo("TokensExplorer", "commonTokenList(" + e.symbol + ")");
        if (typeof tokenData[e.address.toLowerCase()] === "undefined" && e.source == "common") {
          results.push(e);
        }
      });
      results.sort(function(a, b) {
        return ('' + a.symbol + a.name).localeCompare(b.symbol + a.name);
      });
      return results;
    },
    selectedCommonTokenList() {
      var tokenData = store.getters['tokens/tokenData'];
      var results = [];
      var t = this;
      this.tokenPickerList.forEach(function(e) {
        var address = e.address.toLowerCase();
        if (typeof tokenData[address] === "undefined" && e.source == "common"  && typeof t.selectedTokens[address] !== "undefined" && t.selectedTokens[address]) {
          results.push(e);
        }
      });
      return results;
    },
    fakeTokenList() {
      var tokenData = store.getters['tokens/tokenData'];
      var results = [];
      this.tokenPickerList.forEach(function(e) {
        if (typeof tokenData[e.address.toLowerCase()] === "undefined" && e.source == "fake") {
          results.push(e);
        }
      });
      results.sort(function(a, b) {
        return ('' + a.symbol + a.name).localeCompare(b.symbol + a.name);
      });
      return results;
    },
    selectedFakeTokenList() {
      var tokenData = store.getters['tokens/tokenData'];
      var results = [];
      var t = this;
      this.tokenPickerList.forEach(function(e) {
        var address = e.address.toLowerCase();
        if (typeof tokenData[address] === "undefined" && e.source == "fake" && typeof t.selectedTokens[address] !== "undefined" && t.selectedTokens[address]) {
          results.push(e);
        }
      });
      return results;
    },
  },
  methods: {
    rowClicked(record, index) {
      var address = record.address.toLowerCase();
      Vue.set(this.selectedTokens, address, !this.selectedTokens[address]);
    },
    onFiltered(filteredItems) {
      if (this.totalRows !== filteredItems.length) {
        this.totalRows = filteredItems.length;
        this.currentPage = 1
      }
    },
    truncate(s, l) {
      if (s.length > l) {
        return s.substr(0, l) + '...';
      }
      return s;
    },
    formatNumberForDisplay(value, decimals) {
      // return parseFloat(new BigNumber(value).toFixed(decimals));
      return parseFloat(new BigNumber(value).toFixed(decimals)).toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 9});
    },
    addTokensToList(list) {
      logInfo("TokensExplorer", "addTokensToList(" + JSON.stringify(list) + ")");
      this.$bvToast.toast(`Added ${list.length} item(s) to your token list`, {
        title: 'Tokens',
        variant: 'primary',
        autoHideDelay: 5000,
        appendToast: true
      })
      for (var i = 0; i < list.length; i++) {
        store.dispatch('tokens/updateToken', list[i]);
      }
      for (var i = 0; i < list.length; i++) {
        Vue.set(this.selectedTokens, list[i].address.toLowerCase(), false);
      }
      this.$bvModal.hide('bv-modal-addtoken');
    },
    removeTokenFromList(address, symbol) {
      logInfo("TokensExplorer", "removeTokenFromList(" + address + ", '" + symbol + "')?");
      this.$bvModal.msgBoxConfirm('Remove ' + symbol + ' from token list? This can be added back later', {
          title: 'Please Confirm',
          size: 'sm',
          buttonSize: 'sm',
          okVariant: 'danger',
          okTitle: 'Yes',
          cancelTitle: 'No',
          footerClass: 'p-2',
          hideHeaderClose: false,
          centered: true
        })
        .then(value1 => {
          if (value1) {
            logInfo("TokensExplorer", "removeTokenFromList(" + address + ")");
            store.dispatch('tokens/removeToken', address);
            fakeTokenAddress.preventDefault();
          }
        })
        .catch(err => {
          // An error occurred
        });
    },
    resetTokenList() {
      logInfo("TokensExplorer", "resetTokenList()?");
      this.$bvModal.msgBoxConfirm('Reset token list? Tokens can be added back later', {
          title: 'Please Confirm',
          size: 'sm',
          buttonSize: 'sm',
          okVariant: 'danger',
          okTitle: 'Yes',
          cancelTitle: 'No',
          footerClass: 'p-2',
          hideHeaderClose: false,
          centered: true
        })
        .then(value1 => {
          if (value1) {
            logInfo("TokensExplorer", "resetTokenList()");
            store.dispatch('tokens/removeAllTokens', true);
            fakeTokenAddress.preventDefault();
          }
        })
        .catch(err => {
          // An error occurred
        });
    },
    async checkTokenAddress(event) {
      logInfo("TokensExplorer", "checkTokenAddress(" + this.tokenInfo.address + ")");
      if (false) {
        var tokenToolz = web3.eth.contract(TOKENTOOLZABI).at(TOKENTOOLZADDRESS);
        try {
          var _tokenInfo = promisify(cb => tokenToolz.getTokenInfo(this.tokenInfo.address, store.getters['connection/coinbase'], store.getters['optinoFactory/address'], cb));
          var tokenInfo = await _tokenInfo;
          logInfo("TokensExplorer", "checkTokenAddress: " + JSON.stringify(tokenInfo));
          this.tokenInfo.symbol = tokenInfo[4];
          this.tokenInfo.name = tokenInfo[5];
          this.tokenInfo.decimals = parseInt(tokenInfo[0]);
          this.tokenInfo.totalSupply = tokenInfo[1].shift(-this.tokenInfo.decimals).toString();
          this.tokenInfo.balance = tokenInfo[2].shift(-this.tokenInfo.decimals).toString();
          this.tokenInfo.allowance = tokenInfo[3].shift(-this.tokenInfo.decimals).toString();
          this.tokenInfo.source = "search";
          this.tokenInfo.ok = true;
        } catch (e) {
          this.tokenInfo.symbol = null;
          this.tokenInfo.name = null;
          this.tokenInfo.decimals = null;
          this.tokenInfo.totalSupply = null;
          this.tokenInfo.balance = null;
          this.tokenInfo.allowance = null;
          this.tokenInfo.source = null;
          this.tokenInfo.ok = false;
        }
      }
      logInfo("TokensExplorer", "checkTokenAddress: " + JSON.stringify(this.tokenInfo));
    },
    getSomeTokens(fakeTokenAddress) {
      fakeTokenAddress = fakeTokenAddress.toLowerCase();
      logInfo("TokensExplorer", "getSomeTokens(" + JSON.stringify(fakeTokenAddress) + ")");
      this.$bvModal.msgBoxConfirm('Get 1,000 ' + this.tokenData[fakeTokenAddress].symbol + ' tokens from the faucet for testing?', {
          title: 'Please Confirm',
          size: 'sm',
          buttonSize: 'sm',
          okVariant: 'danger',
          okTitle: 'Yes',
          cancelTitle: 'No',
          footerClass: 'p-2',
          hideHeaderClose: false,
          centered: true
        })
        .then(value1 => {
          if (value1) {
            logInfo("TokensExplorer", "getSomeTokens(" + this.tokenData[fakeTokenAddress].symbol + ")");
            var factoryAddress = store.getters['optinoFactory/address']
            logInfo("TokensExplorer", "getSomeTokens(" + fakeTokenAddress + ")");
            web3.eth.sendTransaction({ to: fakeTokenAddress, from: store.getters['connection/coinbase'] }, function(error, tx) {
                logInfo("TokensExplorer", "getSomeTokens() DEBUG2");
              if (!error) {
                logInfo("TokensExplorer", "getSomeTokens() token.approve() tx: " + tx);
                store.dispatch('connection/addTx', tx);
              } else {
                logInfo("TokensExplorer", "getSomeTokens() token.approve() error: ");
                console.table(error);
                store.dispatch('connection/setTxError', error.message);
              }
            });
            fakeTokenAddress.preventDefault();
          }
        })
        .catch(err => {
          // An error occurred
        });
    },
    setAllowance(address, decimals, newAllowance) {
      logInfo("TokensExplorer", "setAllowance(" + address + ", " + decimals + ", " + newAllowance + ")?");
      this.$bvModal.msgBoxConfirm('Set allowance for factory to transfer ' + this.newAllowance + ' tokens?', {
          title: 'Please Confirm',
          size: 'sm',
          buttonSize: 'sm',
          okVariant: 'danger',
          okTitle: 'Yes',
          cancelTitle: 'No',
          footerClass: 'p-2',
          hideHeaderClose: false,
          centered: true
        })
        .then(value1 => {
          if (value1) {
            logInfo("TokensExplorer", "setAllowance(" + address + ", " + decimals + ", " + newAllowance + ")");
            var factoryAddress = store.getters['optinoFactory/address']
            logInfo("TokensExplorer", "setAllowance() factoryAddress=" + factoryAddress);
            var token = web3.eth.contract(ERC20ABI).at(address);
            var allowance = new BigNumber(newAllowance).shift(decimals);
            logInfo("TokensExplorer", "setAllowance() allowance=" + allowance);

            var data = token.approve.getData(factoryAddress, allowance.toString());
            logInfo("TokensExplorer", "data=" + data);

            token.approve(factoryAddress, allowance.toString(), { from: store.getters['connection/coinbase'] }, function(error, tx) {
                logInfo("TokensExplorer", "setAllowance() DEBUG2");
              if (!error) {
                logInfo("TokensExplorer", "setAllowance() token.approve() tx: " + tx);
                store.dispatch('connection/addTx', tx);
              } else {
                logInfo("TokensExplorer", "setAllowance() token.approve() error: ");
                console.table(error);
                store.dispatch('connection/setTxError', error.message);
              }
            });

            event.preventDefault();
          }
        })
        .catch(err => {
          // An error occurred
        });
    },
    async timeoutCallback() {
      // logInfo("TokensExplorer", "timeoutCallback() count: " + this.count);
      // var tokenToolz = web3.eth.contract(TOKENTOOLZABI).at(TOKENTOOLZADDRESS);
      // var fakeTokenContract = web3.eth.contract(FAKETOKENFACTORYABI).at(FAKETOKENFACTORYADDRESS);
      //
      // if (this.count == 0) {
      //   var _fakeTokensLength = promisify(cb => fakeTokenContract.fakeTokensLength.call(cb));
      //   var fakeTokensLength = await _fakeTokensLength;
      //   this.tokenPickerTotalRows = parseInt(COMMONTOKENLIST.length) + parseInt(fakeTokensLength);
      //   // logInfo("TokensExplorer", "timeoutCallback() - tokenPickerTotalRows: " + this.tokenPickerTotalRows);
      //   this.tokenPickerLoadingRow = 0;
      //
      //   for (var i = 0; i < COMMONTOKENLIST.length; i++) {
      //     var address = COMMONTOKENLIST[i];
      //     var _tokenInfo = promisify(cb => tokenToolz.getTokenInfo(address, store.getters['connection/coinbase'], store.getters['optinoFactory/address'], cb));
      //     var tokenInfo = await _tokenInfo;
      //     var symbol = tokenInfo[4];
      //     var name = tokenInfo[5];
      //     var decimals = parseInt(tokenInfo[0]);
      //     var totalSupply = tokenInfo[1].shift(-decimals).toString();
      //     var balance = tokenInfo[2].shift(-decimals).toString();
      //     var allowance = tokenInfo[3].shift(-decimals).toString();
      //     var token = { address: address, symbol: symbol, name: name, decimals: decimals, totalSupply: totalSupply, balance: balance, allowance: allowance, source: "common" };
      //     Vue.set(this.tokenPickerMap, address.toLowerCase(), token);
      //     this.tokenPickerList.push(token);
      //     this.tokenPickerLoadingRow++;
      //     // logInfo("TokensExplorer", "timeoutCallback() - loading " + this.tokenPickerLoadingRow + " of " + this.tokenPickerTotalRows + " " + symbol);
      //   }
      //
      //   for (var fakeTokensIndex = 0; fakeTokensIndex < fakeTokensLength; fakeTokensIndex++) {
      //     var _fakeTokenAddress = promisify(cb => fakeTokenContract.fakeTokens.call(fakeTokensIndex, cb));
      //     var fakeTokenAddress = await _fakeTokenAddress;
      //     var _tokenInfo = promisify(cb => tokenToolz.getTokenInfo(fakeTokenAddress, store.getters['connection/coinbase'], store.getters['optinoFactory/address'], cb));
      //     var tokenInfo = await _tokenInfo;
      //     var symbol = tokenInfo[4];
      //     var name = tokenInfo[5];
      //     var decimals = parseInt(tokenInfo[0]);
      //     var totalSupply = tokenInfo[1].shift(-decimals).toString();
      //     var balance = tokenInfo[2].shift(-decimals).toString();
      //     var allowance = tokenInfo[3].shift(-decimals).toString();
      //     if (symbol.startsWith("f")) {
      //       var token = { address: fakeTokenAddress, symbol: symbol, name: name, decimals: decimals, totalSupply: totalSupply, balance: balance, allowance: allowance, source: "fake" };
      //       Vue.set(this.tokenPickerMap, fakeTokenAddress.toLowerCase(), token);
      //       this.tokenPickerList.push(token);
      //       this.tokenPickerLoadingRow++;
      //       // logInfo("TokensExplorer", "timeoutCallback() - loading " + this.tokenPickerLoadingRow + " of " + this.tokenPickerTotalRows + " " + symbol);
      //     }
      //   }
      //
      //   this.tokenPickerTotalRows = this.tokenPickerLoadingRow;
      //   this.tokenPickerLoadingRow = null;
      //   logDebug("TokensExplorer", "timeoutCallback() - loaded " + this.tokenPickerTotalRows);
      //
      //   // this.tokenPickerList.sort(function(a, b) {
      //   //   return ('' + a.symbol + a.name).localeCompare(b.symbol + b.name);
      //   // });
      //   // logInfo("tokensModule", "timeoutCallback() tokenPickerList: " + JSON.stringify(this.tokenPickerList));
      //
      // } else {
      //   var addresses = Object.keys(this.tokenPickerMap);
      //   var addressesLength = addresses.length;
      //   var chunks = chunkArray(addresses, 10);
      //   for (var chunkIndex in chunks) {
      //     var chunk = chunks[chunkIndex];
      //     var _tokensInfo = promisify(cb => tokenToolz.getTokensInfo(chunk, store.getters['connection/coinbase'], store.getters['optinoFactory/address'], cb));
      //     var tokensInfo = await _tokensInfo;
      //     for (var tokenIndex = 0; tokenIndex < chunk.length; tokenIndex++) {
      //       var address = chunk[tokenIndex].toLowerCase();
      //       var token = this.tokenPickerMap[address];
      //       token.totalSupply = tokensInfo[0][tokenIndex].shift(-token.decimals).toString();
      //       token.balance = tokensInfo[1][tokenIndex].shift(-token.decimals).toString();
      //       token.allowance = tokensInfo[2][tokenIndex].shift(-token.decimals).toString();
      //       Vue.set(this.tokenPickerMap, address, token);
      //     }
      //   }
      //   logDebug("TokensExplorer", "timeoutCallback() - refreshed " + addressesLength);
      //   // logInfo("tokensModule", "timeoutCallback() tokenPickerList: " + JSON.stringify(this.tokenPickerList));
      // }

      this.count++;
      var t = this;
      if (this.reschedule) {
        setTimeout(function() {
          t.timeoutCallback();
        }, 15000);
      }
    },
  },
  mounted() {
    this.reschedule = true;
    this.timeoutCallback();
  },
  destroyed() {
    this.reschedule = false;
  },
};

const tokensExplorerModule = {
  namespaced: true,
  state: {
    params: null,
    executing: false,
    executionQueue: [],
  },
  getters: {
    params: state => state.params,
    executionQueue: state => state.executionQueue,
  },
  mutations: {
    deQueue (state) {
      logDebug("tokensExplorerModule", "deQueue(" + JSON.stringify(state.executionQueue) + ")");
      state.executionQueue.shift();
    },
    updateParams (state, params) {
      state.params = params;
      logDebug("tokensExplorerModule", "updateParams('" + params + "')")
    },
    updateExecuting (state, executing) {
      state.executing = executing;
      logDebug("tokensExplorerModule", "updateExecuting(" + executing + ")")
    },
  },
  actions: {
  },
};
