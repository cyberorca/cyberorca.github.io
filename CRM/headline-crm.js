    var _mainImg = "https://via.placeholder.com/640x360/81b214/ffffff?text=HEADLINE CRM 30m";
    var _landingPage = "%%CLICK_URL_UNESC%%https://dummy.com";
    var _title = "[ CRM ] development - dummy title for testing";
    var _desc = "[ CRM ] development - dummy desc for testing : Lorem ipsum dolor sit amet consectetur, adipisicing elit.";

    var _klyAds = parent.kmklabs || parent.kly;
    var _platform = _klyAds.platform.toLowerCase();

    var _headlineTarget = (_platform == "mobile")  ? parent.document.querySelector(".article-snippet.article-snippet_headline") : parent.document.querySelector(".headline--main"); // liputan6
    var _anchor = _headlineTarget.querySelectorAll("a");
    var _img = _headlineTarget.querySelectorAll("img");
    var _source = _headlineTarget.querySelectorAll("source");
    var _mainTitle = (_platform == "mobile")  ? _headlineTarget.querySelectorAll(".article-snippet__title-text") : _headlineTarget.querySelectorAll("h2") ;
    var _descTarget = (_platform == "mobile")  ? null : _headlineTarget.querySelectorAll(".headline--main__short-desc") ;

    _boot();

    function _boot() {
        _injectAds();
    }

    function _injectAds() {
        
        //replace landing page
        _replaceAttribute(_anchor, "href", _landingPage);
        _replaceAttribute(_anchor, "target", "_blank");
        //repalce img
        _replaceAttribute(_img, "src", _mainImg);
        _replaceAttribute(_img, "alt", _title);
        _replaceAttribute(_source, "srcset", _mainImg);
        // replace title
        _mainTitle[0].textContent = _title;
        if (_descTarget !== null) {
            _descTarget[0].textContent = _desc;
        }
        
    }

    function _replaceAttribute(_targetArray, _attrName, _attr) {
        _targetArray.forEach( function(element, index) {
            element.setAttribute(_attrName, "")
            element.setAttribute(_attrName, _attr)
        });
    }