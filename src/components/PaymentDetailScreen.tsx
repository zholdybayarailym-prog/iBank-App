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
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface PaymentDetailScreenProps {
  onBack?: () => void;
  onPaymentSuccess?: () => void;
  paymentData?: {
    title: string;
    name: string;
    address: string;
    phone: string;
    code: string;
    from: string;
    to: string;
    fee: string;
    tax: string;
    total: string;
  };
}

export default function PaymentDetailScreen({
  onBack,
  onPaymentSuccess,
  paymentData = {
    title: 'Интернет төлемі',
    name: 'Зұпар Абдрахман',
    address: 'Шевченко, 97',
    phone: '+77086934586',
    code: '#2343543',
    from: '01/10/2019',
    to: '01/11/2019',
    fee: '$50',
    tax: '$10',
    total: '$60',
  },
}: PaymentDetailScreenProps) {
  const [selectedAccount, setSelectedAccount] = useState('');
  const [showAccountDropdown, setShowAccountDropdown] = useState(false);
  const [otpCode, setOtpCode] = useState('');

  const accounts = ['Visa کارتтері (...4821)', 'Mastercard (...9012)', 'Негізгі шот ($450)'];

  const isFormValid = selectedAccount.length > 0 && otpCode.trim().length > 0;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Жоғарғы панель */}
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.headerContent}>
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <Ionicons name="chevron-back" size={24} color="#1A202C" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{paymentData.title}</Text>
        </View>
      </SafeAreaView>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Чек карточкасы */}
        <View style={styles.detailCard}>
          <Text style={styles.sectionTitle}>Барлық шоттар</Text>

          <View style={styles.row}>
            <Text style={styles.label}>Аты-жөні</Text>
            <Text style={styles.valueBold}>{paymentData.name}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Мекенжайы</Text>
            <Text style={[styles.valueBold, styles.addressText]}>{paymentData.address}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Телефон нөмірі</Text>
            <Text style={styles.value}>{paymentData.phone}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Коды</Text>
            <Text style={styles.value}>{paymentData.code}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Басталуы</Text>
            <Text style={styles.value}>{paymentData.from}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Аяқталуы</Text>
            <Text style={styles.value}>{paymentData.to}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Қызмет ақысы</Text>
            <Text style={styles.feeValue}>{paymentData.fee}</Text>
          </View>

          <View style={styles.dashDivider} />

          <View style={styles.row}>
            <Text style={styles.label}>Салық</Text>
            <Text style={styles.feeValue}>{paymentData.tax}</Text>
          </View>

          <View style={styles.dashDivider} />

          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>ЖИЫНТЫҚ</Text>
            <Text style={styles.totalValue}>{paymentData.total}</Text>
          </View>
        </View>

        {/* Шотты/картаны таңдау бөлімі */}
        <View style={styles.sectionContainer}>
          <TouchableOpacity 
            style={styles.dropdownInput}
            activeOpacity={0.7}
            onPress={() => setShowAccountDropdown(!showAccountDropdown)}
          >
            <Text style={selectedAccount ? styles.dropdownSelectedText : styles.dropdownPlaceholder}>
              {selectedAccount || 'Шотты / картаны таңдаңыз'}
            </Text>
            <Ionicons name={showAccountDropdown ? "chevron-up" : "chevron-down"} size={18} color="#A0AEC0" />
          </TouchableOpacity>

          {showAccountDropdown && (
            <View style={styles.dropdownList}>
              {accounts.map((acc) => (
                <TouchableOpacity
                  key={acc}
                  style={styles.dropdownItem}
                  onPress={() => {
                    setSelectedAccount(acc);
                    setShowAccountDropdown(false);
                  }}
                >
                  <Text style={styles.dropdownItemText}>{acc}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* OTP коды арқылы растау */}
        <View style={styles.sectionContainer}>
          <Text style={styles.otpInfoText}>Төлемді растау үшін OTP кодын алыңыз</Text>
          <View style={styles.otpRow}>
            <TextInput
              style={styles.otpInput}
              placeholder="OTP код"
              placeholderTextColor="#A0AEC0"
              keyboardType="numeric"
              value={otpCode}
              onChangeText={setOtpCode}
            />
            <TouchableOpacity style={styles.getOtpButton} activeOpacity={0.8}>
              <Text style={styles.getOtpButtonText}>OTP алу</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Төлеу батырмасы */}
        <TouchableOpacity 
          style={[styles.payButton, isFormValid && styles.payButtonActive]} 
          activeOpacity={0.8}
          onPress={onPaymentSuccess}
        >
          <Text style={[styles.payButtonText, isFormValid && styles.payButtonTextActive]}>
            Төлем жасау
          </Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  safeArea: { backgroundColor: '#FFFFFF', borderBottomWidth: 1, borderBottomColor: '#F1F5F9' },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  backButton: { marginRight: 15, padding: 4 },
  headerTitle: { color: '#1A202C', fontSize: 18, fontWeight: '700' },

  scrollContent: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 40 },

  detailCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 2,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A202C',
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  label: {
    fontSize: 15,
    color: '#A0AEC0',
    fontWeight: '400',
  },
  value: {
    fontSize: 15,
    color: '#1A202C',
    fontWeight: '500',
  },
  valueBold: {
    fontSize: 15,
    color: '#1A202C',
    fontWeight: '600',
  },
  addressText: {
    textAlign: 'right',
    maxWidth: '55%',
    lineHeight: 20,
  },
  dashDivider: {
    height: 1,
    borderWidth: 0.8,
    borderColor: '#EDF2F7',
    borderStyle: 'dashed',
    marginBottom: 16,
  },
  feeValue: {
    fontSize: 16,
    color: '#5C3BFF',
    fontWeight: '700',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  totalLabel: {
    fontSize: 17,
    fontWeight: '800',
    color: '#1A202C',
  },
  totalValue: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FF4D6D',
  },

  sectionContainer: {
    marginBottom: 16,
  },
  dropdownInput: {
    height: 52,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 14,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  dropdownPlaceholder: {
    fontSize: 15,
    color: '#A0AEC0',
    fontWeight: '400',
  },
  dropdownSelectedText: {
    fontSize: 15,
    color: '#1A202C',
    fontWeight: '500',
  },
  dropdownList: {
    marginTop: 6,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
  },
  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  dropdownItemText: {
    fontSize: 14,
    color: '#1A202C',
  },

  otpInfoText: {
    fontSize: 14,
    color: '#718096',
    marginBottom: 8,
    fontWeight: '400',
  },
  otpRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  otpInput: {
    flex: 1,
    height: 52,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 14,
    paddingHorizontal: 16,
    fontSize: 15,
    color: '#1A202C',
    backgroundColor: '#FFFFFF',
    marginRight: 10,
  },
  getOtpButton: {
    width: 110,
    height: 52,
    backgroundColor: '#F3EEFF',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  getOtpButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#5C3BFF',
  },

  payButton: {
    height: 52,
    backgroundColor: '#F3EEFF',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  payButtonActive: {
    backgroundColor: '#5C3BFF',
  },
  payButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#A78BFA',
  },
  payButtonTextActive: {
    color: '#FFFFFF',
  },
});
