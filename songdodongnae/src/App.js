import './App.css';
import React from 'react';
//import { useNavigate } from 'react-router-dom';
import SocialLoginBtn from './SocialLoginBtn';
import ApiTest from './ApiTest';

function App() {
  
  return (
    <div className="App">
      <SocialLoginBtn />
      <ApiTest />
    </div>
  );
}

export default App;
