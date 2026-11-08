import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ForgotPasswordScreenProps {
  onBackToSignIn: () => void;
  onNavigateToVerify: (phone: string) => void;
}

export default function ForgotPasswordScreen({ onBackToSignIn, onNavigateToVerify }: ForgotPasswordScreenProps) {
  const [phoneNumber, setPhoneNumber] = useState('');

  const isFilled = phoneNumber.trim().length > 5;

  const handleNext = () => {
    if (isFilled) {
      onNavigateToVerify(phoneNumber);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Жоғарғы панель */}
      <SafeAreaView>
        <View style={styles.headerContent}>
          <TouchableOpacity style={styles.backButton} onPress={onBackToSignIn}>
            <Ionicons name="chevron-back" size={24} color="#1A202C" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Құпия сөзді ұмыттыңыз ба?</Text>
        </View>
      </SafeAreaView>

      {/* Орталық контент */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.contentContainer}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Ақ карточка */}
          <View style={styles.card}>
            <Text style={styles.label}>Телефон нөміріңізді енгізіңіз</Text>
            
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="+7 (700) 000-00-00"
                placeholderTextColor="#A0AEC0"
                keyboardType="phone-pad"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
              />
            </View>

            <Text style={styles.infoText}>
              Телефон нөміріңізді растау үшін сізге код жібереміз
            </Text>

            <TouchableOpacity 
              style={[styles.nextButton, isFilled && styles.nextButtonActive]} 
              activeOpacity={0.8}
              onPress={handleNext}
              disabled={!isFilled}
            >
              <Text style={[styles.nextButtonText, isFilled && styles.nextButtonTextActive]}>
                Келесі
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7FAFC' },
  headerContent: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 15 },
  backButton: { marginRight: 15 },
  headerTitle: { color: '#1A202C', fontSize: 18, fontWeight: '700' },
  contentContainer: { flex: 1 },
  scrollContent: { padding: 20, alignItems: 'center' },
  card: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    marginTop: 20,
  },
  label: { fontSize: 14, color: '#718096', marginBottom: 12 },
  inputWrapper: {
    width: '100%',
    height: 52,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    paddingHorizontal: 16,
    justifyContent: 'center',
    marginBottom: 16,
    backgroundColor: '#FAFAFA',
  },
  input: { fontSize: 16, color: '#2D3748' },
  infoText: { fontSize: 13, color: '#718096', lineHeight: 18, marginBottom: 24 },
  nextButton: {
    width: '100%',
    height: 52,
    backgroundColor: '#F3F2F8',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextButtonActive: {
    backgroundColor: '#5C3BFF',
  },
  nextButtonText: { fontSize: 16, fontWeight: '600', color: '#A0AEC0' },
  nextButtonTextActive: { color: '#FFFFFF' },
});