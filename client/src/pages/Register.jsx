import React, { useEffect } from 'react'
// import Button from "../components/Button"
import { Link, useNavigate } from 'react-router-dom'

import { Form, Input, message, Button } from 'antd'
import { RegisterUser } from '../apicalls/users'

const Register = () => {
  const navigate = useNavigate();
  const onFinish = async (value) => {
    try {
      const res = await RegisterUser(value);
      if (res.success) {
        message.success(res.message);
      }
      else {
        message.error(res.message);
      }
    } catch (error) {
      message.error(error.message);
    }

  }

  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/');
    }
  }, [])

  return (
    <div className="flex justify-center h-screen items-center">
      <div className="card p-3 w-400 bg-lightgrey br-10">
        <h1 className="text-xl mb-1">Welcome to BookMyShow!
          <br />
          Please Register </h1>
        <hr />
        <Form layout="vertical" className="mt-1" onFinish={onFinish}>
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <Input type="text" placeholder="Enter your full name" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input type="email" placeholder="Enter your email" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password placeholder="Enter your password" />
          </Form.Item>

          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please confirm your password!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('The new password that you entered do not match!'));
                },
              }),
            ]}
          >
            <Input.Password placeholder="Re-enter your password" />
          </Form.Item>

          <div className="flex flex-col mt-2 gap-1">
            <Button
              htmlType='submit'
              type='primary'
              block
              size='large'
            > Register </Button>

            <Link to="/login" className="text-primary">
              Already have an account? Login
            </Link>
          </div>
        </Form>
      </div>
    </div>
  )
}

export default Register;