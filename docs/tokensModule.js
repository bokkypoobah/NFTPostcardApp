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
            <b-col cols="4" class="small">ERC-1155 NFT</b-col>
            <b-col class="small truncate" cols="8">
              <b-link :href="explorer + 'address/' + nftData.nftAddress + '#code'" class="card-link" target="_blank">{{ nftData.nftAddress == null ? '' : (nftData.nftAddress.substring(0, 10) + '...') }}</b-link>
              <span class="float-right"><b-link v-b-popover.hover="'View on OpenSea.io'" :href="nftData.openSeaUrl" target="_blank"><img src="images/381114e-opensea-logomark-flat-colored-blue.png" width="20px" /></b-link> <b-link :href="'https://rarible.com/collection/'+ nftData.nftAddress" v-b-popover.hover="'View on Rarible.com'" target="_blank"><img src="images/rarible_feb7c08ba34c310f059947d23916f76c12314e85.png" height="20px" /></b-link>
              </span>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="4" class="small">Adoption Centre</b-col><b-col class="small truncate" cols="8"><b-link :href="explorer + 'address/' + nftData.adoptionCentreV1Address + '#code'" class="card-link" target="_blank">{{ nftData.adoptionCentreV1Address == null ? '' : (nftData.adoptionCentreV1Address.substring(0, 10) + '...') }}</b-link></b-col>
          </b-row>
        </b-card>
      </b-collapse>
      <b-button v-b-toggle.library size="sm" block variant="outline-info">Library</b-button>
      <b-collapse id="library" visible class="mt-2">
        <b-card no-body class="border-0">
          <b-row>
            <b-col cols="4" class="small">Collections</b-col><b-col class="small truncate" cols="8">{{ Object.keys(collections).length }}</b-col>
          </b-row>
          <b-row>
            <b-col cols="4" class="small">Assets</b-col><b-col class="small truncate" cols="8">{{ Object.keys(assets).length }}</b-col>
          </b-row>
        </b-card>
      </b-collapse>
    </div>
  `,
  data: function () {
    return {
      count: 0,
      reschedule: true,
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
    collections() {
      return store.getters['tokens/collections'];
    },
    collectionList() {
      return store.getters['tokens/collectionList'];
    },
    assets() {
      return store.getters['tokens/assets'];
    },
    nftData() {
      return store.getters['tokens/nftData'];
    },
  },
  methods: {
    async timeoutCallback() {
      logInfo("Tokens", "timeoutCallback() count: " + this.count);

      this.count++;
      var t = this;

      // logInfo("Tokens", "before tokens/loadLibrary");
      await store.dispatch('tokens/loadLibrary');
      // logInfo("Tokens", "after tokens/loadLibrary");

      if (this.reschedule) {
        setTimeout(function() {
          t.timeoutCallback();
        }, 600000);
      }
    },
  },
  beforeDestroy() {
    logInfo("Tokens", "beforeDestroy()");
  },
  mounted() {
    logInfo("Tokens", "mounted()");
    this.reschedule = true;
    logInfo("Tokens", "Calling timeoutCallback()");
    this.timeoutCallback();
  },
};


const tokensModule = {
  namespaced: true,
  state: {
    collections: {},
    collectionList: [],
    assets: {},
    touched: {},

    nftData: null,
    allTokenIds: null,
    allParents: null,
    allAttributes: null,
    allAncientDNAs: null,

    selectedId: null,
    balances: null,

    params: null,
    executing: false,
  },
  getters: {
    collections: state => state.collections,
    collectionList: state => state.collectionList,
    assets: state => state.assets,
    nftData: state => state.nftData,
    allTokenIds: state => state.allTokenIds,
    allParents: state => state.allParents,
    allAttributes: state => state.allAttributes,
    allAncientDNAs: state => state.allAncientDNAs,

    selectedId: state => state.selectedId,
    balances: state => state.balances,

    params: state => state.params,
  },
  mutations: {
    updateAssetsPreparation(state) {
      const keys = Object.keys(state.assets);
      for (let i = 0; i < keys.length; i++) {
        state.touched[keys[i]] = 0;
      }
    },
    updateAssetsCompletion(state) {
      for (let key in state.touched) {
        const value = state.touched[key];
        if (value == 0) {
          Vue.delete(state.collections[state.assets[key].contract].assets, key);
          if (Object.keys(state.collections[state.assets[key].contract].assets).length == 0) {
            Vue.delete(state.collections, state.assets[key].contract);
          }
          Vue.delete(state.assets, key);
        }
      }
      state.touched = {};
      // state.collectionList = Object.keys(state.collections).sort(function(a, b) {
      //   return (state.collections[a].name).localeCompare(state.collections[b].name);
      // });
      // for (const contract in state.collectionList) {
      //   const collection = state.collections[state.collectionList[contract]];
      //   collection.assetList = Object.keys(collection.assets).sort(function(a, b) {
      //     return (state.assets[a].name).localeCompare(state.assets[b].name);
      //   });
      // }

      // for (const contract in state.collectionList) {
      //   const collection = state.collections[state.collectionList[contract]];
      //   logInfo("tokensModule", "mutations.updateAssetsCompletion() - collection: " + JSON.stringify(collection, null, 2));
      //   for (let assetKeyIndex in collection.assetList) {
      //     const assetKey = collection.assetList[assetKeyIndex];
      //     const asset = state.assets[assetKey];
      //     logInfo("tokensModule", "mutations.updateAssetsCompletion()   - asset: " + JSON.stringify(asset));
      //   }
      // }
    },
    updateAssets(state, { owner, permissions, data }) {
      // logInfo("tokensModule", "mutations.updateAssets(" + JSON.stringify(permissions) + ", " + JSON.stringify(data).substring(0, 100) + ")");
      if (data && data.assets && data.assets.length > 0) {
        for (let assetIndex = 0; assetIndex < data.assets.length; assetIndex++) {
          const asset = data.assets[assetIndex];
          let assetOwner = asset.owner.address.toLowerCase();
          if (assetOwner == ADDRESS0) {
            assetOwner = owner.toLowerCase();
            console.log("assetOwner is " + ADDRESS0 + " so set to " + assetOwner);
          }
          const contract = asset.asset_contract.address.toLowerCase();
          console.log("Asset: " + JSON.stringify(asset.name || '(no name)') + ", contract: " + contract);
          // console.log(JSON.stringify(asset, null, 2));
          let permission = permissions[assetOwner + ':' + contract];
          if (permission == null) {
            permission = permissions[assetOwner + ':' + null];
          }
          console.log("  assetOwner: " + assetOwner + ", contract: " + contract + " => permission: " + JSON.stringify(permission));
          if (permission && (permission.permission == 1 || permission.permission == 2)) {
            var traits = [];
            for (let traitIndex = 0; traitIndex < asset.traits.length; traitIndex++) {
              const trait = asset.traits[traitIndex];
              // TODO: Sanitize
              traits.push({ type: trait.trait_type, value: trait.value });
            }
            var collection = state.collections[contract];
            if (collection == null) {
              Vue.set(state.collections, contract, {
                contract: contract,
                name: asset.collection.name,
                slug: asset.collection.slug,
                bannerImageUrl: asset.collection.banner_image_url,
                imageUrl: asset.collection.image_url,
                externalUrl: asset.collection.external_url,
                assets: {},
                assetList: []
              });
              collection = state.collections[contract];
              console.log("New collection: " + JSON.stringify(collection));
            }
            const key = contract + "." + asset.token_id;
            state.touched[key] = 1;
            // console.log(JSON.stringify(asset));
            var record = {
              key: key,
              permission: permission.permission,
              curation: permission.curation,
              contract: contract,
              tokenId: asset.token_id,
              owner: assetOwner,
              name: asset.name || '(null)',
              imageUrl: asset.image_url,
              externalLink: asset.external_link,
              permalink: asset.permalink,
              traits: traits
            }
            Vue.set(state.assets, key, record);
            Vue.set(state.collections[contract].assets, key, true);
            // console.log(JSON.stringify(record, null, 2));
          }
        }
        state.collectionList = Object.keys(state.collections).sort(function(a, b) {
          return ('' + state.collections[a].name).localeCompare('' + state.collections[b].name);
        });
        for (const contract in state.collectionList) {
          const collection = state.collections[state.collectionList[contract]];
          collection.assetList = Object.keys(collection.assets).sort(function(a, b) {
            return ('' + state.assets[a].name).localeCompare('' + state.assets[b].name);
          });
        }
      }
    },
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
    updateSelectedId(state, selectedId) {
      state.selectedId = selectedId;
      logDebug("tokensModule", "updateSelectedId('" + JSON.stringify(selectedId) + "')")
    },
    updateBalances(state, balances) {
      state.balances = balances;
      logDebug("tokensModule", "updateBalances('" + JSON.stringify(balances) + "')")
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
    async loadLibrary(context) {
      logInfo("tokensModule", "actions.loadLibrary()");

      // const defaultRegistryEntries = [
      //   ["0xBeeef66749B64Afe43Bbc9475635Eb510cFE4922", "0xBeeef66749B64Afe43Bbc9475635Eb510cFE4922", "0xBEEEf7786F0681Dd80651e4F05253dB8C9Fb74d1", "0x00000217d2795F1Da57e392D2a5bC87125BAA38D"],
      //   ["0x31385d3520bCED94f77AaE104b406994D8F2168C", null, null, "0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB"],
      //   [2, 1, 2, 2],
      //   [1, 1, 1, 1],
      // ];

      // enum Permission { None, View, ComposeWith, Permission3, Permission4, Permission5, Permission6, Permission7 }
      // enum Curation { None, LoadByDefault, DisableView, DisableComposeWith, Curation4, Curation5, Curation6, Curation7 }

      // function getEntries() public view returns (address[] memory accounts, address[] memory tokens, Permission[] memory permissions, Curation[] memory curations) {
      //     uint length = entries.length();
      //     accounts = new address[](length);
      //     tokens = new address[](length);
      //     permissions = new Permission[](length);
      //     curations = new Curation[](length);
      //     for (uint i = 0; i < length; i++) {
      //         Entries.Entry memory entry = entries.entries[entries.index[i]];
      //         accounts[i] = entry.account;
      //         tokens[i] = entry.token;
      //         permissions[i] = entry.permission;
      //         curations[i] = entry.curation;
      //     }
      // }

      // const defaultRegistryEntries = [
      //   ["0xBeeef66749B64Afe43Bbc9475635Eb510cFE4922", "0xBeeef66749B64Afe43Bbc9475635Eb510cFE4922", "0x00000217d2795F1Da57e392D2a5bC87125BAA38D", "0x00000217d2795F1Da57e392D2a5bC87125BAA38D"],
      //   ["0x31385d3520bCED94f77AaE104b406994D8F2168C", null, null, "0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB"],
      //   [2, 1, 2, 1],
      //   [1, 1, 1, 1],
      // ];
      const defaultRegistryEntries = [
        ["0x00000217d2795F1Da57e392D2a5bC87125BAA38D", "0x00000217d2795F1Da57e392D2a5bC87125BAA38D"],
        [null, "0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB"],
        [2, 1],
        [1, 1],
      ];
      // logInfo("tokensModule", "actions.loadLibrary() - defaultRegistryEntries[0].length: " + defaultRegistryEntries[0].length);

      const owners = {};
      const permissions = {};
      const assets = {};
      let i;
      for (i = 0; i < defaultRegistryEntries[0].length; i++) {
        const owner = defaultRegistryEntries[0][i].toLowerCase();
        const contract = defaultRegistryEntries[1][i] == null ? null : defaultRegistryEntries[1][i].toLowerCase();
        const permission = defaultRegistryEntries[2][i];
        const curation = defaultRegistryEntries[3][i];

        if (owners[owner] == null) {
          owners[owner] = [contract];
        } else {
          owners[owner].push(contract);
        }
        permissions[owner + ':' + contract] = { permission: permission, curation: curation };
        // logInfo("tokensModule", "  owner: " + owner + ", contract: " + contract + ", permission: " + permission + ", curation: " + curation);
      }
      // logInfo("tokensModule", "actions.loadLibrary() - owners: " + JSON.stringify(owners));
      logInfo("tokensModule", "actions.loadLibrary() - permissions: " + JSON.stringify(permissions));

      context.commit('updateAssetsPreparation');
      for (const [owner, ownersContracts] of Object.entries(owners)) {
        // console.log(owner, ownersContracts);
        let hasNull = false;
        for (let i = 0; i < ownersContracts.length; i++) {
          let contract = ownersContracts[i];
          if (contract == null) {
            hasNull = true;
          }
          // console.log(" - " + contract);
        }
        const PAGESIZE = 50; // Default 20, max 50
        const DELAY = 1000; // Millis
        const delay = ms => new Promise(res => setTimeout(res, ms));
        // Do all
        if (hasNull) {
          // console.log("Retrieve all by owner %s", owner);
          // this.assets = [];
          // await delay(DELAY);
          let completed = false;
          let page = 0;
          while (!completed) {
            const offset = PAGESIZE * page;
            const url = "https://api.opensea.io/api/v1/assets?owner=" + owner + "&order_direction=desc&limit=" + PAGESIZE + "&offset=" + offset;
            logInfo("tokensModule", "actions.loadLibrary() owner url:" + url);
            const data = await fetch(url).then(response => response.json());
            context.commit('updateAssets', { owner, permissions, data } );
            // if (data.assets && data.assets.length > 0) {
            //   for (let assetIndex = 0; assetIndex < data.assets.length; assetIndex++) {
            //     const asset = data.assets[assetIndex];
            //     // permissions[owner + ':' + contract] = { permission: permission, curation: curation };
            //     let permission = permissions[asset.owner.address.toLowerCase() + ':' + asset.asset_contract.address.toLowerCase()];
            //     if (permission == null) {
            //       permission = permissions[asset.owner.address.toLowerCase() + ':' + null];
            //     }
            //     context.commit('updateAssets', { permission, asset } );
            //     // logInfo("tokensModule", "actions.loadLibrary() - asset(" + (parseInt(offset) + assetIndex) + ") name: " + asset.collection.name + ", slug: " + asset.collection.slug + ", owner: " + asset.owner.address + ", contract: " + asset.asset_contract.address + ", permission: " + JSON.stringify(permission));
            //     // assets[asset.owner.address.toLowerCase() + ':' + asset.asset_contract.address.toLowerCase()] = { permission: permission, asset: asset };
            //   }
            // }
            if (!data.assets || data.assets.length < PAGESIZE) {
              completed = true;
            }
            page++;
            await delay(DELAY);
          }
        } else {
          // Do individually
          for (let i = 0; i < ownersContracts.length; i++) {
            const contract = ownersContracts[i];
            // console.log("Retrieve all by owner %s contract %s", owner, contract);
            let completed = false;
            let page = 0;
            while (!completed) {
              const offset = PAGESIZE * page;
              const url = "https://api.opensea.io/api/v1/assets?owner=" + owner + "&asset_contract_address=" + contract + "&order_direction=desc&limit=" + PAGESIZE + "&offset=" + offset;
              logInfo("tokensModule", "actions.loadLibrary() owner and contract url:" + url);
              const data = await fetch(url).then(response => response.json());
              context.commit('updateAssets', { owner, permissions, data });
              // if (data.assets && data.assets.length > 0) {
              //   for (let assetIndex = 0; assetIndex < data.assets.length; assetIndex++) {
              //     const asset = data.assets[assetIndex];
              //     let permission = permissions[asset.owner.address.toLowerCase() + ':' + asset.asset_contract.address.toLowerCase()];
              //     if (permission == null) {
              //       permission = permissions[asset.owner.address.toLowerCase() + ':' + null];
              //     }
              //     // logInfo("tokensModule", "actions.loadLibrary() - asset(" + (parseInt(offset) + assetIndex) + ") name: " + asset.collection.name + ", slug: " + asset.collection.slug + ", owner: " + asset.owner.address + ", contract: " + asset.asset_contract.address + ", permission: " + JSON.stringify(permission));
              //     // TODO - Add timestamp, and add routine to remove expired entries
              //     // assets[asset.owner.address.toLowerCase() + ':' + asset.asset_contract.address.toLowerCase()] = { permission: permission, asset: asset };
              //     context.commit('updateAssets', { permission, asset });
              //   }
              // }
              if (!data.assets || data.assets.length < PAGESIZE) {
                completed = true;
              }
              page++;
              await delay(DELAY);
            }
          }
        }
        context.commit('updateAssetsCompletion');
        // for (const [key, asset] of Object.entries(assets)) {
        //   logInfo("tokensModule", "actions.loadLibrary():" + key + " => " + JSON.stringify(asset).substring(0, 100));
        // }
      }
    },
    updateNFTData(context, nftData) {
      // logInfo("tokensModule", "actions.updateNFTData(" + JSON.stringify(nftData) + ")");
      context.commit('updateNFTData', nftData);
    },
    updateSelectedId(context, selectedId) {
      logInfo("tokensModule", "actions.updateSelectedId(" + JSON.stringify(selectedId) + ")");
      context.commit('updateSelectedId', selectedId);
    },
    // Called by Connection.execWeb3()
    async execWeb3({ state, commit, rootState }, { count, networkChanged, blockChanged, coinbaseChanged }) {
      logDebug("tokensModule", "execWeb3() start[" + count + ", " + JSON.stringify(rootState.route.params) + ", " + networkChanged + ", " + blockChanged + ", " + coinbaseChanged+ "]");
      if (!state.executing) {
        commit('updateExecuting', true);
        logDebug("tokensModule", "execWeb3() executing[" + count + ", " + JSON.stringify(rootState.route.params) + ", " + networkChanged + ", " + blockChanged + ", " + coinbaseChanged + "]");

        var paramsChanged = false;
        if (state.params != rootState.route.params.param) {
          logDebug("tokensModule", "execWeb3() params changed from " + state.params + " to " + JSON.stringify(rootState.route.params.param));
          paramsChanged = true;
          commit('updateParams', rootState.route.params.param);
        }

        if (networkChanged || blockChanged || coinbaseChanged || paramsChanged) {

          // You can also use an ENS name for the contract address
          const nftAddress = "token.zombiebabies.eth"; // state.nftData.nftAddress;
          logDebug("tokensModule", "execWeb3() nftAddress: " + nftAddress);

          const nftAbi = ERC1155NFTABI;
          // logDebug("tokensModule", "execWeb3() nftAbi: " + JSON.stringify(nftAbi));

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

          // store.getters['connection/coinbase']
          const name = await store.getters['connection/connection'].provider.lookupAddress(store.getters['connection/coinbase']);
          logDebug("tokensModule", "execWeb3() coinbase: " + JSON.stringify(store.getters['connection/coinbase']) + " => " + name);

          // // const allnames = await ReverseRecords.getNames(['coinbase']);
          // // logDebug("Connection", "execWeb3() allnames: " + JSON.stringify(allnames));
          const addresses = [ "0x07fb31ff47Dc15f78C5261EEb3D711fb6eA985D1", "0x000001f568875F378Bf6d170B790967FE429C81A", "0xBeeef66749B64Afe43Bbc9475635Eb510cFE4922"];
          const ensReverseRecordsContract = new ethers.Contract(ENSREVERSERECORDSADDRESS, ENSREVERSERECORDSABI, store.getters['connection/connection'].provider);
          const allnames = await ensReverseRecordsContract.getNames(addresses);
          logDebug("tokensModule", "execWeb3() allnames: " + JSON.stringify(addresses) + " => " + allnames);
          const validNames = allnames.filter((n) => normalize(n) === n );
          logDebug("tokensModule", "execWeb3() validNames: " + JSON.stringify(addresses) + " => " + validNames);

          const beeeefRegistryContract = new ethers.Contract(BEEEEFREGISTRYENS, BEEEEFREGISTRYABI, store.getters['connection/connection'].provider);
          const entries = await beeeefRegistryContract.getEntries();
          logDebug("tokensModule", "execWeb3() beeeefRegistryContract.entries: " + JSON.stringify(entries));

          //
          // // The Contract object
          const nftContract = new ethers.Contract(nftAddress, nftAbi, store.getters['connection/connection'].provider);
          // logDebug("tokensModule", "execWeb3() nftContract: " + JSON.stringify(nftContract));

          const tokenIds = store.getters['tokens/allTokenIds'];
          const accounts = [];
          for (let i = 0; i < tokenIds.length; i++) {
            accounts.push(store.getters['connection/coinbase']);
          }
          logDebug("tokensModule", "execWeb3() tokens/allTokenIds: " + JSON.stringify(store.getters['tokens/allTokenIds']));

          const balanceOfs = await nftContract.balanceOfBatch(accounts, tokenIds);
          logDebug("tokensModule", "execWeb3() balanceOfs: " + JSON.stringify(balanceOfs.map((x) => { return x.toString(); })));
          commit('updateBalances', balanceOfs.map((x) => { return x.toString(); }));

          const cryptoPunksMarketContract = new ethers.Contract(CRYPTOPUNKMARKETADDRESS, CRYPTOPUNKMARKETABI, store.getters['connection/connection'].provider);
          const cpBalanceOf = await cryptoPunksMarketContract.balanceOf(store.getters['connection/coinbase']);
          logDebug("tokensModule", "execWeb3() cpBalanceOf: " + cpBalanceOf);


          // Direct query. Could deploy contract to perform multicall
          // for (let i = 0; i < 10000; i++) {
          //   const owner = await cryptoPunksMarketContract.punkIndexToAddress(i);
          //   if (i % 100 == 0) {
          //     logDebug("tokensModule", "execWeb3() owner: " + owner + " " + i);
          //   }
          //   // if (owner == store.getters['connection/coinbase']) {
          //   // }
          // }

          /*
          let url = "https://wrappedpunks.com:3000/api/punks?user=" + store.getters['connection/coinbase'] + "&type=punk&page=1&pageSize=1200";
          let req = new XMLHttpRequest();
          req.overrideMimeType("application/json");
          req.open('GET', url, true);
          req.onload  = function() {
            logDebug("tokensModule", "execWeb3() punkData txt: " + req.readyState + " => " + req.responseText);
            const punkData = JSON.parse(req.responseText);
            logDebug("tokensModule", "execWeb3() punkData: " + JSON.stringify(punkData));
          };
          req.send(null);

          // CryptoPunks - OpenSea
          url = "https://api.opensea.io/api/v1/assets?owner=" + store.getters['connection/coinbase'] + "&asset_contract_address=" + CRYPTOPUNKMARKETADDRESS + "&order_direction=desc&offset=0&limit=50";
          req = new XMLHttpRequest();
          req.overrideMimeType("application/json");
          req.open('GET', url, true);
          req.onload  = function() {
            logDebug("tokensModule", "execWeb3() openSeaPunkData txt: " + req.readyState + " => " + req.responseText);
            if (req.readyState == 4) {
              const openSeaPunkData = JSON.parse(req.responseText);
              logDebug("tokensModule", "execWeb3() openSeaPunkData JSON: " + JSON.stringify(openSeaPunkData));
            }
          };
          req.send(null);

          // Pixel Portraits - OpenSea
          url = "https://api.opensea.io/api/v1/assets?owner=" + store.getters['connection/coinbase'] + "&order_direction=desc&offset=0&limit=50&collection=the-pixel-portraits";
          req = new XMLHttpRequest();
          req.overrideMimeType("application/json");
          req.open('GET', url, true);
          req.onload  = function() {
            logDebug("tokensModule", "execWeb3() pixelPortraitsData txt: " + req.readyState + " => " + req.responseText);
            if (req.readyState == 4) {
              const pixelPortraitsData = JSON.parse(req.responseText);
              logDebug("tokensModule", "execWeb3() pixelPortraitsData JSON: " + JSON.stringify(pixelPortraitsData));
            }
          };
          req.send(null);

          // PunkBodies - OpenSea
          url = "https://api.opensea.io/api/v1/assets?owner=" + store.getters['connection/coinbase'] + "&asset_contract_address=" + PUNKBODIESADDRESS + "&order_direction=desc&offset=0&limit=50";
          req = new XMLHttpRequest();
          req.overrideMimeType("application/json");
          req.open('GET', url, true);
          req.onload  = function() {
            logDebug("tokensModule", "execWeb3() openSeaPunkData txt: " + req.readyState + " => " + req.responseText);
            if (req.readyState == 4) {
              const openSeaPunkData = JSON.parse(req.responseText);
              logInfo("tokensModule", "execWeb3() openSeaPunkData JSON: " + JSON.stringify(openSeaPunkData));
            }
          };
          req.send(null);

          // PunkBodies - Direct to contract
          const punkBodiesContract = new ethers.Contract(PUNKBODIESADDRESS, PUNKBODIESABI, store.getters['connection/connection'].provider);
          const pbBalanceOf = await punkBodiesContract.balanceOf(store.getters['connection/coinbase']);
          logInfo("tokensModule", "execWeb3() pbBalanceOf: " + pbBalanceOf);

          for (let i = 0; i < pbBalanceOf; i++) {
              const tokenId = await punkBodiesContract.tokenOfOwnerByIndex(store.getters['connection/coinbase'], i);
              logInfo("tokensModule", "execWeb3() i: " + i + ", tokenId: " + tokenId);
          }
          */




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
  // mounted() {
  //   logInfo("tokensModule", "mounted() $route: " + JSON.stringify(this.$route.params));
  // },
};
