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

interface ChangePasswordScreenProps {
  onBack: () => void;
  onSuccess: () => void;
}

export default function ChangePasswordScreen({ onBack, onSuccess }: ChangePasswordScreenProps) {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const isFilled = newPassword.length >= 6 && newPassword === confirmPassword;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Жоғарғы панель */}
      <SafeAreaView>
        <View style={styles.headerContent}>
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <Ionicons name="chevron-back" size={24} color="#1A202C" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Change password</Text>
        </View>
      </SafeAreaView>

      {/* Контент */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.contentContainer}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <View style={styles.card}>
            {/* Жаңа құпия сөз */}
            <Text style={styles.label}>Type your new password</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="*************"
                placeholderTextColor="#A0AEC0"
                secureTextEntry={!showPassword1}
                value={newPassword}
                onChangeText={setNewPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword1(!showPassword1)} style={styles.eyeIcon}>
                <Ionicons name={showPassword1 ? "eye" : "eye-off"} size={20} color="#A0AEC0" />
              </TouchableOpacity>
            </View>

            {/* Құпия сөзді растау */}
            <Text style={styles.label}>Confirm password</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="*************"
                placeholderTextColor="#A0AEC0"
                secureTextEntry={!showPassword2}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword2(!showPassword2)} style={styles.eyeIcon}>
                <Ionicons name={showPassword2 ? "eye" : "eye-off"} size={20} color="#A0AEC0" />
              </TouchableOpacity>
            </View>

            <TouchableOpacity 
              style={[styles.button, isFilled && styles.buttonActive]} 
              activeOpacity={0.8}
              onPress={onSuccess}
              disabled={!isFilled}
            >
              <Text style={[styles.buttonText, isFilled && styles.buttonTextActive]}>
                Change password
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
    marginTop: 10,
  },
  label: { fontSize: 14, color: '#718096', marginBottom: 8 },
  inputWrapper: {
    width: '100%',
    height: 52,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    paddingHorizontal: 16,
    justifyContent: 'center',
    backgroundColor: '#FAFAFA',
    marginBottom: 16,
    position: 'relative',
  },
  input: { fontSize: 16, color: '#2D3748', paddingRight: 40 },
  eyeIcon: { position: 'absolute', right: 16 },
  button: {
    width: '100%',
    height: 52,
    backgroundColor: '#F3F2F8',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonActive: {
    backgroundColor: '#5C3BFF',
  },
  buttonText: { fontSize: 16, fontWeight: '600', color: '#A0AEC0' },
  buttonTextActive: { color: '#FFFFFF' },
});