import logo from './logo.svg';
import './App.less';
import React from "react";
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Admin from "./pages/admin/admin";

function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/' component={Admin}/>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
