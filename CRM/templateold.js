    var _klyAds = parent.kmklabs || parent.kly;
    var _platform = _klyAds.platform.toLowerCase();
    var _mainImg = "[%dfp_image%]"; // dfp img
    var _landingPage = "%%CLICK_URL_UNESC%%[%dfp_landing_page%]"; // dfp landing apge 
    var _title = "[%dfp_title%]"; // dfp title
    var _desc = "[%dfp_desc%]"; // dfp desc

    var _feedWrapperTarget = (_platform == "mobile")  ? parent.document.querySelector(".articles__page") : parent.document.querySelector(".articles--iridescent-list"); // liputan6
    var _article = (_platform == "mobile")  ? _feedWrapperTarget.querySelectorAll(".article-snippet") : _feedWrapperTarget.querySelectorAll("article"); // liputan6

    var _organicFeed = _article[1].cloneNode(true);
    var _anchor = (_platform == "mobile")  ? _organicFeed.querySelectorAll("a") : _organicFeed.querySelectorAll(".articles--iridescent-list--text-item__title-link");
    var _img = _organicFeed.querySelectorAll("img");
    var _source = _organicFeed.querySelectorAll("source");
    var _mainTitle = (_platform == "mobile")  ? _organicFeed.querySelectorAll(".article-snippet__title-text") : _organicFeed.querySelectorAll(".articles--iridescent-list--text-item__title-link-text") ;
    var _descTarget = (_platform == "mobile")  ? null : _organicFeed.querySelectorAll(".articles--iridescent-list--text-item__summary") ;
    
    _boot();

    function _boot() {
        _injectAds();
        window.frameElement.parentElement.parentElement.insertAdjacentElement("afterbegin", _organicFeed);
        window.frameElement.style.display = 'none';
    }

    function _injectAds() {
        
        //replace landing page
        _replaceAttribute(_anchor, "href", _landingPage);
        _replaceAttribute(_anchor, "target", "_blank");
        //replace img
        _replaceAttribute(_img, "src", _mainImg);
        _replaceAttribute(_img, "alt", _title);        
        _replaceAttribute(_img, "data-src", _mainImg);
        _replaceAttribute(_source, "srcset", _mainImg);
        // replace title
        _mainTitle[0].textContent = _title;
        if (_descTarget !== null) {
            _descTarget[0].textContent = _desc;
        }
    }

    function _replaceAttribute(_targetArray, _attrName, _attr) {
        _targetArray.forEach( function(element, index) {
            if(element.nodeName === "SOURCE"){
                element.remove();
              }else{
                  element.setAttribute(_attrName, "");
                  element.setAttribute(_attrName, _attr);
              }
        });
    }