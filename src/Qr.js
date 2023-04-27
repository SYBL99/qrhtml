import { Html5QrcodeScanner, Html5Qrcode } from 'html5-qrcode';
import './App.css';
import { useEffect, useState } from 'react';

// Creates the configuration object for Html5QrcodeScanner
const Html5QrcodePlugin = (props) => {
    const [cameras, setCameras] = useState(null)
    const [activeCamera, setActiveCamera] = useState(null)

    Html5Qrcode.getCameras().then(cameraDevices => setCameras(cameraDevices))

    const qrcodeRegionId = "html5qr";

    useEffect(() => {
        
        Html5Qrcode.getCameras().then(devices => {
            /**
             * devices would be an array of objects of type:
             * { id: "id", label: "label" }
             */
            if (devices && devices.length) {
              const cameraId = document.querySelector('#camera_select').value;
              const html5QrCode = new Html5Qrcode(/* element id */ qrcodeRegionId);
                html5QrCode.start(
                cameraId, 
                {
                    fps: 10,   
                    qrbox: { width: 200, height: 200 }
                },
                (decodedText, decodedResult) => { html5QrCode.stop(); handleResolve(decodedText, decodedResult) },
                (errorMessage) => {
                    // parse error, ignore it.
                })
                .catch((err) => {
                // Start failed, handle it.
                })
                ;
            }
          }).catch(err => {
            // handle err
          });

          const handleResolve = (decodedText, decodedResult) => {
            const node = document.createElement("div");
            const textnode = document.createTextNode(decodedText);
            node.appendChild(textnode);
            document.getElementById("output").appendChild(node);
    
            const dialog = document.getElementById("show_qr");
            console.log(decodedResult)
            dialog.firstChild.innerText = decodedText
            dialog.showModal()

        }

    }, []);

    return (
        <>
            <div className='Qr_container' id={qrcodeRegionId}/>
            <div id='output'> Сюда вывод</div>
            <dialog className='Qr_container' id='show_qr'>
                <p>Должен быть QR</p>
                <button onClick={(event)=>{event.target.closest('dialog').close()}}>close</button>
            </dialog>
            <select id='camera_select'>
                {cameras?.map( (camera, index) => <option key={camera.id} defaultValue={index === cameras.length - 1 ? true : false} value={camera.id}>{camera.label}</option>)}
            </select>

        </>

    );
};

export default Html5QrcodePlugin;