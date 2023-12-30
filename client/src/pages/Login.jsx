import React, { useEffect } from 'react'
import {Form, Input, message, Button} from "antd";
// import Button from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { LoginUser } from '../apicalls/users';


const Login = () => {
  const navigate = useNavigate();
  const onFinish = async (value) => {
    try {
      const res = await LoginUser(value);
      if (res.success) {
        message.success(res.greet);
        localStorage.setItem('token', res.token);
        window.location.href = '/';

      }
      else {
        message.error(res.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  }

  useEffect(()=>{
    if(localStorage.getItem('token')){
      navigate('/');
    }
  },[])

  return (
    <div className="flex justify-center h-screen items-center">
    <div className="card p-3 w-400 bg-lightgrey br-10">
      <h1 className="text-xl mb-1">Welcome Again! Please Login</h1>
      <hr />
      <Form layout="vertical" className="mt-1" onFinish={onFinish}>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input type="email" placeholder="Enter your login email" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password placeholder="Enter your login password" />
        </Form.Item>
          
          <Button 
            className='mb-1' 
            htmlType='submit' 
            type='primary' 
            block 
            size='large' 
          > Submit </Button>
          
          <Link to="/register" className="text-primary">
            Don't have an account? Register
          </Link>
      </Form>
    </div>
  </div>
  )
}

export default Login;