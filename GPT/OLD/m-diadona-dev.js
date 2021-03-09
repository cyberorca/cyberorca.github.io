var gpt_gam_ver = 'v04-DK';
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
    window.GAMLibrary = {};
    window.GAMLibrary.setGamBFInterval = function(active) {
        if (!active) {
            clearInterval(window.GAMLibrary.gamBFInterval);
            return;
        }
        window.GAMLibrary.gamBFInterval = setInterval(function() {
            googletag.pubads().refresh([window.GAMLibrary.refreshSlot]);
        }, 60000);
    }

    /* START  - LOAD PUBMATIC, GOOGLE ADS & REVIVE */
    var PWT={}; //Initialize Namespace
    var googletag = googletag || {};
    googletag.cmd = googletag.cmd || [];
    var gptRan = false;
    PWT.jsLoaded = function(){ //PubMatic pwt.js on load callback is used to load GPT
        loadGPT();
    };
    var loadGPT = function() {
        // Check the gptRan flag
        if (!gptRan) {
            gptRan = true;
            var gads = document.createElement('script');
            var rads = document.createElement('script'); // #1
            var useSSL = 'https:' == document.location.protocol;
            gads.src = (useSSL ? 'https:' : 'http:') + '//securepubads.g.doubleclick.net/tag/js/gpt.js';
            rads.src = (useSSL ? 'https:' : 'http:') + '//adserver.kl-youniverse.com/asyncjs.php'; // #2
            gads.async = true; 
            rads.async = true; // #3
            var node = document.getElementsByTagName('script')[0];
            node.parentNode.insertBefore(gads, node);
            node.parentNode.insertBefore(rads, node); // #4
        }
    };
    // Failsafe to call gpt
    setTimeout(loadGPT, 500);

    (function() {
        var purl = window.location.href;
        var url = '//ads.pubmatic.com/AdServer/js/pwt/156536/457';
        var profileVersionId = '';
        if(purl.indexOf('pwtv=')>0){
            var regexp = /pwtv=(.*?)(&|$)/g;
            var matches = regexp.exec(purl);
            if(matches.length >= 2 && matches[1].length > 0){
                profileVersionId = '/'+matches[1];
            }
        }
        var wtads = document.createElement('script');
        wtads.async = true;
        wtads.type = 'text/javascript';
        wtads.src = url+profileVersionId+'/pwt.js';
        var node = document.getElementsByTagName('script')[0];
        node.parentNode.insertBefore(wtads, node);


        PWT.HookForPrebidRequestBids = function (adUnits) {
            //console.log('HookForPrebidRequestBids: Original adUnits array :', adUnits);
            adUnits.forEach(function (au) {
                //console.log('HookForPrebidRequestBids: adding kadfloor to pubmatic');
                au.bids.forEach(function (bid) {
                    //if(bid.bidder == 'pubmatic') {
                    //bid.params.wiid='hooksimpression';}
                    if (bid.bidder == 'spotx') {
                        var s_page_url = window.top!=window.parent?document.referrer:window.location.href
                            bid.params["custom"] = {"page_url": s_page_url};
                            bid.params["outstream_function"] = function (bid) {
                            //console.dir(bid);
                            //const videoDiv = bid.adUnitCode;
                            const videoDiv = bid.adUnitCode.split('@')[0];
                            const playerWidth = 300;
                            const playerHeight = 250;
                            //window.console.log("[SPOTX][renderer] Handle SpotX custom outstream renderer");
                            let script = window.document.createElement("script");
                            script.type = "text/javascript";
                            script.src = "//cdn.spotxcdn.com/website/integration_test/media/asia/EASIv2.js";
                            script.setAttribute("data-spotx_channel_id","" + bid.channel_id);
                            script.setAttribute("data-spotx_vast_url", "" + bid.vastUrl);
                            script.setAttribute("data-spotx_content_width", playerWidth);
                            script.setAttribute("data-spotx_content_height",playerHeight);
                            script.setAttribute("data-spotx_content_page_url",bid.renderer.config.content_page_url);
                            script.setAttribute("data-spotx_ad_unit", "incontent");
                            script.setAttribute("data-spotx_autoplay", "1");
                            script.setAttribute("data-spotx_continue_out_of_view", "1");
                            script.setAttribute("data-spotx_content_container_id",videoDiv);
                            var vid_contain = window.document.getElementById(videoDiv);
                            vid_contain.style.cssText = "display: none; margin-bottom: 20px";
                            vid_contain.appendChild(script);
                        }
                    }
                })
            })
        };
    })();
    /* END  - LOAD PUBMATIC, GOOGLE ADS & REVIVE */

    /*SPECIAL ADS BY TAG*/
    var blackListWords = new Array('matcont', 'aduhai', 'kelamin', 'vital', 'anal', 'belahan', 'bercinta', 'bergairah', 'gairah', 'intim', 'bikini', 'bokong', 'boob', 'bra', 'bugil', 'celana', 'ciuman', 'cleavage', 'dada', 'dewasa', 'diremas', 'doggie', 'ejakulasi', 'ereksi', 'erotis', 'foreplay', 'kiss', 'seks', 'gangbang', 'horny', 'hot', 'kamasutra', 'keperawanan', 'perawan', 'kondom', 'kontrasepsi', 'libido', 'lingerie', 'masturbasi', 'mature', 'menggairahkan', 'menggoda', 'mesra', 'miss-v', 'mr-p', 'nakal', 'naughty', 'nipple', 'nipples', 'onani', 'oral', 'oral seks', 'organ', 'orgasme', 'paha', 'pantat', 'panties', 'payudara', 'pelecehan', 'telanjang', 'penetrasi', 'penis', 'perkosa', 'perkosaan', 'pole', 'porno', 'pornoaksi', 'pornografi', 'telentang', 'provokatif', 'putting', 'ranjang', 'sex', 'penetratif', 'seksi', 'seksual', 'sensual', 'seronok', 'doll', 'toys', 'skandal', 'sperma', 'striptease', 'striptis', 'syur', 'terangsang', 'tiduri', 'topless', 'vagina', 'vibrator', 'lendir', 'prostitusi', 'homoseks', 'meraba-raba', 'mesum', 'memerkosa', 'rudapaksa', 'kemaluan', 'kasus asusila', 'pemerkosaan', 'hubungan seksual', 'hubungan intim', 'video porno', 'berita hoax', 'ternyata hoax', 'ahed tamimi', 'konflik palestina israel', 'konflik suriah', 'ujaran kebencian', 'g30s', 'kediktatoran arab saudi', 'konflik palestina-israel', 'fpi', 'penembakan', 'pelecehan seksual', 'tips seks', 'komunitas swinger', 'fenomena kelainan seksual', 'penyimpangan seks', 'posisi seks', 'obat kuat', 'bentuk payudara', 'implan payudara', 'chat firza-rizieq', 'anarkisme suporter sepakbola', 'bentrok suporter', 'pengeroyokan', 'penganiayaan', 'begal motor', 'kekerasan pada wartawan', 'pemerkosaan anak', 'pencabulan', 'bentrokan warga', 'bentrokan', 'kasus narkoba', 'akibat merokok', 'bahaya merokok', 'berhenti merokok', 'cara berhenti merokok', 'efek berhenti merokok', 'larangan merokok', 'tips berhenti merokok', 'rokok elektrik', 'pilpres 2019', 'koalisi pilpres 2019', 'koalisi prabowo', 'koalisi jokowi', 'prabowo-sandiaga', 'ratna sarumpaet', 'capres jokowi', 'capres prabowo', 'kebohongan ratna sarumpaet', 'prabowo subianto', 'jemaah ansharut daulah', 'aliran sesat', 'lia eden', 'kisah mualaf', 'penistaan agama', 'suporter tewas', 'gempa palu', 'gempa donggala', 'gempa sulawesi tengah', 'pembunuhan', 'tsunami palu', 'penemuan mayat', 'lion air jatuh di karawang', 'lion air jatuh', 'pembunuhan sadis', 'lion air hilang kontak', 'pesawat jatuh', 'pesawat hilang kontak', 'kecelakaan', 'kapal tenggelam di danau toba', 'kecelakaan bus', 'kapal tenggelam', 'kasus tabrak lari', 'bunuh diri', 'perselingkuhan', 'kisah perselingkuhan', 'razia pasangan mesum', 'seks bebas', 'gangguan jiwa', 'tes keperawanan', 'kontroversi hukuman mati', 'stres dan depresi', 'ahok gugat cerai veronica tan', 'Kanker', 'Impotensi', 'merokok', 'Perokok', 'Rokok', 'tembakau', 'Pelanggaran', 'Tablet', 'Overdosis', 'Jantung', 'Stroke', 'Cancer', 'Narkoba', 'Djarum', 'Ganja', 'BNN', 'Obesitas', 'Osteoporosis', 'Corona', 'Corona di indonesia', 'virus corona', 'virus-corona', 'covid-19', 'wabah corona', 'menewaskan', 'menewaskan orang', 'mengancam nyawa', 'meninggal', 'meninggal dunia', 'orang mati', 'orang tewas', 'pemakaman', 'petugas penyelamat', 'telah meninggal', 'terbunuh', 'tewas', 'tewaskan', 'tim penyelamat', 'wanita meninggal', 'autopsi', 'belasungkawa', 'bencana', 'bencana besar', 'bunuh orang', 'darurat bencana', 'dilaporkan tewas', 'dimakamkan', 'dipastikan tewas', 'ditemukan mati', 'ditemukan tewas', 'hilangnya nyawa', 'identitas korban', 'inalillahi', 'jasad korban', 'jasadnya', 'jenasah wanita', 'jenazah', 'jenazah pria', 'jenazah teridentifikasi', 'jasad', 'kehilangan hidupnya', 'kehilangan nyawa', 'kehilangan nyawanya', 'kematian', 'korban', 'korban jiwa', 'korban meninggal', 'korban tewas', 'mati', 'mayat', 'mayat korban', 'membunuh', 'membunuh istrinya', 'membunuh mereka', 'membunuh suaminya', 'menemui ajal', 'mengalami koma', 'menghembuskan nafas terakhir', 'menimbulkan korban', 'meninggal akibat sakit', 'menyebabkan kematian', 'meregang nyawa', 'meregggut nyawa', 'modar', 'nyawa hilang', 'nyawa melayang', 'penyebab kematian', 'tak bernyawa', 'tak sadarkan diri', 'terkapar', 'tidak bernyawa', 'tutup usia', 'wafat', 'kematian virus', 'kematian wabah', 'korban terinfeksi', 'virus menyerang', 'merenggut nyawa', 'pelayat', 'hilangkan nyawa', 'renggut nyawa', 'wabah', 'keadaan kritis', 'kehilangan darah', 'merenggut jiwa', 'telan nyawa', 'menelan nyawa', 'memakan nyawa', 'dinyatakan meninggal', 'nyawa tak tertolong', 'penyakit', 'sakit pernapasan', 'sesak', 'korona', 'corona', 'odp', 'pdp', 'virus', 'rumah sakit', 'Covid-19', 'virus korona', 'positif korona', 'COVID-19', 'terjangkit COVID-19', 'terinfeksi virus corona');
	var urlPath = document.URL;
    var urlArray = urlPath.split("/");
    var dfp_Channel = window.location.host;
    var alowedPath = new Array("family", "relationship", "health", "food", "travel", "beauty", "d-stories", "photo");
    var urlSlot = '';
    var nLevel = 1;
    var isMatcont = false;
    var dfp_Article = urlArray[urlArray.length - 1]; /* Custom targeting by article */
    urlArray.forEach(function(sPath) {
        if (inArray(sPath, alowedPath) && nLevel <= 1) {
            urlSlot += sPath + '/';
            nLevel++;
        }
    });

    function inArray(needle, haystack) {
        var length = haystack.length;
        for (var i = 0; i < length; i++) {
            if (haystack[i] == needle) return true;
        }
        return false;
    }

    function arrToLowerCase(arr){
        return arr.map(function(v,i){
            return v.toLowerCase();
        });
    }

    function document_meta(metaName) {
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
    }

    /* DMP CATEGORY LIST */
	window.createDMPTracker = function(adsList, dfpTracker) {
		var dmpEl, dmpON, dmpId = 1,
			dmpList = ["fashion-events","acara-film","beauty-events","comedy-events","fan-conventions","lifestyle-events","musical-events","sporting-events","auto-shows","parenting-events","political-event","apartments","life-insurance","motor-insurance","health-insurance","education-insurance","travel-insurance","home-insurance","automotive","auto-racing","beauty","disasters","local-news","law","international-news","crime","national-news","elections","politics","government-business","business-and-finance","cloud-computing","content-channel","education","outdoor-decorating","consumer-electronics","esports","events","family-and-relationships","fashion-anak","mens-fashion","womens-fashion","fitness-and-exercise","fmcg-food-and-drink","fmcg-personal-care","console-games","pc-games","gaming","computer-peripherals","hatchback","health","healthy-and-wellness","home-and-garden","homeschooling","hotels-and-motels","pharmaceutical-industry","financial-industry","entertainment-industry","healthcare-industry","construction-industry","legal-services-industry","power-and-energy-industry","logistics-and-transportation-industry","food-industry","manufacturing-industry","media-industry","mechanical-and-industrial-engineering-industry","automotive-industry","education-industry","aviation-industry","hospitality-industry","advertising-industry","agriculture","real-estate-industry","retail-industry","technology-industry","telecommunications-industry","interior-decorating","internet","residentials-buy-sell-and-rentals","auto-buying-and-selling","credit-cards","household-supplies","injuries","pregnancy","childrens-health","adults-health","mental-health","reproductive-health","computing","bollywood-content","dangdut-content","movie-content","hijab-content","hollywood-content","korean-content","quiz-content","music-content","coffee","course-education","green-vehicles","frozen-foods","fast-foods","side-dishes","desserts-and-baking","snacks","healthy-cooking-and-eating","make-up","marketing-and-advertising","soft-drinks","mobil-cerdas","luxury-cars","budget-cars","performance-cars","mobile-apps","mpv","news-and-politics","nutrition","non-profit-organizations","business-expos-and-conferences","parenting","marketplace/ecommerce","weight-loss","early-childhood-education","alternative-medicine","chronic-disease","ailment","sports-equipment","skin-care","hair-care","body-care","facecare","home-appliances","personal-finance","houses","loans","fmcg-oral-care","fmcg-hair-care","fmcg-body-care","fmcg-face-care","milk-products","tickets-promo-and-vouchers","property","relationship","auto-rentals","sales-and-promotions","primary-education","online-education","private-school","soccer","motorcycles","auto-repair","shopping-and-ecommerce","smartphones","social-networking","computer-software-and-applications","auto-parts","sports","startups","style-and-fashion","suv","water-services","gas-and-electric","internet-service-providers","phone-services","technology-and-computing","television","physical-therapy","train-tickets","flight-tickets","online-transportation","travel","budget-travel","special-interest-tv","childrens-tv","animation-tv","news-tv","drama-tv","comedy-tv","music-tv","sports-tv","reality-tv","college-education","vaccines","wearable-technology","web-hosting","family-travel","culinary-travel","religious-tourism"];
		Array.isArray(adsList) && dmpList.forEach(function(v, k) {
			adsList.forEach(function(l, e) {
				if (v === l) {
					cat = v.trim();
					dmpEl = document.createElement('img');
					dmpON = parent.window.document.querySelector('#dmp-tracker-' + dmpId);
					dmpON ? dmpON.remove() : '';
					dmpEl.setAttribute('src', 'https://beacon.krxd.net/event.gif?event_id=M361oCpv&event_type=registration&cat=' + cat + '&media=banner');
					dmpEl.setAttribute('width', '0');
					dmpEl.setAttribute('height', '0');
					dmpEl.setAttribute('id', 'dmp-tracker-' + dmpId);
					console.log(dmpEl);
					parent.window.document.body.appendChild(dmpEl);
					dmpId++;
				}
			});
		});
		parent.window.open(dfpTracker, '_blank');
	};

    /*MATURE CONTENT DEFINED VAR*/
    if (!blackListWords) {
        var blackListWords = new Array('matcont');
    }

    var isHomepage = urlPath == "https://m-dev.diadona.id" || urlPath == "https://m-dev.diadona.id/" || urlPath == "https://m-dev.diadona.id/index.html" || urlPath.indexOf("https://m-dev.diadona.id?") > -1;

    /* CHECK PAGETYPE */
    var isReadPage = false;
    if (typeof kly !== "undefined") {
        isReadPage = kly.pageType == "ReadPage";
    } else {
        isReadPage = document.URL.match(/html/g) !== null;
    }

    if (!document.querySelector("div-gpt-ad-diadona-insertion-oop") && isReadPage) {
        var gamInsertionEl = document.createElement("div");
        gamInsertionEl.id = "div-gpt-ad-diadona-insertion-oop";
        document.body.appendChild(gamInsertionEl);
    }

    googletag.cmd.push(function() {

        var oop_dfpHeadline = '/36504930/m.diadona.id/dfp-hl';
        var oop_dfpBottomframe = '/36504930/m.diadona.id/dfp-bottomfrm';
        var oop_dfpTopframe = '/36504930/m.diadona.id/dfp-topfrm';
        var dfpAds_sled = '/36504930/m.diadona.id/dfp-sled';
        var dfpAds_slideup = '/36504930/m.diadona.id/dfp-slideup';
        var exposer_slot1 = '/36504930/m.diadona.id/dfp-exposer-slot1';
        var exposer_slot2 = '/36504930/m.diadona.id/dfp-exposer-slot2';
        var nativeOut_slot1 = '/36504930/m.diadona.id/dfp-nativeOut-slot1';
        var nativeOut_slot2 = '/36504930/m.diadona.id/dfp-nativeOut-slot2';
        var nativeOut_slot3 = '/36504930/m.diadona.id/dfp-nativeOut-slot3';
        var dfp_pageTitle = urlArray[urlArray.length - 1];
        var dfp_titles = dfp_pageTitle.klyFiltering("-");
        var dfp_pageKeywords = document_meta("keywords");
        var dfp_keyword = dfp_pageKeywords.klyFiltering(",");
        var dfp_pageDesc = document_meta("description");
        var dfp_desc = dfp_pageDesc.klyFiltering(",");
        var pageType = "FrontPage";
        var dfp_adunitCount = 8;
        var dfp_slotCount = 0;
        var dfp_Rubric = dfp_Channel + " - " + (urlSlot == "" ? "homepage" : urlSlot.replace('/', ''));
        var tagForAds = (typeof window.kly !== 'undefined') ? kly.gtm.tag.klyFiltering("|") : [];
        var dfp_keywords = dfp_keyword.concat(dfp_titles, dfp_desc, tagForAds);
        /*set targetting to show stickersurvey or not*/
        var bannedSurveyCookies = document.cookie.match(/dfp_banliftSurvey-([a-zA-Z0-9-]+)/gi);
        var bannedSurveyCampaign = [];
        var browserType = 'other';
        if (dfp_Article.length > 0) {
            pageType = "ReadPage";
        } else {
            pageType = (urlSlot == "") ? "FrontPage" : "ChannelPage";
        }

        blackListWords = arrToLowerCase(blackListWords);
        dfp_keywords.forEach(function(sKeyword) {
            sKeyword = sKeyword.toLowerCase();
            tagForAds.push(sKeyword);
            if (inArray(sKeyword.trim(), blackListWords)) {
                isMatcont = true;
            }
        });

        /*userAgent targeting based on browser type*/
        if (navigator.userAgent.match(/Opera Mini/i) || navigator.userAgent.match(/OPR/i)) {
            browserType = 'operamini';
        } else if (navigator.userAgent.match(/^Mozilla\/5\.0 .+ Gecko\/$/) || navigator.userAgent.match(/UCBrowser/i)) {
            browserType = 'ucbrowser';
        }
        /*End userAgent targeting based on browser type*/

        /*set targetting to show stickersurvey or not*/
        if (bannedSurveyCookies !== null) {
            for (var i = 0; i < bannedSurveyCookies.length; i++) {
                var bannedCampaign = bannedSurveyCookies[i].replace('dfp_banliftSurvey-', '');
                if (bannedCampaign != '') bannedSurveyCampaign[i] = bannedCampaign;
            }
        }
        /*End set targetting to show stickersurvey or not*/


        googletag.defineSlot(oop_dfpHeadline, [
            [320, 50],
            [320, 100]
        ], 'div-gpt-ad-diadona-hl').addService(googletag.pubads());
        googletag.defineSlot('/36504930/m.diadona.id/dfp-sc', [
          	[300, 250],
          	[250, 250],
          	[200, 200]
        ], 'div-gpt-ad-diadona-sc').addService(googletag.pubads());
        googletag.defineSlot(exposer_slot1, [
            [300, 250],
            [300, 600],
            [320, 480],
          	[160, 600],
            [250, 250]
        ], 'div-gpt-ad-diadona-dfp-exposer-slot1').addService(googletag.pubads());

        /*OUT OF PAGE SLOTS*/
        googletag.defineOutOfPageSlot(oop_dfpTopframe, 'div-gpt-ad-diadona-topfrm-oop').addService(googletag.pubads());
        googletag.defineOutOfPageSlot('/36504930/m.diadona.id/dfp-newsTag1', 'div-gpt-ad-diadona-newsTag1-oop').addService(googletag.pubads());
        googletag.defineOutOfPageSlot('/36504930/m.diadona.id/dfp-newsTag2', 'div-gpt-ad-diadona-newsTag2-oop').addService(googletag.pubads());
        googletag.defineOutOfPageSlot(dfpAds_sled, 'div-gpt-ad-dfp-liftads-oop').addService(googletag.pubads());
        googletag.defineOutOfPageSlot(dfpAds_slideup, 'div-gpt-ad-dfp-slideup-oop').addService(googletag.pubads());
        googletag.defineOutOfPageSlot(exposer_slot2, 'div-gpt-ad-diadona-dfp-exposer-slot2').addService(googletag.pubads());
        if (isReadPage) {
            googletag.defineOutOfPageSlot('/36504930/m.diadona.id/dfp-insertion', 'div-gpt-ad-diadona-insertion-oop').addService(googletag.pubads());
        }
       
        //googletag.defineSlot(oop_dfpTopframe,[1,1], 'div-gpt-ad-diadona-topfrm-oop').addService(googletag.pubads());
        // googletag.defineSlot('/36504930/m.diadona.id/dfp-newsTag1',[1,1], 'div-gpt-ad-diadona-newsTag1-oop').addService(googletag.pubads());
        // googletag.defineSlot('/36504930/m.diadona.id/dfp-newsTag2',[1,1], 'div-gpt-ad-diadona-newsTag2-oop').addService(googletag.pubads());
        // googletag.defineSlot(dfpAds_sled, [1,1],'div-gpt-ad-dfp-liftads-oop').addService(googletag.pubads());
        // googletag.defineSlot(dfpAds_slideup,[1,1], 'div-gpt-ad-dfp-slideup-oop').addService(googletag.pubads());
        // googletag.defineSlot(exposer_slot2,[1,1], 'div-gpt-ad-diadona-dfp-exposer-slot2').addService(googletag.pubads());
        
        // if (isReadPage) {
        //     googletag.defineSlot('/36504930/m.diadona.id/dfp-insertion',[1,1], 'div-gpt-ad-diadona-insertion-oop').addService(googletag.pubads());
        // }

        dfp_isLiftAds_active = false;
        dfp_isLiftSticker_active = false;
        dfp_isPopup_active = false;

        googletag.pubads().addEventListener('slotResponseReceived', function(event) {
            var dfp_slotDelivered = event.slot.getResponseInformation() ? 'block' : 'none'; /* check wheter there is ads or not*/
            var dfp_slotAdUnitPath = event.slot.getSlotId().getAdUnitPath(); /* get adunit path */
            var dfp_slotAdUnitID = event.slot.getSlotId().getId(); /* get adunit container id*/
            dfp_slotCount++;

            /*check if native ads creative was delivered*/
            if (dfp_slotDelivered == 'block') {

                if (dfp_slotAdUnitPath == dfpAds_sled) {
                    dfp_isLiftAds_active = true;
                    dfp_IsSledLive = !dfp_getCookieValue("dfp_overlayChecker");
                }
                if (dfp_slotAdUnitPath == dfpAds_slideup) {
                    dfp_isLiftSticker_active = true;
                }
                
                if (dfp_slotAdUnitPath == oop_dfpHeadline) {
                    console.log('INIT STICKY HEADLINE ');
                    var urlParams = new URLSearchParams(window.location.search);
                    var myParam = JSON.parse(urlParams.get('interval'));
                    headlineSticky(myParam);
                }

                /*check for topframe rendering process */
                if (dfp_slotAdUnitPath == oop_dfpTopframe) {
                    var LockScroll = {
						status: false,
						timeout: 3000,
						unset: function() {
							document.body.style.overflow = "initial";
							document.body.style.position = "unset";
							document.body.style.width = "unset";
							this.status = false;
						},
						set: function() {
							document.body.style.overflow = "hidden";
							document.body.style.position = "fixed";
							document.body.style.width = window.screen.width + "px";
							this.status = true;
							console.log('set');
						}
					};

                    let deviceOrientation = (window.innerHeight < window.innerWidth ? 1 : 0);
                    var that = LockScroll;
                    LockScroll.set();

                    if (LockScroll.status) {
                        setTimeout(function() {
                            that.unset();
                        }, that.timeout);
                    } else {
                        LockScroll.unset();
                    }
                    if (deviceOrientation) {
                        LockScroll.unset();
                    }
                    window.addEventListener("resize", function() {
                        let deviceOrientation = (window.innerHeight < window.innerWidth ? 1 : 0);
                        if (deviceOrientation) {
                            that.unset();
                            console.log("unset")
                        }
                    });
                    /*tweak oop iframe container*/
                    scWidth = 0;
                    if (self.innerHeight) {
                        scWidth = self.innerWidth;
                    }
                    if (document.documentElement && document.documentElement.clientHeight) {
                        scWidth = document.documentElement.clientWidth;
                    }
                    if (document.body) {
                        scWidth = document.body.clientWidth;
                    }
                    if (((scWidth * 100) / 480) < 100) {
                        scWidth = (scWidth * 100) / 480
                    } else {
                        scWidth = 100
                    }
                    document.getElementById("google_ads_iframe_" + dfp_slotAdUnitID) && document.getElementById("google_ads_iframe_" + dfp_slotAdUnitID).setAttribute("height", scWidth);
                    document.getElementById("google_ads_iframe_" + dfp_slotAdUnitID) && document.getElementById("google_ads_iframe_" + dfp_slotAdUnitID).setAttribute("width", "100%");
                }
                /*check for bottomframe rendering process*/
                if (dfp_slotAdUnitPath == oop_dfpBottomframe) {
                    document.getElementById("dfp-bframe-cont-transparent") && document.getElementById("dfp-bframe-cont-transparent").setAttribute("style", "opacity: 0.7; position: fixed; bottom: 0; min-height: 50px; background-color: #ECECEC; width: 100%; text-align: center;");
                }

            } else {
                if (dfp_slotAdUnitPath == oop_dfpTopframe) {
                    document.getElementById("google_ads_iframe_" + dfp_slotAdUnitID + "__container__") && document.getElementById("google_ads_iframe_" + dfp_slotAdUnitID + "__container__").setAttribute("style", "display: none;");
                }
            }
            /*CHECK AND EXECUTE CAMPAIGN WICH ARE RUNNING ON SPECIFIC VIEW*/
            if (dfp_slotCount == dfp_adunitCount) {
                dfp_checkUserViewCount();
            }
        });

        /*INITIATE ADS ON CONTINOUS PAGE */
        initiate_sc_readPage();

        /*DEPENDECIES FUNCTIONs*/
        function dfp_getCookieValue(e) {
            var n = document.cookie,
                t = n.indexOf(" " + e + "=");
            if (-1 == t && (t = n.indexOf(e + "=")), -1 == t) n = null;
            else {
                t = n.indexOf("=", t) + 1;
                var i = n.indexOf(";", t); - 1 == i && (i = n.length), n = unescape(n.substring(t, i))
            }
            return n
        }

        function dfp_setCookie(e, n, t, i) {
            n = escape(n);
            var o = extractDomain();
            if ("" == i) {
                var r = new Date;
                r.setHours(r.getHours(), r.getMinutes() + 10), i = r.toGMTString()
            }
            "" != t && (t = ";Path=" + t), document.cookie = e + "=" + n + ";expires=" + i + t + ";Domain=" + o
        }

        function extractDomain() {
            var e, n = window.location.href;
            return e = n.indexOf("://") > -1 ? n.split("/")[2] : n.split("/")[0], e = e.split(":")[0]
        }


        function initiate_LiftAds() {
            var divWrapper = (function() {
                var div = document.createElement('div');

                return function(el, id) {
                    var oDiv = div.cloneNode(false);
                    oDiv.id = id;
                    el.parentNode.insertBefore(oDiv, el);
                    oDiv.appendChild(el);
                }
            }());

            document.getElementById("div-gpt-ad-dfp-overlay-oop").setAttribute("id", "div-gpt-ad-dfp-liftads-oop");

            //additional script for tilt ads
            var divContainer = parent.document.getElementById("div-gpt-ad-dfp-liftads-oop");
            divWrapper(divContainer, 'tilt-relative');

            var divContainer = parent.document.getElementById("tilt-relative");
            divWrapper(divContainer, 'tilt-box');

            var divContainer = parent.document.getElementById("tilt-box");
            divWrapper(divContainer, 'tilt-content');

            var divContainer = parent.document.getElementById("tilt-content");
            divWrapper(divContainer, 'ads-tilt');

            googletag.cmd.push(function() {
                googletag.display('div-gpt-ad-dfp-liftads-oop');
            });

            return 1;
        }

        function initiate_LiftSticker() {
            document.getElementById("div-gpt-ad-dfp-overlay-oop") && document.getElementById("div-gpt-ad-dfp-overlay-oop").setAttribute("id", "div-gpt-ad-dfp-slideup-oop");

            googletag.cmd.push(function() {
                googletag.display('div-gpt-ad-dfp-slideup-oop');
            });
            return 3;
        }

        function dfp_checkUserViewCount() {
            if (!navigator.userAgent.match(/Opera Mini/i) /*&& !navigator.userAgent.match(/UCWEB/i) && !navigator.userAgent.match(/UCBrowser/i)*/ ) {
                var dfp_CookieName = "dfp_overlayChecker";
                var dfp_OverlayChecker = dfp_getCookieValue(dfp_CookieName);

                if (dfp_OverlayChecker == "" || dfp_OverlayChecker == null) dfp_OverlayChecker = "0_0";

                var dfp_OverlayCheckerParam = dfp_OverlayChecker.split("_");
                var dfp_Counter = typeof dfp_OverlayCheckerParam[1] != "undefined" ? parseInt(dfp_OverlayCheckerParam[1]) + 1 : 1;
                var dfp_PageView = typeof dfp_OverlayCheckerParam[0] != "undefined" ? parseInt(dfp_OverlayCheckerParam[0]) + 1 : 1;
                console.log('[DFP] dfp_OverlayChecker PV : ' + dfp_PageView + ' Counter : ' + dfp_Counter);
                console.log('[DFP] dfp_isLiftAds_active : ' + dfp_isLiftAds_active);
                console.log('[DFP] dfp_isLiftSticker_active : ' + dfp_isLiftSticker_active);

                if (dfp_Counter <= 3) {
                    dfp_Counter = viewOrder_format12(dfp_Counter);
                    dfp_setCookie(dfp_CookieName, dfp_PageView + "_" + dfp_Counter, "/", "");
                }
            }
        }

        /*Check view counter with combination : 
            1: liftads [AND] exposer
            2: liftsticker [AND] exposer
        */
        function viewOrder_format12(dfp_Counter) {
            console.log('[DFP] Counter format 1-2');
            if (dfp_Counter == 1) {

                if (dfp_isLiftAds_active) {

                    initiate_LiftAds();


                    dfp_Counter = 2;

                } else if (dfp_isLiftSticker_active) {

                    dfp_Counter = initiate_LiftSticker();

                }

            } else if (dfp_Counter == 2 || dfp_Counter == 3) {

                if (dfp_isLiftSticker_active) dfp_Counter = initiate_LiftSticker();
            }

            return dfp_Counter;
        }

        /*initiate sc in readpage Mobile*/
        function initiate_sc_readPage() {
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
                        isShown = target.getAttribute('data-pushed'),
                        container;
                    if (isShown && el.attributeName === 'data-pushed') {
                        countShowcaseContainer++;

                        gam_sc = googletag.defineSlot('/36504930/m.diadona.id/dfp-sc', [[300, 250],[250, 250],[200, 200]], showcaseId + countShowcaseContainer).addService(googletag.pubads());
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

        }

        /* KRUX and DMP TRACKING */
        if (typeof Krux !== "undefined") {
            googletag.pubads().setTargeting('ksg', Krux.segments);
            googletag.pubads().setTargeting('kuid', Krux.user);
        }

        if (isMatcont) {
            googletag.pubads().setTargeting("isMatcont", ["1"]);
        }

        if (bannedSurveyCookies !== null) {
            googletag.pubads().setTargeting('bannedSurvey', bannedSurveyCampaign);
        }

        googletag.pubads().setTargeting('browsertype', browserType);
        googletag.pubads().setTargeting("tags", tagForAds)
        googletag.pubads().setTargeting("rubric", [dfp_Rubric]);
        googletag.pubads().setTargeting("page_url", [dfp_Article]);
        googletag.pubads().setTargeting("PageType", [pageType]);
        googletag.pubads().setTargeting("currentUrl", urlPath);
        googletag.pubads().setCentering(true);
        googletag.pubads().enableSingleRequest();
        googletag.pubads().collapseEmptyDivs();
        googletag.enableServices();

        /*Bottom Frame Scrolling*/
        var timedBottomFrm = null;
        window.addEventListener("scroll", scrollBottomFrame);

        function scrollBottomFrame() {
            var scrollNode = document.scrollingElement || document.documentElement;
            var scrollTop = scrollNode.scrollTop;
            if (scrollTop >= "200") {
                window.removeEventListener("scroll", scrollBottomFrame);
                timedBottomFrm = googletag.defineSlot(oop_dfpBottomframe, [320, 50], 'div-gpt-ad-diadona-bottomfrm').addService(googletag.pubads());
                googletag.display('div-gpt-ad-diadona-bottomfrm');
                googletag.pubads().refresh([timedBottomFrm]);

                window.GAMLibrary.refreshSlot = timedBottomFrm;
                window.GAMLibrary.setGamBFInterval();
            }
        }
    });

    googletag.cmd.push(function() {googletag.display('div-gpt-ad-diadona-topfrm-oop');});
    googletag.cmd.push(function() {googletag.display('div-gpt-ad-diadona-hl');});
    googletag.cmd.push(function() {googletag.display('div-gpt-ad-diadona-sc');});
    googletag.cmd.push(function() {googletag.display('div-gpt-ad-diadona-dfp-exposer-slot1');});
    googletag.cmd.push(function() {googletag.display('div-gpt-ad-diadona-dfp-exposer-slot2');});
    googletag.cmd.push(function() {googletag.display('div-gpt-ad-diadona-newsTag1-oop');});
    googletag.cmd.push(function() {googletag.display('div-gpt-ad-diadona-newsTag2-oop');});
    if (isReadPage) {
        googletag.cmd.push(function() {googletag.display('div-gpt-ad-diadona-insertion-oop');});
    }
    var gptdiadonaStyle = document.createElement('style');
    gptdiadonaStyle.textContent = '#div-gpt-ad-diadona-hl{-webkit-transition:margin .5s;transition:margin .5s;margin-top:0}.dfp-hl-sticky{position:fixed;top:0;min-height:50px;left:50%;margin-left:-160px!important;z-index:99999}';
    document.body.appendChild(gptdiadonaStyle);

    /* ===== HEADLINESTICKY METHOD - DEFAULT 3s ===== */
    var headlineStickyInterval=3,headlineStickyStatus=!1;function headlineSticky(t){null!=t&&(headlineStickyInterval=t),console.log(headlineStickyInterval);var e=document.getElementById("div-gpt-ad-diadona-hl"),n=document.createElement("div");n.setAttribute("id","div-gpt-ad-diadona-hl-shadow"),e.parentElement.insertBefore(n,e),injectStickyStyleAndAnimation(),window.addEventListener("scroll",headlineStickyScrollEevent)}function headlineStickyScrollEevent(){var t=document.getElementById("div-gpt-ad-diadona-hl"),e=document.getElementById("div-gpt-ad-diadona-hl-shadow").getBoundingClientRect().top;document.querySelector(".layout__nav-content"),document.documentElement.scrollTop||document.body.scrollTop;headlineStickyStatus?e<=0||(window.removeEventListener("scroll",headlineStickyScrollEevent),removeStickyHeadline(t,!1)):e<=0&&(t.classList.add("hl-active-sticky"),t.style="",removeStickyHeadline(t,!0),headlineStickyStatus=!0)}function removeStickyHeadline(t,e){var n=setInterval(function(){headlineStickyInterval<=0?(t.classList.remove("hl-active-sticky"),t.classList.remove("hl-navbar-hanging"),t.style.margin="10px 0",clearInterval(n),window.removeEventListener("scroll",headlineStickyScrollEevent)):headlineStickyInterval--},1e3);e||(clearInterval(n),t.classList.remove("hl-active-sticky"),t.classList.remove("hl-navbar-hanging"),t.style.margin="10px 0")}function injectStickyStyleAndAnimation(){var t=document.createElement("style");t.textContent="\n\t\t.hl-active-sticky {\n\t\t\tposition: fixed;\n\t\t\ttop: -100%;\n\t\t\tz-index: 9999;\n\t\t\tleft: 50%;\n\t\t\ttransform: translateX(-50%);\n\t\t\tmargin: 0;\n\t\t\ttransition : margin-top .5s ease;\n\t\t\tanimation: hlSlideDown .5s forwards;\n\t\t}\n\n\t\t.hl-navbar-hanging{\n\t\t\tmargin-top : 50px !important;\n\t\t}\n\n\t\t@keyframes hlSlideDown{\n\t\t\t0%{top : -100px;}\n\t\t\t100%{top : 0px;}\n\t\t}\n\t\t",document.head.appendChild(t)}
    /* ===== HEADLINESTICKY METHOD ===== */