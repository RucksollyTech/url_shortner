import Image from "next/image";
import { Inter } from "next/font/google";
import NavBar from "@/Componets/NavBar";
import { ChangeEvent, KeyboardEvent, MouseEvent, useEffect, useRef, useState } from "react";
import { useQRCode } from 'next-qrcode';
import { ROOT_URL } from "@/Componets/Constants";
import { saveAs } from 'file-saver'
import ReactModal from 'react-modal';

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
    const [url,setUrl] = useState<string | undefined>()
    const [copySuccess,setCopySuccess] = useState<string | undefined>()
    const [shortUrl,setShortUrl] = useState<string | undefined>()
    const [shortUrlQ,setShortUrlQ] = useState<boolean | undefined>()
    const [modalOpener,setModalOpener] = useState<boolean>(false)
    const [showQrCode,setShowQrCode] = useState<boolean | undefined>()
    const [loading,setLoading] = useState<boolean | undefined>()
    const [success,setSuccess] = useState<boolean>(false)
    const { Image:Amaze } = useQRCode();

    const [form,setForm] = useState({url: "", report: ""})

    const ref = useRef<HTMLTextAreaElement>(null)
    const ref2 = useRef<HTMLDivElement>(null)
    function copyToClipboard(e:MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLButtonElement>) {
        const target = e.target as HTMLTextAreaElement;
        ref?.current?.select();
        document.execCommand('copy');
        // @ts-expect-error
        e.target.focus();
        setCopySuccess('Copied!');
        setTimeout(() => {
            setCopySuccess('');
        }, 2000);
    };
    const download = () => {
        // @ts-expect-error
        saveAs(ref2?.current?.children[0]?.src, 'image.jpeg')
    }
    const changeForm = (e:ChangeEvent<HTMLInputElement>):void=>{
        setUrl(e.target.value)
        setShortUrl("")
    }
    const newUrlHandler = async(e:MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLButtonElement>) =>{
        setShowQrCode(false)
        if(url && !shortUrl){
            setLoading(true)
            const response = await fetch('/api/create_url', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    url: url
                })
            })
            const data = await response.json()
            if(!data.errors){
                const {new_url} = data
                setShortUrl(new_url)
            }
            setLoading(false)
        }
    }
    const submitQuery= async()=>{
        setLoading(true)
        const response = await fetch('/api/report_url', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                data: form
            })
        })
        const data = await response.json()
        if(!data.errors){
            const {success} = data
            setSuccess(success)
        }
        setLoading(false)
    }
    useEffect(()=>{
        if(!showQrCode || showQrCode){
            setShortUrlQ(!showQrCode)
        }
    },[showQrCode])

    
    return (
        <div
            className={`${inter.className}`}
        >
            <NavBar url={url} newUrlHandler={newUrlHandler} setShowQrCode={setShowQrCode} />
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
                            <div>
                                <button disabled={url?false:true} onClick={newUrlHandler} className="outline_btn_success lg">
                                    Shorten URL
                                </button>
                                <button onClick={()=>setShowQrCode(true)} className="btn_primary lg">
                                    Convert to QR Code
                                </button>
                            </div>
                        </div>
                        <div className="formContent">
                            <div className="padContent">
                                Enter URL/Web Link
                            </div>
                            <input 
                                value={url}
                                onChange={(e:ChangeEvent<HTMLInputElement>)=>changeForm(e)}
                                type="text" 
                                placeholder="Eg: www.greyvalour.com"
                            />
                            <div className="padContent2">
                                <button disabled={url?false:true} onClick={newUrlHandler} className="outline_btn_success">
                                    Shorten URL
                                </button>
                                <button onClick={()=>setShowQrCode(true)} className="btn_primary">
                                    Convert to QR Code
                                </button>
                            </div>
                            <div className="liner" />
                            <div className="padContent2">
                                {loading && <div className="text-rose-500"> Loading... </div>}
                                <div className="pb_1">
                                    <strong>
                                        Result: 
                                    </strong>
                                </div>
                                {(shortUrl && !showQrCode) &&
                                    <textarea ref={ref} className="border w-full rounded-[10px] px-[15px] py-[10px] bg-[#FFFFFF] max-h-[50px]">
                                        {`${ROOT_URL}/${shortUrl}`}
                                    </textarea>
                                }
                                {(showQrCode && !shortUrlQ) &&
                                    <div ref ={ref2}>
                                        <Amaze
                                            text={`${ROOT_URL}/${shortUrl}`}
                                            options={{
                                                type: 'image/jpeg',
                                                quality: 0.3,
                                                errorCorrectionLevel: 'M',
                                                margin: 3,
                                                scale: 4,
                                                width: 200,
                                                color: {
                                                dark: '#010599FF',
                                                light: '#FFFFFFFF',
                                                },
                                            }}
                                        />
                                    </div>
                                }
                                {shortUrl &&
                                    <div className="padContent3">
                                        {(shortUrl && !showQrCode) &&
                                            <>
                                                <button onClick={copyToClipboard} className="outline_btn_success">
                                                    Copy 
                                                </button>
                                                <span className="text-rose-500 pl-2 font-semibold">{copySuccess}</span>
                                            </>
                                        }
                                        {(showQrCode && !shortUrlQ) &&
                                            <button onClick={download} className="outline_btn_success">
                                                Download
                                            </button>
                                        }
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className="report" onClick={()=>setModalOpener(true)}>
                    <img width="25" height="25" src="https://img.icons8.com/external-bartama-glyph-64-bartama-graphic/25/FFFFFF/external-ban-miscellaneous-elements-glyph-bartama-glyph-64-bartama-graphic.png" alt="ban"/>
                    Report Abuse
                </div>
                <ReactModal
                    isOpen={modalOpener}
                    className="relative outline-none max-w-[400px] my-[150px] mx-auto shadow-md rounded bg-white p-3"
                >
                    <img onClick={()=>setModalOpener(false)} className="absolute top-1 right-1 cursor-pointer" width="25" height="25" src="https://img.icons8.com/ios-glyphs/25/multiply.png" alt="multiply"/>
                    {!success ? 
                        <>
                            <div className="font-bold">
                                Enter the malicious URL
                            </div>
                            <div className="pt-2">
                                <input 
                                    value={form.url}
                                    onChange={(e:ChangeEvent<HTMLInputElement>)=>setForm({...form, url: e.target.value})} 
                                    placeholder="Enter URL " 
                                    type="text" 
                                    className="border rounded p-1 w-full" 
                                />
                            </div>
                            <div className="pt-2">
                                <div className="font-bold text-xs pb-1">
                                    Write Report(Optional)
                                </div>
                                <textarea 
                                    value={form.report}
                                    onChange={(e:ChangeEvent<HTMLTextAreaElement>)=>setForm({...form, report: e.target.value})}
                                    placeholder="Start typing " 
                                    className="border rounded p-1 w-full" 
                                />
                            </div>
                            <div className="pt-2">
                                <button disabled={loading} onClick={submitQuery} className="w-full font-medium p-1 rounded bg-rose-500 text-white">
                                    {loading ? "Submitting request..." : "Submit"}
                                </button>
                            </div>
                        </>
                    :   
                        <div className="pt-4">
                            <div className="font-bold p-2 rounded text-green-900 bg-green-400">
                                Your report was received. 
                            </div>
                            <div className="text-red-500 pt-2 text-xs font-extrabold">
                                Please do not repeat request.  
                            </div>  
                        </div>
                    }
                </ReactModal>

            </div>
        </div>
    );
}
