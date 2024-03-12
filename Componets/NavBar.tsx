import { ChangeEvent, KeyboardEvent, MouseEvent, useEffect, useState } from "react";
import React from 'react'

interface NavVars{
    url: string | undefined,
    newUrlHandler : (e: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLButtonElement>) => Promise<void>
    setShowQrCode: React.Dispatch<React.SetStateAction<boolean | undefined>>
} 

const NavBar = ({url,newUrlHandler,setShowQrCode}:NavVars):React.JSX.Element => {
    return (
        <div className="navBarContainer">
            <div className="navBar">
                <div>
                    LOGO
                </div>
                <div>
                    <button disabled={url?false:true} onClick={newUrlHandler} className="outline_btn_success">
                        Short Link
                    </button>
                    <button onClick={()=>setShowQrCode(true)} className="btn_primary">
                        QR Code
                    </button>
                </div>
            </div>
        </div>
    )
}

export default NavBar