import React, { useState } from 'react';
import SignInScreen from './src/components/SignInScreen';
import SignUpScreen from './src/components/SignUpScreen';
import ForgotPasswordScreen from './src/components/ForgotPasswordScreen';
import VerificationScreen from './src/components/VerificationScreen';
import ChangePasswordScreen from './src/components/ChangePasswordScreen';
import PasswordChangedScreen from './src/components/PasswordChangedScreen';
import HomeScreen from './src/components/HomeScreen';
import SearchScreen from './src/components/SearchScreen';
import BranchScreen from './src/components/BranchScreen';
import InterestRateScreen from './src/components/InterestRateScreen';
import ExchangeRateScreen from './src/components/ExchangeRateScreen';
import LanguageScreen from './src/components/LanguageScreen';
import ExchangeScreen from './src/components/ExchangeScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<string>('signin');
  const [userPhone, setUserPhone] = useState('');

  console.log("Ағымдағы экран:", currentScreen);

  switch (currentScreen) {
    case 'signin':
      return (
        <SignInScreen
          onSwitchToSignUp={() => setCurrentScreen('signup')}
          onSwitchToForgotPassword={() => setCurrentScreen('forgot')}
          onSignInSuccess={() => setCurrentScreen('home')}
        />
      );

    case 'signup':
      return (
        <SignUpScreen
          onSwitchToSignIn={() => setCurrentScreen('signin')}
        />
      );

    case 'forgot':
      return (
        <ForgotPasswordScreen
          onBackToSignIn={() => setCurrentScreen('signin')}
          onNavigateToVerify={(phone) => {
            setUserPhone(phone);
            setCurrentScreen('verify');
          }}
        />
      );

    case 'verify':
      return (
        <VerificationScreen
          phoneNumber={userPhone}
          onBack={() => setCurrentScreen('forgot')}
          onNavigateToChangePassword={() => setCurrentScreen('changePassword')}
        />
      );

    case 'changePassword':
      return (
        <ChangePasswordScreen
          onBack={() => setCurrentScreen('verify')}
          onSuccess={() => setCurrentScreen('passwordChanged')}
        />
      );

    case 'passwordChanged':
      return (
        <PasswordChangedScreen
          onBack={() => setCurrentScreen('changePassword')}
          onSuccess={() => setCurrentScreen('signin')}
        />
      );

    case 'home':
      return (
        <HomeScreen
          onNavigateToSearch={() => setCurrentScreen('search')}
        />
      );

    case 'search':
      return (
        <SearchScreen
          onNavigateToHome={() => setCurrentScreen('home')}
          onNavigateToBranch={() => setCurrentScreen('branch')}
          onNavigateToInterestRate={() => setCurrentScreen('interestRate')}
          onNavigateToExchangeRate={() => setCurrentScreen('exchangeRate')}
          onNavigateToLanguage={() => setCurrentScreen('language')}
          onNavigateToExchange={() => setCurrentScreen('exchange')}
        />
      );

    case 'branch':
      return (
        <BranchScreen
          onBack={() => setCurrentScreen('search')}
        />
      );

    case 'interestRate':
      return (
        <InterestRateScreen
          onNavigateBack={() => setCurrentScreen('search')}
        />
      );

    case 'exchangeRate':
      return (
        <ExchangeRateScreen
          onNavigateBack={() => setCurrentScreen('search')}
        />
      );

    case 'language':
      return (
        <LanguageScreen
          onNavigateBack={() => setCurrentScreen('search')}
        />
      );

    case 'exchange':
      return (
        <ExchangeScreen
          onBack={() => setCurrentScreen('search')}
        />
      );
    case 'home':
      return (
        <HomeScreen
          onNavigateToSearch={() => setCurrentScreen('search')}
          onNavigateToExchange={() => setCurrentScreen('exchange')} // <--- Осы жолды қосасыз
        />
      );
      
    default:
      return (
        <SignInScreen
          onSwitchToSignUp={() => setCurrentScreen('signup')}
          onSwitchToForgotPassword={() => setCurrentScreen('forgot')}
          onSignInSuccess={() => setCurrentScreen('home')}
        />
      );
  }
}