let authData = null

chrome.identity.getAuthToken({interactive: true}, function(token) {
    fetch('https://api.choodic.com/auth/auth-in-extension', {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
            "Content-Type": "application/json",
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify({
            accessToken: token
        }),
    }).then(response => response.json()).then(data => {
        authData = data
        console.log('data',data)
        // chrome.runtime.sendMessage({action: 'setTokens', payload: data});
    })
});

// chrome.action.onClicked.addListener(function() {
//     chrome.tabs.create({url: 'index.html'});
// });
//
chrome.runtime.onMessage.addListener(({action, payload}, sender, sendResponse) => {
    switch (action){
        case 'requestTranslation':
            console.log('here', payload)
            fetch('https://api.choodic.com/dictionary/' + payload, {
                method: "GET", // *GET, POST, PUT, DELETE, etc.
                mode: "cors", // no-cors, *cors, same-origin
                cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
                credentials: "same-origin", // include, *same-origin, omit
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer" + authData.token
                },
                redirect: "follow", // manual, *follow, error
                referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url,
            }).then(response => response.json()).then(data => {
                sendResponse(data)
                // chrome.runtime.sendMessage({action: 'setTokens', payload: data});
            })
            return true
    }
});
