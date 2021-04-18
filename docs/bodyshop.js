const Bodyshop = {
  template: `
    <div class="mt-5 pt-3">
      <b-card no-body header="Bodyshop" class="border-0" header-class="p-1">
        <b-card no-body class="border-0 m-0 mt-2">
          <b-card-body class="p-0">

          <b-card-group deck class="m-2">
            <div v-for="(tokenId, tokenIdIndex) in allTokenIds">
              <b-card body-class="p-1" footer-class="p-1" img-top class="m-1 p-0">
                <b-avatar variant="light" size="5.0rem" :src="'media/' + nftData.tokens[tokenId].imageTBName" class="pixelated"></b-avatar>
                <template #footer>
                  <span class="float-none">
                    #{{ tokenId }}
                  </span>
                </template>
              </b-card>
            </div>
          </b-card-group>
          <b-button size="sm" @click="loadNFTs()" variant="info">Load Other NFTs</b-button><br />
          <b-card-group deck class="m-2">
            <div v-for="punkData in punksDataList">
              <b-card body-class="p-1" footer-class="p-1" img-top class="m-1 p-0">
                <b-avatar variant="light" size="5.0rem" :src="punkData.punkImageURL" class="pixelated"></b-avatar>
                <template #footer>
                  <span class="float-none">
                    #{{ punkData.punkId }}
                  </span>
                </template>
              </b-card>
            </div>
          </b-card-group>
          <b-card-group deck class="m-2">
            <div v-for="pixelPortraitData in pixelPortraitsDataList">
              <b-card body-class="p-1" footer-class="p-1" img-top class="m-1 p-0">
                <b-avatar variant="light" size="5.0rem" :src="pixelPortraitData.imageUrl" class="pixelated"></b-avatar>
                <template #footer>
                  <span class="float-none small truncate">
                    {{ pixelPortraitData.id }}
                  </span>
                </template>
              </b-card>
            </div>
          </b-card-group>
          <b-card-group deck class="m-2">
            <div v-for="punkBodyData in punkBodiesDataList">
              <b-card body-class="p-1" footer-class="p-1" img-top class="m-1 p-0">
                <b-avatar variant="light" size="5.0rem" :src="punkBodyData.punkBodyImageURL" class="pixelated"></b-avatar>
                <template #footer>
                  <span class="float-none">
                    #{{ punkBodyData.punkBodyId }}
                  </span>
                </template>
              </b-card>
            </div>
          </b-card-group>

          <br />
          <!-- <b-card-img :src="punkData.punkImageURL" alt="Punk image" width="100px" class="pixelated"></b-card-img> -->

          <canvas id="c" width="500" height="500" style="border:1px solid"></canvas>

          <!-- <b-img src="media/ZombieBaby_000.png" height="1024px" alt="image slot"></b-img> -->
          <b-img src="https://www.larvalabs.com/public/images/cryptopunks/punk3636.png" height="256px" style="image-rendering: -moz-crisp-edges; image-rendering: crisp-edges; image-rendering: pixelated;" alt="image slot"></b-img>


          </b-card-body>
        </b-card>
      </b-card>
    </div>
  `,
  data: function () {
    return {
      count: 0,
      reschedule: true,

      punksDataList: [],
      pixelPortraitsDataList: [],
      punkBodiesDataList: [],
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
  },
  methods: {
    async loadNFTs(event) {
      logInfo("Bodyshop", "loadNFTs()");

      /*
      let url = "https://wrappedpunks.com:3000/api/punks?user=" + store.getters['connection/coinbase'] + "&type=punk&page=1&pageSize=1200";
      let req = new XMLHttpRequest();
      req.overrideMimeType("application/json");
      req.open('GET', url, true);
      req.onload  = function() {
        logInfo("tokensModule", "execWeb3() punkData txt: " + req.readyState + " => " + req.responseText);
        const punkData = JSON.parse(req.responseText);
        logInfo("tokensModule", "execWeb3() punkData: " + JSON.stringify(punkData));
      };
      req.send(null);
      */

      // CryptoPunks - OpenSea
      let cryptoPunksUrl = "https://api.opensea.io/api/v1/assets?owner=" + store.getters['connection/coinbase'] + "&asset_contract_address=" + CRYPTOPUNKMARKETADDRESS + "&order_direction=desc&offset=0&limit=50";
      cryptoPunksReq = new XMLHttpRequest();
      cryptoPunksReq.overrideMimeType("application/json");
      logInfo("Bodyshop", "loadNFTs() openSeaPunkData cryptoPunksUrl: " + cryptoPunksUrl);
      cryptoPunksReq.open('GET', cryptoPunksUrl, true);
      const cryptoPunksThis = this;
      cryptoPunksReq.onload  = function() {
        // logInfo("Bodyshop", "loadNFTs() openSeaPunkData txt: " + cryptoPunksReq.readyState + " => " + cryptoPunksReq.responseText);
        if (cryptoPunksReq.readyState == 4) {
          const punkDataTemp = [];
          const openSeaPunkData = JSON.parse(cryptoPunksReq.responseText);
          // logInfo("Bodyshop", "loadNFTs() openSeaPunkData JSON: " + JSON.stringify(openSeaPunkData.assets).substring(0, 1000));
          for (let assetIndex in Object.keys(openSeaPunkData.assets)) {
            const asset = openSeaPunkData.assets[assetIndex];
            // logInfo("Bodyshop", "loadNFTs() openSeaPunkData asset: " + assetIndex + " => " + JSON.stringify(asset));
            var punkId = asset.token_id;
            var punkImageURL = "https://www.larvalabs.com/public/images/cryptopunks/punk" + punkId + ".png"
            // logInfo("Bodyshop", "loadNFTs() openSeaPunkData punkId: " + punkId + " => " + punkImageURL);
            punkDataTemp.push({ punkId: punkId, punkImageURL: punkImageURL });
          }
          cryptoPunksThis.punksDataList = punkDataTemp;
          // logInfo("Bodyshop", "loadNFTs() openSeaPunkData punkDataTemp: " + JSON.stringify(punkDataTemp));
        }
      };
      cryptoPunksReq.send(null);

      // Pixel Portraits - OpenSea
      let pixelPortraitsUrl = "https://api.opensea.io/api/v1/assets?owner=" + store.getters['connection/coinbase'] + "&order_direction=desc&offset=0&limit=50&collection=the-pixel-portraits";
      // let pixelPortraitsUrl = "https://api.opensea.io/api/v1/assets?owner=" + store.getters['connection/coinbase'] + "&asset_contract_address=" + PUNKBODIESADDRESS + "&order_direction=desc&offset=0&limit=50";
      pixelPortraitsReq = new XMLHttpRequest();
      pixelPortraitsReq.overrideMimeType("application/json");
      logInfo("Bodyshop", "loadNFTs() openSeaPixelPortraitsData pixelPortraitsUrl: " + pixelPortraitsUrl);
      pixelPortraitsReq.open('GET', pixelPortraitsUrl, true);
      const pixelPortraitsThis = this;
      pixelPortraitsReq.onload  = function() {
        // logInfo("tokensModule", "execWeb3() openSeaPixelPortraitsData txt: " + pixelPortraitsReq.readyState + " => " + pixelPortraitsReq.responseText);
        if (pixelPortraitsReq.readyState == 4) {
          const pixelPortraitsDataListTemp = [];
          const openSeaPixelPortraitData = JSON.parse(pixelPortraitsReq.responseText);
          // logInfo("tokensModule", "execWeb3() openSeaPixelPortraitData JSON: " + JSON.stringify(openSeaPixelPortraitData));
          for (let assetIndex in Object.keys(openSeaPixelPortraitData.assets)) {
            const asset = openSeaPixelPortraitData.assets[assetIndex];
            // logInfo("Bodyshop", "loadNFTs() openSeaPixelPortraitData asset: " + assetIndex + " => " + JSON.stringify(asset));
            var id = asset.name;
            var imageUrl = asset.image_url;
            // // logInfo("Bodyshop", "loadNFTs() openSeaPunkData punkId: " + punkId + " => " + imageUrl);
            pixelPortraitsDataListTemp.push({ id: id, imageUrl: imageUrl });
          }
          pixelPortraitsThis.pixelPortraitsDataList = pixelPortraitsDataListTemp;
          // logInfo("Bodyshop", "loadNFTs() openSeaPunkData punkDataTemp: " + JSON.stringify(punkDataTemp));
          // https://api.punkbodies.com/get-images/7273.png
        }
        // https://api.punkbodies.com/get-images/7273.png
      };
      pixelPortraitsReq.send(null);

      /*
      // Pixel Portraits - OpenSea
      url = "https://api.opensea.io/api/v1/assets?owner=" + store.getters['connection/coinbase'] + "&order_direction=desc&offset=0&limit=50&collection=the-pixel-portraits";
      req = new XMLHttpRequest();
      req.overrideMimeType("application/json");
      req.open('GET', url, true);
      req.onload  = function() {
        logInfo("tokensModule", "execWeb3() pixelPortraitsData txt: " + req.readyState + " => " + req.responseText);
        if (req.readyState == 4) {
          const pixelPortraitsData = JSON.parse(req.responseText);
          logInfo("tokensModule", "execWeb3() pixelPortraitsData JSON: " + JSON.stringify(pixelPortraitsData));
        }
      };
      req.send(null);
      */

      // PunkBodies - OpenSea
      let punkBodiesUrl = "https://api.opensea.io/api/v1/assets?owner=" + store.getters['connection/coinbase'] + "&asset_contract_address=" + PUNKBODIESADDRESS + "&order_direction=desc&offset=0&limit=50";
      punkBodiesReq = new XMLHttpRequest();
      punkBodiesReq.overrideMimeType("application/json");
      logInfo("Bodyshop", "loadNFTs() openSeaPunkBodyData punkBodiesUrl: " + punkBodiesUrl);
      punkBodiesReq.open('GET', punkBodiesUrl, true);
      const punkBodiesThis = this;
      punkBodiesReq.onload  = function() {
        // logInfo("tokensModule", "execWeb3() openSeaPunkBodyData txt: " + punkBodiesReq.readyState + " => " + punkBodiesReq.responseText);
        if (punkBodiesReq.readyState == 4) {
          const punkBodiesDataListTemp = [];
          const openSeaPunkBodyData = JSON.parse(punkBodiesReq.responseText);
          // logInfo("tokensModule", "execWeb3() openSeaPunkBodyData JSON: " + JSON.stringify(openSeaPunkBodyData));
          for (let assetIndex in Object.keys(openSeaPunkBodyData.assets)) {
            const asset = openSeaPunkBodyData.assets[assetIndex];
            // logInfo("Bodyshop", "loadNFTs() openSeaPunkBodyData asset: " + assetIndex + " => " + JSON.stringify(asset));
            var punkBodyId = asset.token_id;
            var punkBodyImageURL = "https://api.punkbodies.com/get-images/" + punkBodyId + ".png"
            // // logInfo("Bodyshop", "loadNFTs() openSeaPunkData punkId: " + punkId + " => " + punkBodyImageURL);
            punkBodiesDataListTemp.push({ punkBodyId: punkBodyId, punkBodyImageURL: punkBodyImageURL });
          }
          punkBodiesThis.punkBodiesDataList = punkBodiesDataListTemp;
          // logInfo("Bodyshop", "loadNFTs() openSeaPunkData punkDataTemp: " + JSON.stringify(punkDataTemp));
          // https://api.punkbodies.com/get-images/7273.png
        }
        // https://api.punkbodies.com/get-images/7273.png
      };
      punkBodiesReq.send(null);

      /*
      // PunkBodies - Direct to contract
      const punkBodiesContract = new ethers.Contract(PUNKBODIESADDRESS, PUNKBODIESABI, store.getters['connection/connection'].provider);
      const pbBalanceOf = await punkBodiesContract.balanceOf(store.getters['connection/coinbase']);
      logInfo("tokensModule", "execWeb3() pbBalanceOf: " + pbBalanceOf);

      for (let i = 0; i < pbBalanceOf; i++) {
          const tokenId = await punkBodiesContract.tokenOfOwnerByIndex(store.getters['connection/coinbase'], i);
          logInfo("tokensModule", "execWeb3() i: " + i + ", tokenId: " + tokenId);
      }
      */

      // if (false) {
      //   var tokenToolz = web3.eth.contract(TOKENTOOLZABI).at(TOKENTOOLZADDRESS);
      //   try {
      //     var _tokenInfo = promisify(cb => tokenToolz.getTokenInfo(this.tokenInfo.address, store.getters['connection/coinbase'], store.getters['optinoFactory/address'], cb));
      //     var tokenInfo = await _tokenInfo;
      //     logInfo("Bodyshop", "checkTokenAddress: " + JSON.stringify(tokenInfo));
      //     this.tokenInfo.symbol = tokenInfo[4];
      //     this.tokenInfo.name = tokenInfo[5];
      //     this.tokenInfo.decimals = parseInt(tokenInfo[0]);
      //     this.tokenInfo.totalSupply = tokenInfo[1].shift(-this.tokenInfo.decimals).toString();
      //     this.tokenInfo.balance = tokenInfo[2].shift(-this.tokenInfo.decimals).toString();
      //     this.tokenInfo.allowance = tokenInfo[3].shift(-this.tokenInfo.decimals).toString();
      //     this.tokenInfo.source = "search";
      //     this.tokenInfo.ok = true;
      //   } catch (e) {
      //     this.tokenInfo.symbol = null;
      //     this.tokenInfo.name = null;
      //     this.tokenInfo.decimals = null;
      //     this.tokenInfo.totalSupply = null;
      //     this.tokenInfo.balance = null;
      //     this.tokenInfo.allowance = null;
      //     this.tokenInfo.source = null;
      //     this.tokenInfo.ok = false;
      //   }
        // logInfo("Bodyshop", "checkTokenAddress: " + JSON.stringify(this.tokenInfo));
      // }
    },
    async timeoutCallback() {
      logInfo("Bodyshop", "timeoutCallback() count: " + this.count);
      // var tokenToolz = web3.eth.contract(TOKENTOOLZABI).at(TOKENTOOLZADDRESS);
      // var fakeTokenContract = web3.eth.contract(FAKETOKENFACTORYABI).at(FAKETOKENFACTORYADDRESS);
      //
      // if (this.count == 0) {
      //   var _fakeTokensLength = promisify(cb => fakeTokenContract.fakeTokensLength.call(cb));
      //   var fakeTokensLength = await _fakeTokensLength;
      //   this.tokenPickerTotalRows = parseInt(COMMONTOKENLIST.length) + parseInt(fakeTokensLength);
      //   // logInfo("Bodyshop", "timeoutCallback() - tokenPickerTotalRows: " + this.tokenPickerTotalRows);
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
      //     // logInfo("Bodyshop", "timeoutCallback() - loading " + this.tokenPickerLoadingRow + " of " + this.tokenPickerTotalRows + " " + symbol);
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
      //       // logInfo("Bodyshop", "timeoutCallback() - loading " + this.tokenPickerLoadingRow + " of " + this.tokenPickerTotalRows + " " + symbol);
      //     }
      //   }
      //
      //   this.tokenPickerTotalRows = this.tokenPickerLoadingRow;
      //   this.tokenPickerLoadingRow = null;
      //   logDebug("Bodyshop", "timeoutCallback() - loaded " + this.tokenPickerTotalRows);
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
      //   logDebug("Bodyshop", "timeoutCallback() - refreshed " + addressesLength);
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
    logInfo("Bodyshop", "mounted()");
    this.reschedule = true;
    logInfo("Bodyshop", "Calling timeoutCallback()");
    this.timeoutCallback();

    logInfo("Bodyshop", "Canvas");
    var canvas = new fabric.Canvas('c', {
      hoverCursor: 'pointer',
      selection: false,
      targetFindTolerance: 2
    });
    //
    // // create a rectangle object
    var rect = new fabric.Rect({
      left: 50,
      top: 50,
      fill: 'yellow',
      width: 400,
      height: 400
    });
    //
    // // "add" rectangle onto canvas
    canvas.add(rect);

    canvas.on({
      'object:moving': function(e) {
        e.target.opacity = 0.5;
      },
      'object:modified': function(e) {
        e.target.opacity = 1;
      }
    });

    // fabric.Image.fromURL('https://www.larvalabs.com/public/images/cryptopunks/punk3636.png', function(oImg) {

    fabric.Image.fromURL('https://zombiebabies.eth.link/media/ZombieBaby_000_transparentbg.png', function(oImg) {
      oImg.set('imageSmoothing', false).scale(5.0/40).set('flipX', true);
      // oImg.filters.push(new fabric.Image.filters.Grayscale());
      // oImg.applyFilters();
      canvas.add(oImg);
    });

    fabric.Image.fromURL('https://api.punkbodies.com/get-images/9031.png', function(oImg) {
      oImg.set('imageSmoothing', false).scale(5.0).set('flipX', true);
      canvas.add(oImg);
    });

    // var c = document.getElementById("c");
    // var ctx = c.getContext("2d");
    // ctx.beginPath();
    // ctx.rect(20, 20, 150, 100);
    // ctx.stroke();
    // this.vueCanvas = ctx;
  },
  destroyed() {
    this.reschedule = false;
  },
};

const bodyshopModule = {
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
      logDebug("bodyshopModule", "deQueue(" + JSON.stringify(state.executionQueue) + ")");
      state.executionQueue.shift();
    },
    updateParams (state, params) {
      state.params = params;
      logDebug("bodyshopModule", "updateParams('" + params + "')")
    },
    updateExecuting (state, executing) {
      state.executing = executing;
      logDebug("bodyshopModule", "updateExecuting(" + executing + ")")
    },
  },
  actions: {
  },
};
