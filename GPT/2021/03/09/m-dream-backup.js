function spotxOutstreamFunc(bid) {
    function mobileAndTabletcheck() {
        var check = false;
        (function (a) {
            if (
                /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(
                    a
                ) ||
                /1207|6310|6590|3gso|4thp|50[1 6]i|770s|802s|a wa|abac|ac(er|oo|s\ )|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\ m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\ (n|u)|c55\/|capi|ccwa|cdm\ |cell|chtm|cldc|cmd\ |co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\ s|devi|dica|dmob|do(c|p)o|ds(12|\ d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4 7]0|os|wa|ze)|fetc|fly(\ |_)|g1 u|g560|gene|gf\ 5|g\ mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\ (m|p|t)|hei\ |hi(pt|ta)|hp( i|ip)|hs\ c|ht(c(\ | |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\ (20|go|ma)|i230|iac( |\ |\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\ |kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\ [a w])|libw|lynx|m1\ w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\ cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\ | |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0 2]|n20[2 3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\ |on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\ ([1 8]|c))|phil|pire|pl(ay|uc)|pn\ 2|po(ck|rt|se)|prox|psio|pt\ g|qa\ a|qc(07|12|21|32|60|\ [2 7]|i\ )|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\ |oo|p\ )|sdk\/|se(c(\ |0|1)|47|mc|nd|ri)|sgh\ |shar|sie(\ |m)|sk\ 0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\ |v\ |v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\ |tdg\ |tel(i|m)|tim\ |t\ mo|to(pl|sh)|ts(70|m\ |m3|m5)|tx\ 9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0 3]|\ v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\ | )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\ |your|zeto|zte\ /i.test(
                    a.substr(0, 4)
                )
            )
                check = true;
        })(navigator.userAgent || navigator.vendor || window.opera);
        return check;
    }
    var bMobile = mobileAndTabletcheck();
    if (bMobile) {
        var playerWidth = 300;
        var playerHeight = 169;
    } else {
        var playerWidth = 640;
        var playerHeight = 360;
    }

    const videoDiv = bid.adUnitCode;
    window.console.log("[SPOTX][renderer] Handle SpotX custom outstream renderer");
    let script = window.document.createElement("script");
    script.type = "text/javascript";
    script.src = "//cdn.spotxcdn.com/website/integration_test/media/asia/EASI.js";
    script.setAttribute("data-spotx_channel_id", "" + bid.channel_id);
    script.setAttribute("data-spotx_vast_url", "" + bid.vastUrl);
    script.setAttribute("data-spotx_content_width", playerWidth);
    script.setAttribute("data-spotx_content_height", playerHeight);
    script.setAttribute("data-spotx_content_page_url", bid.renderer.config.content_page_url);
    script.setAttribute("data-spotx_ad_unit", "incontent");
    script.setAttribute("data-spotx_autoplay", "1");
    script.setAttribute("data-spotx_continue_out_of_view", "1");
    script.setAttribute("data-spotx_content_container_id", videoDiv);
    var vid_contain = window.document.getElementById(videoDiv);
    vid_contain.style.cssText = "display: none; margin-bottom: 20px";
    vid_contain.appendChild(script);
}

const priceGranularityConfig = {
    buckets: [
        {
            precision: 2,
            min: 0.2,
            max: 2.99,
            increment: 0.01,
        },
        {
            precision: 2,
            min: 3.0,
            max: 5.95,
            increment: 0.05,
        },
        {
            precision: 2,
            min: 6.0,
            max: 20.0,
            increment: 0.5,
        },
    ],
};

var gptadslots = [];
var googletag = googletag || {};
googletag.cmd = googletag.cmd || [];
var pbjs = pbjs || {};
pbjs.que = pbjs.que || [];

var PREBID_TIMEOUT = 1500;
var FAILSAFE_TIMEOUT = 3000;
var HB_TIMEOUT = 1000;
var adUnits = [
    {
        code: "div-gpt-ad-dream-sc",
        mediaTypes: {
            banner: {
                sizes: [[300, 250]],
            },
            video: {
                playerSize: [300, 250], // Not set so that the player can be repsonsive
                context: "outstream",
            },
            video: {
                playerSize: [300, 250], // Not set so that the player can be repsonsive
                context: "instream",
            },
        },
        bids: [
            { bidder: "emx_digital", params: { tagid: "113619" } },
            { bidder: "innity", params: { zone: 62256 , pub : 536} },
            { bidder: "oftmedia", params: { placementId: "18777744" } },
            { bidder: "teads", params: { pageId: 111235 , placementId: 120940 } },
            { bidder: "rtbhouse", params: { publisherId: "bI2sp5Pt1ubwkv6C9Hs5", region: "prebid-asia" } },
            {
                bidder: "spotx",
                params: {
                    channel_id: 285432,
                    ad_unit: "outstream",
                    outstream_function: spotxOutstreamFunc,
                },
            },
            {
                bidder: 'pubmatic',
                params: {
                    publisherId: '156536',
                    adSlot: 'Prebid-Dream-Mobile-300x250_1',
                    video: {
                        mimes: ['video/mp4','video/x-flv'],
                        skippable: true,
                        minduration: 5,
                        maxduration: 30,
                        startdelay: 5,
                        playbackmethod: [1,3],
                        api: [ 1, 2 ],
                        protocols: [ 2, 3 ],
                        battr: [ 13, 14 ],
                        linearity: 1,
                        placement: 2,
                        minbitrate: 10,
                        maxbitrate: 10
                    }
                }
            }
        ],
    },
    {
        code: "div-gpt-ad-dream-hl",
        mediaTypes: {
            banner: {
                sizes: [
                    [320, 50],
                    [320, 100],
                ],
            },
            video: {
                playerSize: [320, 100], // Not set so that the player can be repsonsive
                context: "outstream",
            },
            video: {
                playerSize: [320, 100], // Not set so that the player can be repsonsive
                context: "instream",
            },
        },
        bids: [
            { bidder: "emx_digital", params: { tagid: "113619" } },
            { bidder: "innity", params: { zone: 62255 , pub : 536} },
            { bidder: "oftmedia", params: { placementId: "18777744" } },
            { bidder: "rtbhouse", params: { publisherId: "bI2sp5Pt1ubwkv6C9Hs5", region: "prebid-asia" } },
            {
                bidder: "spotx",
                params: {
                    channel_id: 285432,
                    ad_unit: "outstream",
                    outstream_function: spotxOutstreamFunc,
                },
            },
            {
                bidder: 'pubmatic',
                params: {
                    publisherId: '156536',
                    adSlot: 'Prebid-Dream-Mobile-320x100_1',
                    video: {
                        mimes: ['video/mp4','video/x-flv'],
                        skippable: true,
                        minduration: 5,
                        maxduration: 30,
                        startdelay: 5,
                        playbackmethod: [1,3],
                        api: [ 1, 2 ],
                        protocols: [ 2, 3 ],
                        battr: [ 13, 14 ],
                        linearity: 1,
                        placement: 2,
                        minbitrate: 10,
                        maxbitrate: 10
                    }
                }
            }
        ],
    },
    {
        code: "div-gpt-ad-dream-bottomfrm",
        mediaTypes: {
            banner: {
                sizes: [
                    [320, 50],
                    [320, 100],
                ],
            },
            video: {
                playerSize: [320, 100], // Not set so that the player can be repsonsive
                context: "outstream",
            },
            video: {
                playerSize: [320, 100], // Not set so that the player can be repsonsive
                context: "instream",
            },
        },
        bids: [
            { bidder: "emx_digital", params: { tagid: "113619" } },
            { bidder: "innity", params: { zone: 62255 , pub : 536} },
            { bidder: "oftmedia", params: { placementId: "18777744" } },
            { bidder: "rtbhouse", params: { publisherId: "bI2sp5Pt1ubwkv6C9Hs5", region: "prebid-asia" } },
            {
                bidder: "spotx",
                params: {
                    channel_id: 285432,
                    ad_unit: "outstream",
                    outstream_function: spotxOutstreamFunc,
                },
            },
            {
                bidder: 'pubmatic',
                params: {
                    publisherId: '156536',
                    adSlot: 'Prebid-Dream-Mobile-320x50_1',
                    video: {
                        mimes: ['video/mp4','video/x-flv'],
                        skippable: true,
                        minduration: 5,
                        maxduration: 30,
                        startdelay: 5,
                        playbackmethod: [1,3],
                        api: [ 1, 2 ],
                        protocols: [ 2, 3 ],
                        battr: [ 13, 14 ],
                        linearity: 1,
                        placement: 2,
                        minbitrate: 10,
                        maxbitrate: 10
                    }
                }
            }
        ],
    },
    {
        code: "div-gpt-ad-dream-dfp-exposer-slot1",
        mediaTypes: {
            banner: {
                sizes: [
                    [300, 250],
                    [300, 600],
                    [320, 480],
                    [160, 600],
                    [250, 250],
                ],
            },
            video: {
                playerSize: [300, 600], // Not set so that the player can be repsonsive
                context: "outstream",
            },
            video: {
                playerSize: [300, 600], // Not set so that the player can be repsonsive
                context: "instream",
            },
        },
        bids: [
            { bidder: "emx_digital", params: { tagid: "113619" } },
            { bidder: "innity", params: { zone: 62256 , pub : 536} },
            { bidder: "oftmedia", params: { placementId: "18777744" } },
            { bidder: "teads", params: { pageId: 111235 , placementId: 120940 } },
            { bidder: "rtbhouse", params: { publisherId: "bI2sp5Pt1ubwkv6C9Hs5", region: "prebid-asia" } },
            {
                bidder: "spotx",
                params: {
                    channel_id: 285432,
                    ad_unit: "outstream",
                    outstream_function: spotxOutstreamFunc,
                },
            },
            {
                bidder: 'pubmatic',
                params: {
                    publisherId: '156536',
                    adSlot: 'Prebid-Dream-Mobile-300x600',
                    video: {
                        mimes: ['video/mp4','video/x-flv'],
                        skippable: true,
                        minduration: 5,
                        maxduration: 30,
                        startdelay: 5,
                        playbackmethod: [1,3],
                        api: [ 1, 2 ],
                        protocols: [ 2, 3 ],
                        battr: [ 13, 14 ],
                        linearity: 1,
                        placement: 2,
                        minbitrate: 10,
                        maxbitrate: 10
                    }
                }
            }
        ],
    },
];

googletag.cmd.push(function () {
    googletag.pubads().disableInitialLoad();
});

pbjs.que.push(() => {
    pbjs.setConfig({
        enableSendAllBids:true
        // bidderTimeout: 2000,

    });
    pbjs.addAdUnits(adUnits);
    pbjs.setConfig({
        priceGranularity: priceGranularityConfig,
    });
    pbjs.requestBids({
        bidsBackHandler: initAdserver,
        timeout: PREBID_TIMEOUT,
    });
});

function initAdserver() {
    if (pbjs.initAdserverSet) return;
    pbjs.initAdserverSet = true;
    googletag.cmd.push(function () {
        pbjs.que.push(function () {
            pbjs.setTargetingForGPTAsync();
            googletag.pubads().refresh();
        });
    });
}

setTimeout(function () {
    initAdserver();
}, FAILSAFE_TIMEOUT);

var gpt_gam_ver = 'V-09 DK';
gpt_gam_site = window.location.hostname.toUpperCase();
gpt_gam_ver = (typeof gpt_gam_site !== 'undefined') ? gpt_gam_ver.toUpperCase() : 'V.0.1';
console.log('%c GPT '+gpt_gam_site+' '+gpt_gam_ver ,'color:#d3d3d3; font-size:25px; font-weight: bold; -webkit-text-stroke: 1px black;');
/*PROTOTYPE CUSTOM FILTERING*/
    String.prototype.klyFiltering = function(delimiter) {
        return this.replace(/[\"\']/g, "").trim().split(delimiter).map(function(t) {
            return t.trim().toLowerCase()
        }).filter(function(x) {
            return x != "";
        });
    };
/*SET INTERVAL TO AUTO REFRESH BOTTOM FRAME ADS - NEW*/
    window.dataLayer = window.dataLayer || [];
    window.GAMLibrary = {};
    window.GAMLibrary = {
        dfpHeadline         : '/36504930/m.dream.co.id/dfp-hl',
        dfpBottomframe      : '/36504930/m.dream.co.id/dfp-bottomfrm',
        dfpTopframe         : '/36504930/m.dream.co.id/dfp-topfrm',
        dfpSlideup          : '/36504930/m.dream.co.id/dfp-slideup',
        dfpExposer1         : '/36504930/m.dream.co.id/dfp-exposer-slot1',
        dfpExposer2         : '/36504930/m.dream.co.id/dfp-exposer-slot2',
        scSlot              : '/36504930/m.dream.co.id/dfp-sc',
        timedBottomFrm      :   null,
        setGamBFInterval    :   function(active) {
                                    if (!active) {
                                        clearInterval(window.GAMLibrary.gamBFInterval);
                                        return;
                                    }
                                    window.GAMLibrary.gamBFInterval = setInterval(function() {
                                        document.querySelector("#dfp-spinads") && document.querySelector("#dfp-spinads").parentElement.remove();
                                        googletag.pubads().refresh([window.GAMLibrary.refreshSlot]);
                                    }, 60000);
                                },
        documentMeta        :   function (metaName) {
                                    var metaResult = '';
                                    var metas = document.getElementsByTagName('meta');
                                    if (metas) {
                                        for (var x = 0, y = metas.length; x < y; x++) {
                                            if (metas[x].name.toLowerCase() == metaName) {
                                                metaResult += metas[x].content;
                                            }
                                        }
                                    }                   
                                    return metaResult != '' ? metaResult : '';
                                },
        inArray             :   function (needle, haystack) {
                                    var length = haystack.length;
                                    for (var i = 0; i < length; i++) {
                                        if (haystack[i] == needle) return true;
                                    }
                                    return false;
                                },
        arrToLowerCase      :   function (arr){
                                    return arr.map(function(v,i){
                                        return v.toLowerCase();
                                    });
                                },
            lockScroll          :   {
                                    timeout: 3000,
                                    unset: function() {
                                        (typeof unfreezePages === 'function') ? unfreezePages() : '';
                                    },
                                    set: function() {
                                      let that = this;
                                      let lockTime = new Date().getTime();
                                      let startLoad = kly && kly.startLoad ? kly.startLoad : 0;
                                      let diff = lockTime - startLoad;
                                      let lockTimeStamp = Math.floor(diff / 1000 % 60);
                                      this.eventTrackingLock(lockTimeStamp);
                                      console.log('Scroll Freeze duration : '+lockTimeStamp);
                                      setTimeout(function() {
                                        that.unset();
                                      }, that.timeout);
                                    },
                                    eventTrackingLock		: 	function(lockDuration){
                                        window.dataLayer.push({
                                          event: "impression",
                                          feature_name: "load-scroll",
                                          feature_location: lockDuration,
                                          feature_position: "" 
                                        });
                                    }
                                  },
        scrollBottomFrame   :   function() {
                                    this.scroll = function(){                        
                                                        var scrollNode = document.scrollingElement || document.documentElement;
                                                        var scrollTop = scrollNode.scrollTop;
                                                        if (scrollTop >= "200") {
                                                            //window.removeEventListener("scroll", scrollBottomFrame);
                                                            this.timedBottomFrm = googletag.defineSlot(this.dfpBottomframe, [[320, 50],[320, 100]], 'div-gpt-ad-dream-bottomfrm').addService(googletag.pubads());
                                                            window.removeEventListener("scroll", this.scrollHandler);
                                                            googletag.pubads().refresh([this.timedBottomFrm]);

                                                            this.refreshSlot = this.timedBottomFrm;
                                                            this.setGamBFInterval();
                                                        }
                                                    };
                                    this.scrollHandler = this.scroll.bind(this);
                                    window.addEventListener("scroll", this.scrollHandler);   
                                },
        initiateSCReadPage  :   function() {
                                            var scContainer = '.paging-showcase',
                                                parentElement = document.querySelector('.detail'),
                                                arrShowcaseContainer = document.querySelectorAll(scContainer),
                                                sumShowcaseContainer = document.querySelectorAll(scContainer).length;
                                                showcaseId = 'div-gpt-ads-dream-showcase-',
                                                gam_sc = null,
                                                countShowcaseContainer = 0,
                                                mo = null;
                                
                                            arrShowcaseContainer.forEach(function(value, key) {
                                                value.setAttribute('id', showcaseId + (key + 1));
                                            });
                                
                                            mo = new MutationObserver(function(mutations) {
                                                mutations.forEach(function(el) {
                                                    var target = el.target,
                                                        isShown = target.getAttribute('data-pushed');
                                
                                                    if (isShown && el.attributeName === 'data-pushed') {
                                                        countShowcaseContainer++;
                                
                                                        gam_sc = googletag.defineSlot('/36504930/m.dream.co.id/dfp-sc', [[300, 250],[250, 250],[200, 200]], showcaseId + countShowcaseContainer).addService(googletag.pubads()).setTargeting("position", [countShowcaseContainer.toString()]);
                                                        googletag.display(showcaseId + countShowcaseContainer);
                                                        googletag.pubads().refresh([gam_sc]);
                                                        if (countShowcaseContainer === sumShowcaseContainer) {
                                                            mo.disconnect();
                                                        }
                                                    }
                                                });
                                            });
                                
                                            parentElement && mo.observe(parentElement, {
                                                childList: true,
                                                attributes: true,
                                                subtree: true,
                                            });
                                
                                },
        eventTrackingImpression		: 	function(subCat,auPath){
                                            window.dataLayer.push({
                                                    event: "impression",
                                                    feature_name: "ads",
                                                    feature_location: subCat,
                                                    feature_position: auPath 
                                            });
                                        }
    
    }

	/* DMP CATEGORY LIST */
window.widgetBLV02 = true;
window.createDMPTracker = function(adsCatList, dfpTracker, macro) {
    var catList = ["fashion-events", "movie-event", "beauty-events", "comedy-events", "fan-conventions", "lifestyle-events", "musical-events", "sporting-events", "auto-shows", "parenting-events", "political-event", "parenting-children-aged-4-11", "special-needs-kids", "apartments", "life-insurance", "motor-insurance", "health-insurance", "education-insurance", "travel-insurance", "home-insurance", "automotive", "auto-racing", "parenting-babies-and-toddlers", "beauty", "disasters", "local-news", "law", "international-news", "crime", "national-news", "elections", "politics", "government-business", "business-and-finance", "cloud-computing", "content-channel", "education", "outdoor-decorating", "consumer-electronics", "esports", "events", "family-and-relationships", "kids-fashion", "mens-fashion", "womens-fashion", "fitness-and-exercise", "fmcg-food-and-drink", "fmcg-personal-care", "fmcg-tobacco", "console-games", "pc-games-and-mobile", "gaming", "computer-peripherals", "hatchback", "health", "healthy-and-wellness", "hobbies-interest", "home-and-garden", "homeschooling", "hotels-and-motels", "pharmaceutical-industry", "financial-industry", "entertainment-industry", "healthcare-industry", "construction-industry", "legal-services-industry", "power-and-energy-industry", "logistics-and-transportation-industry", "food-industry", "manufacturing-industry", "media-industry", "mechanical-and-industrial-engineering-industry", "automotive-industry", "education-industry", "aviation-industry", "hospitality-industry", "advertising-industry", "agriculture", "real-estate-industry", "retail-industry", "technology-industry", "telecommunications-industry", "interior-decorating", "internet", "internet-safety", "residentials-buy-sell-and-rentals", "auto-buying-and-selling", "credit-cards", "household-supplies", "injuries", "pregnancy", "childrens-health", "adults-health", "mental-health", "reproductive-health", "computing", "bollywood-content", "dangdut-content", "movie-content", "entertainment-content", "hijab-content", "hollywood-content", "korean-content", "quiz-content", "music-content", "coffee", "course-education", "green-vehicles", "frozen-foods", "fast-foods", "desserts-and-baking", "snacks", "healthy-cooking-and-eating", "make-up", "marketing-and-advertising", "soft-drinks", "smart-cars", "luxury-cars", "budget-cars", "performance-cars", "mobile-apps", "movies", "mpv", "news-and-politics", "nutrition", "non-profit-organizations", "business-expos-and-conferences", "parenting", "marketplace/ecommerce", "daycare-and-pre-school", "weight-loss", "early-childhood-education", "alternative-medicine", "chronic-disease", "ailment", "sports-equipment", "skin-care", "hair-care", "body-care", "facecare", "home-appliances", "personal-finance", "houses", "loans", "fmcg-oral-care", "fmcg-hair-care", "fmcg-body-care", "fmcg-face-care", "milk-products", "tickets-promo-and-vouchers", "property", "relationship", "parenting-teens", "auto-rentals", "sales-and-promotions", "primary-education", "online-education", "private-school", "soccer", "motorcycles", "auto-repair", "shopping-and-ecommerce", "smartphones", "social-networking", "computer-software-and-applications", "auto-parts", "sports", "startups", "style-and-fashion", "suv", "water-services", "gas-and-electric", "internet-service-providers", "phone-services", "technology-and-computing", "television", "physical-therapy", "train-tickets", "flight-tickets", "online-transportation", "travel", "budget-travel", "special-interest-tv", "childrens-tv", "animation-tv", "news-tv", "drama-tv", "comedy-tv", "music-tv", "sports-tv", "reality-tv", "college-education", "vaccines", "wearable-technology", "web-hosting", "family-travel", "culinary-travel", "religious-tourism"],
        filteredCat = Object.values(catList).filter((val, key) => adsCatList.find(alVal => alVal == val));
    window.createCDPTracker(filteredCat, macro);
    parent.window.open(dfpTracker, '_blank');
};

window.createCDPTracker = function(cat, macro) {
    var cName = 'liputan6_id_visitor_id=',
        cVisitorId = document.cookie.split(';').find(v => { return v.match(cName);}),
        partnerUID = cVisitorId ? decodeURIComponent(cVisitorId).trim().replace(cName, '') : 0,
        gamMacro = typeof macro === "string" ? JSON.parse(macro) : macro,
        defaultKey = {
            adunitId: "ads_adunit_id",
            advertiserId: "ads_advertiser_id",
            creativeId: "ads_creative_id",
            lineitemId: "ads_lineitem_id",
            orderId: "ads_order_id",
        };

    	actionDetails = Object.keys(gamMacro).reduce((obj, k) => Object.assign(obj, defaultKey[k] ? { [defaultKey[k]]: gamMacro[k] } : { [k]: gamMacro[k] }), {}),
        cdpData = {
            action: actionDetails.action ? actionDetails.action : 'ads_click',
            action_category: cat,
            action_details: actionDetails.action ? (delete actionDetails.action,actionDetails=actionDetails) : actionDetails,
            visitor_id: partnerUID
        };

    console.log("%c DATA CDP : ", "color:#cad315; font-size:12px; font-weight: bold; -webkit-text-stroke: 1px black;", cdpData);
    console.log("%c PARTNER USER ID : ", "color:#cad315; font-size:12px; font-weight: bold; -webkit-text-stroke: 1px black;", partnerUID);

    partnerUID ? window.VidioPersonalization.sendData(null, cdpData) : '';
};

    var isReadPage = kly.pageType === "ReadPage";

    googletag.cmd.push(function() {
        var urlPath = document.URL;
        var isMatcont = false;
        var blackListWords = new Array('matcont', 'aduhai', 'kelamin', 'vital', 'anal', 'belahan', 'bercinta', 'bergairah', 'gairah', 'intim', 'bikini', 'bokong', 'boob', 'bra', 'bugil', 'celana', 'ciuman', 'cleavage', 'dada', 'dewasa', 'diremas', 'doggie', 'ejakulasi', 'ereksi', 'erotis', 'foreplay', 'kiss', 'seks', 'gangbang', 'horny', 'hot', 'kamasutra', 'keperawanan', 'perawan', 'kondom', 'kontrasepsi', 'libido', 'lingerie', 'masturbasi', 'mature', 'menggairahkan', 'menggoda', 'mesra', 'miss-v', 'mr-p', 'nakal', 'naughty', 'nipple', 'nipples', 'onani', 'oral', 'oral seks', 'organ', 'orgasme', 'paha', 'pantat', 'panties', 'payudara', 'pelecehan', 'telanjang', 'penetrasi', 'penis', 'perkosa', 'perkosaan', 'pole', 'porno', 'pornoaksi', 'pornografi', 'telentang', 'provokatif', 'putting', 'ranjang', 'sex', 'penetratif', 'seksi', 'seksual', 'sensual', 'seronok', 'doll', 'toys', 'skandal', 'sperma', 'striptease', 'striptis', 'syur', 'terangsang', 'tiduri', 'topless', 'vagina', 'vibrator', 'lendir', 'prostitusi', 'homoseks', 'meraba-raba', 'mesum', 'memerkosa', 'rudapaksa', 'kemaluan', 'kasus asusila', 'pemerkosaan', 'hubungan seksual', 'hubungan intim', 'video porno', 'berita hoax', 'ternyata hoax', 'ahed tamimi', 'konflik palestina israel', 'konflik suriah', 'ujaran kebencian', 'g30s', 'kediktatoran arab saudi', 'konflik palestina-israel', 'fpi', 'penembakan', 'pelecehan seksual', 'tips seks', 'komunitas swinger', 'fenomena kelainan seksual', 'penyimpangan seks', 'posisi seks', 'obat kuat', 'bentuk payudara', 'implan payudara', 'chat firza-rizieq', 'anarkisme suporter sepakbola', 'bentrok suporter', 'pengeroyokan', 'penganiayaan', 'begal motor', 'kekerasan pada wartawan', 'pemerkosaan anak', 'pencabulan', 'bentrokan warga', 'bentrokan', 'kasus narkoba', 'akibat merokok', 'bahaya merokok', 'berhenti merokok', 'cara berhenti merokok', 'efek berhenti merokok', 'larangan merokok', 'tips berhenti merokok', 'rokok elektrik', 'pilpres 2019', 'koalisi pilpres 2019', 'koalisi prabowo', 'koalisi jokowi', 'prabowo-sandiaga', 'ratna sarumpaet', 'capres jokowi', 'capres prabowo', 'kebohongan ratna sarumpaet', 'prabowo subianto', 'jemaah ansharut daulah', 'aliran sesat', 'lia eden', 'kisah mualaf', 'penistaan agama', 'suporter tewas', 'gempa palu', 'gempa donggala', 'gempa sulawesi tengah', 'pembunuhan', 'tsunami palu', 'penemuan mayat', 'lion air jatuh di karawang', 'lion air jatuh', 'pembunuhan sadis', 'lion air hilang kontak', 'pesawat jatuh', 'pesawat hilang kontak', 'kecelakaan', 'kapal tenggelam di danau toba', 'kecelakaan bus', 'kapal tenggelam', 'kasus tabrak lari', 'bunuh diri', 'perselingkuhan', 'kisah perselingkuhan', 'razia pasangan mesum', 'seks bebas', 'gangguan jiwa', 'tes keperawanan', 'kontroversi hukuman mati', 'stres dan depresi', 'ahok gugat cerai veronica tan', 'Kanker', 'Impotensi', 'merokok', 'Perokok', 'Rokok', 'tembakau', 'Pelanggaran', 'Tablet', 'Overdosis', 'Jantung', 'Stroke', 'Cancer', 'Narkoba', 'Djarum', 'Ganja', 'BNN', 'Obesitas', 'Osteoporosis', 'Corona', 'Corona di indonesia', 'virus corona', 'virus-corona', 'covid-19', 'wabah corona', 'menewaskan', 'menewaskan orang', 'mengancam nyawa', 'meninggal', 'meninggal dunia', 'orang mati', 'orang tewas', 'pemakaman', 'petugas penyelamat', 'telah meninggal', 'terbunuh', 'tewas', 'tewaskan', 'tim penyelamat', 'wanita meninggal', 'autopsi', 'belasungkawa', 'bencana', 'bencana besar', 'bunuh orang', 'darurat bencana', 'dilaporkan tewas', 'dimakamkan', 'dipastikan tewas', 'ditemukan mati', 'ditemukan tewas', 'hilangnya nyawa', 'identitas korban', 'inalillahi', 'jasad korban', 'jasadnya', 'jenasah wanita', 'jenazah', 'jenazah pria', 'jenazah teridentifikasi', 'jasad', 'kehilangan hidupnya', 'kehilangan nyawa', 'kehilangan nyawanya', 'kematian', 'korban', 'korban jiwa', 'korban meninggal', 'korban tewas', 'mati', 'mayat', 'mayat korban', 'membunuh', 'membunuh istrinya', 'membunuh mereka', 'membunuh suaminya', 'menemui ajal', 'mengalami koma', 'menghembuskan nafas terakhir', 'menimbulkan korban', 'meninggal akibat sakit', 'menyebabkan kematian', 'meregang nyawa', 'meregggut nyawa', 'modar', 'nyawa hilang', 'nyawa melayang', 'penyebab kematian', 'tak bernyawa', 'tak sadarkan diri', 'terkapar', 'tidak bernyawa', 'tutup usia', 'wafat', 'kematian virus', 'kematian wabah', 'korban terinfeksi', 'virus menyerang', 'merenggut nyawa', 'pelayat', 'hilangkan nyawa', 'renggut nyawa', 'wabah', 'keadaan kritis', 'kehilangan darah', 'merenggut jiwa', 'telan nyawa', 'menelan nyawa', 'memakan nyawa', 'dinyatakan meninggal', 'nyawa tak tertolong', 'penyakit', 'sakit pernapasan', 'sesak', 'korona', 'corona', 'odp', 'pdp', 'virus', 'rumah sakit', 'Covid-19', 'virus korona', 'positif korona', 'COVID-19', 'terjangkit COVID-19', 'terinfeksi virus corona');
        /* POPULATE META DATA KEYWORDS */
        var dfp_pageTitle = kly.article && kly.article.title.klyFiltering(' ');
        var dfp_titles = (typeof dfp_pageTitle !== 'undefined' && dfp_pageTitle.length > 0 ) ? dfp_pageTitle: [];
        var dfp_pageKeywords = GAMLibrary.documentMeta("keywords");
        var dfp_keyword = dfp_pageKeywords.klyFiltering(",");
        /* POPULATE META DATA DESC */
        var dfp_pageDesc = GAMLibrary.documentMeta("description");
        var dfp_desc = dfp_pageDesc.klyFiltering(",");
        var tagForAds = (typeof window.kly !== 'undefined') ? kly.gtm.tag.klyFiltering("|") : [];
        var dfp_keywords = dfp_keyword.concat(dfp_titles, dfp_desc, tagForAds);

        /*MATURE CONTENT DEFINED VAR*/
        if (!blackListWords) {
            var blackListWords = new Array('matcont');
        }
        /*CONTENT FILTERING SCRIPT*/
        blackListWords = GAMLibrary.arrToLowerCase(blackListWords);
        dfp_keywords.forEach(function(sKeyword) {
            sKeyword = sKeyword.toLowerCase();
            tagForAds.push(sKeyword);
            if (GAMLibrary.inArray(sKeyword.trim(), blackListWords)) {
                isMatcont = true;
            }
        });

        /*DEFINE ALL SLOT*/
        googletag.defineSlot(GAMLibrary.dfpHeadline, [
            [320, 50],
            [320, 100]
        ], 'div-gpt-ad-dream-hl').addService(googletag.pubads());
        googletag.defineSlot(GAMLibrary.scSlot, [
          	[300, 250],
          	[250, 250],
          	[200, 200]
        ], 'div-gpt-ad-dream-sc').addService(googletag.pubads());
        googletag.defineSlot(GAMLibrary.dfpExposer1, [
            [300, 250],
            [300, 600],
            [320, 480],
          	[160, 600],
            [250, 250]
        ], 'div-gpt-ad-dream-dfp-exposer-slot1').addService(googletag.pubads());

        /*OUT OF PAGE SLOTS*/
        googletag.defineOutOfPageSlot(GAMLibrary.dfpTopframe, 'div-gpt-ad-dream-topfrm-oop').addService(googletag.pubads());
        googletag.defineOutOfPageSlot('/36504930/m.dream.co.id/dfp-newsTag1', 'div-gpt-ad-dream-newsTag1-oop').addService(googletag.pubads());
        googletag.defineOutOfPageSlot('/36504930/m.dream.co.id/dfp-newsTag2', 'div-gpt-ad-dream-newsTag2-oop').addService(googletag.pubads());
        googletag.defineOutOfPageSlot(GAMLibrary.dfpSlideup, 'div-gpt-ad-dfp-overlay-oop').addService(googletag.pubads());
        googletag.defineOutOfPageSlot(GAMLibrary.dfpExposer2, 'div-gpt-ad-dream-dfp-exposer-slot2').addService(googletag.pubads());

        if (isReadPage) {
            googletag.defineOutOfPageSlot('/36504930/m.dream.co.id/dfp-insertion', 'div-gpt-ad-dream-insertion-oop').addService(googletag.pubads());
        }

        /*Bottom Frame Scrolling*/
        GAMLibrary.scrollBottomFrame();
        /*Bottom Frame Scrolling*/

      	var _countAdUnit = 0,
        _slots = kly.pageType !== "ReadPage" ? [8,9] : [9,10,11],
        _send = false;
        googletag.pubads().addEventListener('slotResponseReceived', function(event) {
          	_countAdUnit++;
            var dfp_slotDelivered = event.slot.getResponseInformation() ? 'block' : 'none'; /* check wheter there is ads or not*/
            var dfp_slotAdUnitPath = event.slot.getSlotId().getAdUnitPath(); /* get adunit path */
            
            /*check if native ads creative was delivered*/
            if (dfp_slotDelivered == 'block') {
                /* tracking impression */
                
                ( "unik" === kly.gtm.subCategory ) ? GAMLibrary.eventTrackingImpression(kly.gtm.subCategory,dfp_slotAdUnitPath) : '' ;
                  
                if (dfp_slotAdUnitPath == GAMLibrary.dfpHeadline) {
                    var urlParams = new URLSearchParams(window.location.search);
                    var myParam = JSON.parse(urlParams.get('interval'));
                    headlineSticky(myParam);
                }
				if (dfp_slotAdUnitPath == GAMLibrary.dfpTopFrame) {
                    let deviceOrientation = window.matchMedia("(orientation: portrait)");
                        console.log('Scroll Freeze start at :'+(new Date(kly.startLoad)));
                    let that = GAMLibrary.lockScroll;
                    if (!deviceOrientation.matches) {
                        GAMLibrary.lockScroll.unset();
                    }else{
                        GAMLibrary.lockScroll.set();
                    }
                    window.addEventListener("resize", function() {
                        if (!deviceOrientation.matches) {
                        that.unset();
                        }
                    });
                }
            }else{
                if (dfp_slotAdUnitPath == GAMLibrary.dfpTopFrame) {
                  GAMLibrary.lockScroll.unset();
                  let lockTime = new Date().getTime();
                  let startLoad = kly && kly.startLoad ? kly.startLoad : 0;
                  console.log('Scroll Freeze start at :'+(new Date(startLoad)));
                  let diff = lockTime - startLoad;
                  let lockTimeStamp = Math.floor(diff / 1000 % 60);
                  console.log('No Topframe campaign detected, freeze unlock duration :'+lockTimeStamp);                      
                }
            } 
          
          	if (_slots.indexOf(_countAdUnit) != -1) {
                var _timeEnd = _getDateTimeNow().date;
                _globalVar.timeEnd = _getDateTimeNow().milisecond;
                var _totalResponse = _globalVar.timeEnd - _globalVar.timeStart;
                if(!_send){
                    var  _timeEndParse= _totalResponse / 1000;
                    _timeEndResult = +_timeEndParse.toFixed(2);
                    _callConsoleTime("GPT LOADTIME END WITH "+_countAdUnit +" AD RESPONSE AT", _timeEnd);
                    _callConsoleTime("GPT LOADTIME TOTAL RESPONSE ( milisecond )", _totalResponse + " milisecond");
                    _callConsoleTime("GPT LOADTIME TOTAL RESPONSE ( second )", _timeEndResult + " second");

                    window.dataLayer.push({
                        event: "load-time",
                        feature_name: "ads-latency",
                        feature_value: _timeEndResult
                    });
                    _send = true;
                }
            }
        });        

        /*INITIATE ADS ON CONTINOUS PAGE */
        GAMLibrary.initiateSCReadPage();

        /*  START TARGETING BLOCK   */
        if (isMatcont) {googletag.pubads().setTargeting("isMatcont", ["1"]);}
        if (typeof Krux !== "undefined") {
            googletag.pubads().setTargeting('ksg', Krux.segments);
            googletag.pubads().setTargeting('kuid', Krux.user);
        }
        googletag.pubads().setTargeting("tags",tagForAds);
        googletag.pubads().setTargeting("currentUrl", urlPath);
        googletag.pubads().setTargeting("type", kly.gtm.type);
        googletag.pubads().setTargeting("pageType", kly.pageType);
        googletag.pubads().setTargeting("channel", kly.gtm.subCategory);
        googletag.pubads().setTargeting("audience", typeof (audience = kly.gtm.audience && kly.gtm.audience.split("|")) === "undefined" ? "false" : audience);
        googletag.pubads().setTargeting("isAdvertorial", typeof (isAdvertorial = kly.article && kly.article.isAdvertorial.toString()) === "undefined" ? "false" :  isAdvertorial);   
        googletag.pubads().setTargeting("isMultipage", typeof (isMultipage = kly.article && kly.article.isMultipage.toString()) === "undefined" ? "false" : isMultipage );
        googletag.pubads().setTargeting("articleId", kly.gtm.articleId.toString());
        googletag.pubads().setTargeting("pagingNum", typeof (pageParam = kly.gtm.pageParam && kly.gtm.pageParam.toString()) === "undefined" ? "false" : pageParam );
        googletag.pubads().setTargeting("newExp",typeof (newExp = kly.gtm.new_exp) === "undefined" ? "false" : kly.gtm.new_exp.toString());
      	googletag.pubads().setTargeting("site", kly.site);
        googletag.pubads().setTargeting("age", typeof (age = kly.gtm.age) === "undefined" ? "false" : kly.gtm.age.toString());
        googletag.pubads().setTargeting("gender", typeof (gender = kly.gtm.gender) === "undefined" ? "false" : kly.gtm.gender.toString());
        /*  END TARGETING BLOCK   */
/* SET VISITOR ID AS PUBLISHER PROVIDED ID - START*/
var cVisitorId = (visId = document.cookie.split('liputan6_id_visitor_id=')[1]) ? visId.split(';')[0].replace(/[^a-zA-Z0-9]/ig,'') : 0;
cVisitorId ? googletag.pubads().setPublisherProvidedId(cVisitorId+'kly') : '';
/* SET VISITOR ID AS PUBLISHER PROVIDED ID - END*/
        googletag.pubads().setCentering(true);
        googletag.pubads().enableSingleRequest();
        googletag.pubads().collapseEmptyDivs();
        googletag.enableServices();

    });

    googletag.cmd.push(function() {
        googletag.display('div-gpt-ad-dream-dfp-exposer-slot2');
    });

    var gptDreamStyle = document.createElement('style');
    gptDreamStyle.textContent = '#div-gpt-ad-dream-hl{-webkit-transition:margin .5s;transition:margin .5s;margin-top:0}.dfp-hl-sticky{position:fixed;top:0;min-height:50px;left:50%;margin-left:-160px!important;z-index:99999}';
    window.onload = function() {
		document.body.appendChild(gptDreamStyle);
    };

    /* ===== HEADLINESTICKY METHOD - DEFAULT 3s ===== */
    var headlineStickyInterval=3,headlineStickyStatus=!1;function headlineSticky(e){null!=e&&(headlineStickyInterval=e),console.log(headlineStickyInterval);var n=document.getElementById("div-gpt-ad-dream-hl"),t=document.createElement("div");t.setAttribute("id","div-gpt-ad-dream-hl-shadow"),n.parentElement.insertBefore(t,n),injectStickyStyleAndAnimation(),window.addEventListener("scroll",headlineStickyScrollEevent)}function headlineStickyScrollEevent(){var e=document.getElementById("div-gpt-ad-dream-hl"),n=document.getElementById("div-gpt-ad-dream-hl-shadow").getBoundingClientRect().top;document.querySelector(".layout__nav-content"),document.documentElement.scrollTop||document.body.scrollTop;headlineStickyStatus?n<=0||(window.removeEventListener("scroll",headlineStickyScrollEevent),removeStickyHeadline(e,!1)):n<=0&&(e.classList.add("hl-active-sticky"),e.style="",removeStickyHeadline(e,!0),headlineStickyStatus=!0)}function removeStickyHeadline(e,n){var t=setInterval(function(){headlineStickyInterval<=0?(e.classList.remove("hl-active-sticky"),e.classList.remove("hl-navbar-hanging"),e.style.margin="10px 0",clearInterval(t),window.removeEventListener("scroll",headlineStickyScrollEevent)):headlineStickyInterval--},1e3);n||(clearInterval(t),e.classList.remove("hl-active-sticky"),e.classList.remove("hl-navbar-hanging"),e.style.margin="10px 0")}function injectStickyStyleAndAnimation(){var e=document.createElement("style");e.textContent="\n            .hl-active-sticky {\n                position: fixed;\n                top: -100%;\n                z-index: 9999;\n                left: 50%;\n                transform: translateX(-50%);\n                margin: 0;\n                transition : margin-top .5s ease;\n                animation: hlSlideDown .5s forwards;\n            }\n    \n            .hl-navbar-hanging{\n                margin-top : 50px !important;\n            }\n    \n            @keyframes hlSlideDown{\n                0%{top : -100px;}\n                100%{top : 0px;}\n            }\n            ",document.head.appendChild(e)}
    /* ===== HEADLINESTICKY METHOD ===== */