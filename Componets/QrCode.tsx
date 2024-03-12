// import React from 'react'
// import { useQRCode } from 'next-qrcode';

// interface theUrl{
//     url:string
// }
// const QrCode = ({url}:theUrl) => {
//     const { Image } = useQRCode();

//     return (
//         <Image
//             text={url}
//             options={{
//                 type: 'image/jpeg',
//                 quality: 0.3,
//                 errorCorrectionLevel: 'M',
//                 margin: 3,
//                 scale: 4,
//                 width: 200,
//                 color: {
//                 dark: '#010599FF',
//                 light: '#FFFFFFFF',
//                 },
//             }}
//         />
//     )
// }

// export default QrCode




import React from 'react'
import { useQRCode } from 'next-qrcode';
import QRCode from "react-qr-code";

interface theUrl{
    url:string
}
const QrCode = ({url}:theUrl) => {

    return (
        <div style={{ height: "auto", margin: "0 auto", maxWidth: 64, width: "100%" }}>
            <QRCode
                
                size={256}
                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                value={url}
                viewBox={`0 0 256 256`}
            />
        </div>
    )
}

export default QrCode