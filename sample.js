/* Make sure to remove all the console logging before going into production. */

// Settings
window.deferredTimeout = 3000;
window.adsLoadTimeout = 2000;
window.auctionFailSafeTimeout = 2000;
window.prebidTimeout = 1500;
var mobileOneDiv = 'div-adcontainer-AHE_Mobile_Intext_1';
var mobileTwoDiv = 'div-adcontainer-AHE_Mobile_Intext_2';

/*
We want to load ads and other deferred scripts and styles only after the content has loaded.
For that, we use the window load event.
If that takes too long, however, we still want to load ads. For that we use the document read event plus a timeout.
*/
$(document).ready(function() {
    // If it's taking too long, go ahead and load deferred before window.load() event occurs.
    console.log('Document ready event.');
    window.deferredLoadTimer = setTimeout(function() {
        console.warn('Loading deferrec scripts and styles due to timeout...');
        loadDeferredScriptsAndStyles();
    }, window.deferredTimeout);
    window.adsLoadTimer = setTimeout(function() {
        if (!window.prebidAuctionRun) {
            console.warn('Running Prebid auction due to timeout...');
            window.prebidAuctionRun = true;
            runPrebidAuction();
        }
    }, window.adsLoadTimeout);
});
$(window).on("load", function() {
    // Normal case: Load deferred after window.load() event.
    console.log('Window load event.');
    if (!window.prebidAuctionRun) {
        console.log('Running Prebid auction on load event...');
        window.prebidAuctionRun = true;
        clearTimeout(window.adsLoadTimer);
        runPrebidAuction();
    }
    if (!window.deferredLoaded) {
        console.log('Loading deferred scripts and styles on load event...');
        clearTimeout(window.deferredLoadTimer); // Remove slow connection load timeout.
        loadDeferredScriptsAndStyles();
    }
});

// Put all deferred scripts and styles (apart from ads) into this function
function loadDeferredScriptsAndStyles() {
    if (!window.deferredLoaded) {
        window.deferredLoaded = true;

        // Load Deferred Styles
        var addStylesNode = document.getElementById("deferred-styles-and-scripts");
        var replacement = document.createElement("div");
        replacement.innerHTML = addStylesNode.textContent;
        document.body.appendChild(replacement);
        addStylesNode.parentElement.removeChild(addStylesNode);

        // Other Deferred Scripts go here
        // Google Analytics, Anti-Adblock, etc...
    }
};

// ADVERTISING

// Amazon UAM
! function(a9, a, p, s, t, A, g) {
    if (a[a9]) return;

    function q(c, r) {
        a[a9]._Q.push([c, r])
    }
    a[a9] = {
        init: function() {
            q("i", arguments)
        },
        fetchBids: function() {
            q("f", arguments)
        },
        setDisplayBids: function() {},
        targetingKeys: function() {
            return []
        },
        _Q: []
    };
    A = p.createElement(s);
    A.async = !0;
    A.src = t;
    g = p.getElementsByTagName(s)[0];
    g.parentNode.insertBefore(A, g)
}("apstag", window, document, "script", "//c.amazon-adsystem.com/aax2/apstag.js");

// Amazon UAM Config
var amazonConfig = {
    pubID: '59dd3568-2c85-42b0-b377-5a75ac91faea', // Replace with your own ID
    adServer: 'googletag',
}
apstag.init(amazonConfig);

var googletag = googletag || {};
googletag.cmd = googletag.cmd || [];

var pbjs = pbjs || {};
pbjs.que = pbjs.que || [];

var adUnits = [];

// This function is called when the page is loaded. We don't want to run any auction logic before that.
function runPrebidAuction() {
    // Stop GAM from loading on its own
    console.log('runPrebidAuction()');

    // Defining the parameters for our ad units. Checking whether they are available on the page is a good idea to prevent impression loss.
    // REPLACE WITH YOUR OWN PLACEMENT IDS
    if (document.getElementById(mobileOneDiv)) {
        adUnits.push({
            code: mobileOneDiv,
            mediaTypes: {
                banner: {
                    sizes: [
                        [300, 250],
                        [320, 50]
                    ]
                }
            },
            bids: [{
                    bidder: 'sovrn',
                    params: {
                        tagid: '418422'
                    }
                },
                {
                    bidder: 'districtm',
                    params: {
                        placementId: '10124863'
                    }
                },
                {
                    bidder: 'districtmDMX',
                    params: {
                        dmxid: '148279',
                        memberid: '100070'
                    }
                },
                {
                    bidder: 'appnexus',
                    params: {
                        placementId: '11584839'
                    }
                },
            ]
        });
        amazonSlotMobileOne = {
            slotID: mobileOneDiv,
            slotName: '/58909013/AHE_Mobile_Intext_1',
            sizes: [
                [300, 250],
                [320, 50]
            ]
        };
    }
    // REPLACE WITH YOUR OWN PLACEMENT IDS
    if (document.getElementById(mobileTwoDiv)) {
        adUnits.push({
            code: mobileTwoDiv,
            mediaTypes: {
                banner: {
                    sizes: [
                        [300, 250],
                        [320, 50]
                    ]
                }
            },
            bids: [{
                    bidder: 'sovrn',
                    params: {
                        tagid: '418423'
                    }
                },
                {
                    bidder: 'districtm',
                    params: {
                        placementId: '10124869'
                    }
                },
                {
                    bidder: 'districtmDMX',
                    params: {
                        dmxid: '148280',
                        memberid: '100070'
                    }
                },
                {
                    bidder: 'appnexus',
                    params: {
                        placementId: '11584840'
                    }
                },
            ]
        });
        amazonSlotMobileTwo = {
            slotID: mobileTwoDiv,
            slotName: '/58909013/AHE_Mobile_Intext_2',
            sizes: [
                [300, 250],
                [320, 50]
            ]
        };
    }

    // Prebid configuration. This is very minimal, adjust as necessary.
    pbjs.que.push(function() {
        pbjs.addAdUnits(adUnits);
        pbjs.bidderSettings = {
            districtmDMX: {
                bidCpmAdjustment: function(bidCpm) {
                    return (bidCpm * 0.9);
                }
            }
        };
    });

    // DFP Proper
    googletag.cmd.push(function() {
        var mapMobile = googletag.sizeMapping()
            .addSize([1, 1], [
                [300, 250],
                [320, 50]
            ]) // add more size mappings as needed
            .build();
        if (document.getElementById(mobileOneDiv)) {
            mobileOneSlot = googletag.defineSlot('/58909013/AHE_Mobile_Intext_1', [
                    [300, 250],
                    [320, 50]
                ], mobileOneDiv)
                .defineSizeMapping(mapMobile)
                .addService(googletag.pubads());
        }
        if (document.getElementById(mobileTwoDiv)) {
            mobileTwoSlot = googletag.defineSlot('/58909013/AHE_Mobile_Intext_2', [
                    [300, 250],
                    [320, 50]
                ], mobileTwoDiv)
                .defineSizeMapping(mapMobile)
                .addService(googletag.pubads());
        }

        executeParallelAuctionAlongsidePrebid([amazonSlotMobileOne, amazonSlotMobileTwo], [mobileOneDiv, mobileTwoDiv], [mobileOneSlot, mobileTwoSlot]);

        googletag.pubads().disableInitialLoad();
        googletag.pubads().enableSingleRequest();
        googletag.enableServices();
    });
}

/*
This parallel auction script will:
- request bids for Amazon and Prebid in parallel
- track their bids coming in
- trigger the GAM auction if either both have come back, or a failsafe timeout is hit
*/
function executeParallelAuctionAlongsidePrebid(amazonSlots, divIDs, gamSlots) {
    console.log('executeParallelAuctionAlongsidePrebid()', amazonSlots, divIDs, gamSlots);
    var auctionComplete = new Event('auctionComplete');

    if (amazonSlots.constructor !== Array) {
        amazonSlots = [amazonSlots];
    }
    if (divIDs.constructor !== Array) {
        divIDs = [divIDs];
    }
    if (gamSlots.constructor !== Array) {
        gamSlots = [gamSlots];
    }
    var joinedDivs = divIDs.join(',')
    var requestManager = {
        adserverRequestSent: false,
        aps: false,
        prebid: false
    };
    // when both APS and Prebid have returned, initiate ad request
    function biddersBack() {
        let amazonString = '';
        let prebidString = '';
        if (requestManager.aps) {
            amazonString = 'Amazon';
        }
        if (requestManager.prebid) {
            prebidString = 'Prebid';
        }
        console.log('Received bids for: ', amazonString, prebidString);
        if (requestManager.aps && requestManager.prebid) {
            sendAdserverRequest();
        }
        return;
    }
    // sends adserver request
    function sendAdserverRequest() {
        console.log('sendAdserverRequest()');
        clearTimeout(window.adRequestTimeOut)
        if (requestManager.adserverRequestSent == joinedDivs) {
            return;
        }
        requestManager.adserverRequestSent = joinedDivs;
        googletag.cmd.push(function() {
            googletag.pubads().refresh(gamSlots);
            window.dispatchEvent(auctionComplete);;
        });
    }
    // sends bid request to APS and Prebid
    function requestHeaderBids() {
        console.log('requestHeaderBids()');
        // APS request
        apstag.fetchBids({
            slots: amazonSlots
        }, function(bids) {
            googletag.cmd.push(function() {
                apstag.setDisplayBids();
                requestManager.aps = true; // signals that APS request has completed
                biddersBack(); // checks whether both APS and Prebid have returned
            });
        });
        // Prebid request
        pbjs.que.push(function() {
            pbjs.requestBids({
                timeout: window.prebidTimeout,
                adUnitCodes: divIDs,
                bidsBackHandler: function() {
                    googletag.cmd.push(function() {
                        pbjs.setTargetingForGPTAsync(divIDs);
                        requestManager.prebid = true; // signals that Prebid request has completed
                        biddersBack(); // checks whether both APS and Prebid have returned
                    })
                }
            });
        });
    }
    // Initiate bid request
    requestHeaderBids();
    // Set failsafe timeout
    window.adRequestTimeOut = window.setTimeout(function() {
        console.warn('Ad request failsafe timeout hit! Executing sendAdserverRequest()...');
        sendAdserverRequest();
    }, window.auctionFailSafeTimeout);
};