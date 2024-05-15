import React, { useState } from 'react'

export const QrCode = () => {
    //using useState
let [img , setImg] = useState("")
let [loading , setLoading] =useState(false)
let[qrData , setQrData] = useState("Sudeepthi")
let [qrSize, setQrSize] = useState("175")

    function generateQr(){
       setLoading(true);
       try{
        let url = `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodeURIComponent(qrData)}`
        setImg(url)

       }
       catch(error){
        console.log("Error Generating QR Code",error)
       }
       finally{
        setLoading(false)
       }
    }
function downloadQr(){
    fetch(img).then((response)=>(response.blob())).then((blob)=>{
        let link = document.createElement("a")
        link.href = URL.createObjectURL(blob)
        link.download="qrcode.png"
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }).catch(error)(
        alert("Error Downloading",error)
    )
        
    

}



    return (
        <>
        
            <div className="app-container">
                <h1>QR Code Generator</h1>
                {loading && <p><i>Please wait...</i></p>}
          {img &&   <img className="Qr-code-image"  src={img} alt=" QRcode image" />}
               <div>
               <label htmlFor="dataInput" className="inputLabel">Data For a QR Code</label>
                <input type="text" id="dataInput" value={qrData}  className="inputLabel" placeholder='Enter data for QR code...'  onChange={(e)=>(setQrData(e.target.value))}  />
                <label htmlFor="sizeInput" className='inputLabel'>Image Size for QR code(e.g:150)</label>
                <input type="text" value={qrSize} id="sizeInput" className='inputLabel' placeholder='Enter size for QR code....' onChange={(e)=>(setQrSize(e.target.value))}/>
                <button onClick={generateQr} className='generatebtn' disabled={loading}>Generate QR Code</button>
                <button className='downloadbtn' onClick={downloadQr}>Download QR Code</button>
               </div>
                <p className='footer'>Designed By <a href="#"> <i>@DKS</i></a></p>
            </div>
        </>
    )
}
