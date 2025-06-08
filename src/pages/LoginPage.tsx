import React from 'react';
import { useForm } from 'react-hook-form';
import { upFetch } from '../api/client';
import { useNavigate } from 'react-router-dom';

interface LoginFormData {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const { register, handleSubmit } = useForm<LoginFormData>();
  const navigate = useNavigate();

   const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await upFetch('/login', {
        method: 'POST',
        body: data,
      });
      localStorage.setItem('token', response.token);
      navigate('/');
    } catch (error) {
      alert('Login failed');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto p-4">
      <h1 className="text-2xl mb-4">Login</h1>
      <input
        {...register('email')}
        placeholder="email"
        className="w-full border p-2 mb-2 rounded"
      />
      <input
        {...register('password')}
        type="password"
        placeholder="Password"
        className="w-full border p-2 mb-2 rounded"
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Login
      </button>
    </form>
  );
};

export default LoginPage;
