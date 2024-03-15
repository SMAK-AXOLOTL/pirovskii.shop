import React, {Suspense} from 'react';
import './App.css';
import HeaderComponent from "./Components/Header/HeaderComponent";
import LandingComponent from "./Components/Landing/LandingComponent";
import {HashRouter, Navigate, Route, Routes} from "react-router-dom";
import ContactsComponent from "./Components/Contacts/ContactsComponent";
import SkisComponent from "./Components/Skis/SkisComponent";
import {skiTypeEnums} from "./utils/skiTypeEnum";

//todo: responsive design
//todo: manage colors better

function App() {
  return <div className="App">
      <HashRouter>
          <HeaderComponent/>
          <div className='Content'>
              <Suspense>
                  <Routes>
                      <Route path={'/landing'} element={<LandingComponent/>}/>
                      <Route path={'/skating/:modelId?'} element={<SkisComponent typeEnum={skiTypeEnums.skating}/>}/>
                      <Route path={'/classic/:modelId?'} element={<SkisComponent typeEnum={skiTypeEnums.classic}/>}/>
                      <Route path={'/contacts'} element={<ContactsComponent/>}/>

                      <Route path={''} element={<Navigate to={'/landing'}/>}/>
                  </Routes>
              </Suspense>
          </div>
      </HashRouter>
    </div>
}

export default App;
