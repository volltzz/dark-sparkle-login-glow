
import React from 'react';
import BackgroundGlow from '@/components/BackgroundGlow';
import SignUpForm from '@/components/SignUpForm';

const SignUp: React.FC = () => {
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
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gradient">Create Account</h1>
            <p className="text-muted-foreground text-center">
              Enter your details to create a new account
            </p>
          </div>
          
          <SignUpForm />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
