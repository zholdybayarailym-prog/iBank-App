import React, { useState } from 'react';
import SignInScreen from './src/components/SignInScreen';
import SignUpScreen from './src/components/SignUpScreen';
import ForgotPasswordScreen from './src/components/ForgotPasswordScreen';
import VerificationScreen from './src/components/VerificationScreen';
import ChangePasswordScreen from './src/components/ChangePasswordScreen';
import PasswordChangedScreen from './src/components/PasswordChangedScreen'; // Жаңа экранды қостық

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<'signin' | 'signup' | 'forgot' | 'verify' | 'changePassword' | 'passwordChanged'>('signin');
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
        onNavigateToChangePassword={() => {
          setCurrentScreen('changePassword');
        }}
      />
    );
  }

  if (currentScreen === 'changePassword') {
    return (
      <ChangePasswordScreen 
        onBack={() => setCurrentScreen('verify')}
        onSuccess={() => {
          // Alert-тің орнына суреттегі жаңа экранға ауыстырамыз
          setCurrentScreen('passwordChanged');
        }}
      />
    );
  }

  if (currentScreen === 'passwordChanged') {
    return (
      <PasswordChangedScreen 
        onSuccess={() => {
          // Ok басылғанда Sign in бетіне қайтамыз
          setCurrentScreen('signin');
        }}
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