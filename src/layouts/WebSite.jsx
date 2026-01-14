import React, { useEffect, useRef, useState } from 'react'
import { Outlet } from 'react-router-dom'



const WebSite = () => {

    return (
        <div className="relative">
            <div className="">
                <Outlet />
            </div>
        </div>
    )
}

export default WebSite
