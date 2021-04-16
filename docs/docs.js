const Docs = {
  template: `
    <div class="mt-5 pt-3">
      <b-card no-body header="Info" class="border-0" header-class="p-1">
        <b-card no-body class="border-0 m-0 mt-2">
          <b-tabs v-model="section" pills card vertical end nav-class="m-1 p-1" active-tab-class="m-1 mt-2 p-1">

            <!-- Intro -->
            <b-tab title="Intro" @click.prevent="updateRouterParamsSectionTopic('intro', 'top')">
              <b-card-text>
                <h5 ref="intro_top" class="mb-3">Intro</h5>

                <p>Zombies <b-link href="https://www.larvalabs.com/cryptopunks/details/3636" class="card-link" target="_blank">#3636 <b-avatar variant="light" size="2.0rem" src="https://www.larvalabs.com/public/images/cryptopunks/punk3636.png"></b-avatar></b-link> and
                <b-link href="https://www.larvalabs.com/cryptopunks/details/4472" class="card-link ml-0" target="_blank">#4472 <b-avatar variant="light" size="2.0rem" src="https://www.larvalabs.com/public/images/cryptopunks/punk4472.png"></b-avatar></b-link> Xtreme High Yield cultivators</p>

                <b-card no-body header="Zombies #3636 & #4472" class="border-0" header-class="p-1">
                  <div class="m-5">
                      <b-carousel
                        id="carousel-1"
                        v-model="slide"
                        :interval="5000"
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
                        <b-carousel-slide caption="Zombie #3636,"
                          text="BASTARD GAN V2 Children And Cats, Bombo, NSW, Australia, Year 2021">
                          <b-img-lazy slot="img" class="d-block img-fluid w-100" width="1024" height="480"
                             src="images/IMG_9534_z3636_Bombo_2048x960.png" alt="image slot"></b-img-lazy>
                        </b-carousel-slide>

                        <b-carousel-slide caption="Zombie #3636 & #4472 Family"
                          text="On A Palaeontological Stroll Down The Permian At Gerroa, NSW, Australia">
                          <b-img-lazy slot="img" class="d-block img-fluid w-100" width="1024" height="480"
                               src="images/GerroaPhotoAlbumWithZ3636n4472Family_2048x960.png" alt="image slot"></b-img-lazy>
                        </b-carousel-slide>

                        <b-carousel-slide caption="Zombie #3636 & #4472 Family"
                          text="In Year 1637 At Utrecht To Trade Tulip NFT Options">
                          <b-img-lazy slot="img" class="d-block img-fluid w-100" width="1024" height="480"
                               src="images/Cryptogs_3185_ZFam_2048x960.png" alt="image slot"></b-img-lazy>
                        </b-carousel-slide>

                        <b-carousel-slide caption="Zombie #3636 & #4472 Family"
                          text="In 1507 At Badaling To Trade Silk NFTs">
                          <b-img-lazy slot="img" class="d-block img-fluid w-100" width="1024" height="480"
                               src="images/GreatWall_ZFam_2048x960.png" alt="image slot"></b-img-lazy>
                        </b-carousel-slide>

                        <b-carousel-slide caption="Zombie Xtreme High Yield Farmers"
                          text="With Subjects In 1935 At Milsons Point">
                          <b-img-lazy slot="img" class="d-block img-fluid w-100" width="1024" height="480"
                               src="images/PunkstersHarbourBridgeMilsonsPoint1935_1600x750.png" alt="image slot"></b-img-lazy>
                        </b-carousel-slide>

                        <b-carousel-slide caption="Zombie #3636 & #4472"
                          text="Infected By Airborne Z-Alien Virus, Travel To 1,050 BC To Inspect Their Re-analoged Digitalised Cat At Earth-619">
                          <b-img-lazy slot="img" class="d-block img-fluid w-100" width="1024" height="480"
                               src="images/Punks_3636_4472_Sphinx_1024x480.png" alt="image slot"></b-img-lazy>
                        </b-carousel-slide>

                        <b-carousel-slide caption="Zombie Xtreme High Yield Cultivators And Subjects"
                          text="Infected By Mutated Z-Alien Virus Strains In 1,050 BC at Earth-619">
                          <b-img-lazy slot="img" class="d-block img-fluid w-100" width="1024" height="480"
                               src="images/Punks_3636_4472_Sphinx_Subjects_More_1024x480.png" alt="image slot"></b-img-lazy>
                        </b-carousel-slide>

                        <b-carousel-slide caption="Zombie Xtreme High Yield Cultivators"
                          text="Take Ownership Of Twins At 1888 In The Royal Prince Alfred Hospital, Sydney. Credits - Mitchell Library, State Library of NSW">
                          <b-img-lazy slot="img" class="d-block img-fluid w-100" width="1024" height="480"
                               src="images/CryptoBabyPunk_401_Birth_At_RPA_1880-1893_960x450.png" alt="image slot"></b-img-lazy>
                        </b-carousel-slide>



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


                <p>The Optino Protocol is a set of Ethereum smart contracts that allows option sellers to escrow collateral into blah</p>

                <p>Features:</p>
                <ul>
                  <li>European Options, spot price and payoff calculated after expiry based on reference rate</li>
                  <li>Choose your reference rate</li>
                  <li>Choose your tokens</li>
                </ul>

                <p>Solidity Code from factory <b-link :href="explorer + 'address/' + address + '#code'" class="card-link" target="_blank">{{ address }}</b-link> and template <b-link :href="explorer + 'address/' + optinoTokenTemplate + '#code'" class="card-link" target="_blank">{{ optinoTokenTemplate }}</b-link>:</p>



                See <b-link @click.prevent="section = 3; updateRouterParamsSectionTopic('formulae', 'algorithms')">Formulae - Algorithms</b-link>
              </b-card-text>
            </b-tab>

            <!-- Risks -->
            <b-tab title="Risks" @click.prevent="updateRouterParamsSectionTopic('risks', 'top')">

              <b-card-text>
                <h5 ref="risks_top" class="mb-3">Risks</h5>
                <p>Risks:</p>
                <ul>
                  <li>Price feed</li>
                  <li>Collateral token</li>
                  <li>This smart contract</li>
                </ul>

              </b-card-text>
            </b-tab>

            <!-- How To -->
            <b-tab title="How To" @click.prevent="updateRouterParamsSectionTopic('howto', 'top')">
              <b-card-text>
                <h5 ref="howto_top" class="mb-3">How To ...</h5>
                How To ...
              </b-card-text>
            </b-tab>

            <!-- Formulae -->
            <b-tab title="Formulae" @click.prevent="updateRouterParamsSectionTopic('formulae', 'top')">
              <b-card-text>
                <h5 ref="formulae_top" class="mb-3">Formulae</h5>
                <ul>
                  <li><b-link @click.prevent="updateRouterParamsSectionTopic('formulae', 'optionpayoffformulae')">Option Payoff Formulae</b-link>
                    <ul>
                      <li>Vanilla Call Option Payoff</li>
                      <li>Capped Call Option Payoff</li>
                      <li>Vanilla Put Option Payoff</li>
                      <li>Floored Put Option Payoff</li>
                    </ul>
                  </li>
                  <li><b-link @click.prevent="updateRouterParamsSectionTopic('formulae', 'algorithms')">Algorithms</b-link>
                    <ul>
                      <li>Decimal Places</li>
                      <li>Call Payoff And Collateral</li>
                      <li>Put Payoff And Collateral</li>
                    </ul>
                  </li>
                  <li><b-link @click.prevent="updateRouterParamsSectionTopic('formulae', 'solidityimplementation')">Ethereum Solidity Smart Contract Implementation</b-link></li>
                </ul>
                <hr />

                <br />
                <h5 ref="formulae_optionpayoffformulae" class="mb-3">Option Payoff Formulae</h5>
                <p>This first version of the Optino Protocol implements the following option payoff formulae. Refer to <b-link href="https://www.google.com/search?q=capped+call+floored+put+zhang" class="card-link" target="_blank">Zhang, P.G. (1998) Exotic Options: A Guide To Second Generation Options (2nd Edition), pages 578 - 582</b-link> for further information about Capped Calls and Floored Puts.</p>

                <br />
                <h6>Vanilla Call Option Payoff</h6>
                <pre><code class="solidity m-2 p-2">vanillaCallPayoff = max(spot - strike, 0)</code></pre>

                <h6>Capped Call Option Payoff</h6>
                <pre><code class="solidity m-2 p-2">cappedCallPayoff = max(min(spot, cap) - strike, 0)
                 = max(spot - strike, 0) - max(spot - cap, 0)</code></pre>

                <h6>Vanilla Put Option Payoff</h6>
                <pre><code class="solidity m-2 p-2">vanillaPutPayoff = max(strike - spot, 0)</code></pre>

                <h6>Floored Put Option Payoff</h6>
                <pre><code class="solidity m-2 p-2">flooredPutPayoff = max(strike - max(spot, floor), 0)
                 = max(strike - spot, 0) - max(floor - spot, 0)</code></pre>

                <hr />

                <br />
                <h5 ref="formulae_algorithms" class="mb-3">Algorithms</h5>
                <h6>Decimal Places</h6>
                <p>Four types of decimal places are involved in these calculations:</p>
                <ul>
                  <li><code>optinoDecimals</code> - for Optino and Cover tokens, hardcoded to 18</li>
                  <li><code>decimals0</code> for token0 (or baseToken), e.g. 18 decimals for WETH in WETH/USDx</li>
                  <li><code>decimals1</code> for token1 (or quoteToken), e.g. 6 decimals for USDx in WETH/USDx</li>
                  <li><code>rateDecimals</code> for the rate feed. e.g. 18 for MakerDAO's feeds</li>
                </ul>
                <br />

                <h6>Call Payoff And Collateral</h6>
                <p>Requirements:</p>
                <ul>
                  <li><code>strike</code> must be > 0</li>
                  <li><code>bound</code>, or <code>cap</code> must be 0 for vanilla calls or > <code>strike</code> for capped calls</li>
                  <li>Collateral is in the *token0* (or *baseToken*)</li>
                </ul>
                <p>Call Payoff:</p>
                <pre><code class="solidity m-2 p-2">callPayoff = 0
if (spot > 0 && spot > strike) {
  if (bound > strike && spot > bound) {
    callPayoff = [(bound - strike) / spot] x [tokens / (10^optinoDecimals)] x (10^decimals0)
  } else {
    callPayoff = [(spot - strike) / spot] x [tokens / (10^optinoDecimals)] x (10^decimals0)
  }
}</code></pre>
                <p>Call Collateral:</p>
                <pre><code class="solidity m-2 p-2">if (bound <= strike) {
  callCollateral = [tokens / (10^optinoDecimals)] x (10^decimals0)
} else {
  callCollateral = [(bound - strike) / bound] x [tokens / (10^optinoDecimals)] x (10^decimals0)
}</code></pre>
                <br />

                <h6>Put Payoff And Collateral</h6>
                <p>Requirements:</p>
                <ul>
                  <li><code>strike</code> must be > 0</li>
                  <li><code>bound</code>, or <code>floor</code> must be 0 for vanilla puts or < <code>strike</code> for floored puts</li>
                  <li>Collateral is in the *token1* (or *quoteToken*)</li>
                </ul>
                <p>Put Payoff:</p>
                <pre><code class="solidity m-2 p-2">putPayoff = 0
if (spot < strike) {
  if (bound == 0 || (bound > 0 && spot >= bound)) {
    putPayoff = [(strike - spot) / (10^rateDecimals)] x [tokens / (10^optinoDecimals)] x (10^decimals1)
  } else {
    putPayoff = [(strike - bound) / (10^rateDecimals)] x [tokens / (10^optinoDecimals)] x (10^decimals1)
  }
}</code></pre>
                <p>Put Collateral:</p>
                <pre><code class="solidity m-2 p-2">putCollateral = [(strike - bound) / (10^rateDecimals)] x [tokens / (10^optinoDecimals)] x (10^decimals1)</code></pre>

                <hr />

                <br />
                <h5 ref="formulae_solidityimplementation" class="mb-3">Ethereum Solidity Smart Contract Implementation</h5>
                <p>Info:</p>
                <ul>
                  <li>Using 256 bit unsigned integers</li>
                  <li>Divisions are performed last to reduce loss of precision</li>
                  <li><code>computeCollateral(...)</code> calculates the <code>collateral</code> as the maximum payoff</li>
                  <li><code>computePayoff(...)</code> calculates the <code>payoff</code> depending on the spot price, after expiry</li>
                  <li>Optino and Cover tokens can <code>close(...)</code> off against each other to release calculated <code>collateral</code> in proportion to the tokens closed/netted</li>
                  <li>Optino token holders execute <code>settle()</code> after expiry to receive the calculated <code>payoff</code> in proportion to the token holdings</li>
                  <li>Cover token holders execute <code>settle()</code> after expiry to receive the calculated <code>(collateral - payoff)</code> in proportion to the token holdings</li>
                </ul>
                <p>Solidity Code from factory <b-link :href="explorer + 'address/' + address + '#code'" class="card-link" target="_blank">{{ address }}</b-link> and template <b-link :href="explorer + 'address/' + optinoTokenTemplate + '#code'" class="card-link" target="_blank">{{ optinoTokenTemplate }}</b-link>:</p>
                <pre><code class="solidity m-2 p-2">/// @notice Vanilla, capped call and floored put options formulae for 100% collateralisation
// ----------------------------------------------------------------------------
// vanillaCallPayoff = max(spot - strike, 0)
// cappedCallPayoff  = max(min(spot, cap) - strike, 0)
//                   = max(spot - strike, 0) - max(spot - cap, 0)
// vanillaPutPayoff  = max(strike - spot, 0)
// flooredPutPayoff  = max(strike - max(spot, floor), 0)
//                   = max(strike - spot, 0) - max(floor - spot, 0)
// ----------------------------------------------------------------------------
contract OptinoFormulae is DataType {
    using SafeMath for uint;

    function shiftRightThenLeft(uint amount, uint8 right, uint8 left) internal pure returns (uint result) {
        if (right == left) {
            return amount;
        } else if (right > left) {
            return amount.mul(10 ** uint(right - left));
        } else {
            return amount.div(10 ** uint(left - right));
        }
    }

    function computeCollateral(uint[5] memory _seriesData, uint tokens, uint8[4] memory decimalsData) internal pure returns (uint collateral) {
        (uint callPut, uint strike, uint bound) = (_seriesData[uint(SeriesDataField.CallPut)], _seriesData[uint(SeriesDataField.Strike)], _seriesData[uint(SeriesDataField.Bound)]);
        (uint8 decimals, uint8 decimals0, uint8 decimals1, uint8 rateDecimals) = (decimalsData[0], decimalsData[1], decimalsData[2], decimalsData[3]);
        require(strike > 0, "strike must be > 0");
        if (callPut == 0) {
            require(bound == 0 || bound > strike, "Call bound must = 0 or > strike");
            if (bound <= strike) {
                return shiftRightThenLeft(tokens, decimals0, decimals);
            } else {
                return shiftRightThenLeft(bound.sub(strike).mul(tokens).div(bound), decimals0, decimals);
            }
        } else {
            require(bound < strike, "Put bound must = 0 or < strike");
            return shiftRightThenLeft(strike.sub(bound).mul(tokens), decimals1, decimals).div(10 ** uint(rateDecimals));
        }
    }

    function computePayoff(uint[5] memory _seriesData, uint spot, uint tokens, uint8[4] memory decimalsData) internal pure returns (uint payoff) {
        (uint callPut, uint strike, uint bound) = (_seriesData[uint(SeriesDataField.CallPut)], _seriesData[uint(SeriesDataField.Strike)], _seriesData[uint(SeriesDataField.Bound)]);
        return _computePayoff(callPut, strike, bound, spot, tokens, decimalsData);
    }
    function _computePayoff(uint callPut, uint strike, uint bound, uint spot, uint tokens, uint8[4] memory decimalsData) internal pure returns (uint payoff) {
        (uint8 decimals, uint8 decimals0, uint8 decimals1, uint8 rateDecimals) = (decimalsData[0], decimalsData[1], decimalsData[2], decimalsData[3]);
        require(strike > 0, "strike must be > 0");
        if (callPut == 0) {
            require(bound == 0 || bound > strike, "Call bound must = 0 or > strike");
            if (spot > 0 && spot > strike) {
                if (bound > strike && spot > bound) {
                    return shiftRightThenLeft(bound.sub(strike).mul(tokens), decimals0, decimals).div(spot);
                } else {
                    return shiftRightThenLeft(spot.sub(strike).mul(tokens), decimals0, decimals).div(spot);
                }
            }
        } else {
            require(bound < strike, "Put bound must = 0 or < strike");
            if (spot < strike) {
                 if (bound == 0 || (bound > 0 && spot >= bound)) {
                     return shiftRightThenLeft(strike.sub(spot).mul(tokens), decimals1, decimals + rateDecimals);
                 } else {
                     return shiftRightThenLeft(strike.sub(bound).mul(tokens), decimals1, decimals + rateDecimals);
                 }
            }
        }
    }
}</code></pre>
              </b-card-text>
            </b-tab>

            <!-- Factory -->
            <b-tab title="Factory" @click.prevent="updateRouterParamsSectionTopic('factory', 'top')">
              <b-card-text>
                <h5 ref="factory_top" class="mb-3">Factory</h5>
                Factory
                <pre><code class="solidity m-2 p-2">{
	"79ba5097": "acceptOwnership()",
	"10f9fb1d": "calcPayoffs(address[2],address[2],uint8[6],uint256[5],uint256[])",
	"e7595d25": "calculateSpot(address[2],uint8[6])",
	"ddca3f43": "fee()",
	"06ac8ad8": "feedLength()",
	"34d368a6": "getCalcData(bytes32)",
	"108861f3": "getFeedByIndex(uint256)",
	"b7aa893b": "getFeedData(address)",
	"aaf97446": "getFeedDecimals0(bytes32)",
	"edea01e7": "getRateFromFeed(address,uint8)",
	"bbe8f6b2": "getSeriesByIndex(uint256)",
	"7f5a9fd7": "getSeriesByKey(bytes32)",
	"235fb60b": "getSeriesSpot(bytes32)",
	"4c5359e7": "lockFeed(address)",
	"e21f37ce": "message()",
	"1dc4e76e": "mint(address[2],address[2],uint8[6],uint256[5],address)",
	"d4ee1d90": "newOwner()",
	"d28b39e1": "optinoTokenTemplate()",
	"8da5cb5b": "owner()",
	"5f3e849f": "recoverTokens(address,address,uint256)",
	"b6f1a861": "seriesLength()",
	"3ce6d0bb": "setSeriesSpot(bytes32)",
	"83494642": "setSeriesSpotIfPriceFeedFails(bytes32,uint256)",
	"f2fde38b": "transferOwnership(address)",
	"9012c4a8": "updateFee(uint256)",
	"9b3278c6": "updateFeed(address,string,string,uint8,uint8)",
	"d84960a1": "updateFeedNote(address,string)",
	"1923be24": "updateMessage(string)"
}</code></pre>
              </b-card-text>
            </b-tab>

            <!-- Optino And Cover -->
            <b-tab title="Optino And Cover" @click.prevent="updateRouterParamsSectionTopic('optinoandcover', 'top')">
              <b-card-text>
                <h5 ref="optinoandcover_top" class="mb-3">Optino And Cover</h5>
                Optino And Cover
                <pre><code class="solidity m-2 p-2">{
	"79ba5097": "acceptOwnership()",
	"dd62ed3e": "allowance(address,address)",
	"095ea7b3": "approve(address,uint256)",
	"70a08231": "balanceOf(address)",
	"2241328b": "burn(address,uint256,uint8)",
	"0aebeb4e": "close(uint256)",
	"73f40032": "closeFor(address,uint256)",
	"597e1fb5": "closed()",
	"b2016bd4": "collateralToken()",
	"66b3d249": "currentSpot()",
	"8a3cae25": "currentSpotAndPayoff(uint256)",
	"313ce567": "decimals()",
	"c45a0155": "factory()",
	"349225f8": "getFeedInfo()",
	"5a9b0b89": "getInfo()",
	"374f6d5d": "getPricingInfo()",
	"53e6e77a": "getSeriesData()",
	"d8940a53": "initOptinoToken(address,bytes32,address,bool,uint256)",
	"986f3c12": "isCover()",
	"40c10f19": "mint(address,uint256)",
	"06fdde03": "name()",
	"d4ee1d90": "newOwner()",
	"ea425c9e": "optinoPair()",
	"8da5cb5b": "owner()",
	"5e39e130": "payoffForSpots(uint256,uint256[])",
	"069c9fae": "recoverTokens(address,uint256)",
	"2d20a009": "seriesKey()",
	"2c47db45": "setSpot()",
	"11da60b4": "settle()",
	"3dd45adb": "settleFor(address)",
	"8f775839": "settled()",
	"6f265b93": "spot()",
	"f4d50749": "spotAndPayoff(uint256)",
	"95d89b41": "symbol()",
	"18160ddd": "totalSupply()",
	"a9059cbb": "transfer(address,uint256)",
	"23b872dd": "transferFrom(address,address,uint256)",
	"f2fde38b": "transferOwnership(address)"
}</code></pre>
              </b-card-text>
            </b-tab>

            <!--
            <b-tab title="Reference" @click.prevent="updateRouterParamsSectionTopic('reference', 'top')">
              <b-card-text>Reference</b-card-text>
            </b-tab>
            -->
          </b-tabs>
        </b-card>
      </b-card>

      <!--
      <b-card no-body header="Documentation" class="border-0" header-class="p-1">
        <b-card-body class="m-1 p-1">
          <b-row>
            <b-col cols="10">
              <b-collapse id="accordion-docs" visible accordion="my-accordion" role="tabpanel">
                <b-card-body>
                  <b-card-text>docs I start opened because <code>visible</code> is <code>true</code></b-card-text>
                  <b-card-text>{{ text }}</b-card-text>
                </b-card-body>
              </b-collapse>
              <b-collapse id="accordion-risks" accordion="my-accordion" role="tabpanel">
                <b-card-body>
                  <b-card-text>risks I start opened because <code>visible</code> is <code>true</code></b-card-text>
                  <b-card-text>{{ text }}</b-card-text>
                </b-card-body>
              </b-collapse>
              <b-collapse id="accordion-reference" accordion="my-accordion" role="tabpanel">
                <b-card-body>
                  <b-card-text>reference I start opened because <code>visible</code> is <code>true</code></b-card-text>
                  <b-card-text>{{ text }}</b-card-text>
                </b-card-body>
              </b-collapse>
            </b-col>
            <b-col cols="2">
              <b-list-group class="mt-5">
                <b-list-group-item v-b-toggle.accordion-docs>Docs Home</b-list-group-item>
                <b-list-group-item v-b-toggle.accordion-formulae>Formulae</b-list-group-item>
                <b-list-group-item v-b-toggle.accordion-risks>Risks</b-list-group-item>
                <b-list-group-item v-b-toggle.accordion-reference>Reference</b-list-group-item>
              </b-list-group>
            </b-col>
          </b-row>
        </b-card-body>
      </b-card>
      -->
    </div>
  `,
  data: function () {
    return {
      section: 2,
      slide: 0,
      sliding: null,
    }
  },
  computed: {
    explorer() {
      return store.getters['connection/explorer'];
    },
    address() {
      return store.getters['optinoFactory/address'];
    },
    optinoTokenTemplate() {
      return store.getters['optinoFactory/optinoTokenTemplate'];
    },
  },
  watch: {
    '$route' (to, from) {
      logInfo("Docs", "watch.$route(to:" + to.params.section + "/" + to.params.topic + ", from:" + from.params.section + "/" + from.params.topic + ")");
      if ("intro" == to.params.section) {
        this.section = 0;
      } else if ("risks" == to.params.section) {
        this.section = 1;
      } else if ("howto" == to.params.section) {
        this.section = 2;
      } else if ("formulae" == to.params.section) {
        this.section = 3;
      } else if ("factory" == to.params.section) {
        this.section = 4;
      } else if ("optinoandcover" == to.params.section) {
        this.section = 5;
      } else if ("all" == to.params.section) {
        this.section = 3;
      }
      // console.log(this.$refs);
      // const toDepth = to.path.split('/').length
      // const fromDepth = from.path.split('/').length
      // this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
    }
  },
  methods: {
    onSlideStart(slide) {
      this.sliding = true
    },
    onSlideEnd(slide) {
      this.sliding = false
    },
    updateRouterParamsSectionTopic(section, topic) {
      logInfo("Docs", "updateRouterParamsSectionTopic(" + JSON.stringify(section) + ", " + topic + ")");
      this.$router.push({ params: { section: section, topic: topic }}).catch(err => {});
      var t = this;
      setTimeout(function() {
        t.scrollTo(section + "_" + topic);
      }, 1000);
    },
    highlightIt() {
      logInfo("Docs", "highlightIt() Called");
      var t = this;
      setTimeout(function() {
        logInfo("Docs", "highlightIt() hljs init");
        hljs.registerLanguage('solidity', window.hljsDefineSolidity);
        hljs.initHighlightingOnLoad();
      }, 2500);
    },
    scrollTo(refName) {
      logInfo("Docs", "scrollTo(" + refName + ")");
      var element = this.$refs[refName];
      var top = element.offsetTop;
      // window.scrollTo(0, top);
      window.scrollTo({ top: top, left: 0, behaviour: 'smooth' });
    }
  },
  updated() {
    // logInfo("Docs", "updated() Called");
    document.querySelectorAll('pre code').forEach((block) => {
      hljs.highlightBlock(block);
    });
  },
  mounted() {
    logInfo("Docs", "mounted() $route: " + JSON.stringify(this.$route.params));
    if ("intro" == this.$route.params.section) {
      this.section = 0;
    } else if ("risks" == this.$route.params.section) {
      this.section = 1;
    } else if ("howto" == this.$route.params.section) {
      this.section = 2;
    } else if ("formulae" == this.$route.params.section) {
      this.section = 3;
    } else if ("factory" == this.$route.params.section) {
      this.section = 4;
    } else if ("optinoandcover" == this.$route.params.section) {
      this.section = 5;
    } else if ("all" == this.$route.params.section) {
      this.section = 3;
    }
    var t = this;
    setTimeout(function() {
      logInfo("Docs", "mounted() scrollTo: " + t.$route.params.section + "_" + t.$route.params.topic);
      t.scrollTo(t.$route.params.section + "_" + t.$route.params.topic);
    }, 1000);

    hljs.registerLanguage('solidity', window.hljsDefineSolidity);
    // document.addEventListener('DOMContentLoaded', (event) => {
      document.querySelectorAll('pre code').forEach((block) => {
        hljs.highlightBlock(block);
        // console.log("hljs: " + JSON.stringify(block));
      });
    // });
  },
};
