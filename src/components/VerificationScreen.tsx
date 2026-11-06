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

interface VerificationScreenProps {
  onBack: () => void;
  phoneNumber?: string;
}

export default function VerificationScreen({ onBack, phoneNumber = '+7 700 000 00 00' }: VerificationScreenProps) {
  const [code, setCode] = useState('');
  const isCodeFilled = code.trim().length >= 4;

  const handleVerify = () => {
    if (isCodeFilled) {
      alert('Код расталды!');
    }
  };

  const handleResend = () => {
    alert('Код қайта жіберілді!');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Жоғарғы панель */}
      <SafeAreaView>
        <View style={styles.headerContent}>
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <Ionicons name="chevron-back" size={24} color="#1A202C" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Forgot password</Text>
        </View>
      </SafeAreaView>

      {/* Контент */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.contentContainer}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <View style={styles.card}>
            <Text style={styles.label}>Type a code</Text>
            
            <View style={styles.inputContainer}>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
                  placeholder="Code"
                  placeholderTextColor="#A0AEC0"
                  keyboardType="number-pad"
                  value={code}
                  onChangeText={setCode}
                  maxLength={6}
                />
              </View>
              <TouchableOpacity style={styles.resendButton} onPress={handleResend} activeOpacity={0.8}>
                <Text style={styles.resendButtonText}>Resend</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.infoText}>
              We texted you a code to verify your phone number{'\n'}
              <Text style={styles.boldPhone}>({phoneNumber})</Text>
            </Text>

            <Text style={styles.timerText}>
              This code will expired 10 minutes after this message. If you don't get a message.
            </Text>

            <TouchableOpacity 
              style={[styles.verifyButton, isCodeFilled && styles.verifyButtonActive]} 
              activeOpacity={0.8}
              onPress={handleVerify}
              disabled={!isCodeFilled}
            >
              <Text style={[styles.verifyButtonText, isCodeFilled && styles.verifyButtonTextActive]}>
                Verify password
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={onBack} style={styles.changePhoneContainer}>
            <Text style={styles.changePhoneText}>Change your phone number</Text>
          </TouchableOpacity>
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
    marginTop: 10,
  },
  label: { fontSize: 14, color: '#718096', marginBottom: 12 },
  inputContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  inputWrapper: {
    flex: 1,
    height: 52,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    paddingHorizontal: 16,
    justifyContent: 'center',
    backgroundColor: '#FAFAFA',
    marginRight: 10,
  },
  input: { fontSize: 16, color: '#2D3748' },
  resendButton: {
    height: 52,
    backgroundColor: '#5C3BFF',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  resendButtonText: { color: '#FFFFFF', fontSize: 15, fontWeight: '600' },
  infoText: { fontSize: 13, color: '#718096', lineHeight: 18, marginBottom: 12 },
  boldPhone: { color: '#3B1E88', fontWeight: '600' },
  timerText: { fontSize: 12, color: '#A0AEC0', lineHeight: 16, marginBottom: 24 },
  verifyButton: {
    width: '100%',
    height: 52,
    backgroundColor: '#F3F2F8',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  verifyButtonActive: {
    backgroundColor: '#5C3BFF',
  },
  verifyButtonText: { fontSize: 16, fontWeight: '600', color: '#A0AEC0' },
  verifyButtonTextActive: { color: '#FFFFFF' },
  changePhoneContainer: { marginTop: 20 },
  changePhoneText: { fontSize: 14, color: '#5C3BFF', fontWeight: '600' },
});