import React, { useState } from 'react';
import SignInScreen from './src/components/SignInScreen';
import SignUpScreen from './src/components/SignUpScreen';
import ForgotPasswordScreen from './src/components/ForgotPasswordScreen';
import VerificationScreen from './src/components/VerificationScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<'signin' | 'signup' | 'forgot' | 'verify'>('signin');
  const [userPhone, setUserPhone] = useState('');

  if (currentScreen === 'signup') {
    return <SignUpScreen onSwitchToSignIn={() => setCurrentScreen('signin')} />;
  }

  if (currentScreen === 'forgot') {
    return (
      <ForgotPasswordScreen 
        onBackToSignIn={() => setCurrentScreen('signin')} 
        onNavigateToVerify={(phone) => {
          setUserPhone(phone);
          setCurrentScreen('verify');
        }}
      />
    );
  }

  if (currentScreen === 'verify') {
    return (
      <VerificationScreen 
        phoneNumber={userPhone}
        onBack={() => setCurrentScreen('forgot')} 
      />
    );
  }

  return (
    <SignInScreen 
      onSwitchToSignUp={() => setCurrentScreen('signup')} 
      onSwitchToForgotPassword={() => setCurrentScreen('forgot')}
    />
  );
}