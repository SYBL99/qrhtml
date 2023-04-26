import logo from './logo.svg';
import './App.css';
import Html5QrcodePlugin from './Qr';
import { useEffect, useState } from 'react';

function App() {

  const [show, setShow] = useState(false)
  const onNewScanResult = (decodedText, decodedResult) => {
    console.log(decodedText)
};

  return (
    <div className="App">
      {show ? <Html5QrcodePlugin
        fps={10}
        qrbox={250}
        disableFlip={false}
        qrCodeSuccessCallback={onNewScanResult}
      /> : null}
      <button onClick={()=>{setShow(true)}}>scan</button>
      <div className='Qr_container'>
      </div>
    </div>
  );
}

export default App;
