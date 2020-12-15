jQuery(document).ready(function() {
    $(".nav-menu").click(function() {
        $(".menu-collapse").fadeIn();
    });
    $(".close-bar").click(function() {
        $(".menu-collapse").fadeOut();
    });
    $(document).bind("mouseup touchend", function(e) {
        var container = $(".menu-collapse");
        if (!container.is(e.target) && container.has(e.target).length === 0) {
            $(".menu-collapse").fadeOut();
        }
    });
});


// ajax loader
function is_onviewpoint(element) {
    var doc_top = $(window).scrollTop();
    var doc_bottom = doc_top + $(window).height();
    var element_top = element.offset().top + 45;
    var element_bottom = element_top + element.height();
    return (
        false
        // Too small (original).
        ||
        ((element_top >= doc_top) && (element_bottom <= doc_bottom))
        // Too big.
        ||
        ((element_top <= doc_top) && (element_bottom >= doc_bottom)) ||
        (
            // A half top.
            (element_top <= doc_top) && (element_top <= doc_bottom) &&
            (element_bottom >= doc_top) && (element_bottom <= doc_bottom)
        ) ||
        (
            // A half bottom.
            (element_top >= doc_top) && (element_top <= doc_bottom) &&
            (element_bottom >= doc_top) && (element_bottom >= doc_bottom)
        )
    );
};

function isviewport(element) {
    var doc_top = $(window).scrollTop();
    var doc_bottom = doc_top + $(window).height();
    var element_top = element.offset().top;
    var element_bottom = element_top + element.height();
    return (
        false
        // Too small (original).
        ||
        ((element_top >= doc_top) && (element_bottom <= doc_bottom))
        // Too big.
        ||
        ((element_top <= doc_top) && (element_bottom >= doc_bottom)) ||
        (
            // A half top.
            (element_top <= doc_top) && (element_top <= doc_bottom) &&
            (element_bottom >= doc_top) && (element_bottom <= doc_bottom)
        ) ||
        (
            // A half bottom.
            (element_top >= doc_top) && (element_top <= doc_bottom) &&
            (element_bottom >= doc_top) && (element_bottom >= doc_bottom)
        )
    );
};

$(document).ready(function() {
    var html = $('html'),
        body = $('body'),
        scrollTop;

    const freezeBanner = {
        lockBody: function() {
            if (window.pageYOffset) {
                scrollTop = window.pageYOffset;
                html.css({
                    overflow: 'hidden'
                });
                body.css({
                    top: -(scrollTop),
                    position: 'fixed',
                    width: '100%',
                    overflow: 'hidden'
                });
            }
        },
        unlockBody: function() {
            html.css({
                overflow: ''
            });
            body.css({
                top: '',
                position: '',
                width: '',
                overflow: ''
            });
            window.scrollTo(0, scrollTop);
        },
        hitGA: function(el) {
            if (!el.hasClass('elementimpressions-initialized')) {
                el.addClass('elementimpressions-initialized');
                var page = el.data('paging_num');
                window.dataLayer = window.dataLayer || [];
                window.dataLayer.push({
                    'event': 'virtual_page_view',
                    'virtual_pageview_path': window.location.pathname + '?Page=' + page,
                });

                window.kly.gtm.pageParam = page.toString();
            }
        }
    }

    const videoEmbed = {
        setAutoplay: function(el) {
            $(el).each(function() {
                var iframe_video = $(this).find('.native-video-slot');
                if (isviewport(iframe_video)) {
                    videoEmbed.autoPlay(iframe_video);
                    $(this).addClass("viewable");
                }
            })
        },
        setPause: function(el) {
            $(el).each(function() {
                var iframe_video = $(this).find('.native-video-slot');
                if (!isviewport(iframe_video)) {
                    videoEmbed.pause(iframe_video);
                    $(this).removeClass("viewable");
                }
            })
        },
        autoPlay: function(el) {
            src = el.attr('src');
            if (src.indexOf('autoplay=false') >= 0) {
                el.attr('src', src.replace('autoplay=false', 'autoplay=true'));
            }

            el.parent
            el[0].contentWindow.postMessage("play", "*");
        },
        pause: function(el) {
            src = el.attr('src');
            el[0].contentWindow.postMessage("pause", "*");
        }
    }

    $(window).on('scroll', function() {
        $('.body--item:not(.done)').each(function() {
            var i = (typeof $(this).data('paging_num') == 'undefined') ? 1 : $(this).data('paging_num');
            if (is_onviewpoint($(this))) {
                if (i == 3 || i == 5) {
                    freezeBanner.hitGA($(this));
                    // if (!(!!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform))) {
                    //     freezeBanner.lockBody();
                    //     $(this).addClass('done').closest('html').addClass('lock').find('.body-progress').show().find('.body-progress-infinite-inner').animate({
                    //         width: '100%'
                    //     }, 5000).queue(function() {
                    //         $(this).closest('html').removeClass('lock').find('.body-progress').hide().find('.body-progress-infinite-inner').animate({
                    //             width: '0'
                    //         }, 0).dequeue()
                    //         freezeBanner.unlockBody();
                    //     });
                    // }
                } else {
                    if (i != 1) {
                        freezeBanner.hitGA($(this));
                    }
                }
            }
        });


        $('.nativescrolling-timer:not(.elementimpressions-initialized)').each(function() {
            var targetelement = $(this);
            if (is_onviewpoint(targetelement)) {
                targetelement.addClass('elementimpressions-initialized');
                window.dataLayer = window.dataLayer || [];
                window.dataLayer.push({
                    'event': "impression",
                    'feature_name': "hide-video-overlay",
                    'feature_location': "bottom",
                    'feature_position': "floating",
                    'feature_position': "planet",
                });
            };
        });

        $('.page_baca_juga_tracker:not(.elementimpressions-initialized)').each(function() {
            var targetelement = $(this);
            if (is_onviewpoint(targetelement)) {
                targetelement.addClass('elementimpressions-initialized');
                window.dataLayer = window.dataLayer || [];
                window.dataLayer.push({
                    'event': "impression",
                    'feature_name': "next-page",
                    'feature_location': "planet",
                    'feature_position': "var1",
                });
            };
        });

        $('.page_baca_juga_tracker_v2:not(.elementimpressions-initialized)').each(function() {
            var targetelement = $(this);
            if (is_onviewpoint(targetelement)) {
                targetelement.addClass('elementimpressions-initialized');
                window.dataLayer = window.dataLayer || [];
                window.dataLayer.push({
                    'event': "impression",
                    'feature_name': "next-page",
                    'feature_location': "planet",
                    'feature_position': "var2",
                });
            };
        });
        // videoEmbed.setAutoplay('#dnative_video_one_container:not(.viewable)');
        // videoEmbed.setPause('#dnative_video_one_container.viewable');
    });
    $(".page_tracker").each(function() {
        $(this).click(function(e) {
            var page = $(this).data("num");
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
                'event': "click",
                'feature_name': "paging",
                'feature_location': "bottom",
                'feature_position': page,
                'page_type': "article",
                'kanal_page': "planet",
            });
        });
    });

    $(".page_tracker_v2").each(function() {
        $(this).click(function(e) {
            var page = $(this).data("num");
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
                'event': "click",
                'feature_name': "paging_var2",
                'feature_location': "bottom",
                'feature_position': page,
                'page_type': "article",
                'kanal_page': "planet",
            });
        });
    });

    $(".page_baca_juga_tracker").each(function() {
        $(this).click(function(e) {
            var page = $(this).data("num");
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
                'event': "click",
                'feature_name': "next-page",
                'feature_location': "bottom",
                'feature_position': "var1",
                'page_type': "article",
                'kanal_page': "planet",
            });
        });
    });

    $(".page_baca_juga_tracker_v2").each(function() {
        $(this).click(function(e) {
            var page = $(this).data("num");
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
                'event': "click",
                'feature_name': "next-page",
                'feature_location': "bottom",
                'feature_position': "var2",
                'page_type': "article",
                'kanal_page': "planet",
            });
        });
    });
});
// ajax loader