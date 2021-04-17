const Home = {
  template: `
    <div class="mt-5 pt-3">

    <b-card no-body header="Zombie Babies" class="border-0" header-class="p-1">

      <b-card no-body class="border-0 m-0 mt-2">
        <b-card-body class="p-0">
          <div>
            <!--
            <b-card>
              <b-img rounded="true" src="media/ZombieBaby_000.png" img-top style="max-width: 15rem;" class="m-1 p-2" />
            </b-card>
            <b-card bg-variant="none" style="background: radial-gradient(circle, black, white);">
              <b-img rounded="circle" src="media/ZombieBaby_000_transparentbg.png" img-top style="max-width: 15rem; background-color: gold;" class="m-1 p-2" />
            </b-card>
            -->
            <b-card-group class="m-2">
              <div v-for="(tokenId, tokenIdIndex) in allTokenIds">
                <b-card body-class="p-1" img-top style="max-width: 15rem;" class="m-1 p-0">
                  <b-card-img :src="'media/' + nftData.tokens[tokenId].imageTBName" alt="Image" :style='{"background-color": nftData.tokens[tokenId].bgColour}'></b-card-img>
                  <b-card-text class="pt-2" style="height: 8rem;">
                    <b v-b-popover.hover="'Zombie Baby #' + tokenId">#{{ tokenId }}</b> <b-badge v-if="connected" v-b-popover.hover="'Number of copies owned'">{{ balances != null && balances[tokenIdIndex] != null ? ("x" + balances[tokenIdIndex]) : 0 }}</b-badge>
                    <span class="float-right">
                      <span v-for="(parentId, parentIndex) in nftData.tokens[tokenId].parents">
                        <span v-if="parentIndex > 0">
                         +
                        </span>
                        <b-link :href="'https://www.larvalabs.com/cryptopunks/details/' + nftData.tokens[tokenId].parents[parentIndex].number" v-b-popover.hover="'Parent CryptoPunk #' + nftData.tokens[tokenId].parents[parentIndex].number" class="card-link" target="_blank"><b-avatar variant="light" size="2.0rem" :src="'https://www.larvalabs.com/public/images/cryptopunks/punk' + nftData.tokens[tokenId].parents[parentIndex].number + '.png'"></b-avatar></b-link>
                      </span>
                    </span>
                    <br />
                    <br />
                    <span v-for="attribute in nftData.tokens[tokenId].attributes"><b-badge pill variant="success" class="mr-1" v-b-popover.hover="'Zombie Baby attributes'">{{ attribute }}</b-badge></span>
                    <span v-for="ancientDNA in nftData.tokens[tokenId].ancientDNA"><b-badge pill variant="warning" class="mr-1" v-b-popover.hover="'Activated ancient DNA'">{{ ancientDNA }} <font size="-1">🧬</font></b-badge></span>
                  </b-card-text>
                  <template #footer>
                    <span class="float-right">
                      <b-link :href="'https://opensea.io/assets/'+ nftData.nftAddress + '/' + tokenId" v-b-popover.hover="'View on OpenSea.io'" target="_blank"><img src="images/381114e-opensea-logomark-flat-colored-blue.png" width="20px" /></b-link>
                      <b-link :href="'https://rarible.com/token/'+ nftData.nftAddress + ':' + tokenId" v-b-popover.hover="'View on Rarible.com'" target="_blank"><img src="images/rarible_feb7c08ba34c310f059947d23916f76c12314e85.png" height="20px" /></b-link>
                    </span>
                  </template>
                </b-card>
              </div>
              <div>
                <b-card body-class="p-1" img-top style="max-width: 15rem;" class="m-1 p-0">
                  <b-card-img src="media/ZombieBabies_000-008_random.gif" alt="media/ZombieBabies_000-008_random.gif"></b-card-img>
                  <b-card-text class="pt-2" style="height: 8rem;">
                    <b-button size="sm" @click="getOne()" variant="info">Adopt A ZombieBaby</b-button><br />
                    <b-badge>FREE + transaction fee</b-badge><br />
                    Next available from the adoption centre, #0 to #7
                  </b-card-text>
                  <template #footer>
                    <span class="float-right">
                      &nbsp;
                    </span>
                  </template>
                </b-card>
              </div>
              <div>
                <b-card body-class="p-1" img-top style="max-width: 15rem;" class="m-1 p-0">
                  <b-card-img src="media/ZombieBabies_000-008_set.gif" alt="media/ZombieBabies_000-008_set.gif"></b-card-img>
                  <b-card-text class="pt-2" style="height: 8rem;">
                    <b-button size="sm" @click="getSet()" variant="info">Adopt A Clowder Of ZombieBabies</b-button><br />
                    <b-badge>0.05 ETH + transaction fee</b-badge><br />
                    ZombieBabies #0 to #7
                  </b-card-text>
                  <template #footer>
                    <span class="float-right">
                      &nbsp;
                    </span>
                  </template>
                </b-card>
              </div>
            </b-card-group>
          </div>


          <!--
          <b-card-body class="mb-1">
            <b-list-group>
              <b-list-group-item to="/optinoExplorer/all">Optino Explorer</b-list-group-item>
              <b-list-group-item to="/feedsExplorer/all">Feeds Explorer</b-list-group-item>
              <b-list-group-item to="/tokensExplorer/all">Tokens Explorer</b-list-group-item>
              <b-list-group-item to="/governance/all">Governance</b-list-group-item>
              <b-list-group-item href="https://wiki.optino.io" target="_blank">Wiki</b-list-group-item>
            </b-list-group>
            <b-card-text class="mt-5">
              This is still work in progress. You will need a browser with web3 injection, e.g., using the MetaMask addon. In your web3 wallet, switch to the Ropsten testnet.
              <br />
              <div v-if="!connect">Please click on the power button <b-icon-power variant="primary" shift-v="-1" font-scale="1.5"></b-icon-power> on the top right to connect via MetaMask.</div>
            </b-card-text>
          </b-card-body>
          -->

          </b-card-body>
        </b-card>
      </b-card>
    </div>
  `,
  data: function () {
    return {
      slide: 0,
      sliding: null    }
  },
  methods: {
    async getOne(event) {
      if (!this.connected) {
        this.$bvModal.msgBoxOk('Please connect your web3 browser wallet using the power button on the top right.', {
            title: 'Note',
            size: 'sm',
            buttonSize: 'sm',
            okVariant: 'primary',
            footerClass: 'p-2',
            hideHeaderClose: false,
            centered: true
          });
      } else {
        logInfo("homeModule", "getOne()");
        this.$bvModal.msgBoxConfirm('Adopt the next available ZombieBaby for free? The Ethereum network transaction fee will be displayed in the next dialog box.', {
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
              logInfo("homeModule", "getOne() confirmed");
              // var factoryAddress = store.getters['optinoFactory/address']
              const adoptionContract = new ethers.Contract(ZOMBIEBABYADOPTIONCENTREADDRESS, ZOMBIEBABYADOPTIONCENTREABI, store.getters['connection/connection'].provider);
              logInfo("homeModule", "getOne() adoptionContract: " + JSON.stringify(adoptionContract));
              let tx;
              (async () => {
                try {
                  tx = await store.getters['connection/connection'].signer.sendTransaction({
                    to: ZOMBIEBABYADOPTIONCENTREADDRESS,
                    value: ethers.utils.parseEther("0"),
                    gasLimit: 100000
                  });
                  store.dispatch('connection/addTx', tx);
                } catch (error) {
                  store.dispatch('connection/setTxError', error.message);
                }
              })();
              event.preventDefault();
            }
          })
          .catch(err => {
            // An error occurred
          });
      }
    },
    async getSet(event) {
      if (!this.connected) {
        this.$bvModal.msgBoxOk('Please connect your web3 browser wallet using the power button on the top right.', {
            title: 'Note',
            size: 'sm',
            buttonSize: 'sm',
            okVariant: 'primary',
            footerClass: 'p-2',
            hideHeaderClose: false,
            centered: true
          });
      } else {
        logInfo("homeModule", "getSet()");
        this.$bvModal.msgBoxConfirm('Adopt ZombieBabies #0 to #7? Adoption fee is 0.05 ETH plus the Ethereum network transaction fee that will be displayed in the next dialog box.', {
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
              logInfo("homeModule", "getSet() confirmed");
              // var factoryAddress = store.getters['optinoFactory/address']
              const adoptionContract = new ethers.Contract(ZOMBIEBABYADOPTIONCENTREADDRESS, ZOMBIEBABYADOPTIONCENTREABI, store.getters['connection/connection'].provider);
              logInfo("homeModule", "getSet() adoptionContract: " + JSON.stringify(adoptionContract));
              let tx;
              (async () => {
                try {
                  tx = await store.getters['connection/connection'].signer.sendTransaction({
                    to: ZOMBIEBABYADOPTIONCENTREADDRESS,
                    value: ethers.utils.parseEther("0.05"),
                    gasLimit: 300000
                  });
                  store.dispatch('connection/addTx', tx);
                } catch (error) {
                  store.dispatch('connection/setTxError', error.message);
                }
              })();
              event.preventDefault();
            }
          })
          .catch(err => {
            // An error occurred
          });
      }
    },
    onSlideStart(slide) {
      this.sliding = true
    },
    onSlideEnd(slide) {
      this.sliding = false
    }
  },
  computed: {
    connected() {
      return store.getters['connection/connection'] != null && store.getters['connection/connection'].connected;
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
    balances() {
      return store.getters['tokens/balances'];
    },
  },
  mounted() {
    logInfo("homeModule", "mounted() Called");
  },
};
