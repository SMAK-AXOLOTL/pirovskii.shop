import React, {lazy, Suspense} from 'react';
import './App.css';
import HeaderComponent from "./components/header/HeaderComponent";
import LandingComponent from "./components/landing/LandingComponent";
import {Navigate, Route, Routes} from "react-router-dom";
import ContactsComponent from "./components/contacts/ContactsComponent";
import {skiTypeEnum} from "./enums/skiTypeEnum";
import SkiPolesComponent from "./components/skipoles/SkiPolesComponent";
import {LoginComponent} from "./components/login/LoginComponent";
import AllSkisComponent from "./components/skis/AllSkisComponent";
import SkiModelComponent from "./components/skis/skiModel/SkiModelComponent";
import {InitializeApp} from "./hooks/initializeApp";
import SkiPoleModelComponent from "./components/skipoles/skiPoleModel/SkiPoleModelComponent";

const DashboardComponent = lazy(() => import('./components/dashboard/DashboardComponent'))

function App() {

    InitializeApp()

    return <div className="App">
        <HeaderComponent/>
        <div className='Content'>
            <Suspense>
                <Routes>
                    <Route path={'/'} element={<LandingComponent/>}/>
                    <Route path={'/skating/:modelId?'} element={<SkiModelComponent/>}/>
                    <Route path={'/classic/:modelId?'} element={<SkiModelComponent/>}/>
                    <Route path={'/ski-poles/:modelId?'} element={<SkiPoleModelComponent/>}/>
                    <Route path={'/contacts'} element={<ContactsComponent/>}/>
                    <Route path={'/login'} element={<LoginComponent/>}/>
                    <Route path={'/allClassic'} element={<AllSkisComponent skiType={skiTypeEnum.CLASSIC}/>}/>
                    <Route path={'/allSkating'} element={<AllSkisComponent skiType={skiTypeEnum.SKATING}/>}/>
                    <Route path={'/allSkiPoles'} element={<SkiPolesComponent/>}/>

                    <Route path={'/dashboard'} element={<DashboardComponent/>}/>
                    <Route path={''} element={<Navigate to={'/landing'}/>}/>
                </Routes>
            </Suspense>
        </div>
    </div>
}

export default App;
