const Home = {
  template: `
    <div class="mt-5 pt-3">
      <b-card no-body header="Home" class="border-0" header-class="p-1">
        <div>
            <b-carousel
              id="carousel-1"
              v-model="slide"
              :interval="4000"
              controls
              indicators
              background="#ababab"
              img-width="1024"
              img-height="480"
              style="text-shadow: 2px 2px 3px #333;"
              @sliding-start="onSlideStart"
              @sliding-end="onSlideEnd"
              class="mx-5 p-0"
            >

              <!-- Text slides with image -->
              <b-carousel-slide
                caption="Zombie #3636,"
                text="BASTARD GAN V2 Children And Cats, Bombo, NSW, Australia, Year 2021"
                img-src="images/IMG_9534_z3636_Bombo_2048x960.png"
                img-height="200"
              ></b-carousel-slide>

              <b-carousel-slide
                caption="Zombie #3636 & #4472 Family"
                text="On A Palaeontological Stroll Down The Permian At Gerroa, NSW, Australia"
                img-src="images/GerroaPhotoAlbumWithZ3636n4472Family_2048x960.png"
                img-height="200"
              ></b-carousel-slide>

              <b-carousel-slide
                caption="Zombie #3636 & #4472 Family"
                text="In Year 1637 At Utrecht To Trade Tulip NFT Options"
                img-src="images/Cryptogs_3185_ZFam_2048x960.png"
                img-height="200"
              ></b-carousel-slide>

              <b-carousel-slide
                caption="Zombie #3636 & #4472 Family"
                text="In 1507 At Badaling To Trade Silk NFTs"
                img-src="images/GreatWall_ZFam_2048x960.png"
                img-height="200"
              ></b-carousel-slide>

              <b-carousel-slide
                caption="Zombie Xtreme High Yield Farmers"
                text="With Subjects In 1935 At Milsons Point"
                img-src="images/PunkstersHarbourBridgeMilsonsPoint1935_1600x750.png"
                img-height="200"
              ></b-carousel-slide>

              <b-carousel-slide
                caption="Zombie #3636 & #4472,"
                text="Infected By Airborne Z-Alien Virus, Travel To 1,050 BC To Inspect Their Re-analoged Digitalised Cat At Earth-619"
                img-src="images/Punks_3636_4472_Sphinx_1024x480.png"
                img-height="200"
              ></b-carousel-slide>

              <b-carousel-slide
                caption="Zombie Xtreme High Yield Cultivator's Subjects,"
                text="Infected By Mutated Z-Alien Virus Strains In 1,050 BC at Earth-619"
                img-src="images/Punks_3636_4472_Sphinx_Subjects_More_1024x480.png"
                img-height="200"
              ></b-carousel-slide>

              <b-carousel-slide
                caption="Zombie Xtreme High Yield Cultivators"
                text="Take Ownership Of Twins At 1888 In The Royal Prince Alfred Hospital, Sydney. Credits - Mitchell Library, State Library of NSW"
                img-src="images/CryptoBabyPunk_401_Birth_At_RPA_1880-1893_960x450.png"
                img-height="200"
              ></b-carousel-slide>





              <!-- Slides with custom text -->
              <!--
              <b-carousel-slide img-src="https://picsum.photos/1024/480/?image=54">
                <h1>Hello world!</h1>
              </b-carousel-slide>
              -->

              <!-- Slides with image only -->
              <!-- <b-carousel-slide img-src="https://picsum.photos/1024/480/?image=58"></b-carousel-slide> -->

              <!-- Slides with img slot -->
              <!-- Note the classes .d-block and .img-fluid to prevent browser default image alignment -->
              <!--
              <b-carousel-slide>
                <template #img>
                  <img
                    class="d-block img-fluid w-100"
                    width="1024"
                    height="480"
                    src="https://picsum.photos/1024/480/?image=55"
                    alt="image slot"
                  >
                </template>
              </b-carousel-slide>
              -->

              <!-- Slide with blank fluid image to maintain slide aspect ratio -->
              <!--
              <b-carousel-slide caption="Blank Image" img-blank img-alt="Blank image">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse eros felis, tincidunt
                  a tincidunt eget, convallis vel est. Ut pellentesque ut lacus vel interdum.
                </p>
              </b-carousel-slide>
              -->

            </b-carousel>

            <p class="mt-4">
              Slide #: {{ slide }}<br>
              Sliding: {{ sliding }}
            </p>
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
  },
};
