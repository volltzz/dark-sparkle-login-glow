
import React from 'react';

const BackgroundGlow: React.FC = () => {
  return (
    <div className="fixed inset-0 overflow-hidden -z-10">
      <div className="absolute inset-0 bg-auth-gradient animate-gradient-background"></div>
      <div className="absolute top-1/4 left-1/3 w-64 h-64 rounded-full bg-purple-600/20 filter blur-3xl animate-pulse-glow"></div>
      <div className="absolute top-2/3 right-1/4 w-80 h-80 rounded-full bg-blue-600/20 filter blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-1/4 left-1/4 w-72 h-72 rounded-full bg-fuchsia-600/20 filter blur-3xl animate-pulse-glow" style={{ animationDelay: '2s' }}></div>
      
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjMjIyIj48L3JlY3Q+CjxwYXRoIGQ9Ik0wIDVMNSAwWk02IDRMNCA2Wk0tMSAxTDEgLTFaIiBzdHJva2U9IiMzMzMiIHN0cm9rZS13aWR0aD0iMSI+PC9wYXRoPgo8L3N2Zz4=')] opacity-[0.15]"></div>
    </div>
  );
};

export default BackgroundGlow;
