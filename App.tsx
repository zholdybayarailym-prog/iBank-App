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
import SettingScreen from './src/components/SettingScreen';
import AppInfoScreen from './src/components/AppInfoScreen';
import TransactionReportScreen from './src/components/TransactionReportScreen';
import AccountAndCardScreen from './src/components/AccountAndCardScreen';
import CardDetailScreen from './src/components/CardDetailScreen';
import WithdrawScreen from './src/components/WithdrawScreen';
import MobilePrepaidScreen from './src/components/MobilePrepaidScreen';
import MobilePrepaidConfirmScreen from './src/components/MobilePrepaidConfirmScreen';
import MobilePrepaidSuccessScreen from './src/components/MobilePrepaidSuccessScreen';
import PayBillsScreen from './src/components/PayBillsScreen';
import PayBillFormScreen from './src/components/PayBillFormScreen';
import PaymentHistoryScreen from './src/components/PaymentHistoryScreen';
import PaymentDetailScreen from './src/components/PaymentDetailScreen';
import PaymentSuccessScreen from './src/components/PaymentSuccessScreen';
import SaveOnlineScreen from './src/components/SaveOnlineScreen';
import SaveOnlineAddScreen from './src/components/SaveOnlineAddScreen';
import ChooseCardScreen from './src/components/ChooseCardScreen';
import SaveOnlineSuccessScreen from './src/components/SaveOnlineSuccessScreen';
import SaveOnlineManagementScreen from './src/components/SaveOnlineManagementScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<string>('signin');
  const [userPhone, setUserPhone] = useState('');
  const [selectedBankName, setSelectedBankName] = useState('Bank of America');
  
  // Чекке берілетін деректер
  const [paymentDetailData, setPaymentDetailData] = useState({
    title: 'Электр төлемі',
    name: 'Зұпар Абдрахман',
    address: 'Шевченко, 97',
    phone: '+77086934586',
    code: '#2343543',
    from: '01/10/2019',
    to: '01/11/2019',
    fee: '$50',
    tax: '$10',
    total: '$60',
  });
  
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
      return <SignUpScreen onSwitchToSignIn={() => setCurrentScreen('signin')} />;

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
          userName="Зұпар Абдрахман"
          onNavigateToSearch={() => setCurrentScreen('search')}
          onNavigateToExchange={() => setCurrentScreen('exchange')}
          onNavigateToTransfer={() => setCurrentScreen('transfer')}
          onNavigateToMessage={() => setCurrentScreen('message')}
          onNavigateToSettings={() => setCurrentScreen('setting')}
          onNavigateToTransactionReport={() => setCurrentScreen('transactionReport')}
          onNavigateToAccountAndCard={() => setCurrentScreen('accountAndCard')}
          onNavigateToWithdraw={() => setCurrentScreen('withdraw')}
          onNavigateToMobilePrepaid={() => setCurrentScreen('mobilePrepaid')}
          onNavigateToPayBills={() => setCurrentScreen('payBills')}
          onNavigateToSaveOnline={() => setCurrentScreen('saveOnline')}
        />
      );

    case 'saveOnline':
      return (
        <SaveOnlineScreen
          onBack={() => setCurrentScreen('home')}
          onNavigateToAdd={() => setCurrentScreen('chooseCard')}
          onNavigateToManagement={() => setCurrentScreen('saveOnlineManagement')}
        />
      );

    case 'saveOnlineManagement':
      return (
        <SaveOnlineManagementScreen
          onBack={() => setCurrentScreen('saveOnline')}
          onSelectAccount={(accountNumber) => {
            // Шотты басқан кездегі қосымша әрекеттер (қажет болса)
          }}
        />
      );

    case 'chooseCard':
      return (
        <ChooseCardScreen
          userName="Зұпар Абдрахман"
          onBack={() => setCurrentScreen('saveOnline')} // Кері қайтқанда жинақ мәзіріне барады
          onSelectCard={(cardName) => {
            // Картаны таңдаған соң депозит қосу формасына өту
            setCurrentScreen('saveOnlineAdd');
          }}
          onAddCard={() => {
            // Жаңа карта қосу экранына өту
          }}
        />
      );

    case 'saveOnlineAdd':
      return (
        <SaveOnlineAddScreen
          onBack={() => setCurrentScreen('saveOnline')}
          onVerify={(account, term, amount) => {
            // Тексеруден өткен соң сәтті аяқталу экранына өту
            setCurrentScreen('saveOnlineSuccess');
          }}
        />
      );

    case 'saveOnlineSuccess':
      return (
        <SaveOnlineSuccessScreen
          onConfirm={() => setCurrentScreen('home')}
        />
      );

    case 'payBills':
      return (
        <PayBillsScreen
          onBack={() => setCurrentScreen('home')}
          onNavigateToElectric={() => setCurrentScreen('payBillElectric')}
          onNavigateToWater={() => setCurrentScreen('payBillWater')}
          onNavigateToMobileBill={() => setCurrentScreen('payBillMobile')}
          onNavigateToInternet={() => setCurrentScreen('payBillInternet')}
          onNavigateToHistory={() => setCurrentScreen('paymentHistory')}
        />
      );

    case 'payBillElectric':
      return (
        <PayBillFormScreen
          billType="electric"
          onBack={() => setCurrentScreen('payBills')}
          onCheck={(company, code) => {
            setPaymentDetailData({
              title: 'Электр төлемі',
              name: 'Зұпар Абдрахман',
              address: 'Шевченко, 97',
              phone: '+77086934586',
              code: code,
              from: '01/10/2019',
              to: '01/11/2019',
              fee: '$50',
              tax: '$10',
              total: '$60',
            });
            setCurrentScreen('paymentDetail');
          }}
        />
      );

    case 'payBillWater':
      return (
        <PayBillFormScreen
          billType="water"
          onBack={() => setCurrentScreen('payBills')}
          onCheck={(company, code) => {
            setPaymentDetailData({
              title: 'Су төлемі',
              name: 'Зұпар Абдрахман',
              address: 'Шевченко, 97',
              phone: '+77086934586',
              code: code,
              from: '01/10/2019',
              to: '01/11/2019',
              fee: '$30',
              tax: '$5',
              total: '$35',
            });
            setCurrentScreen('paymentDetail');
          }}
        />
      );

    case 'payBillMobile':
      return (
        <PayBillFormScreen
          billType="mobile"
          onBack={() => setCurrentScreen('payBills')}
          onCheck={(company, code) => {
            setPaymentDetailData({
              title: 'Мобильді төлем',
              name: 'Зұпар Абдрахман',
              address: 'Шевченко, 97',
              phone: '+77086934586',
              code: code,
              from: '01/10/2019',
              to: '01/11/2019',
              fee: '$20',
              tax: '$3',
              total: '$23',
            });
            setCurrentScreen('paymentDetail');
          }}
        />
      );

    case 'payBillInternet':
      return (
        <PayBillFormScreen
          billType="internet"
          onBack={() => setCurrentScreen('payBills')}
          onCheck={(company, code) => {
            setPaymentDetailData({
              title: `${company} төлемі`,
              name: 'Зұпар Абдрахман',
              address: 'Шевченко, 97',
              phone: '+77086934586',
              code: code,
              from: '01/10/2019',
              to: '01/11/2019',
              fee: '$45',
              tax: '$8',
              total: '$53',
            });
            setCurrentScreen('paymentDetail');
          }}
        />
      );

    case 'paymentHistory':
      return (
        <PaymentHistoryScreen
          onBack={() => setCurrentScreen('payBills')}
          onItemPress={() => {
            setPaymentDetailData({
              title: 'Төлем чегі',
              name: 'Зұпар Абдрахман',
              address: 'Шевченко, 97',
              phone: '+77086934586',
              code: '#2343543',
              from: '01/10/2019',
              to: '01/11/2019',
              fee: '$50',
              tax: '$10',
              total: '$60',
            });
            setCurrentScreen('paymentDetail');
          }}
        />
      );

    case 'paymentDetail':
      return (
        <PaymentDetailScreen
          paymentData={paymentDetailData}
          onBack={() => setCurrentScreen('payBills')}
          onPaymentSuccess={() => setCurrentScreen('paymentSuccess')}
        />
      );

    case 'paymentSuccess':
      return (
        <PaymentSuccessScreen
          title={paymentDetailData.title}
          onConfirm={() => setCurrentScreen('home')}
        />
      );

    case 'transactionReport':
      return (
        <TransactionReportScreen
          userName="Зұпар Абдрахман"
          onBack={() => setCurrentScreen('home')}
        />
      );

    case 'accountAndCard':
      return (
        <AccountAndCardScreen
          userName="Зұпар Абдрахман"
          onBack={() => setCurrentScreen('home')}
          onNavigateToCardDetail={() => setCurrentScreen('cardDetail')}
        />
      );

    case 'cardDetail':
      return (
        <CardDetailScreen
          userName="Зұпар Абдрахман"
          onBack={() => setCurrentScreen('accountAndCard')}
        />
      );

    case 'withdraw':
      return (
        <WithdrawScreen
          onBack={() => setCurrentScreen('home')}
          onSuccess={() => setCurrentScreen('home')}
        />
      );

    case 'mobilePrepaid':
      return (
        <MobilePrepaidScreen
          onBack={() => setCurrentScreen('home')}
          onSuccess={() => setCurrentScreen('mobilePrepaidConfirm')}
        />
      );

    case 'mobilePrepaidConfirm':
      return (
        <MobilePrepaidConfirmScreen
          onBack={() => setCurrentScreen('mobilePrepaid')}
          onSuccess={() => setCurrentScreen('mobilePrepaidSuccess')}
        />
      );

    case 'mobilePrepaidSuccess':
      return (
        <MobilePrepaidSuccessScreen
          onConfirm={() => setCurrentScreen('home')}
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
          onNavigateToSettings={() => setCurrentScreen('setting')}
        />
      );

    case 'message':
      return (
        <MessageScreen
          onBack={() => setCurrentScreen('home')}
          onNavigateToHome={() => setCurrentScreen('home')}
          onNavigateToSearch={() => setCurrentScreen('search')}
          onNavigateToSettings={() => setCurrentScreen('setting')}
          onNavigateToDetail={(bankName) => {
            setSelectedBankName(bankName);
            setCurrentScreen('messageDetail');
          }}
        />
      );

    case 'messageDetail':
      return (
        <MessageDetailScreen
          bankName={selectedBankName}
          onBack={() => setCurrentScreen('message')}
        />
      );
      
    case 'setting':
      return (
        <SettingScreen
          onBack={() => setCurrentScreen('home')}
          onNavigateToHome={() => setCurrentScreen('home')}
          onNavigateToSearch={() => setCurrentScreen('search')}
          onNavigateToMessage={() => setCurrentScreen('message')}
          onNavigateToLanguage={() => setCurrentScreen('language')}
          onNavigateToAppInfo={() => setCurrentScreen('appInfo')}
        />
      );

    case 'appInfo':
      return <AppInfoScreen onBack={() => setCurrentScreen('setting')} />;

    case 'branch':
      return <BranchScreen onBack={() => setCurrentScreen('search')} />;

    case 'interestRate':
      return <InterestRateScreen onNavigateBack={() => setCurrentScreen('search')} />;

    case 'exchangeRate':
      return <ExchangeRateScreen onNavigateBack={() => setCurrentScreen('search')} />;

    case 'language':
      return <LanguageScreen onNavigateBack={() => setCurrentScreen('search')} />;

    case 'exchange':
      return <ExchangeScreen onBack={() => setCurrentScreen('search')} />;

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