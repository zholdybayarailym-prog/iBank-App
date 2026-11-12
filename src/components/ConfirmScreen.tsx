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
  Keyboard,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

interface ConfirmScreenProps {
  onBack?: () => void;
  onSuccess?: () => void;
  transferData?: {
    fromAccount?: string;
    toName?: string;
    cardNumber?: string;
    amount?: string;
    content?: string;
  };
}

export default function ConfirmScreen({ 
  onBack, 
  onSuccess,
  transferData = {
    fromAccount: '•••• •••• 6789',
    toName: 'Amanda',
    cardNumber: '0123456789',
    amount: '$1000',
    content: 'From Jimy',
  }
}: ConfirmScreenProps) {
  
  const [otp, setOtp] = useState('');

  // Тікелей сәтті экранына өту функциясы
  const handleDirectSuccess = (method: string) => {
    Keyboard.dismiss();
    if (onSuccess) {
      onSuccess(); // Тікелей келесі бетке өтеді
    }
  };

  const handleOtpConfirm = () => {
    if (!otp) {
      Alert.alert('Қате', 'OTP кодын енгізіңіз!');
      return;
    }
    handleDirectSuccess('OTP код');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Жоғарғы панель */}
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.headerContent}>
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <Ionicons name="chevron-back" size={24} color="#1A202C" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Растау</Text>
        </View>
      </SafeAreaView>

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.sectionSubtitle}>Транзакция ақпаратын растау</Text>

        {/* Қайдан */}
        <Text style={styles.label}>Қайдан</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            editable={false}
            value={transferData.fromAccount}
          />
        </View>

        {/* Кімге */}
        <Text style={styles.label}>Кімге</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            editable={false}
            value={transferData.toName}
          />
        </View>

        {/* Карта нөмірі */}
        <Text style={styles.label}>Карта нөмірі</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            editable={false}
            value={transferData.cardNumber}
          />
        </View>

        {/* Комиссия */}
        <Text style={styles.label}>Комиссия</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            editable={false}
            value="10$"
          />
        </View>

        {/* Мақсаты */}
        <Text style={styles.label}>Мақсаты</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            editable={false}
            value={transferData.content}
          />
        </View>

        {/* Сомасы */}
        <Text style={styles.label}>Сомасы</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            editable={false}
            value={transferData.amount}
          />
        </View>

        {/* Биометриялық растау (Face ID және Саусақ ізі) */}
        <Text style={styles.label}>Биометрия немесе OTP арқылы растау</Text>
        
        <View style={styles.biometricRow}>
          {/* Face ID түймесі */}
          <TouchableOpacity 
            style={styles.biometricCard}
            activeOpacity={0.7}
            onPress={() => handleDirectSuccess('Face ID')}
          >
            <MaterialCommunityIcons name="face-recognition" size={40} color="#5C3BFF" />
            <Text style={styles.biometricText}>Face ID</Text>
          </TouchableOpacity>

          {/* Саусақ ізі түймесі */}
          <TouchableOpacity 
            style={styles.biometricCard}
            activeOpacity={0.7}
            onPress={() => handleDirectSuccess('Саусақ ізі')}
          >
            <MaterialCommunityIcons name="fingerprint" size={40} color="#5C3BFF" />
            <Text style={styles.biometricText}>Touch ID</Text>
          </TouchableOpacity>
        </View>

        {/* Немесе OTP код арқылы енгізу */}
        <View style={styles.otpRow}>
          <View style={[styles.inputContainer, { flex: 1, marginBottom: 0 }]}>
            <TextInput
              style={styles.input}
              placeholder="OTP кодты енгізіңіз"
              placeholderTextColor="#A0AEC0"
              keyboardType="numeric"
              value={otp}
              onChangeText={setOtp}
            />
          </View>
          <TouchableOpacity 
            style={styles.getOtpButton}
            activeOpacity={0.8}
            onPress={() => Alert.alert('OTP', 'Код жіберілді!')}
          >
            <Text style={styles.getOtpButtonText}>Код алу</Text>
          </TouchableOpacity>
        </View>

        {/* Растау батырмасы */}
        <TouchableOpacity 
          style={styles.submitButton} 
          activeOpacity={0.8}
          onPress={handleOtpConfirm}
        >
          <Text style={styles.submitButtonText}>Растау</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7FAFC' },
  safeArea: { backgroundColor: '#FFFFFF', borderBottomWidth: 1, borderBottomColor: '#F1F5F9' },
  headerContent: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingHorizontal: 20, 
    paddingVertical: 12,
  },
  backButton: { marginRight: 15, padding: 5 },
  headerTitle: { color: '#1A202C', fontSize: 18, fontWeight: '700' },
  scrollContent: { padding: 20, paddingBottom: 50 },
  sectionSubtitle: { fontSize: 13, color: '#718096', fontWeight: '600', marginBottom: 16 },
  label: { fontSize: 12, color: '#718096', fontWeight: '600', marginBottom: 6 },
  inputContainer: {
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 14,
    paddingHorizontal: 14,
    height: 50,
    justifyContent: 'center',
    marginBottom: 14,
    backgroundColor: '#FFFFFF',
  },
  input: { fontSize: 14, color: '#2D3748', fontWeight: '500' },
  biometricRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  biometricCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 14,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  biometricText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '700',
    color: '#2D3748',
  },
  otpRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  getOtpButton: {
    marginLeft: 10,
    backgroundColor: '#EEECFF',
    height: 50,
    paddingHorizontal: 16,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  getOtpButtonText: { color: '#5C3BFF', fontSize: 14, fontWeight: '700' },
  submitButton: {
    width: '100%',
    height: 52,
    backgroundColor: '#5C3BFF',
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#5C3BFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
  },
  submitButtonText: { fontSize: 16, fontWeight: '700', color: '#FFFFFF' },
});