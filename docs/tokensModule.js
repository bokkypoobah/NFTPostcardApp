const Tokens = {
  template: `
    <div>
      <b-card header-class="warningheader" header="Incorrect Network Detected" v-if="network != 1337 && network != 1 && network != 3">
        <b-card-text>
          Please switch to the Ethereum mainnet in MetaMask and refresh this page
        </b-card-text>
      </b-card>
      <b-button v-b-toggle.contracts size="sm" block variant="outline-info">Contracts</b-button>
      <b-collapse id="contracts" visible class="mt-2">
        <b-card no-body class="border-0" v-if="network == 1337 || network == 1 || network == 3">
          <b-row>
            <b-col cols="4" class="small">ERC-1155 NFT</b-col><b-col class="small truncate" cols="8"><b-link :href="explorer + 'address/' + nftData.nftAddress + '#code'" class="card-link" target="_blank">{{ nftData.nftAddress.substring(0, 12) }}</b-link> <b-link v-b-popover.hover="'View on OpenSea.io'" :href="nftData.openSeaUrl" target="_blank"><img src="images/381114e-opensea-logomark-flat-colored-blue.png" width="20px" /></b-link></b-col>
          </b-row>
          <b-row>
            <b-col cols="4" class="small">Adoption Centre</b-col><b-col class="small truncate" cols="8"><b-link :href="explorer + 'address/' + nftData.adoptionCentreV1Address + '#code'" class="card-link" target="_blank">{{ nftData.adoptionCentreV1Address.substring(0, 12) }}</b-link></b-col>
          </b-row>
        </b-card>
      </b-collapse>
    </div>
  `,
  data: function () {
    return {
      // count: 0,
    }
  },
  computed: {
    network() {
      return store.getters['connection/network'] == null ? null : store.getters['connection/network'].chainId;
    },
    explorer() {
      return store.getters['connection/explorer'];
    },
    coinbase() {
      return store.getters['connection/coinbase'];
    },
    nftData() {
      return store.getters['tokens/nftData'];
    },
  },
  methods: {
  },
  mounted() {
    logDebug("Tokens", "mounted()")
  },
};


const tokensModule = {
  namespaced: true,
  state: {
    nftData: null,
    allTokenIds: null,
    allParents: null,
    allAttributes: null,
    allAncientDNAs: null,

    balances: null,

    params: null,
    executing: false,
  },
  getters: {
    nftData: state => state.nftData,
    allTokenIds: state => state.allTokenIds,
    allParents: state => state.allParents,
    allAttributes: state => state.allAttributes,
    allAncientDNAs: state => state.allAncientDNAs,

    balances: state => state.balances,

    params: state => state.params,
  },
  mutations: {
    updateNFTData(state, nftData) {
      // logInfo("tokensModule", "mutations.updateNFTData(" + JSON.stringify(nftData) + ")");
      state.nftData = nftData;
      if (state.nftData == null) {
        state.allTokenIds = null;
        state.allParents = null;
        state.allAttributes = null;
        state.allAncientDNAs = null;
      } else {
        const allParents = {};
        const allAttributes = {};
        const allAncientDNAs = {};
        for (let tokenId in Object.keys(state.nftData.tokens)) {
          const token = state.nftData.tokens[tokenId];
          for (let parentIndex in token.parents) {
            const parent = token.parents[parentIndex];
            if (allParents[parent] === undefined) {
              allParents[parent] = 1;
            }
          }
          for (let attributeIndex in token.attributes) {
            const attribute = token.attributes[attributeIndex];
            if (allAttributes[attribute] === undefined) {
              allAttributes[attribute] = 1;
            }
          }
          for (let ancientDNAIndex in token.ancientDNA) {
            let ancientDNA = token.ancientDNA[ancientDNAIndex];
            if (allAncientDNAs[ancientDNA] === undefined) {
              allAncientDNAs[ancientDNA] = 1;
            }
          }
        }
        state.allTokenIds = Object.keys(state.nftData.tokens).sort(function(a, b) { return a - b; });
        state.allParents = Object.keys(allParents).sort();
        state.allAttributes = Object.keys(allAttributes).sort();
        state.allAncientDNAs = Object.keys(allAncientDNAs).sort();
      }
    },
    updateBalances(state, balances) {
      state.balances = balances;
      logInfo("tokensModule", "updateBalances('" + JSON.stringify(balances) + "')")
    },
    updateParams(state, params) {
      state.params = params;
      logDebug("tokensModule", "updateParams('" + params + "')")
    },
    updateExecuting(state, executing) {
      state.executing = executing;
      logDebug("tokensModule", "updateExecuting(" + executing + ")")
    },
  },
  actions: {
    updateNFTData(context, nftData) {
      // logInfo("tokensModule", "actions.updateNFTData(" + JSON.stringify(nftData) + ")");
      context.commit('updateNFTData', nftData);
    },
    // Called by Connection.execWeb3()
    async execWeb3({ state, commit, rootState }, { count, networkChanged, blockChanged, coinbaseChanged }) {
      logInfo("tokensModule", "execWeb3() start[" + count + ", " + JSON.stringify(rootState.route.params) + ", " + networkChanged + ", " + blockChanged + ", " + coinbaseChanged+ "]");
      if (!state.executing) {
        commit('updateExecuting', true);
        logInfo("tokensModule", "execWeb3() executing[" + count + ", " + JSON.stringify(rootState.route.params) + ", " + networkChanged + ", " + blockChanged + ", " + coinbaseChanged + "]");

        var paramsChanged = false;
        if (state.params != rootState.route.params.param) {
          logInfo("tokensModule", "execWeb3() params changed from " + state.params + " to " + JSON.stringify(rootState.route.params.param));
          paramsChanged = true;
          commit('updateParams', rootState.route.params.param);
        }

        if (networkChanged || blockChanged || coinbaseChanged || paramsChanged) {

          // You can also use an ENS name for the contract address
          const nftAddress = state.nftData.nftAddress;
          logInfo("tokensModule", "execWeb3() nftAddress: " + nftAddress);

          const nftAbi = ERC1155NFTABI;
          // logInfo("tokensModule", "execWeb3() nftAbi: " + JSON.stringify(nftAbi));

          // // The ERC-20 Contract ABI, which is a common contract interface
          // // for tokens (this is the Human-Readable ABI format)
          // const daiAbi = [
          //   // Some details about the token
          //   "function name() view returns (string)",
          //   "function symbol() view returns (string)",
          //
          //   // Get the account balance
          //   "function balanceOf(address) view returns (uint)",
          //
          //   // Send some of your tokens to someone else
          //   "function transfer(address to, uint amount)",
          //
          //   // An event triggered whenever anyone transfers to someone else
          //   "event Transfer(address indexed from, address indexed to, uint amount)"
          // ];
          //
          // // The Contract object
          const nftContract = new ethers.Contract(nftAddress, nftAbi, store.getters['connection/connection'].provider);
          // logInfo("tokensModule", "execWeb3() nftContract: " + JSON.stringify(nftContract));

          const tokenIds = store.getters['tokens/allTokenIds'];
          const accounts = [];
          for (let i = 0; i < tokenIds.length; i++) {
            accounts.push(store.getters['connection/coinbase']);
          }
          logInfo("tokensModule", "execWeb3() tokens/allTokenIds: " + JSON.stringify(store.getters['tokens/allTokenIds']));

          const balanceOfs = await nftContract.balanceOfBatch(accounts, tokenIds);
          logInfo("tokensModule", "execWeb3() balanceOfs: " + JSON.stringify(balanceOfs.map((x) => { return x.toString(); })));
          commit('updateBalances', balanceOfs.map((x) => { return x.toString(); }));

          // var tokenToolz = web3.eth.contract(TOKENTOOLZABI).at(TOKENTOOLZADDRESS);
          //
          // // TODO: Load up STARTUPTOKENLIST ?
          //
          // // logInfo("tokensModule", "execWeb3() state.tokenData: " + JSON.stringify(state.tokenData));
          // if (count == 1) {
          //   for (var address in state.tokenData) {
          //     var token = state.tokenData[address];
          //     var _tokenInfo = promisify(cb => tokenToolz.getTokenInfo(token.address, store.getters['connection/coinbase'], store.getters['optinoFactory/address'], cb));
          //     var tokenInfo = await _tokenInfo;
          //     var symbol = tokenInfo[4];
          //     var name = tokenInfo[5];
          //     var decimals = parseInt(tokenInfo[0]);
          //     var totalSupply = tokenInfo[1].shift(-decimals).toString();
          //     var balance = tokenInfo[2].shift(-decimals).toString();
          //     var allowance = tokenInfo[3].shift(-decimals).toString();
          //     commit('updateToken', { address: token.address, symbol: symbol, name: name, decimals: decimals, totalSupply: totalSupply, balance: balance, allowance: allowance, source: token.source } );
          //   }
          // } else {
          //   var addresses = Object.keys(state.tokenData);
          //   var addressesLength = addresses.length;
          //   var chunks = chunkArray(addresses, 10);
          //   for (var chunkIndex in chunks) {
          //     var chunk = chunks[chunkIndex];
          //     var _tokensInfo = promisify(cb => tokenToolz.getTokensInfo(chunk, store.getters['connection/coinbase'], store.getters['optinoFactory/address'], cb));
          //     var tokensInfo = await _tokensInfo;
          //     for (var tokenIndex = 0; tokenIndex < chunk.length; tokenIndex++) {
          //       var address = chunk[tokenIndex].toLowerCase();
          //       var token = state.tokenData[address];
          //       commit('updateToken', { address: token.address, symbol: token.symbol, name: token.name, decimals: token.decimals, totalSupply: tokensInfo[0][tokenIndex].shift(-token.decimals).toString(), balance: tokensInfo[1][tokenIndex].shift(-token.decimals).toString(), allowance: tokensInfo[2][tokenIndex].shift(-token.decimals).toString(), source: token.source });
          //     }
          //   }
          //   // logInfo("tokensModule", "timeoutCallback() - refreshed " + addressesLength);
          // }
        }
        commit('updateExecuting', false);
        logDebug("tokensModule", "execWeb3() end[" + count + ", " + networkChanged + ", " + blockChanged + ", " + coinbaseChanged + "]");
      } else {
        logDebug("tokensModule", "execWeb3() already executing[" + count + ", " + networkChanged + ", " + blockChanged + ", " + coinbaseChanged + "]");
      }
    },
  },
};
