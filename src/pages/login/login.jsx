import React, {Component} from "react";
import {Form, Input, Button, Checkbox, message} from 'antd';
import {UserOutlined, LockOutlined} from '@ant-design/icons';
import './login.less'
import storageUtils from "../../utils/storageUtils";
import {reqLogin} from "../../api";

export default class Login extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        const NormalLoginForm = () => {
            const onFinish = async (values) => {
                console.log('Received values of form: ', values);
                const result = await reqLogin(values.email, values.password, 'POST')
                if (result.code === 200) {
                    message.success('login successfully')
                    storageUtils.saveUser(result.user)
                    this.props.history.goBack()
                    if (values.remember === true) {
                        storageUtils.saveUserName(values.email)
                    }
                }else{
                    message.error('wrong username or password')
                }
            };

            return (
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{
                        remember: true,
                        email: storageUtils.getUserName()
                    }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your email!',
                            },
                        ]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="email"/>
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Password!',
                            },
                        ]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon"/>}
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Form.Item className='left' name="remember" valuePropName="checked" noStyle>
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>

                        <a className="login-form-forgot" href="">
                            Forgot password
                        </a>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Log in
                        </Button>
                        Or <a href="">register now!</a>
                    </Form.Item>
                </Form>
            );
        };
        return (
            <div className='box'>
                <NormalLoginForm/>
            </div>
        );
    }

}