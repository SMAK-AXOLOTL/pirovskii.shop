import React, {lazy, Suspense} from 'react';
import './App.css';
import HeaderComponent from "./components/header/HeaderComponent";
import LandingComponent from "./components/landing/LandingComponent";
import {Navigate, Route, Routes} from "react-router-dom";
import ContactsComponent from "./components/contacts/ContactsComponent";
import SkisComponent from "./components/skis/SkisComponent";
import {skiTypeEnum} from "./utils/skiTypeEnum";
import SkiPolesComponent from "./components/skipoles/SkiPolesComponent";
import {LoginComponent} from "./components/login/LoginComponent";

const DashboardComponent = lazy(() => import('./components/dashboard/DashboardComponent'))

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
