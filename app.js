const journeyPlayer = xmsdk.XmSdk(); // the Transmit SDK object
const ConnectionSettings = com.ts.mobile.sdk.SDKConnectionSettings; // constractor for sdk connection settings
const XmUIHandler = new xmui.XmUIHandler();


function invokeJourney() {
    initSDK((success) => {
        console.log(`Transmit SDK init success? ${success}`);
        if (!success) return;

        const clientContext = getClientContext();

        journeyPlayer.authenticate("train1", "authenticate", {}, clientContext)
            .then((results) => {
                console.log(`Authenticate success: ${results}`)
            })
            .catch((error) => {
                console.error(`Authenticate Error: ${error}`);
            })
    });

    setTimeout(() => {
        window.location = "https://www.google.com"
    }, 3000);
}

function getClientContext() {
    return {
        uiContainer: document.getElementById("transmitContainer")
    };
}

function initSDK(callback) {
    const settings = getTransmitConnectionSettings();
    journeyPlayer.setConnectionSettings(settings);
    journeyPlayer.setUiHandler(XmUIHandler);
    // journeyPlayer.setUiAssetsDownloadMode(com.ts.mobile.sdk.UIAssetsDownloadMode.Disable);
    journeyPlayer.initialize()
        .then((results) => {
            console.log(`Transmit SDK initialized succesfuly: ${results}`);
            callback(true);
        })
        .catch((error) => {
            // *** see additional info about errors below ⬇⬇⬇
            console.error(`Transmit SDK initialization error!: ${error}`);
            callback(false);
        });
}

function getTransmitConnectionSettings() {
    const serverUrl = "https://ps-dev.tsdemo.transmit-field.com";
    const appId = "web-training";
    const apiTokenId = null;
    const apiToken = null;
    const realm = "shachar";
    let settings = com.ts.mobile.sdk.SDKConnectionSettings.create(serverUrl, appId, apiTokenId, apiToken);
    settings.setRealm(realm);
    return settings;
}
