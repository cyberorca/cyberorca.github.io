let selectSites = document.querySelector(".selectSites");
selectSites.addEventListener("change", function(e) {
    let value = this.value;
    let linkcustom = document.querySelector('link[title="maverick"]');
    let headerIconlg = document.querySelector('.header .icon-lg');
    let headerIconsm = document.querySelector('.header .icon-sm');
    let headerTagline = document.querySelector('h1.header-tagline');
    let headerTaglinedt = document.querySelector('span.header-tagline');
    let iconsvg = document.querySelectorAll('.icon-svg-logo');
    let iconsvglg = document.querySelectorAll('.icon-svg-logo-lg');
    let iconlogodt = document.querySelector('.icon-logo-dt');
    let iconlogowhite = document.querySelector('.icon-logo-white');
    let link = document.createElement('link');
    link.title = 'maverick';
    link.type = 'text/css';
    link.rel = 'stylesheet';

    if (value == 'merdeka') {
        iconsvgHtml = `<svg class="icon-svg-logo" width="41" height="28" viewBox="0 0 41 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7 1.53798H1V10.0253L6.7839 13.5201L1 17.5141V27H7V11.0238C7 11.0238 6.63931 6.63091 12 6.53053C17.3607 6.43015 17.5 11.0238 17.5 11.0238V27C17.5 27 23.5 25.9628 23.5 21.9687V11.0238C23.5 11.0238 23.268 6.03128 28.5 6.03128C33.732 6.03128 34 11.0238 34 11.0238V27H40V8.52755C40 8.52755 39.463 1.53798 32 1.03872C24.537 0.539465 22.5 5.03277 22.5 5.03277C22.5 5.03277 20.5 1.03872 14.5 1.03872C8.5 1.03872 7 5.53202 7 5.53202V1.53798Z" fill="currentColor" stroke="currentColor"/>
                        </svg>`;

        iconsvglgHtml = `<svg class="icon-svg-logo-lg" opacity=".5" width="189" height="127" viewBox="0 0 189 127" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M29.8032 3.58645H1V44.391L28.7658 61.1928L1 80.3949V126H29.8032V49.1915C29.8032 49.1915 28.0717 28.0717 53.8058 27.5891C79.54 27.1065 80.2088 49.1915 80.2088 49.1915V126C80.2088 126 109.012 121.013 109.012 101.811V49.1915C109.012 49.1915 107.898 25.1888 133.015 25.1888C158.131 25.1888 159.418 49.1915 159.418 49.1915V126H188.221V37.1902C188.221 37.1902 185.643 3.58645 149.816 1.18617C113.99 -1.21411 104.211 20.3883 104.211 20.3883C104.211 20.3883 94.6104 1.18617 65.8072 1.18617C37.004 1.18617 29.8032 22.7886 29.8032 22.7886V3.58645Z" stroke="currentColor" stroke-width="1.11098"/>
                        </svg>`;

        iconlogodtHtml = `<svg class="icon-logo-dt" width="28" height="21" viewBox="0 0 28 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2.38298 3.20006H5.99733V5.53433C5.99733 5.53433 6.90092 2.90827 10.5153 2.90827C14.1296 2.90827 15.3344 5.24254 15.3344 5.24254C15.3344 5.24254 16.5615 2.61648 21.0572 2.90827C25.5528 3.20006 25.8763 7.28503 25.8763 7.28503V18.081H22.2619V8.74395C22.2619 8.74395 22.1005 5.82611 18.9488 5.82611C15.7971 5.82611 15.9368 8.74395 15.9368 8.74395V15.1406C15.9368 17.4748 12.3225 18.081 12.3225 18.081V8.74395C12.3225 8.74395 12.2385 6.05923 9.0093 6.11789C5.78006 6.17656 5.99733 8.74395 5.99733 8.74395V10.0997V18.081H2.38298V12.5371L5.99733 10.0997L2.38298 8.16038V3.20006Z" fill="white"/>
                        </svg>`

        if (headerIconlg) {
            headerIconlg.src = `assets/images/logo-lg.png`
            headerIconsm.src = `assets/images/logo-sm.png`
        }

        if (iconlogowhite) {
            iconlogowhite.src = `assets/images/logo-lg-white.png`
        }

        if (linkcustom) {
            linkcustom.remove();
        }

        if (headerTagline) {
            headerTagline.classList.add('hidden');
        }

        if (headerTaglinedt) {
            headerTaglinedt.classList.add('hidden');
        }
        dateLocal('id')

    } else if (value == 'trstdly') {
        iconsvgHtml = `<svg  class="icon-svg-logo" width="40" height="28" viewBox="0 0 40 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M5.65351 20.8728V14.0027H0L3.31625 7.60725H5.65351V0H13.9422V7.60725L28.8773 7.60716V11.6268C30.0098 8.92245 31.8355 7.16822 35.1214 7.31428V16.122H34.245C30.7395 16.122 28.8773 18.0595 28.8773 22.4816V27.561H20.5924L20.5898 14.0027H13.9422V19.047C13.9422 20.5449 14.6362 21.0934 15.9504 21.0934C16.7173 21.0934 17.5937 20.8743 18.4701 20.4719V26.8673C17.1559 27.5611 15.1842 28 13.1753 28C8.28493 28 5.65351 25.7338 5.65351 20.8728ZM35.2023 28.0001C37.571 28.0001 39.4913 26.0798 39.4913 23.7111C39.4913 21.3423 37.571 19.422 35.2023 19.422C32.8335 19.422 30.9132 21.3423 30.9132 23.7111C30.9132 26.0798 32.8335 28.0001 35.2023 28.0001Z" fill="white"/>
                        </svg>`;

        iconsvglgHtml = `<svg class="icon-svg-logo-lg dark:svg-logo-black"width="227" height="183" viewBox="0 0 227 183" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M35.2003 87.1121V129.851C35.2003 160.092 51.5842 174.19 82.0331 174.19C94.5411 174.19 106.817 171.46 115 167.143V127.357C109.543 129.861 104.087 131.224 99.3115 131.224C91.129 131.224 86.8082 127.812 86.8082 118.493V87.1121H128.197L128.214 171.459H179.798V139.86C179.798 112.35 191.392 100.296 213.219 100.296H218.675V45.5034C198.217 44.5948 186.849 55.5079 179.798 72.332V47.3254L86.8082 47.326V0.000976562H35.2003V47.326H20.6479L0 87.1121H35.2003Z" fill="#FCAD97" fill-opacity="0.3"/>
                        <path d="M43.0101 94.922V137.661C43.0101 167.902 59.394 182 89.8429 182C102.351 182 114.627 179.269 122.81 174.953V135.167C117.353 137.671 111.896 139.034 107.121 139.034C98.9388 139.034 94.618 135.621 94.618 126.303V94.922H136.007L136.023 179.269H187.608V147.67C187.608 120.16 199.202 108.106 221.029 108.106H226.485V53.3132C206.026 52.4046 194.659 63.3177 187.608 80.1418V55.1352L94.618 55.1358V7.81079H43.0101V55.1358H28.4577L7.80981 94.922H43.0101Z" stroke="#FCAD97"/>
                        </svg>`;

        iconlogodtHtml = `<svg class="icon-logo-dt" width="26" height="21" viewBox="0 0 26 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4.18524 10.502V15.6546C4.18524 19.3004 6.13325 21 9.75355 21C11.2407 21 12.7003 20.6708 13.6732 20.1505V15.3539C13.0244 15.6557 12.3757 15.82 11.8079 15.82C10.835 15.82 10.3213 15.4087 10.3213 14.2853V10.502H15.2424L15.2443 20.6707H21.3776V16.8612C21.3776 13.5446 22.7561 12.0915 25.3512 12.0915H26V5.48571C23.5675 5.37616 22.216 6.69184 21.3776 8.72012V5.70537L10.3213 5.70544V0H4.18524V5.70544H2.45499L0 10.502H4.18524Z" fill="white"/>
                        </svg>`

        if (headerIconlg) {
            headerIconlg.src = `assets/images/trstdly/logo-lg.png`
            headerIconsm.src = `assets/images/trstdly/logo-sm.png`
        }

        if (iconlogowhite) {
            iconlogowhite.src = `assets/images/trstdly/logo-lg-white.png`
        }


        if (headerTagline) {
            headerTagline.classList.remove('hidden');
            headerTagline.innerHTML = 'Trusted news <span class="block">in simple English.</span>';
        }
        if (headerTaglinedt) {
            headerTaglinedt.classList.remove('hidden')
            headerTaglinedt.innerHTML = 'Singer news <span class="block">in simple English.</span>'
        }

        link.href = "assets/sass/base/trstdly.min.css";
        document.head.append(link);

        dateLocal('en')
    }

    if (iconlogodt) {
        iconlogodt.parentNode.innerHTML = iconlogodtHtml
    }
    if (iconsvg) {
        for (i = 0; i < iconsvg.length; i++) {
            iconsvg[i].parentNode.innerHTML = iconsvgHtml;
        }

    }
    if (iconsvglg) {
        for (i = 0; i < iconsvglg.length; i++) {
            iconsvglg[i].parentNode.innerHTML = iconsvglgHtml;
        }
    }

});