import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Dashbord = () => {
    const navigate = useNavigate()
    const token = localStorage.getItem('token')

    useEffect(() => {
        if(!token) {
            localStorage.removeItem('token')
            navigate('/', { replace: true })
        }
    }, [])
    return (
        <div>Dashbord</div>
    )
}

export default Dashbord