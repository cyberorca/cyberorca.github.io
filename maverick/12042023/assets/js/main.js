//snapscroll
const header = document.querySelector("[data-header]");
let sections = document.querySelectorAll("[data-section]");
const indicators = document.querySelector("[data-indicator]");
const scrollRoot = document.querySelector('[data-scroller]')

let currentIndex = 0;
let prevYPosition = 0;

let options = {
    root: scrollRoot,
    rootMargin: "0px",
    threshold: 0.6,
};

let swipers = [];
const selector = document.querySelectorAll('.swiper--ads');
for (var i = 0; i < selector.length; i++) {
    selector[i].classList.add('swiperAds'+i);
    swipers[i] = new Swiper('.swiperAds'+i, {
        autoplay: {
            delay: 3000,
            stopOnLastSlide: true,
            disableOnInteraction: false
        },
        pagination: {
            el: ".swiper-pagination",
        },
    });
    swipers[i].autoplay.stop();
}

const setScrollDirection = () => {
    if (scrollRoot.scrollTop > prevYPosition) {
        if(currentIndex % 5 === 0){
            // document.querySelector('.indicator-bullet-active').scrollIntoView({behavior: "smooth"});
            indicators.scrollBy({ 
                top: indicators.clientHeight,
                behavior: 'smooth' 
            });
        }

    } else {
        if((currentIndex + 1) % 5 === 0){
            indicators.scrollBy({ 
                top: -indicators.clientHeight,
                behavior: 'smooth' 
            });
        }
    }
    prevYPosition = scrollRoot.scrollTop
}


const setIndicator = () => {
    indicators.innerHTML = '';
    for (var i = 0; i < sections.length; i++) {
        var button = document.createElement('span');
        
        button.classList.add('snap-always', 'shrink-0', 'indicator-bullet');
        if(i === currentIndex){
            button.classList.add('indicator-bullet-active')
        }
        
        // (function(i) {
        //     button.onclick = function() {
        //         sections[i].scrollIntoView();
        //     }
        // })(i);

        indicators.appendChild(button);
    }
}


const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        // const section = entry.target.dataset.section;
        const sid = entry.target.dataset.sid;
        const theme = entry.target.dataset.theme;
        const sound = entry.target.dataset.sound;



        if (entry.intersectionRatio > 0.6) {
            document.body.setAttribute('data-theme', theme)
            document.body.setAttribute('data-sound', sound)
            entry.target.classList.add("is-visible");
            
            currentIndex = elementIndices[sid];


            setIndicator();
            setScrollDirection();


            for (var i = 0; i < selector.length; i++) {
                if(entry.target.querySelector('.swiperAds'+i)){
                    swipers[i].autoplay.start();
                }
            }

            // console.log('currentIndex :', currentIndex);
            // readblockBaca
            // if(dtpara){
            //     if(currentIndex != 1){
            //         if(dtparaheight > dtheight){
            //             document.body.classList.add('no-scroll');
            //             document.querySelector(".btn--readarticle").classList.remove('hidden');
            //             setTimeout(function(){ 
            //                 window.location.hash = "" }
            //             ,100)
            //         }
            //     }
            // }
            var dtpara = document.querySelector('.dt-para');
            var dtparascroll = document.querySelector('.section--dtparablock .section-body');
            var infoScroll = document.querySelector('[data-theme=dt-parablock] .btn--infoScrollarticle')
            if(dtpara){
                
                if(infoScroll){
                    infoScroll.addEventListener("click", function(e){
                        dtparascroll.scrollTo({top: dtparascroll.scrollTop += document.body.clientHeight, left: 0, behavior: 'smooth'});
                        e.preventDefault();
                    })
                }

                if(currentIndex == 1){
                    const selector = document.querySelectorAll('.section:nth-child(n+3)');
                    selector.forEach(function(item){
                        item.classList.add('hidden')
                    })
                    infoScroll.style.display = "";

                    dtparascroll.addEventListener('scroll', function(){
                        if (dtparascroll.scrollTop + dtparascroll.clientHeight >= dtparascroll.scrollHeight - 200){
                            infoScroll.style.display = "none";
                            selector.forEach(function(item){
                                item.classList.remove('hidden')
                            })
                        }else{
                            infoScroll.style.display = "" 
                        }
                    });
                }else{
                    dtparascroll.scrollTo({top: 0, left: 0, behavior: 'instant'});
                }
            }

            if (typeof MaverickLabVisibleSection === "function"){ 
                MaverickLabVisibleSection(entry, io, currentIndex)
                MavMakingAdsRequest(entry,io);
            }

            mediaplay(entry)

            //swipeup
            const overlaySwipeup = document.querySelector('.overlay-swipeup');
            if(overlaySwipeup){
                currentIndex != 0 ? overlaySwipeup.classList.add('current') : overlaySwipeup.classList.remove('current')
            }

            //tagline
            const headerTagline = document.querySelector('.header-tagline:not(.hidden)');
            if(headerTagline){
                currentIndex != 0 ? headerTagline.style.display= "none" : headerTagline.style.display= "" 
            }

            //ellipsis
            const ellipsisBtn = entry.target.querySelector('.dots-btn.active');
            if(ellipsisBtn){
                ellipsisBtn.click();
            }
            

        } else {
            entry.target.classList.remove("is-visible");

            swipers.forEach(function(item) {
                item.slideToLoop(0, 0);
                item.autoplay.stop();
            });

            if (typeof MaverickLabInVisibleSection === "function"){ 
                MaverickLabInVisibleSection(entry, io, currentIndex)
            }
           
            mediapause(entry)

        }


    });
}, options);


var elementIndices = {};
var backtop = document.querySelector('.backtop');
if(backtop !== null)
{
    backtop.addEventListener("click", function(e) {
        sections[0].scrollIntoView();
        e.preventDefault();
    });
}

function initSection()
{
    for (var i = 0; i < sections.length; i++) {
        io.unobserve(sections[i]);
        var sid = (Math.random() + 1).toString(36).substring(7);
        sections[i].dataset.sid = sid;
        elementIndices[sections[i].dataset.sid] = i;
        io.observe(sections[i]);
    }
}



function mediaplay(entry) {

    const video = entry.target.querySelector('video')
    if(video){
        setTimeout(function(){ 
            video.play() 
        },300)
    }

    var videoIframe = entry.target.querySelector('iframe');

    function played(){

        var itemYT = entry.target.querySelector('iframe[src^="https://www.youtube.com/embed/"]');

        function autoPlayYT(){
            setTimeout(function(){ 
                itemYT.addEventListener('load', autoPlayYT);   
                itemYT.contentWindow.postMessage('{"event":"command", "func":"playVideo", "args":""}', '*'); 
            },300);
        
        }
        function autoPlayEmbed(){
            setTimeout(function(){ 
                videoIframe.addEventListener('load', autoPlayEmbed);   
                videoIframe.contentWindow.postMessage('ads.play', "*");   
                videoIframe.contentWindow.postMessage('vidio.playback.play', '*');
                videoIframe.contentWindow.postMessage('enamplus.playback.play', '*');
            },300);
        };
        
        if(itemYT){
            if(!itemYT.src.includes('?enablejsapi=1')){
               var embedSection =  entry.target.querySelector('.embed-yt');
               var embedHorizontal =  entry.target.querySelector('.video-horizontal');
               itemYT.src += '?enablejsapi=1&mute=1';
               if(embedSection){
                   itemYT.src += '&controls=0';
               }
               if(embedSection || embedHorizontal){
                   autoPlayYT();
               }
            }else{
                autoPlayYT();
            }
        }else{
            autoPlayEmbed();
        }
    }


    if(videoIframe){
        if(videoIframe.getAttribute('data-src')) {
            if(!videoIframe.src) {
                videoIframe.setAttribute('src', videoIframe.getAttribute('data-src'));
                const isMobile = /iPhone|Android/i.test(navigator.userAgent);
                if (isMobile) {
                    if(document.querySelector('.muted')){
                        document.querySelector('.muted').click()
                    }
                }
                played();
            }else{
                played();
            }
        }else{
            played();
        }
    }
}

function mediapause(entry) {

    var videoIframe = document.querySelectorAll('iframe');
    if(videoIframe){
        videoIframe.forEach(function(item) {
            var itemYT = entry.target.querySelector('iframe[src^="https://www.youtube.com/embed/"]')
            if(itemYT){
                if(itemYT.src.includes('?enablejsapi=1')){
                    item.contentWindow.postMessage('{"event":"command", "func":"pauseVideo", "args":""}', '*'); 
                }
            }
            item.contentWindow.postMessage('ads.pause', "*");
            item.contentWindow.postMessage('vidio.playback.pause', '*');
            item.contentWindow.postMessage('enamplus.playback.pause', '*');
        });
    }

    const videos = document.querySelectorAll('video')
    if(videos){
        Array.prototype.forEach.call(videos, function(video){
            video.pause();
        });
    } 

}


function initVideos()
{
    // videodefer & unmute
    let btnUnmute = document.querySelectorAll('.btn--unmute');
    let videos = document.querySelectorAll('video');
    let videoIframe = document.querySelectorAll('iframe');
   
    if(btnUnmute){
        btnUnmute.forEach(function(item) {
            item.addEventListener("click", function(e){
                this.closest('body').querySelectorAll('.btn--unmute').forEach(function(item) {
                    item.classList.toggle('muted');
                });
                if(this.classList.contains('muted')){
                    videoIframe.forEach(function(item) { 
                        if(item.src.includes('?enablejsapi=1')){
                            item.contentWindow.postMessage('{"event":"command", "func":"unMute", "args":""}', '*');
                        }
                        item.contentWindow.postMessage('ads.unMute', "*");
                        item.contentWindow.postMessage('vidio.playback.unmute', '*');
                        item.contentWindow.postMessage('enamplus.playback.unmute', '*');
                    });
                    Array.prototype.forEach.call(videos, function(video){
                        video.muted = false;
                    });
                }else{
                    videoIframe.forEach(function(item) { 
                        if(item.src.includes('?enablejsapi=1')){
                            item.contentWindow.postMessage( '{"event":"command", "func":"mute", "args":""}', '*');
                        }
                        item.contentWindow.postMessage('ads.mute', "*");
                        item.contentWindow.postMessage('vidio.playback.mute', '*');
                        item.contentWindow.postMessage('enamplus.playback.mute', '*');
                    });
                    Array.prototype.forEach.call(videos, function(video){
                        video.muted = true;
                    });
                }
                e.preventDefault();
            });
        });
    }   
    // mediapause(); 
}

initSection();
initVideos();

function dateLocal(locale){
    const date= document.querySelectorAll('time');
    if(date){
        date.forEach(function(item) {
            var datetime = item.getAttribute("datetime");
            if(datetime){
                item.innerHTML = moment.utc(datetime).locale(locale).fromNow();
            }
        });
    }
}
dateLocal('id')

document.addEventListener('maverick:locale', function(e){ 
    dateLocal(e.detail)
}, false);

//event
document.addEventListener('maverick:reinit', function(){ 
    sections = document.querySelectorAll("[data-section]");
    initSection();
    initVideos();
}, false);


let selectSwitch = document.querySelector('.switchTheme-click');
let selectOption = document.querySelectorAll(".switchTheme-option li a");
let hour = (new Date).getHours();

if( selectSwitch ){
    selectSwitch.addEventListener("click", (e) => {
        e.currentTarget.classList.toggle('is-active');
        if(e.currentTarget.classList.contains('is-active')){
            document.querySelector('.switchTheme-option').classList.add('open');
            for (var i = 0; i < selectOption.length; i++) {
                selectOption[i].addEventListener('click', function() {
                    
                    let value = this.dataset.value;
                    let valueHtml = this.querySelector('.icon-theme').innerHTML

                    document.querySelector(".switchTheme-option li.active").classList.remove("active");
                    this.parentNode.classList.add('active');
                    selectSwitch.innerHTML = valueHtml;
                    
                    if(value === 'darkmode'){
                        document.documentElement.classList.add('dark')
                    } else if (value = 'lightmode'){
                        document.documentElement.classList.remove('dark')
                    }else{
                        document.documentElement.classList.remove('dark')
                        if (hour >= 24 && hour <= 4) {
                            document.documentElement.classList.add('dark')
                        }
                    }

                });
            }
        }else{
            document.querySelector('.switchTheme-option').classList.remove('open');
        }
        e.preventDefault();
    });

    if (hour >= 24 && hour <= 4) {
        selectSwitch.click();
    }
}


window.addEventListener('click', function(e){   
    if (!selectSwitch.contains(e.target)){
        selectSwitch.classList.remove('is-active');
        document.querySelector('.switchTheme-option').classList.remove('open');
    } 
});


//dropdown
const toggleOpen = document.querySelectorAll("[data-toggle]");
const toggleClose = document.querySelectorAll("[data-toggle-close]");

toggleOpen.forEach(function (t, i) {
    t.addEventListener('click', function(e) {
        const attr = this.getAttribute('data-toggle');
        this.classList.toggle('is-active');
        if(this.classList.contains('is-active')){

            document.body.classList.add('overflow-hidden');
            document.querySelector('[data-toggle-open="'+ attr +'"]').classList.add('open');
        }else{
            document.body.classList.remove('overflow-hidden');
            document.querySelector('[data-toggle-open="'+ attr +'"]').classList.remove('open');
        }
        e.preventDefault();
    });
});
toggleClose.forEach(function (t, i) {
    t.addEventListener('click', function(e) {
        document.body.classList.remove('overflow-hidden');
        document.querySelector('[data-toggle]').classList.remove('is-active');
        document.querySelector('[data-toggle-open]').classList.remove('open');
        e.preventDefault();
    });
});

//animate off chrome
if(navigator.userAgent.match('CriOS')){ 
    const target = document.body;
    target.addEventListener('touchstart',(event)=>{
        e.preventDefault();
    });
   
}     

// //readblockBaca
// var dtpara = document.querySelector('.dt-para');
// if(dtpara){
//     const btnReadmore = document.querySelector(".btn--readarticle");
//     const btnSkipread = document.querySelectorAll(".btn--skiparticle");
    
//     var dtmasthead = document.querySelector('.masthead')?.clientHeight;
//     var dtbottomframe = document.querySelector('.bottomframe')?.clientHeight;
//     var dtparaheight = document.querySelector('.dt-para').clientHeight;
//     var dtheight = document.querySelector('.dt').clientHeight

//     // if(dtmasthead || dtbottomframe){
//     //     (dtheight - dtmasthead - dtbottomframe < dtparaheight)? document.body.classList.add("no-scroll") : document.body.classList.add("no-expand")
//     // }else{
//     //     (dtheight < dtparaheight)? document.body.classList.add("no-scroll") : document.body.classList.add("no-expand")
//     // }

//     btnReadmore.addEventListener("click", function (e) {
//         this.classList.toggle('hidden');
//         if(this.classList.contains('hidden')){
//             this.closest('body').classList.remove('no-scroll');
//             document.querySelector('.section--dtparablock .section-body').scrollTo(0, 0);
//         }else{
//             this.closest('body').classList.add('no-scroll');
//             document.querySelector('.section--dtparablock').scrollIntoView({behavior: "instant"});
//         }
//     });

//     btnSkipread.forEach(function (t, i) {
//         t.addEventListener("click", function (e) {
//             window.location.hash = "";
//             document.querySelector(".btn--readarticle").classList.remove('hidden');
//             document.body.classList.add('no-scroll');
//             document.querySelector('.section--dtparablock').nextElementSibling.scrollIntoView();
//             e.preventDefault();
//         });
//     });

//     if(window.location.hash == "#Readmore"){
//         document.querySelector('.section--dtparablock').scrollIntoView({behavior: "instant"});
//         setTimeout(function(){
//             window.location.hash = "#Readmore";
//             document.body.classList.remove('no-scroll');
//             document.querySelector(".btn--readarticle").classList.add('hidden');
//         }, 300)
//     }
// }

// const toggleMenu = document.querySelector("[data-toggle=menu]");
// toggleMenu.addEventListener('click', function(e) {
//     let scrollContainer = document.querySelector('.open .header-menu-body');
//     scrollContainer.scrollTo({
//         top: scrollContainer.scrollHeight,
//         behavior: 'instant'
//     });
// });
const dropdown = document.querySelectorAll("[data-submenu]");
dropdown.forEach(function (t, i) {
    t.addEventListener('click', function(e) {
        const attr = this.getAttribute('data-submenu');
        const attrTarget = document.querySelector('[data-submenu-open="'+ attr +'"]');

        this.classList.toggle('is-active');
        this.classList.contains('is-active') ? attrTarget.classList.add('open') : attrTarget.classList.remove('open')
        e.preventDefault();
    });
});

const ellipsis = document.querySelectorAll('.line-clamp-str');
if(ellipsis){
    ellipsis.forEach(function(item){
        var lineclamp = item.querySelectorAll('.line-clamp-str p');

        for (var i = 0; i < lineclamp.length; i++) {
            let sibling = lineclamp[0].nextElementSibling
            while(sibling) {
                sibling.classList.add('more-text', 'hidden');
                sibling = sibling.nextElementSibling;
            }

            const paragraph = lineclamp[0].innerText;
            const strlength = paragraph.length;
            var maxlength = 60;
            if (strlength > maxlength) {
                let visible = paragraph.substr(0, maxlength);
                let hidden = paragraph.substr(maxlength, strlength);
                lineclamp[0].innerHTML = visible + "<span class='dots'>...</span><span class='more-text hidden'>" + hidden + "</span>";

                if(lineclamp[0].parentNode){
                    lineclamp[0].parentNode.innerHTML = "<div class='line-clamp-str-body'>"+ lineclamp[0].parentNode.innerHTML +"</div><span class='dots-btn absolute bottom-0 inset-x-0 vh-text-sm font-semibold font-primary-1 block cursor-pointer pointer-events-auto'>More</span>";
                }
            }

        }

        function setClasses(el) {
            const isScrollable = el.scrollHeight > el.clientHeight;
            
            if (!isScrollable) {
              el.classList.remove('is-bottom-overflowing', 'is-top-overflowing');
              return;
            }
            
            const isScrolledToBottom = el.scrollHeight <= el.clientHeight + el.scrollTop;
            const isScroledlToTop = el.scrollTop === 0;
            el.classList.toggle('is-bottom-overflowing', !isScrolledToBottom);
            el.classList.toggle('is-top-overflowing', !isScroledlToTop);
        }
          
        item.querySelector('.line-clamp-str-body').addEventListener('scroll', (e) => {
            const el = e.currentTarget;
            setClasses(el);
        });

        var btn = item.querySelector('.dots-btn');
        btn.addEventListener("click", (e) => {
            var target = e.currentTarget;
            var targetParent = target.parentNode;
            var targetDots = targetParent.querySelector('.dots')
            var targetMoretext = targetParent.querySelectorAll('.more-text');
            target.classList.toggle('active');
            if(target.classList.contains('active')){
                target.innerHTML = 'Less';
                targetParent.classList.add('open');
                targetDots.classList.add('hidden');
                targetMoretext.forEach(function(item){
                    item.classList.remove('hidden')
                })
                targetParent.querySelector('.line-clamp-str-body').scrollTo(0, 0);
            }else{
                target.innerHTML = 'More';
                targetParent.classList.remove('open');
                targetDots.classList.remove('hidden');
                targetMoretext.forEach(function(item){
                    item.classList.add('hidden')
                })
            }
        });
    })
}



const popupAds = document.querySelectorAll('[data-popup]');
const scrollRootAds = document.querySelectorAll('[data-scroller-ads]');
const sectionsAds = document.querySelectorAll("[data-section-ads]");

//popup-ads 
let optionsAds = [];
let ia = [];
for (var i = 0; i < scrollRootAds.length; i++) {
    optionsAds[i] = {
        root: scrollRootAds[i],
        rootMargin: "0px",
        threshold: 0.6,
    };
    ia[i] = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.intersectionRatio > 0.6) {
                entry.target.classList.add("is-visible");
            } else {
                entry.target.classList.remove("is-visible");
            }
        });
    }, optionsAds[i]);

    for (var a = 0; a < sectionsAds.length; a++) {
        ia[i].observe(sectionsAds[a]);
    }
}

for (var i = 0; i < popupAds.length; i++) {
    popupAds[i].addEventListener('click', function(e) {
        const target = this.getAttribute('data-popup')
        document.querySelector('[data-scroller]').style.overflow = 'hidden';
        document.querySelector('[data-popup-open='+target+']').classList.add('open');  
        document.querySelector('[data-popup-open='+target+'] [data-section-ads]:first-child').scrollIntoView();
        document.querySelector('[data-popup-open='+target+'] [data-section-ads]:first-child').classList.add('is-visible');  
    });
}
const popupAdsClose = document.querySelectorAll('[data-popup-close]');
for (var i = 0; i < popupAdsClose.length; i++) {
    popupAdsClose[i].addEventListener('click', function(e) {
        const target = this.getAttribute('data-popup-close');
        document.querySelector('[data-scroller]').style.overflow = '';
        document.querySelector('[data-popup-open='+target+']').classList.remove('open');
        document.querySelector('[data-popup-open='+target+'] [data-section-ads]:first-child').scrollIntoView();
        document.querySelector('[data-popup-open='+target+'] [data-section-ads].is-visible').classList.remove('is-visible');  

        // const skipSection = this.closest('[data-section]').getAttribute('data-section')
        // const skipSectionSplit = skipSection.substr(7);

        // sections[skipSectionSplit].scrollIntoView();
    });
}


//share
const shareButton = document.querySelector('.btn--share');
const shareDialog = document.querySelector('.shareModal');
const shareDialogClose = document.querySelector('.shareModal-close');

if(shareButton)
{
    shareButton.addEventListener('click', event => {

        let bodyTheme = document.body.getAttribute('data-theme');
        let title = document.title
        let text = document.querySelector('meta[name="description"]').content
        let url = window.location.href;
        let location = (window?.kly?.gtm?.pageType == "ReadPage") ? 'readpage' : 'feed';

        if (bodyTheme == 'dt-headline' || bodyTheme == 'dt-parablock') {
            title = document.querySelector('h1.dt-desc-title').textContent.trim()
            text = document.querySelector('meta[name="description"]').content
            url = window.location.href
            location = 'readpage'
        } else {
            let target = document.querySelector('section.is-visible')
            title = target.querySelector('h2.article-title')?.textContent.trim() || document.title
            text = target.querySelector('div.article-paragraph')?.textContent.trim()
            url = target.querySelector('h2.article-title a')?.getAttribute('href') || window.location.href
            location = 'feed'
        }

        let shareData = {
            title,
            text,
            url
        }

        // console.log('ShareData', shareData)
        if (navigator.share) {
            navigator.share(shareData).then(() => {
                // console.log('Thanks for sharing!');
            }).catch(error => {
                // console.log(error)
            })
        } else {
            alert("Your Browser doesn't support Web Share API");
            //fordestop
                //shareDialog.classList.add('is-open');
        }
    });
}

if(shareDialogClose)
{
    shareDialogClose.addEventListener('click', event => {
        shareDialog.classList.remove('is-open');
    });
}

var shareCopyButton = document.querySelector('.shareModal-link-copy');
var shareCopyInput = document.querySelector('.shareModal-link-url');
if( shareCopyButton )
{
    shareCopyButton.addEventListener('click', function(e) {
        shareCopyInput.select();
        shareCopyInput.setSelectionRange(0, 99999);
        navigator.clipboard.writeText(shareCopyInput.value);
    });
}


    