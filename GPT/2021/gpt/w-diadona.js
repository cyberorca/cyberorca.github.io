var gpt_gam_ver = 'v06-DK';
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
        var url = '//ads.pubmatic.com/AdServer/js/pwt/156536/456';
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
/* END - LOAD PUBMATIC, REVIVE, GOOGLE ADS */
	/** End Google GPT Code **/

	/* DMP CATEGORY LIST */
window.widgetBLV02 = true;
window.createDMPTracker = function(adsCatList, dfpTracker, macro) {
    /*
  	var catList = ["fashion-events", "movie-event", "beauty-events", "comedy-events", "fan-conventions", "lifestyle-events", "musical-events", "sporting-events", "auto-shows", "parenting-events", "political-event", "parenting-children-aged-4-11", "special-needs-kids", "apartments", "life-insurance", "motor-insurance", "health-insurance", "education-insurance", "travel-insurance", "home-insurance", "automotive", "auto-racing", "parenting-babies-and-toddlers", "beauty", "disasters", "local-news", "law", "international-news", "crime", "national-news", "elections", "politics", "government-business", "business-and-finance", "cloud-computing", "content-channel", "education", "outdoor-decorating", "consumer-electronics", "esports", "events", "family-and-relationships", "kids-fashion", "mens-fashion", "womens-fashion", "fitness-and-exercise", "fmcg-food-and-drink", "fmcg-personal-care", "fmcg-tobacco", "console-games", "pc-games-and-mobile", "gaming", "computer-peripherals", "hatchback", "health", "healthy-and-wellness", "hobbies-interest", "home-and-garden", "homeschooling", "hotels-and-motels", "pharmaceutical-industry", "financial-industry", "entertainment-industry", "healthcare-industry", "construction-industry", "legal-services-industry", "power-and-energy-industry", "logistics-and-transportation-industry", "food-industry", "manufacturing-industry", "media-industry", "mechanical-and-industrial-engineering-industry", "automotive-industry", "education-industry", "aviation-industry", "hospitality-industry", "advertising-industry", "agriculture", "real-estate-industry", "retail-industry", "technology-industry", "telecommunications-industry", "interior-decorating", "internet", "internet-safety", "residentials-buy-sell-and-rentals", "auto-buying-and-selling", "credit-cards", "household-supplies", "injuries", "pregnancy", "childrens-health", "adults-health", "mental-health", "reproductive-health", "computing", "bollywood-content", "dangdut-content", "movie-content", "entertainment-content", "hijab-content", "hollywood-content", "korean-content", "quiz-content", "music-content", "coffee", "course-education", "green-vehicles", "frozen-foods", "fast-foods", "desserts-and-baking", "snacks", "healthy-cooking-and-eating", "make-up", "marketing-and-advertising", "soft-drinks", "smart-cars", "luxury-cars", "budget-cars", "performance-cars", "mobile-apps", "movies", "mpv", "news-and-politics", "nutrition", "non-profit-organizations", "business-expos-and-conferences", "parenting", "marketplace/ecommerce", "daycare-and-pre-school", "weight-loss", "early-childhood-education", "alternative-medicine", "chronic-disease", "ailment", "sports-equipment", "skin-care", "hair-care", "body-care", "facecare", "home-appliances", "personal-finance", "houses", "loans", "fmcg-oral-care", "fmcg-hair-care", "fmcg-body-care", "fmcg-face-care", "milk-products", "tickets-promo-and-vouchers", "property", "relationship", "parenting-teens", "auto-rentals", "sales-and-promotions", "primary-education", "online-education", "private-school", "soccer", "motorcycles", "auto-repair", "shopping-and-ecommerce", "smartphones", "social-networking", "computer-software-and-applications", "auto-parts", "sports", "startups", "style-and-fashion", "suv", "water-services", "gas-and-electric", "internet-service-providers", "phone-services", "technology-and-computing", "television", "physical-therapy", "train-tickets", "flight-tickets", "online-transportation", "travel", "budget-travel", "special-interest-tv", "childrens-tv", "animation-tv", "news-tv", "drama-tv", "comedy-tv", "music-tv", "sports-tv", "reality-tv", "college-education", "vaccines", "wearable-technology", "web-hosting", "family-travel", "culinary-travel", "religious-tourism"],
        filteredCat = Object.values(catList).filter((val, key) => adsCatList.find(alVal => alVal == val));
    window.createCDPTracker(filteredCat, macro);
    */
    window.createCDPTracker(adsCatList, macro);
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
	var blackListWords = new Array('matcont', 'aduhai', 'kelamin', 'vital', 'anal', 'belahan', 'bercinta', 'bergairah', 'gairah', 'intim', 'bikini', 'bokong', 'boob', 'bra', 'bugil', 'celana', 'ciuman', 'cleavage', 'dada', 'dewasa', 'diremas', 'doggie', 'ejakulasi', 'ereksi', 'erotis', 'foreplay', 'kiss', 'seks', 'gangbang', 'horny', 'hot', 'kamasutra', 'keperawanan', 'perawan', 'kondom', 'kontrasepsi', 'libido', 'lingerie', 'masturbasi', 'mature', 'menggairahkan', 'menggoda', 'mesra', 'miss-v', 'mr-p', 'nakal', 'naughty', 'nipple', 'nipples', 'onani', 'oral', 'oral seks', 'organ', 'orgasme', 'paha', 'pantat', 'panties', 'payudara', 'pelecehan', 'telanjang', 'penetrasi', 'penis', 'perkosa', 'perkosaan', 'pole', 'porno', 'pornoaksi', 'pornografi', 'telentang', 'provokatif', 'putting', 'ranjang', 'sex', 'penetratif', 'seksi', 'seksual', 'sensual', 'seronok', 'doll', 'toys', 'skandal', 'sperma', 'striptease', 'striptis', 'syur', 'terangsang', 'tiduri', 'topless', 'vagina', 'vibrator', 'lendir', 'prostitusi', 'homoseks', 'meraba-raba', 'mesum', 'memerkosa', 'rudapaksa', 'kemaluan', 'kasus asusila', 'pemerkosaan', 'hubungan seksual', 'hubungan intim', 'video porno', 'berita hoax', 'ternyata hoax', 'ahed tamimi', 'konflik palestina israel', 'konflik suriah', 'ujaran kebencian', 'g30s', 'kediktatoran arab saudi', 'konflik palestina-israel', 'fpi', 'penembakan', 'pelecehan seksual', 'tips seks', 'komunitas swinger', 'fenomena kelainan seksual', 'penyimpangan seks', 'posisi seks', 'obat kuat', 'bentuk payudara', 'implan payudara', 'chat firza-rizieq', 'anarkisme suporter sepakbola', 'bentrok suporter', 'pengeroyokan', 'penganiayaan', 'begal motor', 'kekerasan pada wartawan', 'pemerkosaan anak', 'pencabulan', 'bentrokan warga', 'bentrokan', 'kasus narkoba', 'akibat merokok', 'bahaya merokok', 'berhenti merokok', 'cara berhenti merokok', 'efek berhenti merokok', 'larangan merokok', 'tips berhenti merokok', 'rokok elektrik', 'pilpres 2019', 'koalisi pilpres 2019', 'koalisi prabowo', 'koalisi jokowi', 'prabowo-sandiaga', 'ratna sarumpaet', 'capres jokowi', 'capres prabowo', 'kebohongan ratna sarumpaet', 'prabowo subianto', 'jemaah ansharut daulah', 'aliran sesat', 'lia eden', 'kisah mualaf', 'penistaan agama', 'suporter tewas', 'gempa palu', 'gempa donggala', 'gempa sulawesi tengah', 'pembunuhan', 'tsunami palu', 'penemuan mayat', 'lion air jatuh di karawang', 'lion air jatuh', 'pembunuhan sadis', 'lion air hilang kontak', 'pesawat jatuh', 'pesawat hilang kontak', 'kecelakaan', 'kapal tenggelam di danau toba', 'kecelakaan bus', 'kapal tenggelam', 'kasus tabrak lari', 'bunuh diri', 'perselingkuhan', 'kisah perselingkuhan', 'razia pasangan mesum', 'seks bebas', 'gangguan jiwa', 'tes keperawanan', 'kontroversi hukuman mati', 'stres dan depresi', 'ahok gugat cerai veronica tan', 'Kanker', 'Impotensi', 'merokok', 'Perokok', 'Rokok', 'tembakau', 'Pelanggaran', 'Tablet', 'Overdosis', 'Jantung', 'Stroke', 'Cancer', 'Narkoba', 'Djarum', 'Ganja', 'BNN', 'Obesitas', 'Osteoporosis', 'Corona', 'Corona di indonesia', 'virus corona', 'virus-corona', 'covid-19', 'wabah corona', 'menewaskan', 'menewaskan orang', 'mengancam nyawa', 'meninggal', 'meninggal dunia', 'orang mati', 'orang tewas', 'pemakaman', 'petugas penyelamat', 'telah meninggal', 'terbunuh', 'tewas', 'tewaskan', 'tim penyelamat', 'wanita meninggal', 'autopsi', 'belasungkawa', 'bencana', 'bencana besar', 'bunuh orang', 'darurat bencana', 'dilaporkan tewas', 'dimakamkan', 'dipastikan tewas', 'ditemukan mati', 'ditemukan tewas', 'hilangnya nyawa', 'identitas korban', 'inalillahi', 'jasad korban', 'jasadnya', 'jenasah wanita', 'jenazah', 'jenazah pria', 'jenazah teridentifikasi', 'jasad', 'kehilangan hidupnya', 'kehilangan nyawa', 'kehilangan nyawanya', 'kematian', 'korban', 'korban jiwa', 'korban meninggal', 'korban tewas', 'mati', 'mayat', 'mayat korban', 'membunuh', 'membunuh istrinya', 'membunuh mereka', 'membunuh suaminya', 'menemui ajal', 'mengalami koma', 'menghembuskan nafas terakhir', 'menimbulkan korban', 'meninggal akibat sakit', 'menyebabkan kematian', 'meregang nyawa', 'meregggut nyawa', 'modar', 'nyawa hilang', 'nyawa melayang', 'penyebab kematian', 'tak bernyawa', 'tak sadarkan diri', 'terkapar', 'tidak bernyawa', 'tutup usia', 'wafat', 'kematian virus', 'kematian wabah', 'korban terinfeksi', 'virus menyerang', 'merenggut nyawa', 'pelayat', 'hilangkan nyawa', 'renggut nyawa', 'wabah', 'keadaan kritis', 'kehilangan darah', 'merenggut jiwa', 'telan nyawa', 'menelan nyawa', 'memakan nyawa', 'dinyatakan meninggal', 'nyawa tak tertolong', 'penyakit', 'sakit pernapasan', 'sesak', 'korona', 'corona', 'odp', 'pdp', 'virus', 'rumah sakit', 'Covid-19', 'virus korona', 'positif korona', 'COVID-19', 'terjangkit COVID-19', 'terinfeksi virus corona'),
        urlPath = document.URL,
		urlArray = urlPath.split("/"),
		dfp_Channel = window.location.host,
		alowedPath = new Array("family", "relationship", "health", "food", "travel", "beauty", "d-stories", "photo"),
		urlSlot = "",
		nLevel = 1,
		isMatcont = !1,
		dfp_Article = urlArray[urlArray.length - 1];
        var userAgent = navigator.userAgent.toLowerCase();
        const GAMisTablet = /(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/.test(userAgent);
    
    function arrToLowerCase(arr){
        return arr.map(function(v,i){
            return v.toLowerCase();
        });
    }

	function inArray(needle, haystack) {
		var length = haystack.length;
		for (var i = 0; i < length; i++) {
			if (haystack[i] == needle) return true;
		}
		return false;
	}

	function document_meta(a) {
		var e = "",
			o = document.getElementsByTagName("meta");
		if (o)
			for (var t = 0, g = o.length; t < g; t++) o[t].name.toLowerCase() == a && (e += o[t].content);
		return "" != e ? e : ""
	}

	function document_keywords() {
		var keywords = '';
		var metas = document.getElementsByTagName('meta');
		if (metas) {
			for (var x = 0, y = metas.length; x < y; x++) {
				if (metas[x].name.toLowerCase() == "keywords") {
					keywords += metas[x].content;
				}
			}
		}
		return keywords != '' ? keywords : '';
	}

	urlArray.forEach(function(sPath) {
		if (inArray(sPath, alowedPath) && nLevel <= 1) {
			urlSlot += sPath + '/';
			nLevel++;
		}
	});

	var iOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);

	/*INIT HEIGHT TOPFRAME AND BILLBOARD*/
	var drmTopFrm = document.getElementById('div-gpt-ad-diadona-topfrm-oop');
	var drmBill = document.getElementById('div-gpt-ad-diadona-billboard-oop');
	if (drmTopFrm != null) drmTopFrm.style.height = '0px';
	if (drmBill != null) drmBill.style.height = '0px';

	/*MATURE CONTENT DEFINED VAR*/
	if (!blackListWords) {
		var blackListWords = new Array('matcont');
    }
    
    blackListWords = arrToLowerCase(blackListWords);

	var elImmersiveContainer = document.createElement('div');
	elImmersiveContainer.setAttribute('id', 'div-gpt-ad-diadona-immersive-oop');
	if (document.body.appendChild(elImmersiveContainer)) {
		googletag.cmd.push(function() {

			var oop_dfpBillboard = '/36504930/www.diadona.id/dfp-billboard',
				oop_dfpTopfrm = '/36504930/www.diadona.id/dfp-topfrm',
				oop_dfpMarcomm1 = '/36504930/www.diadona.id/dfp-marcomm1',
				oop_dfpBottomFrm = '/36504930/www.diadona.id/dfp-bottomfrm',
				oop_gamImmersive = '/36504930/www.diadona.id/dfp-immersive',
				/* DEFINE IMMERSIVE TAG - DO NOT CHANGE THE SLOT ORDER, IMMERSIVE ALWAYS ON THE 1st POSITION - */
				gam_immersive = googletag.defineOutOfPageSlot(oop_gamImmersive, 'div-gpt-ad-diadona-immersive-oop').addService(googletag.pubads()),
				dfp_pageTitle = urlArray[urlArray.length - 1],
				dfp_titles = dfp_pageTitle.klyFiltering("-"),
				dfp_pageKeywords = document_keywords(),
				dfp_keyword = dfp_pageKeywords.klyFiltering(","),
				dfp_pageDesc = document_meta("description"),
				dfp_desc = dfp_pageDesc.klyFiltering(","),
				pageType = "FrontPage",
				dfp_Rubric = dfp_Channel + " - " + (urlSlot == "" ? "homepage" : urlSlot.replace('/', '')),
				tagForAds = (typeof window.kly !== 'undefined') ? kly.gtm.tag.klyFiltering("|") : [],
				dfp_keywords = dfp_keyword.concat(dfp_titles, dfp_desc, tagForAds);

			if (dfp_Article.length > 0) {
				pageType = "ReadPage";
			} else {
				pageType = (urlSlot == "") ? "FrontPage" : "ChannelPage";
			}

			dfp_keywords.forEach(function(sKeyword) {
				tagForAds.push(sKeyword);
				if (inArray(sKeyword.trim(), blackListWords)) {
					isMatcont = true;
				}
			});

			googletag.defineSlot('/36504930/www.diadona.id/dfp-lb', [
				[970, 90],
				[728, 90],
				[970, 250]
			], 'div-gpt-ad-diadona-lb').addService(googletag.pubads()).setTargeting("leaderboard_type", ["direct"]);
			googletag.defineSlot('/36504930/www.diadona.id/dfp-sc1', [
				[300, 600],
				[300, 250],
				[160, 600]
			], 'div-gpt-ad-diadona-sc1').addService(googletag.pubads());
			googletag.defineSlot('/36504930/www.diadona.id/dfp-sc2', [
				[300, 250],
				[250, 250]
			], 'div-gpt-ad-diadona-sc2').addService(googletag.pubads());

			googletag.defineOutOfPageSlot(oop_dfpMarcomm1, 'div-gpt-ad-diadona-marcomm1-oop').addService(googletag.pubads());
			googletag.defineOutOfPageSlot('/36504930/www.diadona.id/dfp-pop', 'div-gpt-ad-diadona-popup-oop').addService(googletag.pubads());
			googletag.defineOutOfPageSlot('/36504930/www.diadona.id/dfp-newsTag1', 'div-gpt-ad-diadona-newsTag1-oop').addService(googletag.pubads());
			googletag.defineOutOfPageSlot('/36504930/www.diadona.id/dfp-newsTag2', 'div-gpt-ad-diadona-newsTag2-oop').addService(googletag.pubads());


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

			googletag.pubads().addEventListener("slotRenderEnded", function(g) {
				if (g.slot == gam_immersive) {
					if (g.isEmpty) {
						gam_billboard = googletag.defineOutOfPageSlot(oop_dfpBillboard, 'div-gpt-ad-diadona-billboard-oop').addService(googletag.pubads());
						gam_topfrm = googletag.defineOutOfPageSlot(oop_dfpTopfrm, 'div-gpt-ad-diadona-topfrm-oop').addService(googletag.pubads());
                      	gam_bottomfrm = googletag.defineSlot(oop_dfpBottomFrm, [468, 60], 'div-gpt-ad-diadona-bottomfrm-oop').addService(googletag.pubads());
                        
                        googletag.cmd.push(function() {googletag.display("div-gpt-ad-diadona-billboard-oop")});
                        googletag.cmd.push(function() {googletag.display("div-gpt-ad-diadona-topfrm-oop")});
                        googletag.cmd.push(function() {googletag.display("div-gpt-ad-diadona-bottomfrm-oop")});

                        if(!GAMisTablet){
                            var gam_skinad = googletag.defineOutOfPageSlot('/36504930/www.diadona.id/dfp-skin', 'div-gpt-ad-diadona-skinad-oop').addService(googletag.pubads());
                            googletag.cmd.push(function() {googletag.display("div-gpt-ad-diadona-skinad-oop")});
                            googletag.pubads().refresh([gam_billboard, gam_topfrm, gam_bottomfrm, gam_skinad]);
                        }else{
                            googletag.pubads().refresh([gam_billboard, gam_topfrm, gam_bottomfrm]);
                        }
					}
				}
			});

			/*initiate sc in readpage*/
			initiate_sc_readPage();

			/*initiate sc in readpage Desktop*/
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

							gam_sc = googletag.defineSlot('/36504930/www.diadona.id/dfp-sc2', [[300, 250],[250, 250]], showcaseId + countShowcaseContainer).addService(googletag.pubads());
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

			/* set lfloat appearance */
			function renderLfloat() {
				googletag.defineOutOfPageSlot("/36504930/www.diadona.id/dfp-lFloating", "div-gpt-ad-diadona-lFloating-oop").addService(googletag.pubads());
				googletag.cmd.push(function() {googletag.display("div-gpt-ad-diadona-lFloating-oop")});
			}

			var lfloatCookie = dfp_getCookieValue("dfp_lfloatCookie");
			if (parseInt(lfloatCookie) == 0 || lfloatCookie == null) {
				dfp_setCookie("dfp_lfloatCookie", 1);
			} else if (parseInt(lfloatCookie) == 1) {
				dfp_setCookie("dfp_lfloatCookie", 2);
				renderLfloat();
			} else if (parseInt(lfloatCookie) == 2) {
				dfp_setCookie("dfp_lfloatCookie", 3);
				renderLfloat();
			}
			/* End set lfloat appearance */

			if (isMatcont) {
				googletag.pubads().setTargeting("isMatcont", ["1"]);
			}

			googletag.pubads().setTargeting("currentUrl", urlPath);
			googletag.pubads().setTargeting("domain", dfp_Channel);
			googletag.pubads().setTargeting("tags", tagForAds);
			googletag.pubads().setTargeting("rubric", [dfp_Rubric]);
			googletag.pubads().setTargeting("PageType", [pageType]);
			googletag.pubads().setTargeting("page_url", [dfp_Article]);
			if(typeof Krux !== 'undefined'){
                googletag.pubads().setTargeting('ksg', Krux.segments);
                googletag.pubads().setTargeting('kuid', Krux.user);
            }
          
            /* SET VISITOR ID AS PUBLISHER PROVIDED ID - START*/
var cVisitorId = (visId = document.cookie.split('liputan6_id_visitor_id=')[1]) ? visId.split(';')[0].replace(/[^a-zA-Z0-9]/ig,'') : 0;
cVisitorId ? googletag.pubads().setPublisherProvidedId(cVisitorId+'kly') : '';
/* SET VISITOR ID AS PUBLISHER PROVIDED ID - END*/
             
			googletag.pubads().setCentering(true);
			googletag.pubads().enableSingleRequest();
			googletag.pubads().collapseEmptyDivs();
			googletag.enableServices();
		});

		googletag.cmd.push(function() {googletag.display('div-gpt-ad-diadona-immersive-oop')});
		googletag.cmd.push(function() {googletag.display('div-gpt-ad-diadona-lb')});
		googletag.cmd.push(function() {googletag.display("div-gpt-ad-diadona-sc1")});
		googletag.cmd.push(function() {googletag.display("div-gpt-ad-diadona-sc2")});
		googletag.cmd.push(function() {googletag.display("div-gpt-ad-diadona-marcomm1-oop")});
		googletag.cmd.push(function() {googletag.display("div-gpt-ad-diadona-popup-oop")});
		googletag.cmd.push(function() {googletag.display("div-gpt-ad-diadona-newsTag1-oop")});
		googletag.cmd.push(function() {googletag.display("div-gpt-ad-diadona-newsTag2-oop")});
	}