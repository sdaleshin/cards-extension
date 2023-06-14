let authData = null
chrome.storage.local.get(["authData"]).then((result) => {
    if (!result.authData) {
        chrome.identity.getAuthToken({interactive: true}, function (token) {
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
                chrome.storage.local.set({authData: data})
                authData = data
            })
        });
    } else {
        authData = result.authData
    }
});

// chrome.action.onClicked.addListener(function() {
//     chrome.tabs.create({url: 'index.html'});
// });
//

chrome.runtime.onMessage.addListener(({action, payload}, sender, sendResponse) => {
    switch (action) {
        case 'requestTranslation':
            return requestTranslation(payload, sendResponse)
    }
});

function requestTranslation({word, context}, sendResponse) {
    // fetch('https://api.choodic.com/dictionary/' + word, {
    //     method: "GET",
    //     mode: "cors",
    //     cache: "no-cache",
    //     credentials: "same-origin",
    //     headers: {
    //         "Content-Type": "application/json",
    //         "Authorization": "Bearer" + authData.token
    //     },
    //     redirect: "follow",
    //     referrerPolicy: "no-referrer",
    // }).then(response => response.json()).then(data => {
    //     sendResponse(data)
    // })
    // return true

    fetch('https://api.choodic.com/translation', {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + authData.token
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify({
            word,
            context
        })
    }).then(response => response.json()).then(data => {
        sendResponse(data)
    })
    return true
}
