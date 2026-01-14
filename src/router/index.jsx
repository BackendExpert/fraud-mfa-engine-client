import { BrowserRouter, Route, Routes } from 'react-router-dom'
import WebSite from '../layouts/WebSite'
import DefultError from '../component/Errors/DefultError'
import CreateAuth from '../pages/auth/CreateAuth'
import VerfiyPassword from '../pages/auth/VerfiyPassword'
import EnrollMFA from '../pages/auth/EnrollMFA'
import Dashbord from '../pages/auth/Dashboard/Dashbord'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<WebSite />} >
                    <Route path='*' element={<DefultError />} />
                    <Route index element={<CreateAuth /> } />   
                    <Route path='/verify-password' element={<VerfiyPassword /> } />
                    <Route path='/enroll-mfa' element={<EnrollMFA /> } />

                    <Route path='/dashboard' element={<Dashbord /> }/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
