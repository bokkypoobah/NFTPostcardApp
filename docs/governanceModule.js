const Governance = {
  template: `
    <div>
      <b-card header-class="warningheader" header="Incorrect Network Detected" v-if="network != 1337 && network != 3">
        <b-card-text>
          Please switch to the Ropsten testnet in MetaMask and refresh this page
        </b-card-text>
      </b-card>
      <b-button v-b-toggle.tokens size="sm" block variant="outline-info">Governance: {{ Object.keys(proposals).length }}</b-button>
      <b-collapse id="tokens" visible class="mt-2">
        <b-card no-body class="border-0" v-if="network == 1337 || network == 3">
          <b-row>
            <b-col cols="4" class="small">Governance</b-col><b-col class="small truncate" cols="8"><b-link :href="explorer + 'address/' + address + '#code'" class="card-link" target="_blank">{{ address }}</b-link></b-col>
          </b-row>
          <b-row>
            <b-col cols="4" class="small">Token</b-col><b-col class="small truncate" cols="8"><b-link :href="explorer + 'address/' + token + '#code'" class="card-link" target="_blank">{{ token }}</b-link></b-col>
          </b-row>
          <b-row v-if="govData.rewardsPerSecond">
            <b-col cols="4" class="small">Rewards/s</b-col><b-col class="small truncate" cols="8"><b-link :href="explorer + 'address/' + address + '#readContract'" class="card-link" target="_blank">{{ govData.rewardsPerSecond.shift(-18) }}</b-link></b-col>
          </b-row>
          <b-row v-if="govData.proposalCost">
            <b-col cols="4" class="small">Proposal cost</b-col><b-col class="small truncate" cols="8"><b-link :href="explorer + 'address/' + address + '#readContract'" class="card-link" target="_blank">{{ govData.proposalCost.shift(-18) }}</b-link></b-col>
          </b-row>
          <b-row v-if="govData.proposalThreshold">
            <b-col cols="4" class="small">Prop. threshold</b-col><b-col class="small truncate" cols="8"><b-link :href="explorer + 'address/' + address + '#readContract'" class="card-link" target="_blank">{{ govData.proposalThreshold.shift(-4) }}%</b-link></b-col>
          </b-row>
          <b-row v-if="govData.quorum">
            <b-col cols="4" class="small">Quorum</b-col><b-col class="small truncate" cols="8"><b-link :href="explorer + 'address/' + address + '#readContract'" class="card-link" target="_blank">{{ govData.quorum.shift(-4) }}%</b-link></b-col>
          </b-row>
          <b-row v-if="govData.votingDuration">
            <b-col cols="4" class="small">Voting Duration</b-col><b-col class="small truncate" cols="8"><b-link :href="explorer + 'address/' + address + '#readContract'" class="card-link" target="_blank">{{ govData.votingDuration }} seconds</b-link></b-col>
          </b-row>
          <b-row v-if="govData.executeDelay">
            <b-col cols="4" class="small">Execute Delay</b-col><b-col class="small truncate" cols="8"><b-link :href="explorer + 'address/' + address + '#readContract'" class="card-link" target="_blank">{{ govData.executeDelay }} seconds</b-link></b-col>
          </b-row>
          <b-row v-if="govData.rewardPool">
            <b-col cols="4" class="small">Reward Pool</b-col><b-col class="small truncate" cols="8"><b-link :href="explorer + 'address/' + address + '#readContract'" class="card-link" target="_blank">{{ govData.rewardPool.shift(-18) }}</b-link></b-col>
          </b-row>
          <b-row v-if="govData.totalVotes">
            <b-col cols="4" class="small">Total Votes</b-col><b-col class="small truncate" cols="8"><b-link :href="explorer + 'address/' + address + '#readContract'" class="card-link" target="_blank">{{ govData.totalVotes.shift(-18) }}</b-link></b-col>
          </b-row>
          <b-row v-if="govData.proposalCount">
            <b-col cols="4" class="small">Proposal count</b-col><b-col class="small truncate" cols="8"><b-link :href="explorer + 'address/' + address + '#readContract'" class="card-link" target="_blank">{{ govData.proposalCount }}</b-link></b-col>
          </b-row>
          <!--
          <b-row v-for="(token) in tokenDataSorted" v-bind:key="token.tokenAddress">
            <b-col cols="4" class="small truncate mb-1" style="font-size: 80%" v-b-popover.hover="token.symbol + ' - ' + token.name + ' totalSupply ' + token.totalSupply + ' decimals ' + token.decimals">
              <b-link :href="explorer + 'token/' + token.tokenAddress" class="card-link" target="_blank">{{ token.symbol }}</b-link>
            </b-col>
            <b-col cols="4" class="small truncate text-right mb-1"  style="font-size: 60%" v-b-popover.hover="'Balance'">
              {{ formatMaxDecimals(token.balance, 4) }}
            </b-col>
            <b-col cols="4" class="small truncate text-right mb-1"  style="font-size: 60%" v-b-popover.hover="'Allowance'">
              {{ formatMaxDecimals(token.allowance, 4) }}
            </b-col>
          </b-row>
          -->
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
      return store.getters['connection/network'];
    },
    explorer() {
      return store.getters['connection/explorer'];
    },
    address() {
      return store.getters['governance/address'];
    },
    govData() {
      return store.getters['governance/govData'];
    },
    token() {
      return store.getters['governance/govData'].token;
    },

    // address public xs2token;
    // uint256 public rewardsPerSecond;
    //
    // uint256 public proposalCost;
    // uint256 public proposalThreshold;
    // uint256 public quorum;
    // uint256 public votingDuration;
    // uint256 public executeDelay;
    //
    // uint256 public rewardPool;
    // uint256 public totalVotes;
    // mapping(address => Stake) public stakes; // Staked tokens per address
    //
    // uint256 public proposalCount;
    // mapping(uint256 => Proposal) public proposals;

    proposals() {
      return store.getters['governance/proposals'];
    },
    coinbase() {
      return store.getters['connection/coinbase'];
    },
    // tokenDataSorted() {
    //   var results = [];
    //   var tokenData = store.getters['tokens/tokenData'];
    //   for (token in tokenData) {
    //     if (/^\w+$/.test(tokenData[token].symbol)) {
    //       results.push(tokenData[token]);
    //     }
    //   }
    //   results.sort(function(a, b) {
    //     return ('' + a.symbol).localeCompare(b.symbol);
    //   });
    //   return results;
    // },
  },
  methods: {
    formatMaxDecimals(value, decimals) {
      return parseFloat(new BigNumber(value).toFixed(decimals));
    },
  },
  mounted() {
    logDebug("Governance", "mounted()")
    if (localStorage.getItem('tokenData')) {
      var tokenData = JSON.parse(localStorage.getItem('tokenData'));
      // logInfo("Tokens", "Restoring tokenData: " + JSON.stringify(tokenData));
      for (var address in tokenData) {
        var token = tokenData[address];
        // logInfo("Tokens", "Restoring token: " + JSON.stringify(token));
        store.dispatch('tokens/updateToken', token);
      }
    }
  },
};


const governanceModule = {
  namespaced: true,
  state: {
    address: GOVTOKENADDRESS,
    govData: {},
    proposals: {},
    tokenData: {},

    params: null,
    executing: false,
  },
  getters: {
    address: state => state.address,
    govData: state => state.govData,
    proposals: state => state.proposals,
    tokenData: state => state.tokenData,

    params: state => state.params,
  },
  mutations: {
    updateToken(state, token) {
      // logInfo("governanceModule", "mutations.updateToken(" + token + ")");
      Vue.set(state.govData, 'token', token);
    },
    updateRewardsPerSecond(state, rewardsPerSecond) {
      // logInfo("governanceModule", "mutations.updateRewardsPerSecond(" + rewardsPerSecond + ")");
      Vue.set(state.govData, 'rewardsPerSecond', rewardsPerSecond);
    },
    updateProposalCost(state, proposalCost) {
      // logInfo("governanceModule", "mutations.updateProposalCost(" + proposalCost + ")");
      Vue.set(state.govData, 'proposalCost', proposalCost);
    },
    updateProposalThreshold(state, proposalThreshold) {
      // logInfo("governanceModule", "mutations.updateProposalThreshold(" + proposalThreshold + ")");
      Vue.set(state.govData, 'proposalThreshold', proposalThreshold);
    },
    updateQuorum(state, quorum) {
      // logInfo("governanceModule", "mutations.updateQuorum(" + quorum + ")");
      Vue.set(state.govData, 'quorum', quorum);
    },
    updateVotingDuration(state, votingDuration) {
      // logInfo("governanceModule", "mutations.updateVotingDuration(" + votingDuration + ")");
      Vue.set(state.govData, 'votingDuration', votingDuration);
    },
    updateExecuteDelay(state, executeDelay) {
      // logInfo("governanceModule", "mutations.updateExecuteDelay(" + executeDelay + ")");
      Vue.set(state.govData, 'executeDelay', executeDelay);
    },
    updateRewardPool(state, rewardPool) {
      // logInfo("governanceModule", "mutations.updateRewardPool(" + rewardPool + ")");
      Vue.set(state.govData, 'rewardPool', rewardPool);
    },
    updateTotalVotes(state, totalVotes) {
      // logInfo("governanceModule", "mutations.updateTotalVotes(" + totalVotes + ")");
      Vue.set(state.govData, 'totalVotes', totalVotes);
    },
    updateProposalCount(state, proposalCount) {
      // logInfo("governanceModule", "mutations.updateProposalCount(" + proposalCount + ")");
      Vue.set(state.govData, 'proposalCount', proposalCount);
    },
    // updateToken(state, token) {
    //   // logInfo("governanceModule", "mutations.updateToken(" + JSON.stringify(token) + ")");
    //   var currentToken = state.tokenData[token.address.toLowerCase()];
    //   if (typeof currentToken === 'undefined' ||
    //     currentToken.address != token.address ||
    //     currentToken.symbol != token.symbol ||
    //     currentToken.name != token.name ||
    //     currentToken.decimals != token.decimals ||
    //     currentToken.totalSupply != token.totalSupply ||
    //     currentToken.balance != token.balance ||
    //     currentToken.allowance != token.allowance ||
    //     currentToken.source != token.source) {
    //     Vue.set(state.tokenData, token.address.toLowerCase(), {address: token.address, symbol: token.symbol, name: token.name, decimals: token.decimals, totalSupply: token.totalSupply, balance: token.balance, allowance: token.allowance, source: token.source });
    //     // logInfo("governanceModule", "mutations.updateToken - state.tokenData: " +  JSON.stringify(state.tokenData));
    //     localStorage.setItem('tokenData', JSON.stringify(state.tokenData));
    //   // } else {
    //   //   logInfo("governanceModule", "mutations.updateToken - NOT UPDATED state.tokenData: " +  JSON.stringify(state.tokenData));
    //   }
    // },
    removeToken(state, address) {
      // logInfo("governanceModule", "mutations.removeToken(" + address + ")");
      Vue.delete(state.tokenData, address.toLowerCase());
      localStorage.setItem('tokenData', JSON.stringify(state.tokenData));
    },
    removeAllTokens(state, blah) {
      // logInfo("governanceModule", "mutations.removeAllTokens()");
      state.tokenData = {};
      localStorage.removeItem('tokenData');
    },
    updateParams(state, params) {
      state.params = params;
      logDebug("governanceModule", "updateParams('" + params + "')")
    },
    updateExecuting(state, executing) {
      state.executing = executing;
      logDebug("governanceModule", "updateExecuting(" + executing + ")")
    },
  },
  actions: {
    // updateProposalCount(context, proposalCount) {
    //   logInfo("governanceModule", "actions.updateProposalCount(" + proposalCount + ")");
    //   context.commit('updateProposalCount', token);
    // },
    // updateToken(context, token) {
    //   // logInfo("governanceModule", "actions.updateToken(" + JSON.stringify(token) + ")");
    //   context.commit('updateToken', token);
    // },
    // removeToken(context, address) {
    //   // logInfo("governanceModule", "actions.removeToken(" + address + ")");
    //   context.commit('removeToken', address);
    // },
    // removeAllTokens(context, blah) {
    //   // logInfo("governanceModule", "actions.removeAllTokens(" + blah + ")");
    //   context.commit('removeAllTokens', blah);
    // },
    // Called by Connection.execWeb3()
    async execWeb3({ state, commit, rootState }, { count, networkChanged, blockChanged, coinbaseChanged }) {
      logDebug("governanceModule", "execWeb3() start[" + count + ", " + JSON.stringify(rootState.route.params) + ", " + networkChanged + ", " + blockChanged + ", " + coinbaseChanged+ "]");
      if (!state.executing) {
        commit('updateExecuting', true);
        logInfo("governanceModule", "execWeb3() start[" + count + ", " + JSON.stringify(rootState.route.params) + ", " + networkChanged + ", " + blockChanged + ", " + coinbaseChanged + "]");

        var paramsChanged = false;
        if (state.params != rootState.route.params.param) {
          logDebug("governanceModule", "execWeb3() params changed from " + state.params + " to " + JSON.stringify(rootState.route.params.param));
          paramsChanged = true;
          commit('updateParams', rootState.route.params.param);
        }

        if (networkChanged || blockChanged || coinbaseChanged || paramsChanged) {

          var governanceContract = web3.eth.contract(GOVTOKENABI).at(state.address);

          var _xs2token = promisify(cb => governanceContract.xs2token(cb));
          var xs2token = await _xs2token;
          // logInfo("governanceModule", "execWeb3() xs2token " + xs2token);
          commit('updateToken', xs2token);

          var _rewardsPerSecond = promisify(cb => governanceContract.rewardsPerSecond(cb));
          var rewardsPerSecond = await _rewardsPerSecond;
          // logInfo("governanceModule", "execWeb3() rewardsPerSecond " + rewardsPerSecond);
          commit('updateRewardsPerSecond', rewardsPerSecond);

          var _proposalCost = promisify(cb => governanceContract.proposalCost(cb));
          var proposalCost = await _proposalCost;
          // logInfo("governanceModule", "execWeb3() proposalCost " + proposalCost);
          commit('updateProposalCost', proposalCost);

          var _proposalThreshold = promisify(cb => governanceContract.proposalThreshold(cb));
          var proposalThreshold = await _proposalThreshold;
          // logInfo("governanceModule", "execWeb3() proposalThreshold " + proposalThreshold);
          commit('updateProposalThreshold', proposalThreshold);

          var _quorum = promisify(cb => governanceContract.quorum(cb));
          var quorum = await _quorum;
          // logInfo("governanceModule", "execWeb3() quorum " + quorum);
          commit('updateQuorum', quorum);

          var _votingDuration = promisify(cb => governanceContract.votingDuration(cb));
          var votingDuration = await _votingDuration;
          // logInfo("governanceModule", "execWeb3() votingDuration " + votingDuration);
          commit('updateVotingDuration', votingDuration);

          var _executeDelay = promisify(cb => governanceContract.executeDelay(cb));
          var executeDelay = await _executeDelay;
          // logInfo("governanceModule", "execWeb3() executeDelay " + executeDelay);
          commit('updateExecuteDelay', executeDelay);

          var _rewardPool = promisify(cb => governanceContract.rewardPool(cb));
          var rewardPool = await _rewardPool;
          // logInfo("governanceModule", "execWeb3() rewardPool " + rewardPool);
          commit('updateRewardPool', rewardPool);

          var _totalVotes = promisify(cb => governanceContract.totalVotes(cb));
          var totalVotes = await _totalVotes;
          // logInfo("governanceModule", "execWeb3() totalVotes " + totalVotes);
          commit('updateTotalVotes', totalVotes);

          var _proposalCount = promisify(cb => governanceContract.proposalCount(cb));
          var proposalCount = await _proposalCount;
          logInfo("governanceModule", "execWeb3() proposalCount " + proposalCount);
          commit('updateProposalCount', proposalCount);

          // address public xs2token;
          // uint256 public rewardsPerSecond;
          //
          // uint256 public proposalCost;
          // uint256 public proposalThreshold;
          // uint256 public quorum;
          // uint256 public votingDuration;
          // uint256 public executeDelay;
          //
          // uint256 public rewardPool;
          // uint256 public totalVotes;
          // mapping(address => Stake) public stakes; // Staked tokens per address
          //
          // uint256 public proposalCount;
          // mapping(uint256 => Proposal) public proposals;



          var tokenToolz = web3.eth.contract(TOKENTOOLZABI).at(TOKENTOOLZADDRESS);

          // TODO: Load up STARTUPTOKENLIST ?

          // logInfo("governanceModule", "execWeb3() state.tokenData: " + JSON.stringify(state.tokenData));
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
          //   // logInfo("governanceModule", "timeoutCallback() - refreshed " + addressesLength);
          // }
        }
        commit('updateExecuting', false);
        logDebug("governanceModule", "execWeb3() end[" + count + ", " + networkChanged + ", " + blockChanged + ", " + coinbaseChanged + "]");
      } else {
        logDebug("governanceModule", "execWeb3() already executing[" + count + ", " + networkChanged + ", " + blockChanged + ", " + coinbaseChanged + "]");
      }
    },
  },
};
