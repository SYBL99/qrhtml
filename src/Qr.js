import { Html5QrcodeScanner, Html5Qrcode } from 'html5-qrcode';
import './App.css';
import { useEffect, useState } from 'react';

// Creates the configuration object for Html5QrcodeScanner
const Html5QrcodePlugin = (props) => {
    const [camera, setCamera] = useState(null)

    Html5Qrcode.getCameras().then(cameraDevices => setCamera(cameraDevices))

    const qrcodeRegionId = "html5qr";

    useEffect(() => {
        
        Html5Qrcode.getCameras().then(devices => {
            /**
             * devices would be an array of objects of type:
             * { id: "id", label: "label" }
             */
            if (devices && devices.length) {
              var cameraId = devices[devices.length - 1].id; // потом заменить на фильтр фронталки
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
            <fieldset>
    <legend>Выберите камеру:</legend>
        {camera?.map(device => <div>
            <input type="radio" id={device.id} name={device.label} value={device.id}></input>
            <label for={device.label}>{device.label}</label>
        </div>)}

    </fieldset>
        </>

    );
};

export default Html5QrcodePlugin;