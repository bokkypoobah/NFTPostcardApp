const OptinoExplorer = {
  template: `
    <div class="mt-5 pt-3">
      <b-card no-body header="Optinos" class="border-0" header-class="p-1">
        <b-card no-body class="border-0 m-0 mt-2">
          <b-card-body class="p-0">

            <div class="d-flex m-0 p-0" style="height: 37px;">
              <div class="pr-1">
                <b-form-input type="text" size="sm" v-model.trim="seriesSearch" debounce="600" placeholder="Search..." v-b-popover.hover="'Search'"></b-form-input>
              </div>
              <div class="pr-1 flex-grow-1">
              </div>
              <div class="pt-1 pr-1">
                <b-pagination pills size="sm" v-model="seriesCurrentPage" :total-rows="seriesDataSorted.length" :per-page="seriesPerPage" v-b-popover.hover="'Page through records'"></b-pagination>
              </div>
              <div class="pr-1">
                <b-form-select size="sm" :options="seriesPageOptions" v-model="seriesPerPage" v-b-popover.hover="'Select page size'"/>
              </div>
              <div class="pr-1">
                <b-button size="sm" class="m-0 p-0" href="#" @click="recalculate('new', $event); $bvModal.show('bv-modal-optino')" variant="link" v-b-popover.hover="'Mint Optino'"><b-icon-pencil-square shift-v="-2" font-scale="1.4"></b-icon-pencil-square></b-button>
                <!-- <b-button size="sm" class="m-0 p-0" variant="link" v-b-popover.hover="'Show status'" v-b-toggle.sidebar-status><b-icon-grip-horizontal shift-v="-2" font-scale="1.4"></b-icon-grip-horizontal> <b-spinner class="float-right mt-1" :variant="spinnerVariant" style="animation: spinner-grow 3.75s linear infinite;" small type="grow" label="Spinning" /></b-button> -->
              </div>
            </div>

            <b-modal v-model="optino.show" id="bv-modal-optino" size="lg" hide-footer title-class="m-0 p-0" header-class="m-1 p-1" body-class="m-1 p-1">
              <template v-slot:modal-title>
                <h6><span v-if="optino.series != null">Series #{{ optino.series.index }} </span>{{ seriesName(optino, '') }}</h6>
              </template>
              <b-card no-body bg-variant="light" class="m-1 p-1">
                <b-card-body class="m-1 p-1">

                  <b-form-group label-cols="3" label-size="sm" label="Type">
                    <b-form inline>
                      <label class="sr-only" for="formselect-optiontype">Option Type</label>
                      <b-form-select size="sm" style="width: 250px;" id="formselect-optiontype" v-model="optino.optionType" :options="optinoTypes" @input="recalculate('optionType', $event)">
                      </b-form-select>
                    </b-form>
                  </b-form-group>

                  <b-form-group label-cols="3" label-size="sm" label="Spot">
                    <b-form inline>
                      <b-form-input size="sm" class="rightalignedinput" type="text" v-model.trim="optino.calculatedSpot" readonly placeholder="Click to select"></b-form-input>
                      <label class="sr-only" for="button-spot">Select Spot</label>
                      <b-button class="ml-1" size="sm" id="button-spot" @click="recalculateFeed('show', $event); $bvModal.show('bv-modal-optinoFeed')" variant="primary" v-b-popover.hover="'Select spot'">{{ feedName(optino) }}</b-button>
                    </b-form>
                  </b-form-group>

                  <b-form-group label-cols="3" label-size="sm" label-for="forminput-floor" label="Floor" :invalid-feedback="optino.floorMessage" v-if="optino.optionType == 'fp'">
                    <b-form-input size="sm" class="rightalignedinput" id="forminput-floor" type="text" v-model.trim="optino.floor" @input="recalculate('floor', $event)" placeholder="Enter floor" :state="optino.floorMessage == null ? null : false"></b-form-input>
                  </b-form-group>

                  <b-form-group label-cols="3" label-size="sm" label-for="forminput-strike" label="Strike" :invalid-feedback="optino.strikeMessage">
                    <b-form-input size="sm" class="rightalignedinput" id="forminput-strike" type="text" v-model.trim="optino.strike" @input="recalculate('strike', $event)" placeholder="Enter strike" :state="optino.strikeMessage == null ? null : false"></b-form-input>
                  </b-form-group>

                  <b-form-group label-cols="3" label-size="sm" label-for="forminput-cap" label="Cap" :invalid-feedback="optino.capMessage" v-if="optino.optionType == 'cc'">
                    <b-form-input size="sm" class="rightalignedinput" id="forminput-cap" type="text" v-model.trim="optino.cap" @input="recalculate('cap', $event)" placeholder="Enter cap" :state="optino.capMessage == null ? null : false"></b-form-input>
                  </b-form-group>

                  <b-form-group label-cols="3" label-size="sm" label="Expiry" :description="'Local ' + new Date(expiry*1000).toLocaleString() + ', UTC ' + formatUTC(expiry*1000) + '. Defaults to 08:00:00Z'">
                    <b-form inline class="align-top">
                      <div class="d-flex align-items-start m-0 p-0">
                        <div class="pr-1">
                          <label class="sr-only" for="datepicker-expirydate">Expiry Date</label>
                          <b-form-group label-size="sm" label-for="datepicker-expirydate" :invalid-feedback="optino.expiryMessage">
                            <b-form-datepicker size="sm" id="datepicker-expirydate" v-model="optino.expiryDate" @input="recalculate('setExpiryDate', $event)" close-button :state="optino.expiryMessage == null ? null : false"></b-form-datepicker>
                          </b-form-group>
                        </div>
                        <div class="pr-1">
                          <label class="sr-only" for="timepicker-expirytime">Expiry Time</label>
                          <b-form-group label-size="sm" label-for="timepicker-expirytime">
                            <b-input-group size="sm" append="UTC">
                              <b-form-timepicker size="sm" id="timepicker-expirytime" v-model="optino.expiryTime" @input="recalculate('setExpiryTime', $event)" :hour12="false" show-seconds :state="optino.expiryMessage == null ? null : false"></b-form-timepicker>
                            </b-input-group>
                          </b-form-group>
                        </div>
                        <div class="pr-1">
                          <b-dropdown size="sm" right variant="primary">
                            <template v-slot:button-content>
                              <b-icon-calendar3></b-icon-calendar3>
                            </template>
                            <b-dropdown-item v-for="(item, key) in expiries" @click="recalculate('setExpiry', item.value)" :key="key">
                              {{ item.text }}
                            </b-dropdown-item>
                          </b-dropdown>
                        </div>
                      </div>
                    </b-form>
                  </b-form-group>

                  <b-form-group label-cols="3" label-size="sm" label="Pair">
                    <b-form inline>
                      <div class="d-flex m-0 p-0">
                        <div class="pr-1">
                          <b-form-group description="Base token, collateral for calls">
                            <b-input-group size="sm">
                              <label class="sr-only" for="formselect-token0">Base token</label>
                              <b-form-select size="sm" style="width: 50%;" id="formselect-token0" v-model="optino.token0" :options="tokenOptionsSorted" @input="recalculate('token0', $event)"></b-form-select>
                              <b-input-group-append>
                                <b-button :href="explorer + 'token/' + optino.token0" target="_blank" variant="outline-info">🔗</b-button>
                              </b-input-group-append>
                            </b-input-group>
                          </b-form-group>
                        </div>
                        <div class="pr-1">
                          <label class="ml-1 mr-1">/</label>
                        </div>
                        <div class="pr-1">
                          <b-form-group description="Quote token, collateral for puts">
                            <b-input-group size="sm">
                              <label class="sr-only" for="formselect-token1">Quote token</label>
                              <b-form-select size="sm" style="width: 50%;" id="formselect-token1" v-model="optino.token1" :options="tokenOptionsSorted" @input="recalculate('token1', $event)"></b-form-select>
                              <b-input-group-append>
                                <b-button :href="explorer + 'token/' + optino.token1" target="_blank" variant="outline-info">🔗</b-button>
                              </b-input-group-append>
                            </b-input-group>
                          </b-form-group>
                        </div>
                      </div>
                    </b-form>
                  </b-form-group>

                  <b-form-group label-cols="3" label-size="sm" label="Tokens" description="Number of Optino and Cover tokens">
                    <b-form-input size="sm" class="rightalignedinput" type="text" v-model.trim="optino.tokens" @input="recalculate('tokens', $event)"></b-form-input>
                  </b-form-group>

                  <b-tabs small card v-model="optinoFeedMode" content-class="m-0" active-tab-class="m-0 mt-2 p-0" nav-class="m-0 p-0" nav-wrapper-class="m-0 p-0">
                    <b-tab title="Calcs">
                    </b-tab>
                    <b-tab title="Mint">
                    </b-tab>
                    <b-tab title="Payoff Chart">
                    </b-tab>
                    <b-tab title="Payoff Table">
                    </b-tab>
                    <b-tab title="Series" :disabled="!optino.series">
                    </b-tab>
                    <b-tab title="Optino" :disabled="!optino.series">
                    </b-tab>
                    <b-tab title="Cover" :disabled="!optino.series">
                    </b-tab>
                    <b-tab title="All">
                    </b-tab>

                    <div v-if="optinoFeedMode == 0 || optinoFeedMode == 7">
                      <b-form-group label-cols="3" label-size="sm" label="Current Spot">
                        <b-form inline>
                          <label class="sr-only" for="forminput-currentSpot">Current Spot</label>
                          <b-form-input size="sm" class="rightalignedinput" id="forminput-currentSpot" type="text" v-model.trim="optino.currentSpot" readonly></b-form-input>
                        </b-form>
                      </b-form-group>
                      <b-form-group label-cols="3" label-size="sm" label="Current Optino Payoff">
                        <b-form inline>
                          <label class="sr-only" for="forminput-currentOptinoPayoff">Current Spot</label>
                          <b-input-group size="sm" :append="tokenSymbol(optino.collateralToken)">
                            <b-form-input size="sm" class="rightalignedinput" id="forminput-currentOptinoPayoff" type="text" v-model.trim="optino.currentPayoff" readonly></b-form-input>
                          </b-input-group>
                        </b-form>
                      </b-form-group>
                      <b-form-group label-cols="3" label-size="sm" label="Current Cover Payoff">
                        <b-form inline>
                          <label class="sr-only" for="forminput-currentCoverPayoff">Current Spot</label>
                          <b-input-group size="sm" :append="tokenSymbol(optino.collateralToken)">
                            <b-form-input size="sm" class="rightalignedinput" id="forminput-currentCoverPayoff" type="text" v-model.trim="optino.currentCoverPayoff" readonly></b-form-input>
                          </b-input-group>
                        </b-form>
                      </b-form-group>
                    </div>

                    <div v-if="optinoFeedMode == 0 || optinoFeedMode == 1 || optinoFeedMode == 7">
                      <b-form-group label-cols="3" label-size="sm" label="Collateral">
                        <b-form inline>
                          <label class="sr-only" for="forminput-collateral">Collateral</label>
                          <b-input-group size="sm" :append="tokenSymbol(optino.collateralToken)">
                            <b-form-input size="sm" class="rightalignedinput" id="forminput-collateral" type="text" v-model.trim="optino.collateralTokens" readonly placeholder="Enter details above"></b-form-input>
                          </b-input-group>
                        </b-form>
                      </b-form-group>
                      <b-form-group label-cols="3" label-size="sm" label="Fee">
                        <b-form inline>
                          <label class="sr-only" for="forminput-fee">Fee</label>
                          <b-input-group size="sm" :append="tokenSymbol(optino.collateralToken)">
                            <b-form-input size="sm" class="rightalignedinput" id="forminput-fee" type="text" v-model.trim="optino.collateralFee" readonly></b-form-input>
                          </b-input-group>
                        </b-form>
                      </b-form-group>
                      <b-form-group label-cols="3" label-size="sm" label="Collateral + Fee">
                        <b-form inline>
                          <label class="sr-only" for="forminput-collateralplusfee">Collateral + Fee</label>
                          <b-input-group size="sm" :append="tokenSymbol(optino.collateralToken)">
                            <b-form-input size="sm" class="rightalignedinput" id="forminput-collateralplusfee" type="text" v-model.trim="optino.collateralTokensPlusFee" readonly></b-form-input>
                          </b-input-group>
                        </b-form>
                      </b-form-group>
                    </div>

                    <div v-if="optinoFeedMode == 1 || optinoFeedMode == 7">
                      <b-form-group label-cols="3" label-size="sm" label="Your Balance">
                        <b-form inline>
                          <label class="sr-only" for="forminput-balance">Your Balance</label>
                          <b-input-group size="sm" :append="tokenSymbol(optino.collateralToken)">
                            <b-form-input size="sm" class="rightalignedinput" id="forminput-balance" type="text" :value="optino.collateralToken == null ? null : tokenData[optino.collateralToken].balance" readonly></b-form-input>
                          </b-input-group>
                        </b-form>
                      </b-form-group>

                      <b-form-group label-cols="3" label-size="sm" label="Your Allowance">
                        <b-form inline>
                          <label class="sr-only" for="forminput-allowance">Your Allowance</label>
                          <b-input-group size="sm" :append="tokenSymbol(optino.collateralToken)">
                            <b-form-input size="sm" class="rightalignedinput" id="forminput-allowance" type="text" :value="optino.collateralToken == null ? null : tokenData[optino.collateralToken].allowance" readonly></b-form-input>
                          </b-input-group>
                        </b-form>
                      </b-form-group>

                      <b-form-group label-cols="3" label-size="sm" label="Set Allowance">
                        <b-form inline>
                          <label class="sr-only" for="forminput-setallowance">Set Allowance</label>
                          <b-input-group size="sm" :append="tokenSymbol(optino.collateralToken)">
                            <b-form-input size="sm" class="rightalignedinput" id="forminput-setallowance" type="text" v-model.trim="optino.collateralAllowance"></b-form-input>
                          </b-input-group>
                          <b-button size="sm" class="ml-1" @click="setCollateralAllowance()" variant="primary" v-b-popover.hover="'Set Allowance'">Set Allowance</b-button>
                        </b-form>
                      </b-form-group>

                      <b-form-group label-cols="3" label-size="sm" label="Mint">
                        <b-form inline>
                          <b-button size="sm" class="ml-1" @click="mintOptinos()" variant="primary" v-b-popover.hover="'Mint Optinos'">Mint Optino and Cover Tokens</b-button>
                        </b-form>
                      </b-form-group>
                    </div>

                    <div v-if="optinoFeedMode == 2 || optinoFeedMode == 7">
                      <apexchart type="line" :options="chartOptions" :series="optino.chartSeries"></apexchart>
                    </div>

                    <div v-if="optinoFeedMode == 3 || optinoFeedMode == 7">
                      <b-table style="font-size: 85%;" small striped outlined selectable select-mode="single" responsive hover :items="optino.payoffTable" :fields="payoffTableFields" :filter="searchFeed0" :filter-included-fields="['name', 'note']" head-variant="light" show-empty>
                      </b-table>
                    </div>

                    <div v-if="optinoFeedMode == 4 || optinoFeedMode == 7">
                      <b-form-group label-cols="3" label-size="sm" label="Set series spot">
                        <b-form inline>
                          <b-button size="sm" class="ml-1" @click="setSeriesSpot(optino.series)" variant="primary" v-b-popover.hover="'Set Series Spot'" :disabled="optino.series.optinoState!='expired'">Set Series Spot</b-button>
                        </b-form>
                      </b-form-group>
                      Series TODO: set spot
                      <b-form-textarea size="sm" wrap="soft" :value="JSON.stringify(optino.series, null, 4)" rows="1" max-rows="100"></b-form-textarea>
                    </div>

                    <div v-if="optinoFeedMode == 5 || optinoFeedMode == 7">
                      Optino TODO: close, settle, send to exchange. Or merge into Series
                      <b-form-textarea size="sm" wrap="soft" :value="JSON.stringify(tokenData[optino.series.optinos[0]], null, 4)" rows="1" max-rows="100"></b-form-textarea>
                    </div>

                    <div v-if="optinoFeedMode == 6 || optinoFeedMode == 7">
                      Cover TODO: close, settle, send to exchange. Or merge into Series
                      <b-form-textarea size="sm" wrap="soft" :value="JSON.stringify(tokenData[optino.series.optinos[1]], null, 4)" rows="1" max-rows="100"></b-form-textarea>
                    </div>
                  </b-tabs>

                </b-card-body>
              </b-card>
            </b-modal>

            <b-modal v-model="optino.showFeed" id="bv-modal-optinoFeed" size="xl" hide-footer title-class="m-0 p-0" header-class="m-1 p-1" body-class="m-0 p-0">
              <template v-slot:modal-title>
                Spot - {{ feedName(optino) }}
              </template>
              <!-- <b-card no-body bg-variant="light" class="m-0 p-0" class="border-0"> -->
              <b-card no-body bg-variant="light" class="m-1 p-1">
                <b-card-body class="m-1 p-1">
                  <b-tabs small card v-model="optinoFeedMode" content-class="m-0" active-tab-class="m-0 mt-2 p-0" nav-class="m-0 p-0" nav-wrapper-class="m-0 p-0">
                    <b-tab title="Spot">
                      <b-card-text>
                        <div class="d-flex m-0 p-0" style="height: 37px;">
                          <div class="pr-1">
                            <b-form-input type="text" size="sm" v-model.trim="searchFeed0" debounce="600" placeholder="Search..." v-b-popover.hover="'Search'"></b-form-input>
                          </div>
                          <div class="pr-1 flex-grow-1">
                          </div>
                          <div class="pr-1">
                           <span class="text-right" style="font-size: 90%"><b-icon-exclamation-circle variant="danger" shift-v="1" font-scale="0.9"></b-icon-exclamation-circle> Always confirm the feed contract address in a block explorer and alternative sources</span>
                          </div>
                        </div>
                        <b-table style="font-size: 85%;" small striped outlined selectable sticky-header select-mode="single" responsive hover :items="registeredFeeds" :fields="selectFeedFields" :filter="searchFeed0" :filter-included-fields="['name', 'note']" head-variant="light" show-empty @row-clicked="singleFeedSelectionRowClicked">
                          <template v-slot:cell(name)="data">
                            <span v-b-popover.hover="data.item.name">{{ truncate(data.item.name, 24) }}</span>
                          </template>
                          <template v-slot:cell(type)="data">
                            <b-form-select plain size="sm" v-model.trim="data.item.type" :options="typeOptions" disabled></b-form-select>
                          </template>
                          <template v-slot:cell(note)="data">
                            <span v-b-popover.hover="data.item.note">{{ truncate(data.item.note, 32) }}</span>
                          </template>
                          <template v-slot:cell(spot)="data">
                            <span class="text-right">{{ data.item.spot.shift(-data.item.decimals).toString() }} </span>
                          </template>
                          <template v-slot:cell(timestamp)="data">
                            <span class="text-right">{{ new Date(data.item.timestamp*1000).toLocaleString() }} </span>
                          </template>
                          <template v-slot:cell(address)="data">
                            <b-link :href="explorer + 'token/' + data.item.address" class="card-link" target="_blank" v-b-popover.hover="'View ' + data.item.address + ' on the block explorer'">{{ truncate(data.item.address, 10) }}</b-link>
                          </template>
                          <template v-slot:cell(selected)="data">
                            <b-icon-check2 font-scale="1.4" v-if="data.item.address == optino.feed0"></b-icon-check2>
                          </template>
                        </b-table>
                      </b-card-text>
                    </b-tab>
                    <b-tab title="Cross">
                      <b-card-text>
                        <div class="d-flex m-0 p-0" style="height: 37px;">
                          <div class="pr-1">
                            <b-form-input type="text" size="sm" v-model.trim="searchFeed0" debounce="600" placeholder="Search..." v-b-popover.hover="'Search'"></b-form-input>
                          </div>
                          <div class="pr-1 flex-grow-1">
                          </div>
                          <div class="pr-1">
                           <span class="text-right" style="font-size: 90%"><b-icon-exclamation-circle variant="danger" shift-v="1" font-scale="0.9"></b-icon-exclamation-circle> Always confirm the feed contract address in a block explorer and alternative sources</span>
                          </div>
                        </div>
                        <b-table style="font-size: 85%;" small striped striped selectable sticky-header select-mode="single" responsive hover :items="registeredFeeds" :fields="selectFeedFields" :filter="searchFeed0" :filter-included-fields="['name', 'note']" head-variant="light" show-empty>
                          <template v-slot:cell(name)="data">
                            <span v-b-popover.hover="data.item.name">{{ truncate(data.item.name, 24) }}</span>
                          </template>
                          <template v-slot:cell(type)="data">
                            <b-form-select plain size="sm" v-model.trim="data.item.type" :options="typeOptions" disabled></b-form-select>
                          </template>
                          <template v-slot:cell(note)="data">
                            <span v-b-popover.hover="data.item.note">{{ truncate(data.item.note, 32) }}</span>
                          </template>
                          <template v-slot:cell(spot)="data">
                            <span class="text-right">{{ data.item.spot.shift(-data.item.decimals).toString() }} </span>
                          </template>
                          <template v-slot:cell(timestamp)="data">
                            <span class="text-right">{{ new Date(data.item.timestamp*1000).toLocaleString() }} </span>
                          </template>
                          <template v-slot:cell(address)="data">
                            <b-link :href="explorer + 'token/' + data.item.address" class="card-link" target="_blank" v-b-popover.hover="'View ' + data.item.address + ' on the block explorer'">{{ truncate(data.item.address, 10) }}</b-link>
                          </template>
                          <template v-slot:cell(selected)="data">
                            <!-- <b-icon-check2 font-scale="1.4" v-if="data.item.address == optino.feed0"></b-icon-check2> -->
                            <b-dropdown size="sm" variant="link" toggle-class="m-0 p-0" menu-class="m-0 p-0" button-class="m-0 p-0" no-caret v-b-popover.hover="'Select feeds'">
                              <template v-slot:button-content>
                                <b-icon-three-dots class="rounded-circle" shift-v="-2" font-scale="1.4" v-if="data.item.address != optino.feed0 && data.item.address != optino.feed1"></b-icon-three-dots><span class="sr-only">Submenu</span>
                                <span v-if="data.item.address == optino.feed0">First Feed</span>
                                <span v-if="data.item.address == optino.feed1">Second Feed</span>
                              </template>
                              <b-dropdown-item-button size="sm" @click="dualFeedFirstFeed(data.item.address)" :disabled="data.item.address == optino.feed1"><span style="font-size: 90%">Use As First Feed</span></b-dropdown-item-button>
                              <b-dropdown-item-button size="sm" @click="dualFeedSecondFeed(data.item.address)" :disabled="data.item.address == optino.feed0"><span style="font-size: 90%">Use As Second Feed</span></b-dropdown-item-button>
                            </b-dropdown>
                          </template>
                        </b-table>
                      </b-card-text>
                    </b-tab>
                    <b-tab title="Custom">
                      <b-card-text>
                        <b-form>
                          <b-form-group label-cols="5" label-size="sm" label="First feed">
                            <b-input-group>
                              <b-form-select size="sm" v-model="optino.feed0" :options="feedSelectionsSorted0" @input="recalculateFeed('feed0', $event)"></b-form-select>
                            </b-input-group>
                          </b-form-group>
                          <b-form-group label-cols="5" label-size="sm" label="Second feed">
                            <b-input-group>
                              <b-form-select size="sm" v-model="optino.feed1" :options="feedSelectionsSorted1" v-on:change="recalculateFeed('feed1', $event)"></b-form-select>
                            </b-input-group>
                          </b-form-group>
                          <b-form-group label-cols="5" label-size="sm" label="First feed type">
                            <b-input-group>
                              <b-form-select size="sm" v-model.trim="optino.type0" :options="typeOptions" v-on:change="recalculateFeed('type0', $event)"></b-form-select>
                            </b-input-group>
                          </b-form-group>
                          <b-form-group label-cols="5" label-size="sm" label="Second feed type">
                            <b-input-group>
                              <b-form-select size="sm" v-model.trim="optino.type1" :options="typeOptions" v-on:change="recalculateFeed('type1', $event)"></b-form-select>
                            </b-input-group>
                          </b-form-group>
                          <b-form-group label-cols="5" label-size="sm" label="First feed decimal places">
                            <b-input-group>
                              <b-form-select size="sm" v-model.trim="optino.decimals0" :options="decimalsOptions" v-on:change="recalculateFeed('decimals0', $event)"></b-form-select>
                            </b-input-group>
                          </b-form-group>
                          <b-form-group label-cols="5" label-size="sm" label="Second feed decimal places">
                            <b-input-group>
                              <b-form-select size="sm" v-model.trim="optino.decimals1" :options="decimalsOptions" v-on:change="recalculateFeed('decimals1', $event)"></b-form-select>
                            </b-input-group>
                          </b-form-group>
                        </b-form>
                      </b-card-text>
                    </b-tab>
                  </b-tabs>
                  <b-form-group label-cols="5" label-size="sm" class="mt-2" :label="optino.feed1 != null && optino.feed1 != ADDRESS0 || optinoFeedMode != 0 ? 'Inverse first feed rate?' : 'Inverse feed rate?'">
                    <b-form-radio-group size="sm" v-model="optino.inverse0" @input="recalculateFeed('inverse0', $event)">
                      <b-form-radio value="0">No</b-form-radio>
                      <b-form-radio value="1">Yes</b-form-radio>
                    </b-form-radio-group>
                  </b-form-group>
                  <b-form-group label-cols="5" label-size="sm" v-if="optino.feed1 != null && optino.feed1 != ADDRESS0 || optinoFeedMode != 0" label="Inverse second feed rate?">
                    <b-form-radio-group size="sm" v-model="optino.inverse1" @input="recalculateFeed('inverse1', $event)">
                      <b-form-radio value="0">No</b-form-radio>
                      <b-form-radio value="1">Yes</b-form-radio>
                    </b-form-radio-group>
                  </b-form-group>
                  <b-form-group label-cols="5" label-size="sm" label="Spot">
                    <b-input-group>
                      <b-form-input size="sm" type="text" class="rightalignedinput" v-model.trim="optino.calculatedSpot" readonly placeholder="Select feed above"></b-form-input>
                      <b-input-group-append>
                        <b-button size="sm" variant="outline-primary" disabled v-b-popover.hover="'Name of reference spot rate'">{{ feedName(optino) }}</b-button>
                      </b-input-group-append>
                    </b-input-group>
                  </b-form-group>
                  <div class="d-flex justify-content-end m-0 pt-2" style="height: 37px;">
                    <div class="pr-1">
                      <b-button size="sm" @click="$bvModal.hide('bv-modal-optinoFeed')">Close</b-button>
                    </div>
                  </div>
                </b-card-body>
              </b-card>
            </b-modal>

            <b-table style="font-size: 85%;" small striped outlined selectable select-mode="single" responsive hover :items="seriesDataSorted" :fields="seriesDataFields" head-variant="light" :current-page="seriesCurrentPage" :per-page="seriesPerPage" :filter="seriesSearch" @filtered="seriesOnFiltered" :filter-included-fields="['optionType', 'baseSymbol', 'quoteSymbol', 'strike', 'bound', 'spot', 'optinoName', 'optinoBalance', 'coverBalance', 'optinoSymbol', 'coverSymbol', 'optinoBalance', 'coverBalance']" show-empty>
              <template v-slot:cell(baseSymbol)="data">
                <b-link :href="explorer + 'token/' + data.item.pair[0]" class="card-link" target="_blank" v-b-popover.hover="'View ' + tokenName(data.item.pair[0]) + ' on the block explorer'">{{ data.item.baseSymbol }}</b-link>
              </template>
              <template v-slot:cell(quoteSymbol)="data">
                <b-link :href="explorer + 'token/' + data.item.pair[1]" class="card-link" target="_blank" v-b-popover.hover="'View ' + tokenName(data.item.pair[1]) + ' on the block explorer'">{{ data.item.quoteSymbol }}</b-link>
              </template>
              <template v-slot:cell(feeds)="data">
                <b-link :href="explorer + 'address/' + data.item.feeds[0]" class="card-link" target="_blank" v-b-popover.hover="'View ' + data.item.feeds[0] + ' on the block explorer'">{{ displayFeed(data.item.feeds[0], data.item.feedParameters[0], data.item.feedParameters[2], data.item.feedParameters[4]) }}</b-link>
                <span v-if="data.item.feeds[1] != ADDRESS0">
                  *<br />
                  <b-link :href="explorer + 'address/' + data.item.feeds[1]" class="card-link" target="_blank" v-b-popover.hover="'View ' + data.item.feeds[1] + ' on the block explorer'">{{ displayFeed(data.item.feeds[1], data.item.feedParameters[1], data.item.feedParameters[3], data.item.feedParameters[5]) }}</b-link>
                </span>
              </template>
              <!--
              <template v-slot:cell(type)="data">
                {{ formatType(data.item.optionType, data.item.bound) }}
              </template>
              -->
              <template v-slot:cell(expiry)="data">
                {{ formatUTC(data.item.expiry * 1000) }}
              </template>
              <template v-slot:cell(floor)="data">
                {{ data.item.callPut == 1 && parseFloat(data.item.bound) > 0 ? formatValue(data.item.bound, data.item.feedDecimals0) : '' }}
              </template>
              <template v-slot:cell(strike)="data">
                {{ formatValue(data.item.strike, data.item.feedDecimals0) }}
              </template>
              <template v-slot:cell(cap)="data">
                {{ data.item.callPut == 0 && parseFloat(data.item.bound) > 0 ? formatValue(data.item.bound, data.item.feedDecimals0) : '' }}
              </template>
              <template v-slot:cell(spot)="data">
                <div v-if="data.item.spot != 0">
                  {{ formatValue(data.item.spot, data.item.feedDecimals0) }}
                </div>
                <div v-else>
                  <p class="font-weight-light"><em>{{ formatValue(data.item.optinoPricingInfo[0], data.item.feedDecimals0) }}</em></p>
                </div>
              </template>
              <template v-slot:cell(optinoPayoff)="data">
                <div v-if="data.item.spot != 0">
                  {{ formatValue(data.item.optinoPricingInfo[3], data.item.collateralDecimals) }}
                </div>
                <div v-else>
                  <p class="font-weight-light"><em>{{ formatValue(data.item.optinoPricingInfo[1], data.item.collateralDecimals) }}</em></p>
                </div>
              </template>
              <template v-slot:cell(coverPayoff)="data">
                <div v-if="data.item.spot != 0">
                  {{ formatValue(data.item.coverPricingInfo[3], data.item.collateralDecimals) }}
                </div>
                <div v-else>
                  <p class="font-weight-light"><em>{{ formatValue(data.item.coverPricingInfo[1], data.item.collateralDecimals) }}</em></p>
                </div>
              </template>
              <template v-slot:cell(collateral)="data">
                {{ formatValue(data.item.coverPricingInfo[4], data.item.collateralDecimals) }}
              </template>
              <template v-slot:cell(optinoBalance)="data">
                <b-link :href="explorer + 'token/' + data.item.optinos[0] + '?a=' + coinbase" class="card-link" target="_blank" v-b-popover.hover="'View ' + tokenSymbol(data.item.optinos[0]) + ' ' + tokenName(data.item.optinos[0]) + ' on the block explorer'">{{ tokenBalance(data.item.optinos[0]) }}</b-link><br />
              </template>
              <template v-slot:cell(coverBalance)="data">
                <b-link :href="explorer + 'token/' + data.item.optinos[1] + '?a=' + coinbase" class="card-link" target="_blank" v-b-popover.hover="'View ' + tokenSymbol(data.item.optinos[1]) + ' ' + tokenName(data.item.optinos[1]) + ' on the block explorer'">{{ tokenBalance(data.item.optinos[1]) }}</b-link>
              </template>
              <template v-slot:cell(balance)="data">
                <b-link :href="explorer + 'token/' + data.item.optinos[0] + '?a=' + coinbase" class="card-link" target="_blank" v-b-popover.hover="'View ' + tokenName(data.item.optinos[0]) + ' on the block explorer'">{{ tokenBalance(data.item.optinos[0]) }}</b-link><br />
                <b-link :href="explorer + 'token/' + data.item.optinos[1] + '?a=' + coinbase" class="card-link" target="_blank" v-b-popover.hover="'View ' + tokenName(data.item.optinos[1]) + ' on the block explorer'">{{ tokenBalance(data.item.optinos[1]) }}</b-link>
              </template>
              <template v-slot:cell(extra)="row">
                <!-- <b-link @click="row.toggleDetails" class="card-link m-0 p-0" v-b-popover.hover="'Show ' + (row.detailsShowing ? 'less' : 'more')"><b-icon-caret-up-fill font-scale="0.9" v-if="row.detailsShowing"></b-icon-caret-up-fill><b-icon-caret-down-fill font-scale="0.9" v-if="!row.detailsShowing"></b-icon-caret-down-fill></b-link> -->
                <b-link @click="recalculate('setSeries', row.item); $bvModal.show('bv-modal-optino')" class="card-link m-0 p-0" v-b-popover.hover="'Edit ' + row.item.index + ' series'"><b-icon-pencil-square font-scale="0.9"></b-icon-pencil-square></b-link>
              </template>
              <template v-slot:row-details="row">
                <b-card no-body class="m-1 mt-2 p-1">
                  <b-card-header header-tag="header" class="m-1 p-1">
                    Token {{ row.item.symbol }} {{ row.item.name }}<!-- <b-button size="sm" class="m-0 p-0" @click="removeTokenFromList(row.item.address, row.item.symbol)" variant="link" v-b-popover.hover="'Remove ' + row.item.symbol + ' from list?'"><b-icon-trash font-scale="0.9"></b-icon-trash></b-button> -->
                  </b-card-header>
                  <b-card-body class="m-0 p-0">
                  </b-card-body>
                </b-card>
              </template>
            </b-table>
          </b-card-body>
        </b-card>
      </b-card>
      <!--
      <div>
        <b-sidebar id="sidebar-status" title="Status" width="400px" right shadow>
          <b-card no-body class="m-1 p-1">
            <b-card-body class="m-0 p-0">
              <connection></connection>
              <br />
              <optinoFactory></optinoFactory>
              <br />
              <tokens></tokens>
              <br />
              <feeds></feeds>
            </b-card-body>
          </b-card>
        </b-sidebar>
      </div>
      -->
    </div>
  `,
  data: function () {
    return {
      ADDRESS0: ADDRESS0,

      spinnerVariant: "success",

      reschedule: false,

      optinoFeedMode: 0,
      searchFeed0: null,

      seriesSearch: null,
      seriesCurrentPage: 1,
      seriesPerPage: 10,
      seriesPageOptions: [
        { text: "5", value: 5 },
        { text: "10", value: 10 },
        { text: "25", value: 25 },
        { text: "50", value: 50 },
        { text: "All", value: 0 },
      ],

      optino: {
        show: false,
        showFeed: false,

        series: null,

        optionType: 'vc',

        feed0: null, // "0x8468b2bdce073a157e560aa4d9ccf6db1db98507",
        feed1: null, // "0x0000000000000000000000000000000000000000",
        type0: 0xff,
        type1: 0xff,
        decimals0: 0xff,
        decimals1: 0xff,
        inverse0: 0,
        inverse1: 0,
        feedDecimals0: null,
        calculatedSpot: null,

        floor: null, // "150",
        floorMessage: null,
        strike: null, // "250",
        strikeMessage: null,
        cap: null, // "500",
        capMessage: null,

        expiryDate: null,
        expiryTime: null,
        // expiryInMillis: moment().utc().add(moment().utc().hours(DEFAULTEXPIRYUTCHOUR).minutes(0).seconds(0).valueOf() < moment() ? 1 : 0, 'd').add(1, 'd').hours(DEFAULTEXPIRYUTCHOUR).minutes(0).seconds(0).valueOf(),
        expirySelection: "+1d",
        expiryMessage: null,

        token0: null, // "0x452a2652d1245132f7f47700c24e217faceb1c6c",
        token1: null, // "0x2269fbd941938ac213719cd3487323a0c75f1667",

        tokens: "10",

        collateralToken: null,
        nonCollateralToken: null,
        collateralTokens: null,
        collateralDecimals: null,
        collateralFee: null,
        collateralTokensPlusFee: null,

        collateralAllowance: "0",

        currentSpot: null,
        currentPayoff: null,
        currentCoverPayoff: null,

        chartSeries: [],
        spotFrom: "0",
        spotTo: "200",

        payoffTable: [],
      },
      optinoTypes: [
        {
          label: 'Calls',
          options: [
            { value: 'vc', text: 'Vanilla Call' },
            { value: 'cc', text: 'Capped Call' },
          ]
        },
        {
          label: 'Puts',
          options: [
            { value: 'vp', text: 'Vanilla Put' },
            { value: 'fp', text: 'Floored Put' },
          ]
        },
      ],
      seriesDataFields: [
        { key: 'index', label: '#', sortable: true, thClass: 'text-right', tdClass: 'text-right' },
        { key: 'optionType', label: 'Type', sortable: true },
        { key: 'baseSymbol', label: 'Base', sortable: true },
        { key: 'quoteSymbol', label: 'Quote', sortable: true },
        { key: 'expiry', label: 'Expiry', sortable: true },
        { key: 'feeds', label: 'Feed(s)', sortable: true },
        { key: 'floor', label: 'Floor', sortable: true, thClass: 'text-right', tdClass: 'text-right' },
        { key: 'strike', label: 'Strike', sortable: true, thClass: 'text-right', tdClass: 'text-right' },
        { key: 'cap', label: 'Cap', sortable: true, thClass: 'text-right', tdClass: 'text-right' },
        { key: 'spot', label: 'Spot', sortable: true, thClass: 'text-right', tdClass: 'text-right' },
        { key: 'optinoPayoff', label: 'Opt Pay', sortable: true, thClass: 'text-right', tdClass: 'text-right' },
        { key: 'coverPayoff', label: 'Cov Pay', sortable: true, thClass: 'text-right', tdClass: 'text-right' },
        { key: 'collateral', label: 'Collateral', sortable: true, thClass: 'text-right', tdClass: 'text-right' },
        { key: 'optinoBalance', label: 'Opt Bal', sortable: true, thClass: 'text-right', tdClass: 'text-right' },
        { key: 'coverBalance', label: 'Cov Bal', sortable: true, thClass: 'text-right', tdClass: 'text-right' },
        // { key: 'balance', label: 'Balance', sortable: true, thClass: 'text-right', tdClass: 'text-right',
          // formatter: (value, key, item) => {
          //   return this.tokenBalance(item.optinos[0]) + ' ' + this.tokenBalance(item.optinos[1]);
          //   // return "a" + value + " " + key + " " + JSON.stringify(item) + "z";
          // }
        // },
        // { key: 'decimals', label: 'Decimals', sortable: true, thClass: 'text-right', tdClass: 'text-right' },
        // { key: 'totalSupply', label: 'Total Supply', sortable: true, thClass: 'text-right', tdClass: 'text-right' },
        // { key: 'balance', label: 'Balance', sortable: true, thClass: 'text-right', tdClass: 'text-right' },
        // { key: 'allowance', label: 'Allowance', sortable: true, thClass: 'text-right', tdClass: 'text-right' },
        // { key: 'address', label: 'Address', sortable: true, thClass: 'text-right', tdClass: 'text-right' },
        { key: 'extra', label: '', sortable: false },
      ],
      selectFeedFields: [
        { key: 'name', label: 'Name', sortable: true },
        { key: 'type', label: 'Type', sortable: true },
        { key: 'decimals', label: 'Decimals', sortable: true, thClass: 'text-right', tdClass: 'text-right' },
        { key: 'note', label: 'Note', sortable: true },
        { key: 'spot', label: 'Spot', sortable: true, thClass: 'text-right', tdClass: 'text-right' },
        // { key: 'hasData', label: 'Data?', sortable: true },
        { key: 'timestamp', label: 'Timestamp', formatter: d => { return new Date(d*1000).toLocaleString(); }, sortable: true },
        { key: 'address', label: 'Address', sortable: true },
        { key: 'selected', label: 'Select', sortable: false },
      ],
      payoffTableFields: [
        { key: 'spot', label: 'Spot', sortable: true, thClass: 'text-right', tdClass: 'text-right' },
        { key: 'payoff', label: 'Optino Payoff', sortable: true, thClass: 'text-right', tdClass: 'text-right' },
        { key: 'coverPayoff', label: 'Cover Payoff', sortable: true, thClass: 'text-right', tdClass: 'text-right' },
        { key: 'collateral', label: 'Collateral', sortable: true, thClass: 'text-right', tdClass: 'text-right' },
        { key: 'payoffInNonCollateral', label: 'Payoff In Non-Collateral', sortable: true, thClass: 'text-right', tdClass: 'text-right' },
      ],
    }
  },
  computed: {
    explorer () {
      return store.getters['connection/explorer'];
    },
    coinbase() {
      return store.getters['connection/coinbase'];
    },
    bound() {
      return this.callPut == 0 ? this.cap : this.floor;
    },
    expiry() {
      logInfo("optinoExplorer", "expiry(" + this.optino.expiryDate + " " + this.optino.expiryTime + ")");
      if (this.optino.expiryDate != null && this.optino.expiryTime != null) {
        var e = moment.utc(this.optino.expiryDate + " " + this.optino.expiryTime).unix();
        return e;
      }
      return null;
      // return parseInt(new Date(this.expiryInMillis).getTime()/1000); // : parseInt(this.expiryInMillis / 1000);
    },
    seriesDataSorted() {
      var results = [];
      var seriesData = store.getters['optinoFactory/seriesData'];
      for (address in seriesData) {
        results.push(seriesData[address]);
      }
      // TODO
      // results.sort(function(a, b) {
      //   return ('' + a.symbol + a.name).localeCompare(b.symbol + a.name);
      // });
      return results;
    },
    seriesData() {
      return store.getters['optinoFactory/seriesData'];
    },
    seriesOptions() {
      var seriesData = store.getters['optinoFactory/seriesData'];
      var tokenData = store.getters['optinoFactory/tokenData'];
      var results = [];
      results.push({ value: null, text: "(none)" });
      seriesData.forEach(function(e) {
        var description = tokenData[e.optinoToken] == null ? "(loading)" : tokenData[e.optinoToken].symbol + ' - ' + tokenData[e.optinoToken].name;
        results.push({ value: e.seriesKey, text: description });
      });
      return results;
    },
    tokenData() {
      return store.getters['optinoFactory/tokenData'];
    },
    optinoData() {
      return store.getters['optinoFactory/optinoData'];
    },
    typeOptions() {
      return store.getters['optinoFactory/typeOptions'];
    },
    decimalsOptions() {
      return store.getters['optinoFactory/decimalsOptions'];
    },
    tokenOptions() {
      var tokenData = store.getters['tokens/tokenData'];
      var results = [];
      results.push({ value: null, text: "(select Config or Series above)", disabled: true });

      Object.keys(tokenData).forEach(function(e) {
        var symbol = tokenData[e].symbol;
        var name = tokenData[e].name;
        var decimals = tokenData[e].decimals;
        if (symbol !== undefined) {
          results.push({ value: e, text: symbol + " '" + name + "' " + decimals, disabled: true });
        } else {
          results.push({ value: e, text: "Token at address " + e, disabled: true });
        }
      });
      return results;
    },
    tokenOptionsSorted() {
      var tokenData = store.getters['tokens/tokenData'];
      var factoryTokenData = store.getters['optinoFactory/tokenData'];
      var sortedData = [];
      var seen = {};
      for (token in tokenData) {
        // logInfo("optinoExplorer", "tokenOptionsSorted: " + token);
        if (/^\w+$/.test(tokenData[token].symbol)) {
          sortedData.push(tokenData[token]);
          seen[token] = 1;
        }
      }
      for (address in factoryTokenData) {
        // console.log("tokenOptionsSorted: " + JSON.stringify(factoryTokenData[address]));
        if (!seen[address] && /^\w+$/.test(factoryTokenData[address].symbol) && factoryTokenData[address].type == 'token') {
          sortedData.push(factoryTokenData[address]);
        }
      }
      sortedData.sort(function(a, b) {
        return ('' + a.symbol).localeCompare(b.symbol);
      });
      var results = [];
      sortedData.forEach(function(e) {
        results.push({ value: e.address.toLowerCase(), text: e.symbol + " '" + e.name + "' " + e.address.substring(0, 10) + " " + e.decimals + " bal " + parseFloat(new BigNumber(e.balance).toFixed(8)) + " allow " + parseFloat(new BigNumber(e.allowance).toFixed(8)), disabled: false });
      });
      return results;
    },
    // feedSelectionsSorted1() {
    //   var results = [];
    //   var feedData = store.getters['feeds/feedData'];
    //   for (address in feedData) {
    //     var feed = feedData[address];
    //     console.log("feedSelectionsSorted: " + address + " => " + JSON.stringify(feed));
    //     results.push({ value: address, text: feed.name });
    //   }
    //   results.sort(function(a, b) {
    //     return ('' + a.sortKey).localeCompare(b.sortKey);
    //   });
    //   return results;
    // },
    feedSelectionsSorted0() {
      var registeredFeedData = store.getters['optinoFactory/registeredFeedData'];
      var feedData = store.getters['feeds/feedData'];
      var sortedData = [];
      for (var address in registeredFeedData) {
        var feed = registeredFeedData[address];
        if (feed.source == "registered") {
          sortedData.push(feed);
        }
      }
      for (address in feedData) {
        var feed = feedData[address];
        if (typeof registeredFeedData[address] === "undefined" && feed.source != "registered") {
          // console.log("feedSelectionsSorted0: " + address + " => " + JSON.stringify(feed));
          sortedData.push(feed);
        }
      }
      sortedData.sort(function(a, b) {
        return ('' + a.sortKey).localeCompare(b.sortKey);
      });
      var results = [];
      var t = this;
      sortedData.forEach(function(e) {
        results.push({ value: e.address, text: e.address.substring(0, 10) + " " + e.name + " " + parseFloat(new BigNumber(e.spot).shift(-e.decimals).toFixed(9)) + " " + new Date(e.timestamp*1000).toLocaleString() /*, disabled: e.address == t.feed1*/ });
      });
      return results;
    },
    feedSelectionsSorted1() {
      var registeredFeedData = store.getters['optinoFactory/registeredFeedData'];
      var feedData = store.getters['feeds/feedData'];
      var sortedData = [];
      for (var address in registeredFeedData) {
        var feed = registeredFeedData[address];
        if (feed.source == "registered") {
          sortedData.push(feed);
        }
      }
      for (address in feedData) {
        var feed = feedData[address];
        if (typeof registeredFeedData[address] === "undefined" && feed.source != "registered") {
          // console.log("feedSelectionsSorted0: " + address + " => " + JSON.stringify(feed));
          sortedData.push(feed);
        }
      }
      sortedData.sort(function(a, b) {
        return ('' + a.sortKey).localeCompare(b.sortKey);
      });
      var results = [];
      results.push({ value: "0x0000000000000000000000000000000000000000", text: "(Select optional second feed)", disabled: false });
      var t = this;
      sortedData.forEach(function(e) {
        results.push({ value: e.address, text: e.address.substring(0, 10) + " " + e.name + " " + parseFloat(new BigNumber(e.spot).shift(-e.decimals).toFixed(9)) + " " + new Date(e.timestamp*1000).toLocaleString() /*, disabled: e.address == t.feed1 */ });
      });
      return results;
    },
    registeredFeeds() {
      var results = [];
      var registeredFeedData = store.getters['optinoFactory/registeredFeedData'];
      for (var address in registeredFeedData) {
        var feed = registeredFeedData[address];
        if (feed.source == "registered") {
          results.push(feed);
        }
      }
      results.sort(function(a, b) {
        return ('' + a.sortKey).localeCompare(b.sortKey);
      });
      return results;
    },
    chartOptions() {
      return {
        chart: {
          // height: 600,
          // width: 600,
          type: 'line',
          stacked: false,
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          width: [5, 4, 10, 3]
        },
        fill: {
          type: 'solid',
          opacity: [0.85, 0.75, 0.35, 0.45],
        },
        markers: {
          size: [3, 2, 0, 1],
        },
        title: {
          text: "Payoff", // this.title,
          align: 'left',
          offsetX: 0, // 110,
        },
        xaxis: {
          type: 'numeric',
          min: parseFloat(this.optino.spotFrom),
          max: parseFloat(this.optino.spotTo),
          tickAmount: 20,
          title: {
            text: 'Spot',
          },
          labels: {
            formatter: function (value) {
              return parseFloat(parseFloat(value).toPrecision(3));
            },
            rotate: -45,
            rotateAlways: true,
          },
        },
        yaxis: [
          {
            seriesName: 'Optino Payoff',
            min: 0,
            title: {
              text: 'Payoff in ' + this.tokenSymbol(this.optino.collateralToken),
              style: {
                color: '#00cc66',
              },
            },
            axisTicks: {
              show: true,
            },
            axisBorder: {
              show: true,
              color: '#00cc66',
            },
            labels: {
              formatter: function (value) {
                return value == null ? null : parseFloat(parseFloat(value).toPrecision(3));
              },
              style: {
                colors: '#00cc66',
              }
            },
            tooltip: {
              enabled: true,
            },
          },
          {
            seriesName: 'Optino Payoff',
            min: 0,
            show: false,
            labels: {
              formatter: function (value) {
                return value == null ? null : parseFloat(parseFloat(value).toPrecision(3));
              },
              style: {
                colors: '#008FFB',
              }
            },
          },
          {
            seriesName: 'Optino Payoff',
            min: 0,
            show: false,
            labels: {
              formatter: function (value) {
                return value == null ? null : parseFloat(parseFloat(value).toPrecision(3));
              },
              style: {
                colors: '#008FFB',
              }
            },
          },
          {
            seriesName: 'Equivalent Optino Payoff in ' + this.tokenSymbol(this.optino.nonCollateralToken),
            min: 0,
            opposite: true,
            title: {
              text: 'Equivalent Payoff in ' + this.tokenSymbol(this.optino.nonCollateralToken),
              style: {
                color: '#ff00ff',
              },
            },
            axisTicks: {
              show: true,
            },
            axisBorder: {
              show: true,
              color: '#ff00ff'
            },
            labels: {
              formatter: function (value) {
                return value == null ? null : parseFloat(parseFloat(value).toPrecision(3));
              },
              style: {
                colors: '#ff00ff',
              }
            },
          }
        ],
        tooltip: {
          x: {
            formatter: function(value, { series, seriesIndex, dataPointIndex, w }) {
              return "Spot " + value;
            }
          }
        },
      };
    },
    expiries() {
      var results = [];
      results.push({ value: null, text: 'Select' });

      var check = moment().utc().hours(DEFAULTEXPIRYUTCHOUR).minutes(0).seconds(0);
      var day0 = moment().utc().add(check.valueOf() < moment() ? 1 : 0, 'd').hours(DEFAULTEXPIRYUTCHOUR).minutes(0).seconds(0);
      // logInfo("expiries", "check: " + moment(check).utc().format() + ", day0: " + moment(day0).utc().format() + ", now: " + moment().utc().format());
      var d = moment(day0);
      results.push({ value: d.valueOf(), text: '+0d (' + d.format() + ')' });
      d = moment(day0).add(1, 'd');
      results.push({ value: d.valueOf(), text: '+1d (' + d.format() + ')' });
      d = moment(day0).add(2, 'd');
      results.push({ value: d.valueOf(), text: '+2d (' + d.format() + ')' });
      d = moment(day0).add(3, 'd');
      results.push({ value: d.valueOf(), text: '+3d (' + d.format() + ')' });
      d = moment(day0).add(4, 'd');
      results.push({ value: d.valueOf(), text: '+4d (' + d.format() + ')' });
      d = moment(day0).add(5, 'd');
      results.push({ value: d.valueOf(), text: '+5d (' + d.format() + ')' });
      d = moment(day0).add(6, 'd');
      results.push({ value: d.valueOf(), text: '+6d (' + d.format() + ')' });
      d = moment(day0).add(1, 'w');
      results.push({ value: d.valueOf(), text: '+1w (' + d.format() + ')' });

      check = moment().utc().day(DEFAULTEXPIRYUTCDAYOFWEEK).hours(DEFAULTEXPIRYUTCHOUR).minutes(0).seconds(0);
      var week0 = moment().utc().add(check.valueOf() < moment() ? 1 : 0, 'w').day(DEFAULTEXPIRYUTCDAYOFWEEK).hours(DEFAULTEXPIRYUTCHOUR).minutes(0).seconds(0);
      // logInfo("expiries", "check: " + moment(check).utc().format() + ", week0: " + moment(week0).utc().format() + ", now: " + moment().utc().format());
      var w = moment(week0);
      results.push({ value: w.valueOf(), text: 'End of this week ' + w.format() });
      w = moment(week0).add(1, 'w');
      results.push({ value: w.valueOf(), text: 'End of next week ' + w.format() });
      w = moment(week0).add(2, 'w');
      results.push({ value: w.valueOf(), text: 'End of the following week ' + w.format() });

      check = moment().utc().add(1, 'M').date(1).add(-1, 'd').hours(DEFAULTEXPIRYUTCHOUR).minutes(0).seconds(0);
      var month0 = moment().utc().add(check.valueOf() < moment() ? 1 : 0, 'M').add(1, 'M').date(1).add(-1, 'd').hours(DEFAULTEXPIRYUTCHOUR).minutes(0).seconds(0);
      // logInfo("expiries", "check: " + moment(check).utc().format() + ", month0: " + month0.format() + ", now: " + moment().utc().format());
      var m = moment(month0);
      results.push({ value: m.valueOf(), text: 'End of this month ' + m.format() });
      m = moment(month0).add(1, 'M').add(1, 'M').date(1).add(-1, 'd');
      results.push({ value: m.valueOf(), text: 'End of next month ' + m.format() });
      m = moment(month0).add(2, 'M').add(1, 'M').date(1).add(-1, 'd');
      results.push({ value: m.valueOf(), text: 'End of the following month ' + m.format() });

      return results;
    }
  },
  mounted() {
    // logDebug("OptinoExplorer", "mounted() Called");
    this.reschedule = true;
    this.timeoutCallback();
  },
  destroyed() {
    // logDebug("OptinoExplorer", "destroyed() Called");
    this.reschedule = false;
  },
  methods: {
    singleFeedSelectionRowClicked(record, index) {
      this.optino.feed0 = record.address;
      this.optino.feed1 = ADDRESS0;
      this.optino.type0 = DEFAULTTYPE;
      this.optino.type1 = DEFAULTTYPE;
      this.optino.decimals0 = DEFAULTDECIMAL;
      this.optino.decimals1 = DEFAULTDECIMAL;
      // this.optino.inverse0
      this.optino.inverse1 = 0;
      this.recalculateFeed("singleFeedSelectionRowClicked", record)
    },
    dualFeedFirstFeed(address) {
      this.optino.feed0 = address;
      this.optino.type0 = DEFAULTTYPE;
      this.optino.type1 = DEFAULTTYPE;
      this.optino.decimals0 = DEFAULTDECIMAL;
      this.optino.decimals1 = DEFAULTDECIMAL;
      this.recalculateFeed("dualFeedFirstFeed", address)
    },
    dualFeedSecondFeed(address) {
      this.optino.feed1 = address;
      this.optino.type0 = DEFAULTTYPE;
      this.optino.type1 = DEFAULTTYPE;
      this.optino.decimals0 = DEFAULTDECIMAL;
      this.optino.decimals1 = DEFAULTDECIMAL;
      this.recalculateFeed("dualFeedSecondFeed", address)
    },
    feedName(o) {
      // var results = [];
      var registeredFeedData = store.getters['optinoFactory/registeredFeedData'];
      // var feedData = store.getters['feeds/feedData'];
      // for (var address in registeredFeedData) {
      //   var feed = registeredFeedData[address];
      //   if (feed.source == "registered") {
      //     results.push(feed);
      //   }
      // }
      // results.sort(function(a, b) {
      //   return ('' + a.sortKey).localeCompare(b.sortKey);
      // });
      // return results;
      var result = "";
      if (o.feed0 != null) {
        if (o.inverse0 != 0) {
          result = result + "Inv(";
        }
        var feed0 = registeredFeedData[o.feed0];
        if (feed0 != null && o.type0 == DEFAULTTYPE && o.decimals0 == DEFAULTDECIMAL) {
          result = result + feed0.name;
        } else {
          result = result + "Custom";
        }
        if (o.inverse0 != 0) {
          result = result + ")";
        }
        if (o.feed1 != null && o.feed1 != ADDRESS0) {
          result = result + "*";
          if (o.inverse1 != 0) {
            result = result + "Inv("
          }
          var feed1 = registeredFeedData[o.feed1];
          if (feed1 != null && o.type1 == DEFAULTTYPE && o.decimals1 == DEFAULTDECIMAL) {
            result = result + feed1.name;
          } else {
            result = result + "Custom";
          }
          if (o.inverse1 != 0) {
            result = result + ")"
          }
        }
      } else {
        result = "Select Feed"
      }
      return result;
    },
    formatUTC(d) {
      return moment(d).utc().format();
    },
    formatValue(value, decimals) {
      // return parseFloat(new BigNumber(value).shift(-decimals).toFixed(decimals));
      return parseFloat(new BigNumber(value).shift(-decimals).toFixed(decimals)).toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 9});
    },
    formatType(callPut, bound) {
      if (callPut == 0) {
        return bound == 0 ? "Vanilla Call" : "Capped Call";
      } else {
        return bound == 0 ? "Vanilla Put" : "Floored Put";
      }
    },
    seriesOnFiltered(filteredItems) {
      if (this.seriestotalRows !== filteredItems.length) {
        this.seriestotalRows = filteredItems.length;
        this.seriesCurrentPage = 1
      }
    },
    // TODO Delete
    truncate(s, l) {
      if (s.length > l) {
        return s.substr(0, l) + '...';
      }
      return s;
    },
    tokenSymbol(address) {
      var addr = address == null ? null : address.toLowerCase();
      var tokenData = store.getters['optinoFactory/tokenData'];
      if (typeof tokenData[addr] !== "undefined") {
        return tokenData[addr].symbol;
      }
      return address == null ? null : address.substr(0, 10) + '...';
    },
    tokenName(address) {
      var addr = address.toLowerCase();
      var tokenData = store.getters['optinoFactory/tokenData'];
      if (typeof tokenData[addr] !== "undefined") {
        return tokenData[addr].name;
      }
      return address;
    },
    tokenBalance(address) {
      var addr = address.toLowerCase();
      var tokenData = store.getters['optinoFactory/tokenData'];
      if (typeof tokenData[addr] !== "undefined") {
        return tokenData[addr].balance;
      }
      return address;
    },
    seriesName(_optino, type) {
      if (_optino != null) {
        var name;
        if (_optino.optionType == 'vc') {
          name = "Vanilla Call";
        } else if (_optino.optionType == 'cc') {
          name = "Capped Call";
        } else if (_optino.optionType == 'vp') {
          name = "Vanilla Put";
        } else if (_optino.optionType == 'fp') {
          name = "Floored Put";
        } else {
          name = "???";
        }
        name += " ";

        if (_optino.token0 != null) {
          var tokenData = store.getters['optinoFactory/tokenData'];
          var token0 = tokenData[_optino.token0.toLowerCase()];
          if (typeof token0 !== "undefined") {
            name += token0.symbol;
          } else {
            name += _optino.token0.substr(0, 10);
          }
        } else {
          name += "???";
        }
        name += "/";
        if (_optino.token1 != null) {
          var tokenData = store.getters['optinoFactory/tokenData'];
          var token1 = tokenData[_optino.token1.toLowerCase()];
          if (typeof token1 !== "undefined") {
            name += token1.symbol;
          } else {
            name += _optino.token1.substr(0, 10);
          }
        } else {
          name += "???";
        }
        name += " ";
        name += _optino.expiryDate == null || _optino.expiryTime == null ? '???' : moment.utc(_optino.expiryDate + " " + _optino.expiryTime).format();
        name += " ";
        if (_optino.optionType == 'fp') {
          if (_optino.floor != null && _optino.feedDecimals0 != null) {
            name += parseFloat(new BigNumber(_optino.floor).toFixed(_optino.feedDecimals0)).toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 9});
          } else {
            name += "???";
          }
          name += "-";
        }
        if (_optino.strike != null && _optino.feedDecimals0 != null) {
          name += parseFloat(new BigNumber(_optino.strike).toFixed(_optino.feedDecimals0)).toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 9});
        } else {
          name += "???";
        }
        if (_optino.optionType == 'cc') {
          name += "-";
          if (_optino.cap != null && _optino.feedDecimals0 != null) {
            name += parseFloat(new BigNumber(_optino.cap).toFixed(_optino.feedDecimals0)).toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 9});
          } else {
            name += "???";
          }
        }
        name += " ";
        name += this.feedName(_optino);
        return name;
      }
      return null;
    },
    displayFeed(address, feedType, decimals, inverse) {
      // console.log("displayFeed - address: " + address + ", feedType: " + feedType + ", decimals: " + decimals + ", inverse: " + inverse);
      var result = "";
      if (address != ADDRESS0) {
        var addr = address.toLowerCase();
        var registeredFeedData = store.getters['optinoFactory/registeredFeedData'];
        if (parseInt(inverse) != 0) {
          result = result + "Inv(";
        }
        if (feedType == DEFAULTTYPE && decimals == DEFAULTDECIMAL) {
          if (typeof registeredFeedData[addr] !== "undefined") {
            result = result + registeredFeedData[addr].name;
          } else {
            var feedData = store.getters['feeds/feedData'];
            if (typeof feedData[addr] !== "undefined") {
              result = result + feedData[addr].name;
            } else {
              result = result + address.substr(0, 10);
            }
          }
        } else {
          result = result + "Custom";
        }
        if (parseInt(inverse) != 0) {
          result = result + ")";
        }
      }
      return result;
    },
    timeoutCallback() {
      if (store.getters['connection/block'] != null) {
        this.lastBlockTimeDiff = getTimeDiff(store.getters['connection/block'].timestamp);
        var secs = parseInt(new Date() / 1000 - store.getters['connection/block'].timestamp);
        if (secs > 90) {
          this.spinnerVariant = "danger";
        } else if (secs > 60) {
          this.spinnerVariant = "warning";
        } else {
          this.spinnerVariant = "success";
        }
      } else {
        this.spinnerVariant = "danger";
      }
    //   var seriesData = store.getters['optinoFactory/seriesData'];
    //   // logDebug("OptinoExplorer", "timeoutCallback() Called - Object.keys(seriesData).length: " + Object.keys(seriesData).length);
    //   // Feed loaded
    //   if (Object.keys(seriesData).length > 0) {
    //     // this.reschedule = false;
    //     // TODO
    //     // this.recalculate("mounted", "mounted") // Calls the method before page loads
    //   }
      var t = this;
      if (this.reschedule) {
        setTimeout(function() {
          t.timeoutCallback();
        }, 5000);
      }
    },
    async recalculateFeed(source, event) {
      logInfo("optinoExplorer", "recalculateFeed(" + source + ", " + JSON.stringify(event) + ")");
      var factoryAddress = store.getters['optinoFactory/address']
      var factory = web3.eth.contract(OPTINOFACTORYABI).at(factoryAddress);
      var feedType0 = null;
      // logInfo("optinoExplorer", "recalculateFeed feedParameters:" + JSON.stringify([this.type0, this.type1, this.decimals0, this.decimals1, this.inverse0, this.inverse1]));
      try {
        var _calculateSpot = promisify(cb => factory.calculateSpot([this.optino.feed0, this.optino.feed1],
          [this.optino.type0, this.optino.type1, this.optino.decimals0, this.optino.decimals1, this.optino.inverse0, this.optino.inverse1], cb));
        var calculateSpot = await _calculateSpot;
        logInfo("optinoExplorer", "recalculateFeed - calculateSpot: " + JSON.stringify(calculateSpot));
        this.optino.feedDecimals0 = calculateSpot[0];
        feedType0 = calculateSpot[1];
        this.optino.calculatedSpot = calculateSpot[2].shift(-this.optino.feedDecimals0).toString();
      } catch (e) {
        this.optino.calculatedSpot = null;
      }
    },
    async recalculate(source, event) {
      logInfo("optinoExplorer", "recalculate(" + source + ", " + JSON.stringify(event) + ")");

      var ok = true;
      this.optino.collateral = "";

      // --- Handle rates first to get feedDecimals0 ---
      if (source == "new") {
        this.optino.series = null;
        if (this.optino.expiryDate == null || this.optino.expiryTime == null) {
          var mExpiry = moment(this.expiries[1].value).utc();
          logInfo("optinoExplorer", "recalculate - new mExpiry: " + mExpiry.format());
          this.optino.expiryDate = mExpiry.format("YYYY-MM-DD");
          this.optino.expiryTime = mExpiry.format("HH:mm:ss");
        }
      } else if (source == "setExpiry") {
        var mExpiry = moment(event).utc();
        logInfo("optinoExplorer", "recalculate - new mExpiry: " + mExpiry.format());
        if (this.optino.series != null && (this.optino.expiryDate != mExpiry.format("YYYY-MM-DD") || this.optino.expiryTime != mExpiry.format("HH:mm:ss"))) {
          this.optino.series = null;
        }
        this.optino.expiryDate = mExpiry.format("YYYY-MM-DD");
        this.optino.expiryTime = mExpiry.format("HH:mm:ss");
      } else if (source == "setExpiryDate") {
        logInfo("optinoExplorer", "recalculate - setExpiryDate: " + event + ", this.optino.expiryDate: " + this.optino.expiryDate);
        if (this.optino.series != null) {
          var mExpiry = moment(this.optino.series.expiry * 1000).utc();
          logInfo("optinoExplorer", "recalculate - setExpiryDate mExpiry: " + mExpiry.format());
          if (this.optino.expiryDate != mExpiry.format("YYYY-MM-DD")) {
            this.optino.series = null;
          }
          // this.optino.expiryDate = mExpiry.format("YYYY-MM-DD");
          // this.optino.expiryTime = mExpiry.format("HH:mm:ss");
          logInfo("optinoExplorer", "recalculate - setExpiryDate expiryDate: " + this.optino.expiryDate);
          // logInfo("optinoExplorer", "recalculate - setExpiryDate expiryTime: " + this.optino.expiryTime);
        }

      } else if (source == "setExpiryTime") {
        logInfo("optinoExplorer", "recalculate - setExpiryTime: " + event + ", this.optino.expiryTime: " + this.optino.expiryTime);
        if (this.optino.series != null) {
          var mExpiry = moment(this.optino.series.expiry * 1000).utc();
          logInfo("optinoExplorer", "recalculate - setExpiryTime mExpiry: " + mExpiry.format());
          if (this.optino.expiryTime != mExpiry.format("HH:mm:ss")) {
            this.optino.series = null;
          }
          // this.optino.expiryDate = mExpiry.format("YYYY-MM-DD");
          // this.optino.expiryTime = mExpiry.format("HH:mm:ss");
          // logInfo("optinoExplorer", "recalculate - setExpiryDate expiryDate: " + this.optino.expiryDate);
          logInfo("optinoExplorer", "recalculate - setExpiryDate expiryTime: " + this.optino.expiryTime);
        }

      } else if (source == "setSeries") {
        this.optino.series = event;
        this.optino.feed0 = event.feeds[0];
        this.optino.feed1 = event.feeds[1];
        this.optino.type0 = parseInt(event.feedParameters[0]);
        this.optino.type1 = parseInt(event.feedParameters[1]);
        this.optino.decimals0 = parseInt(event.feedParameters[2]);
        this.optino.decimals1 = parseInt(event.feedParameters[3]);
        this.optino.inverse0 = parseInt(event.feedParameters[4]);
        this.optino.inverse1 = parseInt(event.feedParameters[5]);

        // logInfo("optinoExplorer", "recalculate - optino before: " + JSON.stringify(this.optino));
        if (event.callPut == 0) {
          this.optino.optionType = event.bound == 0 ? 'vc' : 'cc';
        } else {
          this.optino.optionType = event.bound == 0 ? 'vp' : 'fp';
        }
        this.optino.strike = new BigNumber(event.strike).shift(-event.feedDecimals0).toString();
        if (event.callPut == 0) {
          this.optino.cap = new BigNumber(event.bound).shift(-event.feedDecimals0).toString();
          this.optino.floor = "0";
        } else {
          this.optino.cap = "0";
          this.optino.floor = new BigNumber(event.bound).shift(-event.feedDecimals0).toString();
        }

        // expiryDate: "2020-11-21",
        // expiryTime: "08:00:00",
        var mExpiry = moment(event.expiry * 1000).utc();
        logInfo("optinoExplorer", "recalculate - setSeries mExpiry: " + mExpiry.format());
        this.optino.expiryDate = mExpiry.format("YYYY-MM-DD");
        this.optino.expiryTime = mExpiry.format("HH:mm:ss");
        logInfo("optinoExplorer", "recalculate - setSeries expiryDate: " + this.optino.expiryDate);
        logInfo("optinoExplorer", "recalculate - setSeries expiryTime: " + this.optino.expiryTime);
        // this.optino.expiryInMillis = event.expiry * 1000;

        this.optino.token0 = event.pair[0];
        this.optino.token1 = event.pair[1];
        // logInfo("optinoExplorer", "recalculate - optino  after: " + JSON.stringify(this.optino));
      }

      var factoryAddress = store.getters['optinoFactory/address']
      var factory = web3.eth.contract(OPTINOFACTORYABI).at(factoryAddress);
      var feedType0 = null;
      // logInfo("optinoExplorer", "recalculate feedParameters:" + JSON.stringify([this.type0, this.type1, this.decimals0, this.decimals1, this.inverse0, this.inverse1]));
      try {
        var _calculateSpot = promisify(cb => factory.calculateSpot([this.optino.feed0, this.optino.feed1],
          [this.optino.type0, this.optino.type1, this.optino.decimals0, this.optino.decimals1, this.optino.inverse0, this.optino.inverse1], cb));
        var calculateSpot = await _calculateSpot;
        // logInfo("optinoExplorer", "recalculate - calculateSpot: " + JSON.stringify(calculateSpot));
        this.optino.feedDecimals0 = parseInt(calculateSpot[0]);
        feedType0 = parseInt(calculateSpot[1]);
        this.optino.calculatedSpot = calculateSpot[2].shift(-this.optino.feedDecimals0).toString();
        logInfo("optinoExplorer", "recalculate - calculateSpot: " + this.optino.calculatedSpot + ", feedDecimals0: " + this.optino.feedDecimals0);
      } catch (e) {
        this.optino.calculatedSpot = null;
        ok = false;
      }

      if (ok) {
        var feedDecimals0 = this.optino.feedDecimals0;
        // logInfo("optinoExplorer", "feedDecimals0: " + feedDecimals0);
        var callPut = this.optino.optionType == 'vc' || this.optino.optionType == 'cc' ? 0 : 1;

        // Check inputs
        // logInfo("optinoExplorer", "recalculate - parseFloat(" + this.optino.strike + "): " + parseFloat(this.optino.strike));
        this.optino.strikeMessage = this.optino.strike == null || (/^[+-]?\d+\.?(\d+)?$/.test(this.optino.strike) && parseFloat(this.optino.strike) > 0) ? null : "Enter a valid strike";
        // this.optino.strike != null && parseFloat(this.optino.strike) == 0 && parseFloat(this.optino.strike) != 0 ? "Enter a valid strike" : null;
        // logInfo("optinoExplorer", "recalculate - optino.strikeMessage: " + this.optino.strikeMessage);

        if (this.optino.optionType == 'cc') {
          logInfo("optinoExplorer", "recalculate - parseFloat(" + this.optino.cap + "): " + parseFloat(this.optino.cap));
          this.optino.capMessage = this.optino.cap == null || (/^[+-]?\d+\.?(\d+)?$/.test(this.optino.cap) && parseFloat(this.optino.cap) > parseFloat(this.optino.strike)) ? null : "Cap must be > strike";
        } else {
          this.optino.capMessage = null;
        }
        // logInfo("optinoExplorer", "recalculate - optino.capMessage: " + this.optino.capMessage);

        if (this.optino.optionType == 'fp') {
          logInfo("optinoExplorer", "recalculate - parseFloat(" + this.optino.floor + "): " + parseFloat(this.optino.floor));
          this.optino.floorMessage = this.optino.floor == null || (/^[+-]?\d+\.?(\d+)?$/.test(this.optino.floor) && parseFloat(this.optino.floor) < parseFloat(this.optino.strike)) ? null : "Floor must be < strike";
        } else {
          this.optino.floorMessage = null;
        }
        // logInfo("optinoExplorer", "recalculate - optino.floorMessage: " + this.optino.floorMessage);

        if (this.optino.strikeMessage != null || this.optino.capMessage != null || this.optino.floorMessage != null) {
          ok = false;
        }

        this.optino.expiryMessage = moment.utc(this.optino.expiryDate + " " + this.optino.expiryTime).valueOf() > moment() ? null : "Expired";
        // logInfo("optinoExplorer", "recalculate - optino.expiryMessage: " + this.optino.expiryMessage);
      }

      if (ok) {
        try {

          if (parseFloat(this.optino.strike) > 0) {
            // logInfo("optinoExplorer", "this.optino.calculatedSpot: " + this.optino.calculatedSpot);
            // logInfo("optinoExplorer", "this.optino.strike: " + this.optino.strike);
            // logInfo("optinoExplorer", "this.optino.floor: " + this.optino.floor);
            // logInfo("optinoExplorer", "this.optino.cap: " + this.optino.cap);
            var maxRate = parseFloat(this.optino.calculateSpot) >= parseFloat(this.optino.strike) ? this.optino.calculateSpot : this.optino.strike;
            if (callPut == 0) {
              if (this.optino.optionType == 'cc') {
                maxRate = parseFloat(this.optino.cap) >= parseFloat(maxRate) ? this.optino.cap : maxRate;
              }
            } else {
              if (this.optino.optionType == 'fp') {
                maxRate = parseFloat(this.optino.floor) >= parseFloat(maxRate) ? this.optino.floor : maxRate;
              }
            }
            // logInfo("optinoExplorer", "maxRate: " + maxRate);
            var xMax = parseFloat(maxRate * (callPut == 0 ? 7 : 2)).toPrecision(2);
            // logInfo("optinoExplorer", "xMax: " + xMax);
            var steps = 100; // 100
            var xStep = parseFloat(parseFloat(xMax / steps).toPrecision(1));
            // logInfo("optinoExplorer", "xStep: " + xStep);
            xMax = parseFloat(xStep * steps).toPrecision(8);
            // logInfo("optinoExplorer", "xMax: " + xMax);
            this.optino.spotFrom = 0;
            this.optino.spotTo = xMax;
            var spots = [];
            var spotSeen = {};
            // spots.push(new BigNumber(this.optino.calculatedSpot).shift(feedDecimals0).toString());
            // spots.push(new BigNumber(this.optino.strike).shift(feedDecimals0).toString());
            for (var x = new BigNumber("0"); x.lte(new BigNumber(xMax).shift(feedDecimals0)); x = x.add(new BigNumber(xStep).shift(feedDecimals0))) {
              // logInfo("optinoExplorer", "recalculate - spots.push: " + x);
              var s = x.toString();
              spots.push(s);
              spotSeen[s] = 1;
              // spots.push(new BigNumber(x).shift(feedDecimals0).toString());
            }
            // logInfo("optinoExplorer", "recalculate - spots:" + JSON.stringify(spots));
            var sSpot = new BigNumber(this.optino.calculatedSpot).shift(feedDecimals0).toString();
            if (!spotSeen[sSpot]) {
              spots.push(sSpot);
              spotSeen[sSpot] = 1;
            }

            var sStrike = new BigNumber(this.optino.strike).shift(feedDecimals0).toString();
            if (!spotSeen[sStrike]) {
              spots.push(sStrike);
              spotSeen[sStrike] = 1;
            }

            var bound = "0";
            if (this.optino.optionType == 'cc') {
              bound = this.optino.cap;
            } else if (this.optino.optionType == 'fp') {
              bound = this.optino.floor;
            }

            if (bound > 0) {
              var sBound = new BigNumber(bound).shift(feedDecimals0).toString();
              if (!spotSeen[sBound]) {
                spots.push(sBound);
                spotSeen[sBound] = 1;
              }
            }

            spots.sort(function(a,b) { return a - b; });


            var OPTINODECIMALS = 18;
            var _calcPayoff = promisify(cb => factory.calcPayoffs([this.optino.token0, this.optino.token1], [this.optino.feed0, this.optino.feed1],
              [this.optino.type0, this.optino.type1, this.optino.decimals0, this.optino.decimals1, this.optino.inverse0, this.optino.inverse1],
              [callPut, parseInt(/*this.optino.expiryInMillis*/ new Date() / 1000), new BigNumber(this.optino.strike).shift(feedDecimals0), new BigNumber(bound).shift(feedDecimals0), new BigNumber(this.optino.tokens).shift(OPTINODECIMALS)], spots, cb));

            var calcPayoff = await _calcPayoff;
            // logInfo("optinoExplorer", "recalculate - calcPayoff: " + JSON.stringify(calcPayoff));
            this.optino.collateralToken = calcPayoff[0];
            this.optino.nonCollateralToken = callPut == 0 ? this.optino.token1 : this.optino.token0;
            var collateralDecimals = parseInt(calcPayoff[1][2]);
            this.optino.collateralDecimals = calcPayoff[1][2].toString();
            var collateralTokens = calcPayoff[1][0];
            this.optino.collateralTokens = new BigNumber(calcPayoff[1][0]).shift(-this.optino.collateralDecimals).toString();
            this.optino.collateralFee = new BigNumber(calcPayoff[1][1]).shift(-this.optino.collateralDecimals).toString();
            this.optino.collateralTokensPlusFee = new BigNumber(calcPayoff[1][0]).add(calcPayoff[1][1]).shift(-this.optino.collateralDecimals).toString();
            this.optino.feedDecimals0 = parseInt(calcPayoff[1][3]);
            this.optino.currentSpot = new BigNumber(calcPayoff[1][4]).shift(-this.optino.feedDecimals0).toString();
            this.optino.currentPayoff = new BigNumber(calcPayoff[1][5]).shift(-this.optino.collateralDecimals).toString();
            this.optino.currentCoverPayoff = new BigNumber(calcPayoff[1][0]).sub(new BigNumber(calcPayoff[1][5])).shift(-this.optino.collateralDecimals).toString();
            // logInfo("optinoExplorer", "recalculate - optino " + JSON.stringify(this.optino));

            var payoffSeries = [];
            var coverPayoffSeries = [];
            var collateralSeries = [];
            var payoffsInNonDeliveryTokenSeries = [];
            var payoffTable = [];

            var payoffs = calcPayoff[2];
            // logInfo("optinoExplorer", "recalculate - debug1");
            for (var i = 0; i < spots.length; i++) {
              // logInfo("optinoExplorer", "recalculate - debug2");
              var spot = new BigNumber(spots[i]).shift(-feedDecimals0);
              // logInfo("optinoExplorer", "recalculate - debug3");
              var payoff = payoffs[i].shift(-collateralDecimals);
              // logInfo("optinoExplorer", "recalculate - debug4");
              var coverPayoff = collateralTokens.minus(payoffs[i]).shift(-collateralDecimals);
              // logInfo("optinoExplorer", "recalculate - debug5");
              var payoffInNonDeliveryToken;
              if (callPut == 0) {
                // logInfo("optinoExplorer", "recalculate - debug6c");
                payoffInNonDeliveryToken = new BigNumber(payoff).mul(spot);
              } else {
                // logInfo("optinoExplorer", "recalculate - debug6p");
                payoffInNonDeliveryToken = spot == 0 ? null : parseFloat(payoff) / parseFloat(spot);
              }
              payoffSeries.push({ x: parseFloat(spot.toString()), y: parseFloat(payoff.toString()) });
              coverPayoffSeries.push({ x: parseFloat(spot.toString()), y: parseFloat(coverPayoff.toString()) });
              collateralSeries.push({ x: parseFloat(spot.toString()), y: parseFloat(collateralTokens.shift(-collateralDecimals).toString()) });
              payoffsInNonDeliveryTokenSeries.push({ x: parseFloat(spot.toString()), y: payoffInNonDeliveryToken == null ? null : parseFloat(payoffInNonDeliveryToken.toString()) });
              payoffTable.push({
                spot: parseFloat(spot.toString()),
                payoff: parseFloat(payoff.toString()).toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 9}),
                coverPayoff: parseFloat(coverPayoff.toString()).toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 9}),
                collateral: parseFloat(collateralTokens.shift(-collateralDecimals).toString()).toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 9}),
                payoffInNonCollateral: payoffInNonDeliveryToken == null ? null : parseFloat(payoffInNonDeliveryToken.toString()).toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 9}) });
              // logInfo("optinoExplorer", "recalculate - spot: " + spot + ", payoff: " + payoff + ", coverPayoff: " + coverPayoff + "; collateralTokens: " + collateralTokens + "; payoffInNonDeliveryToken: " + payoffInNonDeliveryToken);
            }
            this.optino.payoffTable = payoffTable;

            this.optino.chartSeries = [{
              name: 'Optino Payoff',
              type: 'line',
              data: payoffSeries,
            }, {
              name: 'Cover Payoff',
              type: 'line',
              data: coverPayoffSeries,
            }, {
              name: 'Collateral',
              type: 'line',
              data: collateralSeries,
            }, {
              name: 'Equivalent Optino Payoff in ' + this.tokenSymbol(this.optino.nonCollateralToken),
              type: 'line',
              data: payoffsInNonDeliveryTokenSeries,
            }];
            // logInfo("optinoExplorer", "this.optino.chartSeries: " + JSON.stringify(this.optino.chartSeries));

            // logInfo("optinoExplorer", "payoffSeries: " + JSON.stringify(payoffSeries));
            // logInfo("optinoExplorer", "coverPayoffSeries: " + JSON.stringify(coverPayoffSeries));
            // logInfo("optinoExplorer", "collateralSeries: " + JSON.stringify(collateralSeries));
            // logInfo("optinoExplorer", "payoffsInNonDeliveryTokenSeries: " + JSON.stringify(payoffsInNonDeliveryTokenSeries));

            // logInfo("optinoExplorer", "collateralTokenNew " + this.collateralTokenNew);
            // logInfo("optinoExplorer", "collateralTokens " + this.collateralTokens);
            // logInfo("optinoExplorer", "collateralFee " + this.collateralFee);
            // logInfo("optinoExplorer", "collateralDecimalsNew " + this.collateralDecimalsNew);
            // logInfo("optinoExplorer", "feedDecimals0 " + this.feedDecimals0);
            // logInfo("optinoExplorer", "_currentSpot " + this.currentSpot);
            // logInfo("optinoExplorer", "_currentPayoff " + this.currentPayoff);
            // logInfo("optinoExplorer", "spots " + JSON.stringify(shiftBigNumberArray(spots, -feedDecimals0)));
            // logInfo("optinoExplorer", "calcPayoffs: " + JSON.stringify(shiftBigNumberArray(this.payoffs, -this.collateralDecimalsNew)));
          }
        } catch (e) {
        }
      }
    },
    setCollateralAllowance(event) {
      logDebug("optinoExplorer", "setCollateralAllowance()");
      this.$bvModal.msgBoxConfirm('Set collateral allowance ' + this.optino.collateralAllowance + ' ?', {
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
            var factoryAddress = store.getters['optinoFactory/address']
            var tokenContract = web3.eth.contract(ERC20ABI).at(this.optino.collateralToken);
            logInfo("optinoExplorer", "setCollateralAllowance tokenContract.approve('" + factoryAddress + "', '" + this.optino.collateralAllowance + "')");
            // TODO need to use baseDecimals/quoteDecimals
            var value = new BigNumber(this.optino.collateralAllowance).shift(this.optino.collateralDecimals).toString();
            logInfo("optinoExplorer", "  value=" + value);
            tokenContract.approve(factoryAddress, value, { from: store.getters['connection/coinbase'] }, function(error, tx) {
              if (!error) {
                logInfo("optinoExplorer", "setCollateralAllowance() tokenContract.approve() tx: " + tx);
                store.dispatch('connection/addTx', tx);
              } else {
                logInfo("optinoExplorer", "setCollateralAllowance() tokenContract.approve() error: ");
                console.table(error);
                store.dispatch('connection/setTxError', error.message);
              }
            });

            event.preventDefault();
          }
        })
        .catch(err => {
          // An error occurred
        });
    },
    mintOptinos(event) {
      logDebug("optinoExplorer", "mintOptinos()");
      this.$bvModal.msgBoxConfirm('Mint ' + this.optino.tokens + ' optinos?', {
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
            logInfo("optinoExplorer", "mintOptinos(" + this.optino.tokens + ")");
            var factoryAddress = store.getters['optinoFactory/address']
            var factory = web3.eth.contract(OPTINOFACTORYABI).at(factoryAddress);

            var callPut = this.optino.optionType == 'vc' || this.optino.optionType == 'cc' ? 0 : 1;
            var bound = "0";
            if (this.optino.optionType == 'cc') {
              bound = this.optino.cap;
            } else if (this.optino.optionType == 'fp') {
              bound = this.optino.floor;
            }

            var OPTINODECIMALS = 18;
            var data = factory.mint.getData([this.optino.token0, this.optino.token1], [this.optino.feed0, this.optino.feed1],
              [this.optino.type0, this.optino.type1, this.optino.decimals0, this.optino.decimals1, this.optino.inverse0, this.optino.inverse1],
              [callPut, this.expiry, new BigNumber(this.optino.strike).shift(this.optino.feedDecimals0), new BigNumber(bound).shift(this.optino.feedDecimals0), new BigNumber(this.optino.tokens).shift(OPTINODECIMALS)], ADDRESS0);
            logInfo("optinoExplorer", "data=" + data);

            factory.mint([this.optino.token0, this.optino.token1], [this.optino.feed0, this.optino.feed1],
              [this.optino.type0, this.optino.type1, this.optino.decimals0, this.optino.decimals1, this.optino.inverse0, this.optino.inverse1],
              [callPut, this.expiry, new BigNumber(this.optino.strike).shift(this.optino.feedDecimals0), new BigNumber(bound).shift(this.optino.feedDecimals0), new BigNumber(this.optino.tokens).shift(OPTINODECIMALS)], ADDRESS0, { from: store.getters['connection/coinbase'] }, function(error, tx) {
              logInfo("optinoExplorer", "mintOptinos DEBUG1");
              if (!error) {
                logInfo("optinoExplorer", "mintOptinos() factory.mintOptino() tx: " + tx);
                store.dispatch('connection/addTx', tx);
              } else {
                logInfo("optinoExplorer", "mintOptinos() factory.mintOptino() error: ");
                console.table(error);
                store.dispatch('connection/setTxError', error.message);
              }
            });

            event.preventDefault();
          }
        })
        .catch(err => {
          // An error occurred
        });
    },
    setSeriesSpot(series) {
      logInfo("optinoExplorer", "setSeriesSpot(" + series.seriesKey + ")?");
      this.$bvModal.msgBoxConfirm('Set spot for series ' + series.index + '?', {
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
            logInfo("optinoExplorer", "setSeriesSpot(" + series.seriesKey + ")");
            var factoryAddress = store.getters['optinoFactory/address']
            var factory = web3.eth.contract(OPTINOFACTORYABI).at(factoryAddress);

            factory.setSeriesSpot(series.seriesKey, { from: store.getters['connection/coinbase'] }, function(error, tx) {
              if (!error) {
                logInfo("optinoExplorer", "setSeriesSpot() factory.setSeriesSpot() tx: " + tx);
                store.dispatch('connection/addTx', tx);
              } else {
                logInfo("optinoExplorer", "setSeriesSpot() factory.setSeriesSpot() error: ");
                console.table(error);
                store.dispatch('connection/setTxError', error.message);
              }
            });

            event.preventDefault();
          }
        })
        .catch(err => {
          // An error occurred
        });
    },
  },
};

const optinoExplorerModule = {
  namespaced: true,
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
};
