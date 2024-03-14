import React, {Suspense} from 'react';
import './App.css';
import HeaderComponent from "./Components/Header/HeaderComponent";
import LandingComponent from "./Components/Landing/LandingComponent";
import {HashRouter, Navigate, Route, Routes} from "react-router-dom";
import SkatingComponent from "./Components/Skating/SkatingComponent";
import ContactsComponent from "./Components/Contacts/ContactsComponent";

//TODO: classic skis redux, mocks and component
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
                      <Route path={'/skating/:modelId?'} element={<SkatingComponent/>}/>
                      <Route path={'/contacts'} element={<ContactsComponent/>}/>

                      <Route path={''} element={<Navigate to={'/landing'}/>}/>
                  </Routes>
              </Suspense>
          </div>
      </HashRouter>
    </div>
}

export default App;
