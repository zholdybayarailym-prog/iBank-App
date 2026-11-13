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
import TransferScreen from './src/components/TransferScreen';
import ConfirmScreen from './src/components/ConfirmScreen';
import TransferSuccessScreen from './src/components/TransferSuccessScreen';
import MessageScreen from './src/components/MessageScreen';
import MessageDetailScreen from './src/components/MessageDetailScreen'; 

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<string>('signin');
  const [userPhone, setUserPhone] = useState('');
  
  // Чатқа өтетін банктің атын сақтауға арналған state
  const [selectedBankName, setSelectedBankName] = useState('Bank of America');
  
  // Транзакция деректерін сақтауға арналған state
  const [transferData, setTransferData] = useState({
    fromAccount: '',
    toName: '',
    cardNumber: '',
    amount: '',
    content: '',
  });

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
          onNavigateToExchange={() => setCurrentScreen('exchange')}
          onNavigateToTransfer={() => setCurrentScreen('transfer')}
          onNavigateToMessage={() => setCurrentScreen('message')}
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
          onNavigateToMessage={() => setCurrentScreen('message')}
        />
      );

    case 'message':
      return (
        <MessageScreen
          onBack={() => setCurrentScreen('home')}
          onNavigateToHome={() => setCurrentScreen('home')}
          onNavigateToSearch={() => setCurrentScreen('search')}
          onNavigateToDetail={(bankName) => { // <--- Қай банк басылғанын қабылдап, чатқа жібереді
            setSelectedBankName(bankName);
            setCurrentScreen('messageDetail');
          }}
        />
      );

    case 'messageDetail': // <--- Чат экраны (MessageDetailScreen)
      return (
        <MessageDetailScreen
          bankName={selectedBankName}
          onBack={() => setCurrentScreen('message')}
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

    case 'transfer':
      return (
        <TransferScreen
          onBack={() => setCurrentScreen('home')}
          onNavigateToConfirm={(data) => {
            setTransferData(data);
            setCurrentScreen('confirm');
          }}
        />
      );

    case 'confirm':
      return (
        <ConfirmScreen
          transferData={transferData}
          onBack={() => setCurrentScreen('transfer')}
          onSuccess={() => setCurrentScreen('success')}
        />
      );

    case 'success':
      return (
        <TransferSuccessScreen
          transferData={transferData}
          onBackHome={() => setCurrentScreen('home')}
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