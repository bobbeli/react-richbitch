const { detect } = require('detect-browser');

export default function isPushApiSupported(){
        const browser = detect();
        let pushSupport = false;
        console.log('Browser: ' + browser.name + ' Version: ' + browser.version)

        switch (browser && browser.name) {
            case 'chrome':
                pushSupport = true;
                break;
            case 'firefox':
                pushSupport = true;
                break;
            case 'edge':
                if(browser.version >= 17){
                    pushSupport = true;
                }
                break;
            case 'safari':
                pushSupport = false;
                break;
            default:
                console.log('Push API is Not supported');
        }

        return pushSupport;
    }

