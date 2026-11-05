import React, { useState } from 'react';
import SignInScreen from './src/components/SignInScreen';
import SignUpScreen from './src/components/SignUpScreen';
import ForgotPasswordScreen from './src/components/ForgotPasswordScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<'signin' | 'signup' | 'forgot'>('signin');

  if (currentScreen === 'signup') {
    return <SignUpScreen onSwitchToSignIn={() => setCurrentScreen('signin')} />;
  }

  if (currentScreen === 'forgot') {
    return <ForgotPasswordScreen onBackToSignIn={() => setCurrentScreen('signin')} />;
  }

  return (
    <SignInScreen 
      onSwitchToSignUp={() => setCurrentScreen('signup')} 
      onSwitchToForgotPassword={() => setCurrentScreen('forgot')}
    />
  );
}