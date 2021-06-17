testing code Liputan6 Desktop
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