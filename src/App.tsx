import React, {Suspense} from 'react';
import './App.css';
import HeaderComponent from "./Components/Header/HeaderComponent";
import LandingComponent from "./Components/Landing/LandingComponent";
import {HashRouter, Navigate, Route, Routes} from "react-router-dom";
import ContactsComponent from "./Components/Contacts/ContactsComponent";
import SkisComponent from "./Components/Skis/SkisComponent";
import {skiTypeEnum} from "./utils/skiTypeEnum";
import DashboardComponent from "./Components/Dashboard/DashboardComponent";
import SkiPolesComponent from "./Components/skipoles/SkiPolesComponent";

//todo: responsive design
//todo: manage colors better
//todo: rename files
//todo: add ski pole component
function App() {
  return <div className="App">
      <HashRouter>
          <HeaderComponent/>
          <div className='Content'>
              <Suspense>
                  <Routes>
                      <Route path={'/landing'} element={<LandingComponent/>}/>
                      <Route path={'/skating/:modelId?'} element={<SkisComponent typeEnum={skiTypeEnum.SKATING}/>}/>
                      <Route path={'/classic/:modelId?'} element={<SkisComponent typeEnum={skiTypeEnum.CLASSIC}/>}/>
                      <Route path={'/ski-poles/:modelId?'} element={<SkiPolesComponent/>}/>
                      <Route path={'/contacts'} element={<ContactsComponent/>}/>

                      <Route path={'/dashboard'} element={<DashboardComponent/>}/>
                      <Route path={''} element={<Navigate to={'/landing'}/>}/>
                  </Routes>
              </Suspense>
          </div>
      </HashRouter>
    </div>
}

export default App;
