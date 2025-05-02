
import React from 'react';
import BackgroundGlow from '@/components/BackgroundGlow';
import LoginForm from '@/components/LoginForm';

const Login: React.FC = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4">
      <BackgroundGlow />
      
      <div className="w-full max-w-md animate-float">
        <div className="glass-morphism rounded-2xl p-8 shadow-2xl shadow-black/40 border border-white/10">
          <div className="flex flex-col items-center space-y-2 mb-8">
            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center shadow-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-white"
              >
                <path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"></path>
                <path d="M17 18h1"></path>
                <path d="M12 18h1"></path>
                <path d="M7 18h1"></path>
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gradient">Welcome Back</h1>
            <p className="text-muted-foreground text-center">
              Please enter your credentials to access your account
            </p>
          </div>
          
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default Login;
