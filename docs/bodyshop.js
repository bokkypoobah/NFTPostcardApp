const Bodyshop = {
  template: `
    <div class="mt-5 pt-3">
      <b-card no-body header="Bodyshop" class="border-0" header-class="p-1">
        <b-card no-body class="border-0 m-0 mt-2">
          <b-card-body class="p-0">

          <canvas id="thecanvas" width="1024" height="480" style="border:1px solid"></canvas>

          <div>
            <b-card no-body>
              <b-tabs card>
                <b-tab title="Canvas" active>
                  <b-card-text>
                    <b-form-group label-cols="2" label-size="sm" label="Width" description="e.g., 500">
                      <b-form-input type="text" v-model.trim="canvasSetting.width" class="w-25"></b-form-input>
                    </b-form-group>
                    <b-form-group label-cols="2" label-size="sm" label="Height" description="e.g., 500">
                      <b-form-input type="text" v-model.trim="canvasSetting.height" class="w-25"></b-form-input>
                    </b-form-group>
                    <b-form-group label-cols="2" label-size="sm">
                      <b-button size="sm" @click="setCanvasSize()" variant="info">Set Canvas Size</b-button>
                    </b-form-group>
                  </b-card-text>
                </b-tab>
                <b-tab title="Sample NFTs">
                  <b-card-group deck class="m-2">
                    <div>
                      <b-card body-class="p-1" footer-class="p-1" img-top class="m-1 p-0">
                        <b-link @click="addImage('ZombieBaby', freeTokenId, 'media/' + nftData.tokens[freeTokenId].imageTBName)">
                          <b-avatar rounded="sm" variant="light" size="5.0rem" :src="(nftData == null || nftData.tokens == null) ? null : ('https://zombiebabies.eth.link/media/' + nftData.tokens[freeTokenId].imageTBName)" class="pixelated"></b-avatar>
                        </b-link>
                        <template #footer>
                          <span class="small truncate">
                            #{{ freeTokenId }}
                          </span>
                        </template>
                      </b-card>
                    </div>
                  </b-card-group>
                </b-tab>
                <b-tab active title="Upload Image">
                  <b-card-text>

                    <b-row  align-h="start">
                      <b-col cols="2">Scale</b-col>
                      <b-col cols="3">
                        <b-form-group description="Scale width. e.g., 0.5">
                          <b-form-input type="text" v-model.trim="settings['ImageUpload'].scaleWidth"></b-form-input>
                        </b-form-group>
                      </b-col>
                      <b-col cols="3">
                        <b-form-group description="Scale height. e.g., 0.5">
                          <b-form-input type="text" v-model.trim="settings['ImageUpload'].scaleHeight"></b-form-input>
                        </b-form-group>
                      </b-col>
                      <b-col cols="2">
                        <b-form-group>
                          <b-form-checkbox v-model.trim="settings['ImageUpload'].flipX">
                            Flip X
                          </b-form-checkbox>
                        </b-form-group>
                      </b-col>
                      <b-col cols="2">
                        <b-form-group>
                          <b-form-checkbox v-model.trim="settings['ImageUpload'].flipY">
                            Flip Y
                          </b-form-checkbox>
                        </b-form-group>
                      </b-col>
                    </b-row>
                    <b-form-group label-cols="2" label-size="sm" label="Select image" description="From local filesystem">
                      <b-form-file v-model="file" @input="onFileChange" accept="image/jpeg, image/png, image/gif"  class="w-50" placeholder="Choose a JPEG, PNG or GIF file or drop it here..." drop-placeholder="Drop file here..."></b-form-file>
                    </b-form-group>
                  </b-card-text>
                </b-tab>
              </b-tabs>
            </b-card>
          </div>

          <b-card-group deck class="m-2">
            <div v-for="(tokenId, tokenIdIndex) in allTokenIds">
              <b-card body-class="p-1" footer-class="p-1" img-top class="m-1 p-0">
                <b-link @click="addImage('ZombieBaby', tokenId, 'media/' + nftData.tokens[tokenId].imageTBName)">
                  <b-avatar rounded="sm" variant="light" size="5.0rem" :src="'https://zombiebabies.eth.link/media/' + nftData.tokens[tokenId].imageTBName" class="pixelated"></b-avatar>
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
                <b-link @click="addImage('CryptoCat', punkData.id, punkData.imageUrl)">
                  <b-avatar rounded="sm" variant="light" size="5.0rem" :src="punkData.imageUrl" class="pixelated"></b-avatar>
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
                <b-link @click="addImage('PixelPortrait', pixelPortraitData.id, pixelPortraitData.imageUrl)">
                  <b-avatar rounded="sm" variant="light" size="5.0rem" :src="pixelPortraitData.imageUrl" class="pixelated"></b-avatar>
                </b-link>
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
                <b-link @click="addImage('BGANPUNKV2', bganpunkv2Data.id, bganpunkv2Data.imageUrl)">
                  <b-avatar rounded="sm" variant="light" size="5.0rem" :src="bganpunkv2Data.imageUrl" class="pixelated"></b-avatar>
                </b-link>
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
                <b-link @click="addImage('PunkBody', punkBodyData.id, punkBodyData.imageUrl)">
                  <b-avatar rounded="sm" variant="light" size="5.0rem" :src="punkBodyData.imageUrl" class="pixelated"></b-avatar>
                </b-link>
                <template #footer>
                  <span class="small truncate">
                    #{{ punkBodyData.id }}
                  </span>
                </template>
              </b-card>
            </div>
          </b-card-group>
          <b-card-group deck class="m-2">
            <div v-for="mooncatsData in mooncatsDataList">
              <b-card body-class="p-1" footer-class="p-1" img-top class="m-1 p-0">
                <b-link @click="addImage('MoonCat', mooncatsData.id, mooncatsData.imageUrl)">
                  <b-avatar rounded="sm" variant="light" size="5.0rem" :src="mooncatsData.imageUrl" class="pixelated"></b-avatar>
                </b-link>
                <template #footer>
                  <span class="small truncate">
                    #{{ mooncatsData.id }}
                  </span>
                </template>
              </b-card>
            </div>
          </b-card-group>
          <b-card-group deck class="m-2">
            <div v-for="cryptoCatData in cryptoCatsDataList">
              <b-card body-class="p-1" footer-class="p-1" img-top class="m-1 p-0">
                <b-link @click="addImage('CryptoCat', cryptoCatData.id, cryptoCatData.imageUrl)">
                  <b-avatar rounded="sm" variant="light" size="5.0rem" :src="cryptoCatData.imageUrl" class="pixelated"></b-avatar>
                </b-link>
                <template #footer>
                  <span class="small truncate">
                    #{{ cryptoCatData.id }}
                  </span>
                </template>
              </b-card>
            </div>
          </b-card-group>
          <b-card-group deck class="m-2">
            <div v-for="cryptoCatData in wrappedCryptoCatsDataList">
              <b-card body-class="p-1" footer-class="p-1" img-top class="m-1 p-0">
                <b-link @click="addImage('CryptoCat', cryptoCatData.id, cryptoCatData.imageUrl)">
                  <b-avatar rounded="sm" variant="light" size="5.0rem" :src="cryptoCatData.imageUrl" class="pixelated"></b-avatar>
                </b-link>
                <template #footer>
                  <span class="small truncate">
                    #{{ cryptoCatData.id }}
                  </span>
                </template>
              </b-card>
            </div>
          </b-card-group>
          <br />
          <!-- <b-card-img :src="punkData.imageUrl" alt="Punk image" width="100px" class="pixelated"></b-card-img> -->


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
      mooncatsDataList: [],
      cryptoCatsDataList: [],
      wrappedCryptoCatsDataList: [],

      canvasSetting: {
        width: 1024,
        height: 480
      },
      imageSetting: {
        scaleWidth: 0.5,
        scaleHeight: 0.5,
        flipX: false,
        flipY: false
      },
      settings: {
        "ImageUpload": {
          scaleWidth: 0.5,
          scaleHeight: 0.5,
          flipX: false,
          flipY: false
        },
        "ZombieBaby": {
          scaleWidth: 5.0 / 40,
          scaleHeight: 5.0 / 40,
          flipX: false,
          flipY: false
        },
        "CryptoPunk": {
          scaleWidth: 5.0,
          scaleHeight: 5.0,
          flipX: false,
          flipY: false
        },
        "PixelPortrait": {
          scaleWidth: 5.0 / 20,
          scaleHeight: 5.0 / 20,
          flipX: false,
          flipY: false
        },
        "BGANPUNKV2": {
          scaleWidth: 5.0 / 40,
          scaleHeight: 5.0 / 40,
          flipX: false,
          flipY: false
        },
        "PunkBody": {
          scaleWidth: 5.0,
          scaleHeight: 5.0,
          flipX: false,
          flipY: false
        },
        "MoonCat": {
          scaleWidth: 5.0 / 12,
          scaleHeight: 5.0 / 12,
          flipX: false,
          flipY: false
        },
        "CryptoCat": {
          scaleWidth: 5.0 / 80,
          scaleHeight: 5.0 / 80,
          flipX: false,
          flipY: false
        },
      },
      file: null,

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
    freeTokenId() {
      const tokenIds = store.getters['tokens/allTokenIds'];
      return tokenIds == null ? null : tokenIds[Math.floor(Math.random() * tokenIds.length)];
    },

  },
  methods: {
    setCanvasSize() {
      logInfo("Bodyshop", "setCanvasSize() canvasSetting: " + JSON.stringify(this.canvasSetting));
      var canvas = document.getElementById("thecanvas");
      canvas.width = this.canvasSetting.width;
      canvas.height = this.canvasSetting.height;
    },
    onFileChange(file) {
      const t = this;
      const url = URL.createObjectURL(file);
      logInfo("Bodyshop", "onFileChange() url: " + JSON.stringify(url));
      var imgObj = new Image();
      imgObj.src = url;
      logInfo("Bodyshop", "onFileChange() imgObj: " + JSON.stringify(imgObj));
      imgObj.onload = function () {
        const image = new fabric.Image(imgObj);

        // canvas.width = img.width;
        // canvas.height = img.height;
        // ctx.drawImage(img,0,0);

        image.set({
          // width: t.canvas.width,
          // height: t.canvas.height,
          left: 0,
          top: 0,
          angle: 0,
          padding: 0,
          cornersize: 0
        });
        logInfo("Bodyshop", "onFileChange() image width: " + image.width + ", height: " + image.height);
        logInfo("Bodyshop", "onFileChange() t.canvas width: " + t.canvas.width + ", height: " + t.canvas.height);
        // image.scale(image.width / t.canvas.width / 5, image.width / t.canvas.width / 5).setCoords();
        image.scale(t.settings['ImageUpload'].scaleWidth, t.settings['ImageUpload'].scaleHeight).set('flipX', t.settings['ImageUpload'].flipX).set('flipY', t.settings['ImageUpload'].flipY);
        t.canvas.add(image);
      };

      // var files = e.target.files || e.dataTransfer.files;
      // logInfo("Bodyshop", "onFileChange() files: " + JSON.stringify(files));
      // if (!files.length)
      //   return;
      // this.createImage(item, files[0]);
    },
    async addImage(nftType, id, image) {
      logInfo("Bodyshop", "addImage() type: " + nftType + ", id: " + id + ", image: " + image);
      const t = this;
      let scale = 5.0;
      if (nftType == 'ZombieBaby') {
        scale = 5.0 / 40;
      } else if (nftType == 'CryptoPunk') {
        scale = 5.0;
      } else if (nftType == 'PixelPortrait') {
        scale = 5.0 / 20;
      } else if (nftType == 'BGANPUNKV2') {
        scale = 5.0 / 40;
      } else if (nftType == 'PunkBody') {
        scale = 5.0;
      } else if (nftType == 'MoonCat') {
        scale = 5.0 / 12;
      } else if (nftType == 'CryptoCat') {
        scale = 5.0 / 80;
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
      const t = this;

      fetch('https://api.thegraph.com/subgraphs/name/merklejerk/moon-cats-rescue', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({"operationName":"cats","variables":{"addr":store.getters['connection/coinbase'].toLowerCase()},"query":"query cats($addr: ID!) {\n  cats(first: 1000, where: {owner: $addr}) {\n    id\n    rescueIndex\n    name\n    maxAdoptionPrice\n    askPrice\n    owner {\n      id\n      __typename\n    }\n    __typename\n  }\n}\n"})
      })
        .then(r => r.json())
        // .then(data => console.log('data returned:', data));
        .then(function(data) {
          // console.log('data returned: ', JSON.stringify(data.data.cats));
          const mooncatsDataListTemp = [];
          for (let catIndex in data.data.cats) {
            const cat = data.data.cats[catIndex];
            // console.log('cat: ', JSON.stringify(cat));
            var id = cat.rescueIndex;
            var imageUrl = "https://ipfs.io/ipfs/bafybeidk4zunuq56w2pf2sncexohlyqae62dzplljkbwswa7jwywh2dava/" + cat.id.substring(4, 6) + "/" + cat.id + ".png"
            mooncatsDataListTemp.push({ id: id, imageUrl: imageUrl });
          }
          t.mooncatsDataList = mooncatsDataListTemp;
          t.mooncatsDataList.sort(function(a, b) { return a.id - b.id; });
          // console.log('t.mooncatsDataList: ', JSON.stringify(t.mooncatsDataList));
        });

      // CryptoPunks - OpenSea
      let cryptoPunksUrl = "https://api.opensea.io/api/v1/assets?owner=" + store.getters['connection/coinbase'] + "&asset_contract_address=" + CRYPTOPUNKMARKETADDRESS + "&order_direction=desc&offset=0&limit=50";
      cryptoPunksReq = new XMLHttpRequest();
      cryptoPunksReq.overrideMimeType("application/json");
      logInfo("Bodyshop", "loadNFTs() openSeaPunkData cryptoPunksUrl: " + cryptoPunksUrl);
      cryptoPunksReq.open('GET', cryptoPunksUrl, true);
      cryptoPunksReq.onload  = function() {
        if (cryptoPunksReq.readyState == 4) {
          const punkDataTemp = [];
          const openSeaPunkData = JSON.parse(cryptoPunksReq.responseText);
          for (let assetIndex in Object.keys(openSeaPunkData.assets)) {
            const asset = openSeaPunkData.assets[assetIndex];
            var id = asset.token_id;
            var imageUrl = "https://www.larvalabs.com/public/images/cryptopunks/punk" + id + ".png"
            punkDataTemp.push({ id: id, imageUrl: imageUrl });
          }
          t.punksDataList = punkDataTemp;
          t.punksDataList.sort(function(a, b) { return a.id - b.id; });
        }
      };
      cryptoPunksReq.send(null);

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
            logInfo("Bodyshop", "loadNFTs() openSeaPixelPortraitsData id: " + id + " => " + imageUrl);
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
            bganpunkv2DataListTemp.push({ id: id, imageUrl: imageUrl });
          }
          t.bganpunkv2DataList = bganpunkv2DataListTemp;
          t.bganpunkv2DataList.sort(function(a, b) { return a.id - b.id; });
        }
      };
      bganpunkv2Req.send(null);

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
            var imageUrl = "https://api.punkbodies.com/get-images/" + id + ".png"
            punkBodiesDataListTemp.push({ id: id, imageUrl: imageUrl });
          }
          t.punkBodiesDataList = punkBodiesDataListTemp;
          t.punkBodiesDataList.sort(function(a, b) { return a.id - b.id; });
        }
      };
      punkBodiesReq.send(null);


      // CryptoCats
      let cryptoCatsUrl = "https://us-central1-cryptocats-ws-prod.cloudfunctions.net/listing/ccat/" + store.getters['connection/coinbase'].toLowerCase();
      cryptoCatsReq = new XMLHttpRequest();
      cryptoCatsReq.overrideMimeType("application/json");
      logInfo("Bodyshop", "loadNFTs() cryptoCatsUrl: " + cryptoCatsUrl);
      cryptoCatsReq.open('GET', cryptoCatsUrl, true);
      cryptoCatsReq.onload  = function() {
        if (cryptoCatsReq.readyState == 4) {
          const cryptoCatsDataListTemp = [];
          const cryptoCatsData = JSON.parse(cryptoCatsReq.responseText);
          logInfo("Bodyshop", "loadNFTs() cryptoCatsData: " + JSON.stringify(cryptoCatsData));
          if (cryptoCatsData.ccat != null) {
            logInfo("Bodyshop", "loadNFTs() cryptoCatsData.ccat: " + JSON.stringify(cryptoCatsData.ccat));
            for (const [id, value] of Object.entries(cryptoCatsData.ccat)) {
              // const ccat = cryptoCatsData.ccat[ccatIndex];
              logInfo("Bodyshop", "loadNFTs() id: " + id + " => " + JSON.stringify(value));
              var imageUrl = "https://cryptocats.thetwentysix.io/contents/images/cats/" + id + ".png"
              logInfo("Bodyshop", "loadNFTs() id: " + id + " => " + imageUrl);
              cryptoCatsDataListTemp.push({ id: id, imageUrl: imageUrl });
            }
            t.cryptoCatsDataList = cryptoCatsDataListTemp;
            t.cryptoCatsDataList.sort(function(a, b) { return a.id - b.id; });
          }
        }
      };
      cryptoCatsReq.send(null);

      // WrappedCryptoCats
      // Testing let wrappedCryptoCatsUrl = "https://us-central1-cryptocats-ws-prod.cloudfunctions.net/listing/wccat/0xad9f11d1dd6d202243473a0cdae606308ab243b4";
      let wrappedCryptoCatsUrl = "https://us-central1-cryptocats-ws-prod.cloudfunctions.net/listing/wccat/" + store.getters['connection/coinbase'].toLowerCase();
      wrappedCryptoCatsReq = new XMLHttpRequest();
      wrappedCryptoCatsReq.overrideMimeType("application/json");
      logInfo("Bodyshop", "loadNFTs() wrappedCryptoCatsUrl: " + wrappedCryptoCatsUrl);
      wrappedCryptoCatsReq.open('GET', wrappedCryptoCatsUrl, true);
      wrappedCryptoCatsReq.onload  = function() {
        if (wrappedCryptoCatsReq.readyState == 4) {
          const wrappedCryptoCatsDataListTemp = [];
          const wrappedCryptoCatsData = JSON.parse(wrappedCryptoCatsReq.responseText);
          logInfo("Bodyshop", "loadNFTs() wrappedCryptoCatsData: " + JSON.stringify(wrappedCryptoCatsData));
          // 00:47:36 INFO Bodyshop:loadNFTs() wrappedCryptoCatsData: {"ccat":{"207":"wrapped"}}
          if (wrappedCryptoCatsData.ccat != null) {
            logInfo("Bodyshop", "loadNFTs() wrappedCryptoCatsData.ccat: " + JSON.stringify(wrappedCryptoCatsData.ccat));
            for (const [id, value] of Object.entries(wrappedCryptoCatsData.ccat)) {
              // const ccat = cryptoCatsData.ccat[ccatIndex];
              logInfo("Bodyshop", "loadNFTs() id: " + id + " => " + JSON.stringify(value));
              var imageUrl = "https://cryptocats.thetwentysix.io/contents/images/cats/" + id + ".png"
              logInfo("Bodyshop", "loadNFTs() id: " + id + " => " + imageUrl);
              wrappedCryptoCatsDataListTemp.push({ id: id, imageUrl: imageUrl });
            }
            t.wrappedCryptoCatsDataList = wrappedCryptoCatsDataListTemp;
            t.wrappedCryptoCatsDataList.sort(function(a, b) { return a.id - b.id; });
          }
        }
      };
      wrappedCryptoCatsReq.send(null);

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
    this.canvas = new fabric.Canvas('thecanvas', {
      hoverCursor: 'pointer',
      selection: false,
      targetFindTolerance: 2
    });
    var rect = new fabric.Rect({
      left: 50,
      top: 50,
      fill: 'yellow',
      width: 400,
      height: 400
    });
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
        }
      }
    });

    // const t = this;
    // fabric.Image.fromURL('https://zombiebabies.eth.link/media/ZombieBaby_000_transparentbg.png', function(oImg) {
    //   oImg.set('imageSmoothing', false).scale(5.0/40).set('flipX', true);
    //   // oImg.filters.push(new fabric.Image.filters.Grayscale());
    //   // oImg.applyFilters();
    //   t.canvas.add(oImg);
    // });
    //
    // fabric.Image.fromURL('https://api.punkbodies.com/get-images/9031.png', function(oImg) {
    //   oImg.set('imageSmoothing', false).scale(5.0).set('flipX', true);
    //   t.canvas.add(oImg);
    // });
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
