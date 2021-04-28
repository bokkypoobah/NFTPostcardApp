// const deleteIcon = "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3Csvg version='1.1' id='Ebene_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='595.275px' height='595.275px' viewBox='200 215 230 470' xml:space='preserve'%3E%3Ccircle style='fill:%23F44336;' cx='299.76' cy='439.067' r='218.516'/%3E%3Cg%3E%3Crect x='267.162' y='307.978' transform='matrix(0.7071 -0.7071 0.7071 0.7071 -222.6202 340.6915)' style='fill:white;' width='65.545' height='262.18'/%3E%3Crect x='266.988' y='308.153' transform='matrix(0.7071 0.7071 -0.7071 0.7071 398.3889 -83.3116)' style='fill:white;' width='65.544' height='262.179'/%3E%3C/g%3E%3C/svg%3E";
//
// var cloneIcon = "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='iso-8859-1'%3F%3E%3Csvg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 55.699 55.699' width='100px' height='100px' xml:space='preserve'%3E%3Cpath style='fill:%23010002;' d='M51.51,18.001c-0.006-0.085-0.022-0.167-0.05-0.248c-0.012-0.034-0.02-0.067-0.035-0.1 c-0.049-0.106-0.109-0.206-0.194-0.291v-0.001l0,0c0,0-0.001-0.001-0.001-0.002L34.161,0.293c-0.086-0.087-0.188-0.148-0.295-0.197 c-0.027-0.013-0.057-0.02-0.086-0.03c-0.086-0.029-0.174-0.048-0.265-0.053C33.494,0.011,33.475,0,33.453,0H22.177 c-3.678,0-6.669,2.992-6.669,6.67v1.674h-4.663c-3.678,0-6.67,2.992-6.67,6.67V49.03c0,3.678,2.992,6.669,6.67,6.669h22.677 c3.677,0,6.669-2.991,6.669-6.669v-1.675h4.664c3.678,0,6.669-2.991,6.669-6.669V18.069C51.524,18.045,51.512,18.025,51.51,18.001z M34.454,3.414l13.655,13.655h-8.985c-2.575,0-4.67-2.095-4.67-4.67V3.414z M38.191,49.029c0,2.574-2.095,4.669-4.669,4.669H10.845 c-2.575,0-4.67-2.095-4.67-4.669V15.014c0-2.575,2.095-4.67,4.67-4.67h5.663h4.614v10.399c0,3.678,2.991,6.669,6.668,6.669h10.4 v18.942L38.191,49.029L38.191,49.029z M36.777,25.412h-8.986c-2.574,0-4.668-2.094-4.668-4.669v-8.985L36.777,25.412z M44.855,45.355h-4.664V26.412c0-0.023-0.012-0.044-0.014-0.067c-0.006-0.085-0.021-0.167-0.049-0.249 c-0.012-0.033-0.021-0.066-0.036-0.1c-0.048-0.105-0.109-0.205-0.194-0.29l0,0l0,0c0-0.001-0.001-0.002-0.001-0.002L22.829,8.637 c-0.087-0.086-0.188-0.147-0.295-0.196c-0.029-0.013-0.058-0.021-0.088-0.031c-0.086-0.03-0.172-0.048-0.263-0.053 c-0.021-0.002-0.04-0.013-0.062-0.013h-4.614V6.67c0-2.575,2.095-4.67,4.669-4.67h10.277v10.4c0,3.678,2.992,6.67,6.67,6.67h10.399 v21.616C49.524,43.26,47.429,45.355,44.855,45.355z'/%3E%3C/svg%3E%0A";

const Bodyshop = {
  template: `
    <div class="mt-5 pt-3">
      <b-card no-body header="Bodyshop" class="border-0" header-class="p-1">
        <b-card no-body class="border-0 m-0 mt-2">
          <b-card-body class="p-0">

            <b-container class="p-0" fluid>

              <b-row class="mb-3">
                <b-col md="8" class="p-3">
                  <div id="toBeCaptured">
                    <canvas id="thecanvas" width="1024" height="480" style="border:1px solid; margin: 0 auto; position: absolute;"></canvas>
                  </div>
                </b-col>

                <b-col md="4" class="ml-auto p-3">
                  <pre>
                    <code class="json">
{{ JSON.stringify(selectedObject, null, 4) }}
                    </code>
                  </pre>
                </b-col>

              </b-row>


              <b-row class="text-center" style="border:1px solid;">
                <b-col cols="8">
                  <!-- <canvas id="thecanvas" width="480" height="480" style="border:1px solid; margin: 0 auto; position: absolute;"></canvas> -->
                </b-col>
                <b-col cols="4">3 of 3</b-col>
              </b-row>
            </b-container>

            <div>
              <b-card no-body class="mt-2">
                <b-tabs vertical pills card end nav-class="p-2" active-tab-class="p-2">

                  <b-tab active title="Canvas" class="p-1">
                    <b-card-text>
                      <b-form-group label-cols="2" label-size="sm" label="Width" description="e.g., 1024. Max 2048">
                        <b-form-input type="text" v-model.trim="canvasSetting.width" class="w-25"></b-form-input>
                      </b-form-group>
                      <b-form-group label-cols="2" label-size="sm" label="Height" description="e.g., 480. Max 2048">
                        <b-form-input type="text" v-model.trim="canvasSetting.height" class="w-25"></b-form-input>
                      </b-form-group>
                      <b-form-group label-cols="2" label-size="sm">
                        <b-button size="sm" @click="setCanvasSize()" variant="info">Set Canvas Size</b-button>
                      </b-form-group>
                      <b-form-group label-cols="2" label-size="sm">
                        <b-button size="sm" @click="saveImage()" variant="info">Save Image</b-button>
                      </b-form-group>
                    </b-card-text>
                  </b-tab>
                  <b-tab title="Sample NFTs" class="p-1">
                    <b-card-group deck class="m-0">
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
                  <b-tab title="ZombieBabies" class="p-1">
                    <b-card-group deck class="m-0">
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
                  </b-tab>
                  <b-tab title="CryptoPunks" class="p-1">
                    <b-card-group deck class="m-0">
                      <div v-for="punkData in punksDataList">
                        <b-card body-class="p-1" footer-class="p-1" img-top class="m-1 p-0">
                          <b-link @click="addImage('CryptoPunk', punkData.id, punkData.imageUrl)">
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
                    <div v-if="!powerOn" class="mt-4">
                      Click the power button <b-button size="sm" variant="link" class="m-0 p-0" v-b-popover.hover="'Power up this app'" @click="setPowerOn();" v-if="!powerOn"><b-icon-power shift-v="-1" font-scale="1.5"></b-icon-power></b-button> on the top right to connect via web3 to load your NFTs.
                    </div>
                    <div v-else>
                      <b-button size="sm" @click="loadNFTs('CryptoPunks')" variant="link" class="mt-2"><b-icon-arrow-repeat v-b-popover.hover="'(Re)load your NFTs'" shift-v="+3" font-scale="1.5"></b-icon-arrow-repeat></b-button>CryptoPunks
                    </div>
                  </b-tab>

                  <b-tab title="PixelPortraits" class="p-1">
                    <b-card-group deck class="m-0">
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
                    <div v-if="!powerOn" class="mt-4">
                      Click the power button <b-button size="sm" variant="link" class="m-0 p-0" v-b-popover.hover="'Power up this app'" @click="setPowerOn();" v-if="!powerOn"><b-icon-power shift-v="-1" font-scale="1.5"></b-icon-power></b-button> on the top right to connect via web3 to load your NFTs.
                    </div>
                    <div v-else>
                      <b-button size="sm" @click="loadNFTs('PixelPortraits')" variant="link" class="mt-2"><b-icon-arrow-repeat v-b-popover.hover="'(Re)load your NFTs'" shift-v="+3" font-scale="1.5"></b-icon-arrow-repeat></b-button> PixelPortraits
                    </div>
                  </b-tab>

                  <b-tab title="BGANPUNKV2" class="p-1">
                    <b-card-group deck class="m-0">
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
                    <div v-if="!powerOn" class="mt-4">
                      Click the power button <b-button size="sm" variant="link" class="m-0 p-0" v-b-popover.hover="'Power up this app'" @click="setPowerOn();" v-if="!powerOn"><b-icon-power shift-v="-1" font-scale="1.5"></b-icon-power></b-button> on the top right to connect via web3 to load your NFTs.
                    </div>
                    <div v-else>
                      <b-button size="sm" @click="loadNFTs('BGANPUNKV2')" variant="link" class="mt-2"><b-icon-arrow-repeat v-b-popover.hover="'(Re)load your NFTs'" shift-v="+3" font-scale="1.5"></b-icon-arrow-repeat></b-button> BGANPUNKV2
                    </div>
                  </b-tab>

                  <b-tab title="PunkBodies" class="p-1">
                    <b-card-group deck class="m-0">
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
                    <div v-if="!powerOn" class="mt-4">
                      Click the power button <b-button size="sm" variant="link" class="m-0 p-0" v-b-popover.hover="'Power up this app'" @click="setPowerOn();" v-if="!powerOn"><b-icon-power shift-v="-1" font-scale="1.5"></b-icon-power></b-button> on the top right to connect via web3 to load your NFTs.
                    </div>
                    <div v-else>
                      <b-button size="sm" @click="loadNFTs('PunkBodies')" variant="link" class="mt-2"><b-icon-arrow-repeat v-b-popover.hover="'(Re)load your NFTs'" shift-v="+3" font-scale="1.5"></b-icon-arrow-repeat></b-button> PunkBodies
                    </div>
                  </b-tab>


                  <b-tab title="MoonCats" class="p-1">
                    <b-card-group deck class="m-0">
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
                    <div v-if="!powerOn" class="mt-4">
                      Click the power button <b-button size="sm" variant="link" class="m-0 p-0" v-b-popover.hover="'Power up this app'" @click="setPowerOn();" v-if="!powerOn"><b-icon-power shift-v="-1" font-scale="1.5"></b-icon-power></b-button> on the top right to connect via web3 to load your NFTs.
                    </div>
                    <div v-else>
                      <b-button size="sm" @click="loadNFTs('MoonCats')" variant="link" class="mt-2"><b-icon-arrow-repeat v-b-popover.hover="'(Re)load your NFTs'" shift-v="+3" font-scale="1.5"></b-icon-arrow-repeat></b-button> MoonCats
                    </div>
                  </b-tab>

                  <b-tab title="CryptoCats" class="p-1">
                    <b-card-group deck class="m-0">
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
                    <div v-if="!powerOn" class="mt-4">
                      Click the power button <b-button size="sm" variant="link" class="m-0 p-0" v-b-popover.hover="'Power up this app'" @click="setPowerOn();" v-if="!powerOn"><b-icon-power shift-v="-1" font-scale="1.5"></b-icon-power></b-button> on the top right to connect via web3 to load your NFTs.
                    </div>
                    <div v-else>
                      <b-button size="sm" @click="loadNFTs('CryptoCats')" variant="link" class="mt-2"><b-icon-arrow-repeat v-b-popover.hover="'(Re)load your NFTs'" shift-v="+3" font-scale="1.5"></b-icon-arrow-repeat></b-button> CryptoCats
                    </div>

                  </b-tab>

                  <b-tab title="Upload Image" class="p-1">
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

      selectedObject: null,
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
    powerOn() {
      return store.getters['connection/powerOn'];
    },
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
    async saveImage() {
      logInfo("Bodyshop", "saveImage()");

      // const div = document.getElementById("toBeCaptured");
      // logInfo("Bodyshop", "saveImage() div: " + JSON.stringify(div));
      // console.table(div);

      // getScreenshotOfElement($("div#toBeCaptured").get(0), 0, 0, 100, 100, function(data) {
      //     // in the data variable there is the base64 image
      //     // exmaple for displaying the image in an <img>
      //     $("img#captured").attr("src", "data:image/png;base64,"+data);
      // });

      // function getScreenshotOfElement(element, posX, posY, width, height, callback) {
      //     html2canvas(element, {
      //         onrendered: function (canvas) {
      //             var context = canvas.getContext('2d');
      //             var imageData = context.getImageData(posX, posY, width, height).data;
      //             var outputCanvas = document.createElement('canvas');
      //             var outputContext = outputCanvas.getContext('2d');
      //             outputCanvas.width = width;
      //             outputCanvas.height = height;
      //
      //             var idata = outputContext.createImageData(width, height);
      //             idata.data.set(imageData);
      //             outputContext.putImageData(idata, 0, 0);
      //             callback(outputCanvas.toDataURL().replace("data:image/png;base64,", ""));
      //         },
      //         width: width,
      //         height: height,
      //         useCORS: true,
      //         taintTest: false,
      //         allowTaint: false
      //     });
      // }

      /*
      function getScreenshotOfElement(element, posX, posY, width, height, callback) {
        // logInfo("Bodyshop", "getScreenshotOfElement() element: " + JSON.stringify(element));
        // console.table(element);
        html2canvas(element, {
          width: width,
          height: height,
          useCORS: true,
          taintTest: false,
          allowTaint: false
        }).then(canvas => {
          // onrendered: function (canvas) {
          // logInfo("Bodyshop", "getScreenshotOfElement() element: " + JSON.stringify(element));
          var context = canvas.getContext('2d');
          var imageData = context.getImageData(posX, posY, width, height).data;
          var outputCanvas = document.createElement('canvas');
          var outputContext = outputCanvas.getContext('2d');
          outputCanvas.width = width;
          outputCanvas.height = height;

          var idata = outputContext.createImageData(width, height);
          idata.data.set(imageData);
          outputContext.putImageData(idata, 0, 0);
          logInfo("Bodyshop", "getScreenshotOfElement() idata: " + JSON.stringify(idata));
          callback(outputCanvas.toDataURL());
          // },
        });
      }

      getScreenshotOfElement(document.querySelector("#toBeCaptured"), 0, 0, 1000, 1000, async function(data) {
        // in the data variable there is the base64 image
        // exmaple for displaying the image in an <img>
        // $("img#captured").attr("src", "data:image/png;base64,"+data);
        logInfo("Bodyshop", "saveImage() data: " + JSON.stringify(data));
        const blob = await fetch(data).then(r => r.blob());
        logInfo("Bodyshop", "saveImage() blob: " + JSON.stringify(blob));
        const url = URL.createObjectURL(blob);
        logInfo("Bodyshop", "saveImage() url: " + JSON.stringify(url));
        const a = document.createElement('a');
        a.download = "my_image.png"
        a.href = url;
        a.click();
        URL.revokeObjectURL(url);
        a.remove();
      });
      */

      // this.canvas.renderAll();
      // console.table(document.getElementsByClassName("upper-canvas"));
      // var element = document.getElementsByClassName("upper-canvas")[0];
      // console.table(element);
      const posX = 0;
      const posY = 0;
      const width = 480;
      const height = 480;
      html2canvas(document.body).then(async (canvas) => {
      // html2canvas(document.querySelector("#thecanvas")).then(async (canvas) => {
      // html2canvas(element).then(async (canvas) => {
        // document.body.appendChild(canvas);
        var context = canvas.getContext('2d');
        var imageData = context.getImageData(posX, posY, width, height).data;
        logInfo("Bodyshop", "saveImage() imageData: " + JSON.stringify(imageData));
        var outputCanvas = document.createElement('canvas');
        var outputContext = outputCanvas.getContext('2d');
        outputCanvas.width = width;
        outputCanvas.height = height;

        var idata = outputContext.createImageData(width, height);
        idata.data.set(imageData);
        outputContext.putImageData(idata, 0, 0);
        var dataURL = outputCanvas.toDataURL();
        logInfo("Bodyshop", "saveImage() dataURL: " + JSON.stringify(dataURL));

        const blob = await fetch(dataURL).then(r => r.blob());
        logInfo("Bodyshop", "saveImage() blob: " + JSON.stringify(blob));
        const url = URL.createObjectURL(blob);
        logInfo("Bodyshop", "saveImage() url: " + JSON.stringify(url));
        const a = document.createElement('a');
        a.download = "my_image.png"
        a.href = url;
        a.click();
        URL.revokeObjectURL(url);
        a.remove();

        // callback(outputCanvas.toDataURL().replace("data:image/png;base64,", ""));
        // console.table(canvas);
          // document.body.appendChild(canvas)
      }, { width: width, height: height, useCORS: false, taintTest: false, allowTaint: true });
      // }, { width: width, height: height, useCORS: true, taintTest: false, allowTaint: false });


      // let dataURL = this.canvas.toDataURL({ format: 'png', multiplier: 2, });
      // logInfo("Bodyshop", "saveImage() dataURL: " + JSON.stringify(dataURL));
      //
      // const blob = await fetch(dataURL).then(r => r.blob());
      // logInfo("Bodyshop", "saveImage() blob: " + JSON.stringify(blob));
      // const url = URL.createObjectURL(blob);
      // logInfo("Bodyshop", "saveImage() url: " + JSON.stringify(url));
      // const a = document.createElement('a');
      // a.download = "my_image.png"
      // a.href = url;
      // a.click();
      // URL.revokeObjectURL(url);
      // a.remove();

      // downloadDataUrl(dataURL);

    },
    setCanvasSize() {
      // logInfo("Bodyshop", "setCanvasSize() canvasSetting: " + JSON.stringify(this.canvasSetting));
      this.canvas.setWidth(this.canvasSetting.width);
      this.canvas.setHeight(this.canvasSetting.height);
    },
    onFileChange(file) {
      const t = this;
      const url = URL.createObjectURL(file);
      // logInfo("Bodyshop", "onFileChange() url: " + JSON.stringify(url));
      var imgObj = new Image();
      imgObj.src = url;
      // logInfo("Bodyshop", "onFileChange() imgObj: " + JSON.stringify(imgObj));
      imgObj.onload = function () {
        const image = new fabric.Image(imgObj);
        image.set({ left: 0, top: 0, angle: 0, padding: 0, cornersize: 0 });
        // logInfo("Bodyshop", "onFileChange() image width: " + image.width + ", height: " + image.height);
        // logInfo("Bodyshop", "onFileChange() t.canvas width: " + t.canvas.width + ", height: " + t.canvas.height);
        image.scale(t.settings['ImageUpload'].scaleWidth, t.settings['ImageUpload'].scaleHeight).set('flipX', t.settings['ImageUpload'].flipX).set('flipY', t.settings['ImageUpload'].flipY);
        t.canvas.add(image);
        // t.canvas.setBackgroundImage(image);
        // t.canvas.renderAll();
      };
    },
    async addImage(nftType, id, image) {
      logInfo("Bodyshop", "addImage() type: " + nftType + ", id: " + id + ", image: " + image);
      const t = this;
      let scale = 5.0;
      if (nftType == 'ZombieBaby') {
        scale = 5.0 / 40;
      } else if (nftType == 'CryptoPunk') {
        scale = 5.0 / 14;
      } else if (nftType == 'PixelPortrait') {
        scale = 5.0 / 20;
      } else if (nftType == 'BGANPUNKV2') {
        scale = 5.0 / 40;
      } else if (nftType == 'PunkBody') {
        scale = 1.0;
      } else if (nftType == 'MoonCat') {
        scale = 5.0 / 12;
      } else if (nftType == 'CryptoCat') {
        scale = 5.0 / 80;
      }
      const flipX = false;
      // fabric.Image.fromURL(image, function(oImg) {
      //   oImg.set('imageSmoothing', false).scale(scale).set('flipX', flipX);
      //   // oImg.set({width: 300, height: 300, left: 10, top: 10, originX: 'left', originY: 'top'});
      //   // oImg.filters.push(new fabric.Image.filters.Grayscale());
      //   // oImg.applyFilters();
      //   t.canvas.add(oImg);
      // } , {crossOrigin: 'anonymous'});
      fabric.Image.fromURL(image, function(oImg) {
        oImg.set('imageSmoothing', false).scale(scale).set('flipX', flipX);
        // oImg.set({width: 300, height: 300, left: 10, top: 10, originX: 'left', originY: 'top'});
        // oImg.filters.push(new fabric.Image.filters.Grayscale());
        // oImg.applyFilters();
        logInfo("Bodyshop", "addImage() adding: " + JSON.stringify(oImg));
        t.canvas.add(oImg);
        logInfo("Bodyshop", "addImage() added: " + JSON.stringify(oImg));
      } , {crossOrigin: 'anonymous'});
    },
    async loadNFTs(collection) {
      logInfo("Bodyshop", "loadNFTs() collection: " + collection);
      const t = this;

      // CryptoPunks - OpenSea
      if (collection == "CryptoPunks") {
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
              // var id = asset.token_id;
              // var imageUrl = "https://www.larvalabs.com/public/images/cryptopunks/punk" + id + ".png"
              // punkDataTemp.push({ id: id, imageUrl: imageUrl });
              punkDataTemp.push({ id: asset.token_id, imageUrl: asset.image_url });
            }
            t.punksDataList = punkDataTemp;
            t.punksDataList.sort(function(a, b) { return a.id - b.id; });
          }
        };
        cryptoPunksReq.send(null);
      }

      // Pixel Portraits - OpenSea
      if (collection == "PixelPortraits") {
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
      }

      // BGANPUNKV2 - OpenSea
      if (collection == "BGANPUNKV2") {
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
              bganpunkv2DataListTemp.push({ id: asset.token_id, imageUrl: asset.image_original_url });
            }
            t.bganpunkv2DataList = bganpunkv2DataListTemp;
            t.bganpunkv2DataList.sort(function(a, b) { return a.id - b.id; });
          }
        };
        bganpunkv2Req.send(null);
      }

      // PunkBodies - OpenSea
      if (collection == "PunkBodies") {
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
              // var id = asset.token_id;
              // var imageUrl = "https://api.punkbodies.com/get-images/" + id + ".png"
              // punkBodiesDataListTemp.push({ id: id, imageUrl: imageUrl });
              punkBodiesDataListTemp.push({ id: asset.token_id, imageUrl: asset.image_url });
            }
            t.punkBodiesDataList = punkBodiesDataListTemp;
            t.punkBodiesDataList.sort(function(a, b) { return a.id - b.id; });
          }
        };
        punkBodiesReq.send(null);
      }

      if (collection == "MoonCats") {
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
      }

      // CryptoCats
      if (collection == "CryptoCats") {
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
      }

    },
    async timeoutCallback() {
      logInfo("Bodyshop", "timeoutCallback() count: " + this.count);

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
      fill: 'cyan',
      width: 380,
      height: 380
    });
    this.canvas.add(rect);

    function renderIcon(icon) {
      return function renderIcon(ctx, left, top, styleOverride, fabricObject) {
        var size = this.cornerSize;
        ctx.save();
        ctx.translate(left, top);
        ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));
        ctx.drawImage(icon, -size/2, -size/2, size, size);
        ctx.restore();
      }
    }

    const deleteImg = document.createElement('img');
    // deleteImg.src = deleteIcon;
    deleteImg.src = "images/trash.svg";
    const cloneImg = document.createElement('img');
    // cloneImg.src = cloneIcon;
    cloneImg.src = "images/images.svg";
    const layerUpImg = document.createElement('img');
    layerUpImg.src = "images/arrow-up-square.svg";
    const layerDownImg = document.createElement('img');
    layerDownImg.src = "images/arrow-down-square.svg";
    const flipYImg = document.createElement('img');
    flipYImg.src = "images/symmetry-horizontal.svg";
    const flipXImg = document.createElement('img');
    flipXImg.src = "images/symmetry-vertical.svg";
    const removeBackgroundImg = document.createElement('img');
    removeBackgroundImg.src = "images/person-bounding-box.svg";

    function deleteObject(eventData, transform) {
      var target = transform.target;
  		var canvas = target.canvas;
  		canvas.remove(target);
      canvas.requestRenderAll();
  	}

    function cloneObject(eventData, transform) {
      var target = transform.target;
      var canvas = target.canvas;
      target.clone(function(cloned) {
        cloned.left += 10;
        cloned.top += 10;
        canvas.add(cloned);
      });
    }

    function layerUpObject(eventData, transform) {
      transform.target.bringForward();
    }

    function layerDownObject(eventData, transform) {
      transform.target.sendBackwards();
    }

    function flipXObject(eventData, transform) {
      transform.target.flipX = !transform.target.flipX;
      t.canvas.renderAll();
    }

    function flipYObject(eventData, transform) {
      transform.target.flipY = !transform.target.flipY;
      t.canvas.renderAll();
    }

    function removeObjectBackground(eventData, transform) {
      if (transform.target.type == "image") {
        logInfo("Bodyshop", "Calling removeObjectBackground()  target: " + JSON.stringify(transform.target));
        let ctx = transform.target.canvas.getContext('2d');
        let data = ctx.getImageData(parseInt(transform.target.left) * window.devicePixelRatio + 1, parseInt(transform.target.top) * window.devicePixelRatio + 1, 1, 1);
        logInfo("Bodyshop", "Calling removeObjectBackground() data: " + JSON.stringify(data));
        if (data.data[3] != 0) {
          var backgroundColor = '#' + data.data[0].toString(16) + data.data[1].toString(16) + data.data[2].toString(16);
          var filter = new fabric.Image.filters.RemoveColor({
            threshold: 0.2,
            color: backgroundColor
          });
          transform.target.filters.push(filter);
          transform.target.applyFilters();
          t.canvas.renderAll();
        }
      }
    }

    fabric.Object.prototype.controls.deleteControl = new fabric.Control({
      x: 0.5,
      y: -0.5,
      offsetY: -16,
      offsetX: 16,
      cursorStyle: 'pointer',
      mouseUpHandler: deleteObject,
      render: renderIcon(deleteImg),
      cornerSize: 24
    });

    fabric.Object.prototype.controls.clone = new fabric.Control({
      x: -0.5,
      y: -0.5,
      offsetY: -16,
      offsetX: -16,
      cursorStyle: 'pointer',
      mouseUpHandler: cloneObject,
      render: renderIcon(cloneImg),
      cornerSize: 24
    });

    fabric.Object.prototype.controls.layerUpControl = new fabric.Control({
      x: 0.5,
      y: 0.5,
      offsetY: 16,
      offsetX: 16,
      cursorStyle: 'pointer',
      mouseUpHandler: layerUpObject,
      render: renderIcon(layerUpImg),
      cornerSize: 24
    });

    fabric.Object.prototype.controls.layerDownControl = new fabric.Control({
      x: -0.5,
      y: 0.5,
      offsetY: 16,
      offsetX: -16,
      cursorStyle: 'pointer',
      mouseUpHandler: layerDownObject,
      render: renderIcon(layerDownImg),
      cornerSize: 24
    });

    fabric.Object.prototype.controls.flipXControl = new fabric.Control({
      x: -0.5,
      y: 0,
      offsetY: 0,
      offsetX: -16,
      cursorStyle: 'pointer',
      mouseUpHandler: flipXObject,
      render: renderIcon(flipXImg),
      cornerSize: 24
    });

    fabric.Object.prototype.controls.flipYControl = new fabric.Control({
      x: 0,
      y: 0.5,
      offsetY: 16,
      offsetX: 0,
      cursorStyle: 'pointer',
      mouseUpHandler: flipYObject,
      render: renderIcon(flipYImg),
      cornerSize: 24
    });

    fabric.Object.prototype.controls.removeBackgroundControl = new fabric.Control({
      x: 0.5,
      y: 0,
      offsetY: 0,
      offsetX: 16,
      cursorStyle: 'pointer',
      mouseUpHandler: removeObjectBackground,
      render: renderIcon(removeBackgroundImg),
      cornerSize: 24
    });

    // logInfo("Bodyshop", "Calling fabric.Object.prototype.controls: " + JSON.stringify(fabric.Object.prototype.controls));

    const t = this;
    this.canvas.on({
      'object:moving': function(e) {
        e.target.opacity = 0.5;
      },
      'object:modified': function(e) {
        e.target.opacity = 1;
        // var objects = canvas.getObjects('line');
        // var objects = t.canvas.getObjects();
        // for (let i in objects) {
        //     logInfo("Bodyshop", "Canvas object:modified(): " + JSON.stringify(objects[i]));
        // }
      },
      'selection:cleared': function(e) {
        // var objects = t.canvas.getObjects();
        // for (let i in objects) {
        //     logInfo("Bodyshop", "Canvas selection:cleared(): " + JSON.stringify(objects[i]));
        // }
      },
      'selection:updated': function(e) {
        // var objects = t.canvas.getObjects();
        // for (let i in objects) {
        //     logInfo("Bodyshop", "Canvas selection:updated(): " + JSON.stringify(objects[i]));
        // }
      },
      'selection:created': function(e) {
        // logInfo("Bodyshop", "Canvas selection:created() e: " + JSON.stringify(e));
        // // t.selectedObject = e;
        // var objects = t.canvas.getObjects();
        // for (let i in objects) {
        //     logInfo("Bodyshop", "Canvas selection:created(): " + JSON.stringify(objects[i]));
        // }
      },
      'mouse:down': function(options) {
        if (options.target) {
          // logInfo("Bodyshop", "Canvas mouse:down(): " + JSON.stringify(options.target));
          t.selectedObject = options.target;
          // var objects = t.canvas.getObjects();
          // for (let i in objects) {
          //     logInfo("Bodyshop", "Canvas mouse:down(): " + JSON.stringify(objects[i]));
          // }
        }
      }
    });
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
