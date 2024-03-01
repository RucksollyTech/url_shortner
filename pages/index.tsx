import Image from "next/image";
import { Inter } from "next/font/google";
import NavBar from "@/Componets/NavBar";
import { ChangeEvent, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
    const [url,setUrl] = useState<string | undefined>()
    const [shortUrl,setShortUrl] = useState<string | undefined>("bitly.com/ffr23")
    return (
        <div
            className={`${inter.className}`}
        >
            <NavBar />
            <div className="landingBg">
                <div className="standardWidth">
                    <div className="landingContainer ">
                        <div className="pt_100">
                            <small className="blue bold6">
                                Easy way to share my web links.
                            </small>
                            <h1 className="HeaderFont minPad">
                                Shorten the long URL/Web link in just two
                                steps.
                            </h1>
                            <p>
                                <button className="outline_btn_success lg">
                                    Shorten URL
                                </button>
                                <button className="btn_primary lg">
                                    Convert to QR Code
                                </button>
                            </p>
                        </div>
                        <div className="formContent">
                            <p className="padContent">
                                Enter URL/Web Link
                            </p>
                            <input 
                                value={url}
                                onChange={(e:ChangeEvent<HTMLInputElement>)=>setUrl(e.target.value)}
                                type="text" 
                                placeholder="Eg : www.greyvalour.com"
                            />
                            <p className="padContent2">
                                <button className="outline_btn_success">
                                    Shorten URL
                                </button>
                                <button className="btn_primary">
                                    Convert to QR Code
                                </button>
                            </p>
                            <div className="liner" />
                            <p className="padContent2">
                                <div className="pb_1">
                                    <strong>
                                        Result: 
                                    </strong>
                                </div>
                                {/* <input 
                                    value={shortUrl}
                                    type="text" 
                                    placeholder="Eg : www.greyvalour.com"
                                /> */}
                                <div>
                                    <Image height={200} width={200} src="/qrcode.avif" alt="" />
                                </div>
                                <p className="padContent3">
                                    <button className="outline_btn_success">
                                        Share
                                    </button>
                                    <button className="btn_primary">
                                        Copy Download
                                    </button>
                                </p>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="report">
                    <img width="25" height="25" src="https://img.icons8.com/external-bartama-glyph-64-bartama-graphic/25/FFFFFF/external-ban-miscellaneous-elements-glyph-bartama-glyph-64-bartama-graphic.png" alt="ban"/>
                    Report Abuse
                </div>
            </div>
        </div>
    );
}
