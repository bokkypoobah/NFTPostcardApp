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
                <b-card body-class="p-1" img-alt="Image" img-top style="max-width: 15rem;" class="m-1 p-2">
                  <b-card-img :src="'media/' + nftData.tokens[tokenId].imageName" alt="Image" :style='{"background-color": nftData.tokens[tokenId].bgColour}'></b-card-img>
                  <b-card-text class="pt-2">
                    <b>#{{ tokenId }}</b> <b-badge>{{ balances != null && balances[tokenIdIndex] != null ? ("x" + balances[tokenIdIndex]) : 0 }}</b-badge>:
                    <span v-for="(parentId, parentIndex) in nftData.tokens[tokenId].parents">
                      <span v-if="parentIndex > 0">
                       +
                      </span>
                      <b-avatar variant="light" size="1.5rem" :src="'media/' + nftData.tokens[tokenId].parents[parentIndex].image"></b-avatar>
                    </span><br />
                    <span v-for="attribute in nftData.tokens[tokenId].attributes"><b-badge pill variant="success" class="mr-1">{{ attribute }}</b-badge></span>
                    <span v-for="ancientDNA in nftData.tokens[tokenId].ancientDNA"><b-badge pill variant="warning" class="mr-1">{{ ancientDNA }} <font size="-1">🧬</font></b-badge></span>
                  </b-card-text>
                </b-card>
              </div>
              <div>
                <b-card body-class="p-1" :img-src="'media/' + 'ZombieBabies_000-008_random.gif'" img-alt="Image" img-top style="max-width: 15rem;" class="m-1 p-2">
                  <b-card-text class="pt-2">
                    <!-- <b-button v-show="tokens[tokenId].owner === coinbase" size="sm" class="float-right" @click="burnToken(tokenId)" variant="danger">Burn Token</b-button> -->
                    <b-button size="sm" variant="info">Adopt A ZombieBaby</b-button><br />
                    <b-badge>Free + transaction fee</b-badge><br />
                    Next available from the adoption centre, #0 to #7
                  </b-card-text>
                </b-card>
              </div>
              <div>
                <b-card body-class="p-1" :img-src="'media/' + 'ZombieBabies_000-008_set.gif'" img-alt="Image" img-top style="max-width: 15rem;" class="m-1 p-2">
                  <b-card-text class="pt-2">
                    <b-button size="sm" variant="info">Adopt A Clowder Of ZombieBabies</b-button><br />
                    <b-badge>0.05 ETH + transaction fee</b-badge><br />
                    ZombieBabies #0 to #7
                  </b-card-text>
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
    onSlideStart(slide) {
      this.sliding = true
    },
    onSlideEnd(slide) {
      this.sliding = false
    }
  },
  computed: {
    connect() {
      return store.getters['connection/connect'];
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
