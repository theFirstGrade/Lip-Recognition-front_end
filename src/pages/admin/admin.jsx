import React, {Component} from "react";
import {Layout, Menu, Breadcrumb} from 'antd';

import Header from '../../components/topBar/header';
import './admin.less'
import {Navigate, Route, Router, Routes, Switch} from "react-router-dom";
import Home from "../home/home";
import About from "../about/about";
import LiveRecord from "../liveRecord/liveRecord";
import UploadVideo from "../uploadVideo/uploadVideo";
import Login from "../login/login";
import './admin.less'
const {Content, Footer} = Layout;

export default class Admin extends Component {

    render() {

        return (
            <Layout className="layout">
                <Header/>
                <Content style={{marginTop: 88, height:'100%'}}>
                    <Switch>
                        <Route path='/home' component={Home}/>
                        <Route path='/about' component={About}/>
                        <Route path='/liveRecord' component={LiveRecord}/>
                        <Route path='/uploadVideo' component={UploadVideo}/>
                        <Route path='/login' component={Login}/>
                    </Switch>
                </Content>
            </Layout>
        )
    }
}
