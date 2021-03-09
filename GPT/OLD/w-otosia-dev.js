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
window.GAMLibrary = {
  gamImmersive        :   '/36504930/www.otosia.com/dfp-immersive',
  dfpBillboard        :   '/36504930/www.otosia.com/dfp-billboard',
  dfpTopfrm           :   '/36504930/www.otosia.com/dfp-topfrm',
  dfpSkinad           :   '/36504930/www.otosia.com/dfp-skin',
  dfpBottomfrm        :   '/36504930/www.otosia.com/dfp-bottomfrm',
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
  inArray             :   function (o, a) {
                            for (var t = a.length, e = 0; e < t; e++)
                              if (a[e] == o) return !0;
                            return !1
                          },
  arrToLowerCase      :   function (arr) {
                            return arr.map(function(v,i) {
                              return v.toLowerCase();
                            });
                          }
}

/* START - LOAD PUBMATIC, GOOGLE ADS & REVIVE */
// var PWT = {},
//     googletag = googletag || {};
//     googletag.cmd = googletag.cmd || [], PWT.jsLoaded = function() {
//           ! function() {
//                     var o = document.createElement("script"),
//                         a = "https:" == document.location.protocol,
//                         t = document.getElementsByTagName("script")[0];
//                         /* GPT */
//                         o.async = true;
//                         o.src = (a ? "https:" : "http:") + "//www.googletagservices.com/tag/js/gpt.js";
//                         t.parentNode.insertBefore(o, t);
            			
//           }()
//       },
//       function() {
//           var o = window.location.href,
//               a = "";
//           if (o.indexOf("pwtv=") > 0) {
//               var t = /pwtv=(.*?)(&|$)/g.exec(o);
//               t.length >= 2 && t[1].length > 0 && (a = "/" + t[1])
//           }
//           var e = document.createElement("script");
//           e.async = !0, e.type = "text/javascript", e.src = "//ads.pubmatic.com/AdServer/js/pwt/156536/513" + a + "/pwt.js";
//           var g = document.getElementsByTagName("script")[0];
//           g.parentNode.insertBefore(e, g)
//       }();
//   var RTBx = RTBx || {};
//   RTBx = {
//       CookieName: "rh_kln",
//       rtgt_set: !1,
//       GetCookie: function(o) {
//           for (var a = o + "=", t = document.cookie.split("; "), e = 0; e < t.length; e++) {
//               for (var g = t[e];
//                   " " == g.charAt(0);) g = g.substring(1);
//               if (0 == g.indexOf(a)) return decodeURIComponent(g.substring(a.length, g.length))
//           }
//           return ""
//       },
//       rtgt: function() {
//           if (!1 === RTBx.rtgt_set) {
//               var o = "https://x-" + RTBx.CookieName.substring(3) + ".inventorycdn.com/js?cookie=" + RTBx.CookieName,
//                   a = document.createElement("script");
//               a.type = "text/javascript", a.src = o, a.async = !0, document.getElementsByTagName("head").length > 0 ? document.getElementsByTagName("head")[0].appendChild(a) : document.getElementsByTagName("body").length > 0 && document.getElementsByTagName("body")[0].appendChild(a), RTBx.rtgt_set = !0
//           }
//       },
//       SetRetargeting: function() {
//           RTBx.rtgt();
//           for (var o = RTBx.GetCookie(RTBx.CookieName), a = o.split("|"), t = [], e = 0; e < a.length; e++) t.push(a[e].split("/")[0]);
//           o.length > 0 && googletag.cmd.push(function() {
//               googletag.pubads().setTargeting("keylimit", t).addService(googletag.pubads()), googletag.enableServices()
//           })
//       }
//   };
//   try {
//       RTBx.SetRetargeting()
//   } catch (o) {}

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
    var url = '//ads.pubmatic.com/AdServer/js/pwt/156536/513';
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
/* END - LOAD PUBMATIC, GOOGLE ADS & REVIVE */

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
        
  googletag.cmd.push(function() {
    var urlPath = document.URL;
    var isMatcont = false;
    var blackListWords = new Array('matcont', 'aduhai', 'kelamin', 'vital', 'anal', 'belahan', 'bercinta', 'bergairah', 'gairah', 'intim', 'bikini', 'bokong', 'boob', 'bra', 'bugil', 'celana', 'ciuman', 'cleavage', 'dada', 'dewasa', 'diremas', 'doggie', 'ejakulasi', 'ereksi', 'erotis', 'foreplay', 'kiss', 'seks', 'gangbang', 'horny', 'hot', 'kamasutra', 'keperawanan', 'perawan', 'kondom', 'kontrasepsi', 'libido', 'lingerie', 'masturbasi', 'mature', 'menggairahkan', 'menggoda', 'mesra', 'miss-v', 'mr-p', 'nakal', 'naughty', 'nipple', 'nipples', 'onani', 'oral', 'oral seks', 'organ', 'orgasme', 'paha', 'pantat', 'panties', 'payudara', 'pelecehan', 'telanjang', 'penetrasi', 'penis', 'perkosa', 'perkosaan', 'pole', 'porno', 'pornoaksi', 'pornografi', 'telentang', 'provokatif', 'putting', 'ranjang', 'sex', 'penetratif', 'seksi', 'seksual', 'sensual', 'seronok', 'doll', 'toys', 'skandal', 'sperma', 'striptease', 'striptis', 'syur', 'terangsang', 'tiduri', 'topless', 'vagina', 'vibrator', 'lendir', 'prostitusi', 'homoseks', 'meraba-raba', 'mesum', 'memerkosa', 'rudapaksa', 'kemaluan', 'kasus asusila', 'pemerkosaan', 'hubungan seksual', 'hubungan intim', 'video porno', 'berita hoax', 'ternyata hoax', 'ahed tamimi', 'konflik palestina israel', 'konflik suriah', 'ujaran kebencian', 'g30s', 'kediktatoran arab saudi', 'konflik palestina-israel', 'fpi', 'penembakan', 'pelecehan seksual', 'tips seks', 'komunitas swinger', 'fenomena kelainan seksual', 'penyimpangan seks', 'posisi seks', 'obat kuat', 'bentuk payudara', 'implan payudara', 'chat firza-rizieq', 'anarkisme suporter sepakbola', 'bentrok suporter', 'pengeroyokan', 'penganiayaan', 'begal motor', 'kekerasan pada wartawan', 'pemerkosaan anak', 'pencabulan', 'bentrokan warga', 'bentrokan', 'kasus narkoba', 'akibat merokok', 'bahaya merokok', 'berhenti merokok', 'cara berhenti merokok', 'efek berhenti merokok', 'larangan merokok', 'tips berhenti merokok', 'rokok elektrik', 'pilpres 2019', 'koalisi pilpres 2019', 'koalisi prabowo', 'koalisi jokowi', 'prabowo-sandiaga', 'ratna sarumpaet', 'capres jokowi', 'capres prabowo', 'kebohongan ratna sarumpaet', 'prabowo subianto', 'jemaah ansharut daulah', 'aliran sesat', 'lia eden', 'kisah mualaf', 'penistaan agama', 'suporter tewas', 'gempa palu', 'gempa donggala', 'gempa sulawesi tengah', 'pembunuhan', 'tsunami palu', 'penemuan mayat', 'lion air jatuh di karawang', 'lion air jatuh', 'pembunuhan sadis', 'lion air hilang kontak', 'pesawat jatuh', 'pesawat hilang kontak', 'kecelakaan', 'kapal tenggelam di danau toba', 'kecelakaan bus', 'kapal tenggelam', 'kasus tabrak lari', 'bunuh diri', 'perselingkuhan', 'kisah perselingkuhan', 'razia pasangan mesum', 'seks bebas', 'gangguan jiwa', 'tes keperawanan', 'kontroversi hukuman mati', 'stres dan depresi', 'ahok gugat cerai veronica tan', 'Kanker', 'Impotensi', 'merokok', 'Perokok', 'Rokok', 'tembakau', 'Pelanggaran', 'Tablet', 'Overdosis', 'Jantung', 'Stroke', 'Cancer', 'Narkoba', 'Djarum', 'Ganja', 'BNN', 'Obesitas', 'Osteoporosis', 'Corona', 'Corona di indonesia', 'virus corona', 'virus-corona', 'covid-19', 'wabah corona', 'menewaskan', 'menewaskan orang', 'mengancam nyawa', 'meninggal', 'meninggal dunia', 'orang mati', 'orang tewas', 'pemakaman', 'petugas penyelamat', 'telah meninggal', 'terbunuh', 'tewas', 'tewaskan', 'tim penyelamat', 'wanita meninggal', 'autopsi', 'belasungkawa', 'bencana', 'bencana besar', 'bunuh orang', 'darurat bencana', 'dilaporkan tewas', 'dimakamkan', 'dipastikan tewas', 'ditemukan mati', 'ditemukan tewas', 'hilangnya nyawa', 'identitas korban', 'inalillahi', 'jasad korban', 'jasadnya', 'jenasah wanita', 'jenazah', 'jenazah pria', 'jenazah teridentifikasi', 'jasad', 'kehilangan hidupnya', 'kehilangan nyawa', 'kehilangan nyawanya', 'kematian', 'korban', 'korban jiwa', 'korban meninggal', 'korban tewas', 'mati', 'mayat', 'mayat korban', 'membunuh', 'membunuh istrinya', 'membunuh mereka', 'membunuh suaminya', 'menemui ajal', 'mengalami koma', 'menghembuskan nafas terakhir', 'menimbulkan korban', 'meninggal akibat sakit', 'menyebabkan kematian', 'meregang nyawa', 'meregggut nyawa', 'modar', 'nyawa hilang', 'nyawa melayang', 'penyebab kematian', 'tak bernyawa', 'tak sadarkan diri', 'terkapar', 'tidak bernyawa', 'tutup usia', 'wafat', 'kematian virus', 'kematian wabah', 'korban terinfeksi', 'virus menyerang', 'merenggut nyawa', 'pelayat', 'hilangkan nyawa', 'renggut nyawa', 'wabah', 'keadaan kritis', 'kehilangan darah', 'merenggut jiwa', 'telan nyawa', 'menelan nyawa', 'memakan nyawa', 'dinyatakan meninggal', 'nyawa tak tertolong', 'penyakit', 'sakit pernapasan', 'sesak', 'korona', 'corona', 'odp', 'pdp', 'virus', 'rumah sakit', 'Covid-19', 'virus korona', 'positif korona', 'COVID-19', 'terjangkit COVID-19', 'terinfeksi virus corona');

    /* POPULATE META DATA KEYWORDS */
    var dfp_pageTitle = kly.article && kly.article.title.klyFiltering(' '),
    dfp_titles = (typeof dfp_pageTitle !== 'undefined') ? dfp_pageTitle.toString().klyFiltering("-") : '',
    dfp_pageKeywords = GAMLibrary.documentMeta("keywords"),
    dfp_keyword = dfp_pageKeywords.klyFiltering(","),
    /* POPULATE META DATA DESC */
    dfp_pageDesc = GAMLibrary.documentMeta("description"),
    dfp_desc = dfp_pageDesc.klyFiltering(","),
    tagForAds = kly && (tagForAds = kly.gtm.tag.klyFiltering("|")),
    dfp_keywords = dfp_keyword.concat(dfp_titles, dfp_desc, tagForAds),
    gam_billboard,gam_topfrm,gam_bottomfrm,gam_skinad;
    /*MATURE CONTENT DEFINED VAR & SET TARGETTING*/
    if (!blackListWords) {
      var blackListWords = new Array('matcont');
    }

    //search from keyword, desc & tag meta data
    blackListWords = GAMLibrary.arrToLowerCase(blackListWords);
    dfp_keywords.forEach(function(sKeyword) {
      tagForAds.push(sKeyword);
      if (GAMLibrary.inArray(sKeyword, blackListWords)) {
        isMatcont = true;
      }
    });

    var userAgent = navigator.userAgent.toLowerCase();
    const GAMisTablet = /(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/.test(userAgent);

    var gam_immersive = googletag.defineOutOfPageSlot(GAMLibrary.gamImmersive, 'div-gpt-ad-otosia-immersive-oop').addService(googletag.pubads());

    googletag.defineSlot("/36504930/www.otosia.com/dfp-sc1", [[300, 600],[300, 250],[160, 600]], "div-gpt-ad-otosia-sc1").addService(googletag.pubads()), 
    googletag.defineSlot("/36504930/www.otosia.com/dfp-sc2", [[300, 250],[250, 250]], "div-gpt-ad-otosia-sc2").addService(googletag.pubads()); 
    googletag.defineSlot("/36504930/www.otosia.com/dfp-lb", [
        [970, 90],
        [728, 90],
        [970, 250]
    ], "div-gpt-ad-otosia-lb").addService(googletag.pubads()).setTargeting("leaderboard_type", ["direct"]);

    googletag.defineOutOfPageSlot("/36504930/www.otosia.com/dfp-lFloating", "div-gpt-ad-otosia-lFloating-oop").addService(googletag.pubads());
    googletag.defineOutOfPageSlot("/36504930/www.otosia.com/dfp-marcomm1", "div-gpt-ad-otosia-marcomm1-oop").addService(googletag.pubads()), 
    googletag.defineOutOfPageSlot("/36504930/www.otosia.com/dfp-marcomm2", "div-gpt-ad-otosia-marcomm2-oop").addService(googletag.pubads()), 
    googletag.defineOutOfPageSlot("/36504930/www.otosia.com/dfp-newsTag1", "div-gpt-ad-otosia-newsTag1-oop").addService(googletag.pubads()), 
    googletag.defineOutOfPageSlot("/36504930/www.otosia.com/dfp-newsTag2", "div-gpt-ad-otosia-newsTag2-oop").addService(googletag.pubads());

    googletag.pubads().addEventListener("slotRenderEnded", function(event) {

          /** RENDERED */
          if (event.slot == gam_immersive) {
              if (event.isEmpty) {
                  var gam_billboard = googletag.defineOutOfPageSlot(GAMLibrary.dfpBillboard, "div-gpt-ad-otosia-billboard-oop").addService(googletag.pubads()), 
                  gam_topfrm = googletag.defineOutOfPageSlot(GAMLibrary.dfpTopfrm, "div-gpt-ad-otosia-topfrm-oop").addService(googletag.pubads()),
                  gam_bottomfrm = googletag.defineSlot(GAMLibrary.dfpBottomfrm, [468, 60], 'div-gpt-ad-otosia-bottomfrm-oop').addService(googletag.pubads());

                  googletag.cmd.push(function() {googletag.display("div-gpt-ad-otosia-billboard-oop")});
                  googletag.cmd.push(function() {googletag.display("div-gpt-ad-otosia-topfrm-oop")});
                  googletag.cmd.push(function() {googletag.display("div-gpt-ad-otosia-bottomfrm-oop")}); 

                  /* EXCLUDE SKINAD IN TABLET */
          if(!GAMisTablet){
                      var gam_skinad = googletag.defineOutOfPageSlot(GAMLibrary.dfpSkinad, "div-gpt-ad-otosia-skinad-oop").addService(googletag.pubads()); 
                      googletag.cmd.push(function() {googletag.display("div-gpt-ad-otosia-skinad-oop")});
                      googletag.pubads().refresh([gam_billboard, gam_topfrm, gam_bottomfrm, gam_skinad]);
                  }else{
                      googletag.pubads().refresh([gam_billboard, gam_topfrm, gam_bottomfrm]);
                  }
              }
          }
      });

      /*  START TARGETING BLOCK   */
      if (isMatcont) { googletag.pubads().setTargeting("isMatcont", ["1"]);}
      if(typeof Krux !== "undefined"){
        googletag.pubads().setTargeting('ksg', Krux.segments);
        googletag.pubads().setTargeting('kuid', Krux.user);
      }
      googletag.pubads().setTargeting("tags",tagForAds);
      googletag.pubads().setTargeting("currentUrl", urlPath);
      googletag.pubads().setTargeting("type", kly.gtm.type);
      googletag.pubads().setTargeting("pageType", kly.pageType);
      googletag.pubads().setTargeting("channel", kly.gtm.subCategory);
      googletag.pubads().setTargeting("audience", kly.gtm.audience ? kly.gtm.audience.split("|") : "false");
      googletag.pubads().setTargeting("isAdvertorial", typeof (isAdvertorial = kly.article && kly.article.isAdvertorial.toString()) === "undefined" ? "false" :  isAdvertorial);   
      googletag.pubads().setTargeting("isMultipage", typeof (isMultipage = kly.article && kly.article.isMultipage.toString()) === "undefined" ? "false" : isMultipage );
      googletag.pubads().setTargeting("articleId", kly.gtm.articleId.toString());
      googletag.pubads().setTargeting("pagingNum", typeof (pageParam = kly.gtm.pageParam && kly.gtm.pageParam.toString()) === "undefined" ? "false" : pageParam );
      googletag.pubads().setTargeting("site", kly.site);
      googletag.pubads().setTargeting("age", typeof (age = kly.gtm.age) === "undefined" ? "false" : kly.gtm.age.toString());
      googletag.pubads().setTargeting("gender", typeof (gender = kly.gtm.gender) === "undefined" ? "false" : kly.gtm.gender.toString());
      /*  END TARGETING BLOCK   */

      googletag.pubads().setCentering(true);
      googletag.pubads().enableSingleRequest();
      googletag.enableServices();
  });

  googletag.cmd.push(function() {
      googletag.display("div-gpt-ad-otosia-immersive-oop")
  }), googletag.cmd.push(function() {
      googletag.display("div-gpt-ad-otosia-sc1")
  }), googletag.cmd.push(function() {
      googletag.display("div-gpt-ad-otosia-sc2")
  }), googletag.cmd.push(function() {
      googletag.display("div-gpt-ad-otosia-marcomm1-oop")
  }), googletag.cmd.push(function() {
      googletag.display("div-gpt-ad-otosia-marcomm2-oop")
  }), googletag.cmd.push(function() {
      googletag.display("div-gpt-ad-otosia-newsTag1-oop")
  }), googletag.cmd.push(function() {
      googletag.display("div-gpt-ad-otosia-newsTag2-oop")
  }), googletag.cmd.push(function() {
      googletag.display("div-gpt-ad-otosia-lb");
  }), googletag.cmd.push(function() {
      googletag.display("div-gpt-ad-otosia-lFloating-oop")
  });