import Image from "next/image";
import React from 'react'

interface Navs {
    ():React.JSX.Element
}

const NavBar:Navs = () => {
    return (
        <div className="navBarContainer">
            <div className="navBar">
                <div>
                    LOGO
                </div>
                <div>
                    <button className="outline_btn_success">
                        Short Link
                    </button>
                    <button className="btn_primary">
                        QR Code
                    </button>
                </div>
            </div>
        </div>
    )
}

export default NavBar