const Bodyshop = {
  template: `
    <div class="mt-5 pt-3">
      <b-card no-body header="Bodyshop" class="border-0" header-class="p-1">
        <b-card no-body class="border-0 m-0 mt-2">
          <b-card-body class="p-0">

          <canvas id="c" width="500" height="500" style="border:1px solid"></canvas>

          <b-card-group deck class="m-2">
            <div v-for="(tokenId, tokenIdIndex) in allTokenIds">
              <b-card body-class="p-1" footer-class="p-1" img-top class="m-1 p-0">
                <b-link @click="addImage('ZombieBaby', tokenId, 'media/' + nftData.tokens[tokenId].imageTBName)">
                  <b-avatar variant="light" size="5.0rem" :src="'https://zombiebabies.eth.link/media/' + nftData.tokens[tokenId].imageTBName" class="pixelated"></b-avatar>
                </b-link>
                <template #footer>
                  <span class="small truncate">
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
                <b-link @click="addImage('CryptoPunk', punkData.id, punkData.imageURL)">
                  <b-avatar variant="light" size="5.0rem" :src="punkData.imageURL" class="pixelated"></b-avatar>
                </b-link>
                <template #footer>
                  <span class="small truncate">
                    #{{ punkData.id }}
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
                  <span class="small truncate">
                    {{ pixelPortraitData.id }}
                  </span>
                </template>
              </b-card>
            </div>
          </b-card-group>
          <b-card-group deck class="m-2">
            <div v-for="bganpunkv2Data in bganpunkv2DataList">
              <b-card body-class="p-1" footer-class="p-1" img-top class="m-1 p-0">
                <b-avatar variant="light" size="5.0rem" :src="bganpunkv2Data.imageUrl" class="pixelated"></b-avatar>
                <template #footer>
                  <span class="small truncate">
                    {{ bganpunkv2Data.id }}
                  </span>
                </template>
              </b-card>
            </div>
          </b-card-group>
          <b-card-group deck class="m-2">
            <div v-for="punkBodyData in punkBodiesDataList">
              <b-card body-class="p-1" footer-class="p-1" img-top class="m-1 p-0">
                <b-link @click="addImage('PunkBody', punkBodyData.id, punkBodyData.imageURL)">
                  <b-avatar variant="light" size="5.0rem" :src="punkBodyData.imageURL" class="pixelated"></b-avatar>
                </b-link>
                <template #footer>
                  <span class="small truncate">
                    #{{ punkBodyData.id }}
                  </span>
                </template>
              </b-card>
            </div>
          </b-card-group>

          <br />
          <!-- <b-card-img :src="punkData.imageURL" alt="Punk image" width="100px" class="pixelated"></b-card-img> -->


          <!-- <b-img src="media/ZombieBaby_000.png" height="1024px" alt="image slot"></b-img> -->
          <!-- <b-img src="https://www.larvalabs.com/public/images/cryptopunks/punk3636.png" height="256px" style="image-rendering: -moz-crisp-edges; image-rendering: crisp-edges; image-rendering: pixelated;" alt="image slot"></b-img> -->


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
      bganpunkv2DataList: [],
      punkBodiesDataList: [],

      canvas: null,
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
    async addImage(nftType, id, image) {
      logInfo("Bodyshop", "addImage() type: " + nftType + ", id: " + id + ", image: " + image);
      const t = this;
      let scale = 5.0;
      if (nftType == 'ZombieBaby') {
        scale = 5.0 / 40;
      } else if (nftType == 'CryptoPunk') {
        scale = 5.0;
      } else if (nftType == 'PunkBody') {
        scale = 5.0;
      }
      const flipX = false;
      fabric.Image.fromURL(image, function(oImg) {
        oImg.set('imageSmoothing', false).scale(scale).set('flipX', flipX);
        // oImg.filters.push(new fabric.Image.filters.Grayscale());
        // oImg.applyFilters();
        t.canvas.add(oImg);
      });
    },
    async loadNFTs(event) {
      logInfo("Bodyshop", "loadNFTs()");

      // CryptoPunks - OpenSea
      let cryptoPunksUrl = "https://api.opensea.io/api/v1/assets?owner=" + store.getters['connection/coinbase'] + "&asset_contract_address=" + CRYPTOPUNKMARKETADDRESS + "&order_direction=desc&offset=0&limit=50";
      cryptoPunksReq = new XMLHttpRequest();
      cryptoPunksReq.overrideMimeType("application/json");
      logInfo("Bodyshop", "loadNFTs() openSeaPunkData cryptoPunksUrl: " + cryptoPunksUrl);
      cryptoPunksReq.open('GET', cryptoPunksUrl, true);
      const t = this;
      cryptoPunksReq.onload  = function() {
        if (cryptoPunksReq.readyState == 4) {
          const punkDataTemp = [];
          const openSeaPunkData = JSON.parse(cryptoPunksReq.responseText);
          for (let assetIndex in Object.keys(openSeaPunkData.assets)) {
            const asset = openSeaPunkData.assets[assetIndex];
            var id = asset.token_id;
            var imageURL = "https://www.larvalabs.com/public/images/cryptopunks/punk" + id + ".png"
            punkDataTemp.push({ id: id, imageURL: imageURL });
          }
          t.punksDataList = punkDataTemp;
          t.punksDataList.sort(function(a, b) { return a.id - b.id; });
        }
      };
      cryptoPunksReq.send(null);

      /*
      // Pixel Portraits - OpenSea
      let pixelPortraitsUrl = "https://api.opensea.io/api/v1/assets?owner=" + store.getters['connection/coinbase'] + "&order_direction=desc&offset=0&limit=50&collection=the-pixel-portraits";
      pixelPortraitsReq = new XMLHttpRequest();
      pixelPortraitsReq.overrideMimeType("application/json");
      logInfo("Bodyshop", "loadNFTs() openSeaPixelPortraitsData pixelPortraitsUrl: " + pixelPortraitsUrl);
      pixelPortraitsReq.open('GET', pixelPortraitsUrl, true);
      pixelPortraitsReq.onload  = function() {
        if (pixelPortraitsReq.readyState == 4) {
          const pixelPortraitsDataListTemp = [];
          const openSeaPixelPortraitData = JSON.parse(pixelPortraitsReq.responseText);
          for (let assetIndex in Object.keys(openSeaPixelPortraitData.assets)) {
            const asset = openSeaPixelPortraitData.assets[assetIndex];
            var id = asset.name;
            var imageUrl = asset.image_url;
            pixelPortraitsDataListTemp.push({ id: id, imageUrl: imageUrl });
          }
          t.pixelPortraitsDataList = pixelPortraitsDataListTemp;
          t.pixelPortraitsDataList.sort(function(a, b) { return ('' + a.id).localeCompare(b.id) });
        }
      };
      pixelPortraitsReq.send(null);

      // BGANPUNKV2 - OpenSea
      let bganpunkv2Url = "https://api.opensea.io/api/v1/assets?owner=" + store.getters['connection/coinbase'] + "&asset_contract_address=" + BGANPUNKV2ADDRESS + "&order_direction=desc&offset=0&limit=50";
      bganpunkv2Req = new XMLHttpRequest();
      bganpunkv2Req.overrideMimeType("application/json");
      logInfo("Bodyshop", "loadNFTs() openSeaBganpunkv2Data bganpunkv2Url: " + bganpunkv2Url);
      bganpunkv2Req.open('GET', bganpunkv2Url, true);
      bganpunkv2Req.onload  = function() {
        if (bganpunkv2Req.readyState == 4) {
          const bganpunkv2DataListTemp = [];
          const openSeaBganpunkv2Data = JSON.parse(bganpunkv2Req.responseText);
          for (let assetIndex in Object.keys(openSeaBganpunkv2Data.assets)) {
            const asset = openSeaBganpunkv2Data.assets[assetIndex];
            var id = asset.token_id;
            var imageUrl = asset.image_original_url;
            // logInfo("Bodyshop", "loadNFTs() openSeaBganpunkv2Data imageUrl: " + imageUrl);
            bganpunkv2DataListTemp.push({ id: id, imageUrl: imageUrl });
          }
          t.bganpunkv2DataList = bganpunkv2DataListTemp;
          t.bganpunkv2DataList.sort(function(a, b) { return a.id - b.id; });
        }
      };
      bganpunkv2Req.send(null);
      */

      // PunkBodies - OpenSea
      let punkBodiesUrl = "https://api.opensea.io/api/v1/assets?owner=" + store.getters['connection/coinbase'] + "&asset_contract_address=" + PUNKBODIESADDRESS + "&order_direction=desc&offset=0&limit=50";
      punkBodiesReq = new XMLHttpRequest();
      punkBodiesReq.overrideMimeType("application/json");
      logInfo("Bodyshop", "loadNFTs() openSeaPunkBodyData punkBodiesUrl: " + punkBodiesUrl);
      punkBodiesReq.open('GET', punkBodiesUrl, true);
      punkBodiesReq.onload  = function() {
        if (punkBodiesReq.readyState == 4) {
          const punkBodiesDataListTemp = [];
          const openSeaPunkBodyData = JSON.parse(punkBodiesReq.responseText);
          for (let assetIndex in Object.keys(openSeaPunkBodyData.assets)) {
            const asset = openSeaPunkBodyData.assets[assetIndex];
            var id = asset.token_id;
            var imageURL = "https://api.punkbodies.com/get-images/" + id + ".png"
            punkBodiesDataListTemp.push({ id: id, imageURL: imageURL });
          }
          t.punkBodiesDataList = punkBodiesDataListTemp;
          t.punkBodiesDataList.sort(function(a, b) { return a.id - b.id; });
        }
      };
      punkBodiesReq.send(null);
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
    this.canvas = new fabric.Canvas('c', {
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
    this.canvas.add(rect);

    this.canvas.on({
      'object:moving': function(e) {
        e.target.opacity = 0.5;
      },
      'object:modified': function(e) {
        e.target.opacity = 1;
      },
      'mouse:down': function(options) {
        if (options.target) {
          logInfo("Bodyshop", "Canvas mouse:down(): " + JSON.stringify(options.target));
          // console.log('an object was clicked! ', options.target.type);
        }
      }
    });

    // fabric.Image.fromURL('https://www.larvalabs.com/public/images/cryptopunks/punk3636.png', function(oImg) {

    const t = this;
    fabric.Image.fromURL('https://zombiebabies.eth.link/media/ZombieBaby_000_transparentbg.png', function(oImg) {
      oImg.set('imageSmoothing', false).scale(5.0/40).set('flipX', true);
      // oImg.filters.push(new fabric.Image.filters.Grayscale());
      // oImg.applyFilters();
      t.canvas.add(oImg);
    });

    fabric.Image.fromURL('https://api.punkbodies.com/get-images/9031.png', function(oImg) {
      oImg.set('imageSmoothing', false).scale(5.0).set('flipX', true);
      t.canvas.add(oImg);
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
