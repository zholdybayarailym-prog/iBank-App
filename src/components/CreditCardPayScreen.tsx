import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface CreditCardPayScreenProps {
  onBack?: () => void;
  onSuccess?: () => void;
}

export default function CreditCardPayScreen({
  onBack,
  onSuccess,
}: CreditCardPayScreenProps) {
  const [selectedAccount, setSelectedAccount] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [otp, setOtp] = useState('');

  const accounts = [
    'VISA •••• 9018 ($3,469.52)',
    'MasterCard •••• 4421 ($1,850.00)',
    'Негізгі шот KZ86 •••• 1102 ($5,200.00)',
  ];

  const transactions = [
    { title: 'Камера сатып алу', date: '02.11.2018', amount: '- $1200', icon: 'camera-outline', color: '#4C26C9' },
    { title: 'Теледидар сатып алу', date: '02.11.2018', amount: '- $1200', icon: 'tv-outline', color: '#FF4D6D' },
    { title: 'Камера сатып алу', date: '02.11.2018', amount: '- $1200', icon: 'camera-outline', color: '#0096FF' },
    { title: 'Теледидар сатып алу', date: '02.11.2018', amount: '- $1200', icon: 'tv-outline', color: '#FFB703' },
  ];

  const handleGetOtp = () => {
    const generatedOtp = '4829';
    setOtp(generatedOtp);
    Alert.alert('Растау коды', `Сіздің бір реттік OTP кодыңыз: ${generatedOtp}`);
  };

  const isFormValid = selectedAccount !== '' && otp.trim().length >= 4;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Жоғарғы тақырып (Header) */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Ionicons name="chevron-back" size={24} color="#1A202C" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Несие картасы</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Транзакциялар тізімі бар карточка */}
        <View style={styles.receiptCard}>
          {transactions.map((item, index) => (
            <View key={index} style={styles.transactionRow}>
              <View style={[styles.iconBox, { backgroundColor: item.color }]}>
                <Ionicons name={item.icon as any} size={18} color="#FFFFFF" />
              </View>
              <View style={styles.transactionInfo}>
                <Text style={styles.transactionTitle}>{item.title}</Text>
                <Text style={styles.transactionDate}>{item.date}</Text>
              </View>
              <Text style={styles.transactionAmount}>{item.amount}</Text>
            </View>
          ))}

          {/* Жалпы сома (TOTAL) */}
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>БАРЛЫҒЫ</Text>
            <Text style={styles.totalAmount}>-$3100</Text>
          </View>
        </View>

        {/* Шотты / картаны таңдау (Dropdown) */}
        <TouchableOpacity
          style={styles.dropdownButton}
          activeOpacity={0.8}
          onPress={() => setShowDropdown(!showDropdown)}
        >
          <Text style={[styles.dropdownText, selectedAccount ? styles.dropdownTextSelected : null]}>
            {selectedAccount || 'Шотты / картаны таңдаңыз'}
          </Text>
          <Ionicons name={showDropdown ? 'chevron-up' : 'chevron-down'} size={20} color="#A0AEC0" />
        </TouchableOpacity>

        {showDropdown && (
          <View style={styles.dropdownMenu}>
            {accounts.map((acc, idx) => (
              <TouchableOpacity
                key={idx}
                style={styles.dropdownItem}
                onPress={() => {
                  setSelectedAccount(acc);
                  setShowDropdown(false);
                }}
              >
                <Text style={styles.dropdownItemText}>{acc}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* OTP код бөлімі */}
        <Text style={styles.otpLabel}>Транзакцияны растау үшін OTP алыңыз</Text>
        <View style={styles.otpRow}>
          <TextInput
            style={styles.otpInput}
            placeholder="OTP"
            placeholderTextColor="#CBD5E0"
            keyboardType="numeric"
            maxLength={6}
            value={otp}
            onChangeText={setOtp}
          />
          <TouchableOpacity
            style={[
              styles.getOtpButton,
              selectedAccount ? styles.getOtpButtonActive : null,
            ]}
            activeOpacity={0.8}
            onPress={handleGetOtp}
          >
            <Text
              style={[
                styles.getOtpText,
                selectedAccount ? styles.getOtpTextActive : null,
              ]}
            >
              OTP алу
            </Text>
          </TouchableOpacity>
        </View>

        {/* Төлеу батырмасы */}
        <TouchableOpacity
          style={[styles.payButton, isFormValid ? styles.payButtonActive : null]}
          activeOpacity={0.8}
          disabled={!isFormValid}
          onPress={onSuccess}
        >
          <Text style={[styles.payButtonText, isFormValid ? styles.payButtonTextActive : null]}>
            Төлеу
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  backButton: {
    paddingRight: 12,
    paddingVertical: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A202C',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 40,
  },
  receiptCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 18,
    paddingTop: 8,
    paddingBottom: 16,
    marginBottom: 22,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 3,
  },
  transactionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  iconBox: {
    width: 38,
    height: 38,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  transactionInfo: {
    flex: 1,
  },
  transactionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A202C',
    marginBottom: 2,
  },
  transactionDate: {
    fontSize: 12,
    color: '#A0AEC0',
  },
  transactionAmount: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FF4D6D',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
  },
  totalLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1A202C',
  },
  totalAmount: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FF4D6D',
  },
  dropdownButton: {
    height: 52,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CBD5E0',
    borderRadius: 14,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  dropdownText: {
    fontSize: 14,
    color: '#A0AEC0',
  },
  dropdownTextSelected: {
    color: '#1A202C',
    fontWeight: '600',
  },
  dropdownMenu: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 16,
    overflow: 'hidden',
  },
  dropdownItem: {
    paddingVertical: 13,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  dropdownItemText: {
    fontSize: 14,
    color: '#2D3748',
    fontWeight: '500',
  },
  otpLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#718096',
    marginTop: 10,
    marginBottom: 8,
  },
  otpRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
  },
  otpInput: {
    flex: 1,
    height: 50,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CBD5E0',
    borderRadius: 14,
    paddingHorizontal: 16,
    fontSize: 15,
    color: '#1A202C',
    marginRight: 12,
  },
  getOtpButton: {
    height: 50,
    paddingHorizontal: 22,
    backgroundColor: '#EEECFF',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  getOtpButtonActive: {
    backgroundColor: '#4C26C9',
  },
  getOtpText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  getOtpTextActive: {
    color: '#FFFFFF',
  },
  payButton: {
    height: 54,
    backgroundColor: '#EEECFF',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  payButtonActive: {
    backgroundColor: '#4C26C9',
  },
  payButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  payButtonTextActive: {
    color: '#FFFFFF',
  },
});