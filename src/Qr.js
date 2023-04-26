import { Html5QrcodeScanner, Html5Qrcode } from 'html5-qrcode';
import './App.css';
import { useEffect, useState } from 'react';

// Creates the configuration object for Html5QrcodeScanner.

const Html5QrcodePlugin = (props) => {
    const qrcodeRegionId = "html5qr";
    const output = document.querySelector("#output")
    const handleResolve = (decodedText, decodedResult) => {
        const node = document.createElement("div");
        const textnode = document.createTextNode(decodedText);
        node.appendChild(textnode);
        document.getElementById("output").appendChild(node);
    }

    useEffect(() => {

        Html5Qrcode.getCameras().then(devices => {
            /**
             * devices would be an array of objects of type:
             * { id: "id", label: "label" }
             */
            if (devices && devices.length) {
              var cameraId = devices[0].id;
              const html5QrCode = new Html5Qrcode(/* element id */ qrcodeRegionId);
                html5QrCode.start(
                cameraId, 
                {
                    fps: 10,    // Optional, frame per seconds for qr code scanning
                    qrbox: { width: 250, height: 250 }  // Optional, if you want bounded box UI
                },
                handleResolve,
                (errorMessage) => {
                    // parse error, ignore it.
                })
                .catch((err) => {
                // Start failed, handle it.
                });
            }
          }).catch(err => {
            // handle err
          });
    }, []);

    return (
        <>
            <div id={qrcodeRegionId}/>
            <div id='output'> Сюда вывод</div>
        </>

    );
};

export default Html5QrcodePlugin;