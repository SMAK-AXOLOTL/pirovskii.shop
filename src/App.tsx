import React, {lazy, Suspense} from 'react';
import './App.css';
import HeaderComponent from "./Components/Header/HeaderComponent";
import LandingComponent from "./Components/Landing/LandingComponent";
import {Navigate, Route, Routes} from "react-router-dom";
import ContactsComponent from "./Components/Contacts/ContactsComponent";
import SkisComponent from "./Components/Skis/SkisComponent";
import {skiTypeEnum} from "./utils/skiTypeEnum";
import SkiPolesComponent from "./Components/skipoles/SkiPolesComponent";
import {LoginComponent} from "./Components/login/LoginComponent";

const DashboardComponent = lazy(() => import('./Components/Dashboard/DashboardComponent'))

//todo: responsive design
//todo: manage colors better
//todo: rename files

function App() {
    return <div className="App">
        <HeaderComponent/>
        <div className='Content'>
            <Suspense>
                <Routes>
                    <Route path={'/'} element={<LandingComponent/>}/>
                    <Route path={'/skating/:modelId?'} element={<SkisComponent typeEnum={skiTypeEnum.SKATING}/>}/>
                    <Route path={'/classic/:modelId?'} element={<SkisComponent typeEnum={skiTypeEnum.CLASSIC}/>}/>
                    <Route path={'/ski-poles/:modelId?'} element={<SkiPolesComponent/>}/>
                    <Route path={'/contacts'} element={<ContactsComponent/>}/>
                    <Route path={'/login'} element={<LoginComponent/>}/>

                    <Route path={'/dashboard'} element={<DashboardComponent/>}/>
                    <Route path={''} element={<Navigate to={'/landing'}/>}/>
                </Routes>
            </Suspense>
        </div>
    </div>
}

export default App;
