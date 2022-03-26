import React, {Component} from "react";
import {Menu, Button, Dropdown} from 'antd';
import './header.less'
import {Link, BrowserRouter, withRouter} from "react-router-dom";
import storageUtils from '../../utils/storageUtils'
import menuList from "../../res/menuList";

class Header extends Component {
    constructor(props) {
        super(props);
    }

    UNSAFE_componentWillMount() {
        this.menuList = this.getMenuList(menuList)
    }

    getMenuList = (menuList) => {
        return menuList.map(item => {
            console.log(item)
            return (
                <Menu.Item key={item.key}>
                    <Link to={item.key}>
                        <span>{item.title}</span>
                    </Link>
                </Menu.Item>
            )
        })
    }

    handleJumpToLogin = () => {
        this.props.history.push('/login')
    }

    handleLogOut = () => {
        storageUtils.removeUser()

        // 暂时使用页面刷新来更新登录状态，后期使用redux来管理登录状态
        window.location.reload()
    }

    render() {
        const path = this.props.location.pathname

        const menu = (
            <Menu style={{borderRadius: '10%', border: '#1DA57A solid 1px'}}>
                <Menu.Item>
                    <span onClick={() => this.handleLogOut()}>
                        log out
                    </span>
                </Menu.Item>
            </Menu>
        );

        return (
            <div className='header'>
                <div className='left'>
                    <Menu style={{
                        textAlign: 'center',
                        fontSize: '25px',
                        fontWeight: 500,
                        boxShadow: '0 5px 10px -9px #1DA57A',
                        backgroundColor: 'hsl(0deg 0% 100%)'
                    }} mode='horizontal'
                          theme='light'
                          selectedKeys={path}
                    >
                        {this.menuList}
                    </Menu>
                </div>
                <div className='right'>
                    {storageUtils.getUser() === undefined ?
                        <Button onClick={() => this.handleJumpToLogin()}>login</Button> :
                        <Dropdown overlay={menu} placement='bottomRight'>
                            <Button shape='round'>{storageUtils.getUser().name}</Button>
                        </Dropdown>}
                </div>
            </div>
        )
    }
}

export default withRouter(Header)