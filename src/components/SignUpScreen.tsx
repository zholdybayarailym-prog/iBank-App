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
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

interface SignUpScreenProps {
  onSwitchToSignIn: () => void;
}

export default function SignUpScreen({ onSwitchToSignIn }: SignUpScreenProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const isFormValid = name.trim().length > 0 && email.trim().length > 0 && password.trim().length > 0 && isChecked;

  const handleSignUp = () => {
    if (isFormValid) {
      alert('Аккаунт сәтті құрылды!');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <View style={styles.topHeader}>
        <SafeAreaView>
          <View style={styles.headerContent}>
            <TouchableOpacity style={styles.backButton} onPress={onSwitchToSignIn}>
              <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Тіркелу</Text>
          </View>
        </SafeAreaView>
      </View>

      <View style={styles.contentContainer}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            <Text style={styles.title}>Бізге қосылыңыз,</Text>
            <Text style={styles.subtitle}>Жаңа аккаунт ашыңыз</Text>

            <View style={styles.illustrationContainer}>
              <View style={[styles.dot, styles.dotGreen]} />
              <View style={[styles.dot, styles.dotOrange]} />
              <View style={[styles.dot, styles.dotPurple]} />
              <View style={[styles.dot, styles.dotPink]} />
              <View style={[styles.dot, styles.dotBlue]} />

              <View style={styles.circleBackground}>
                <View style={styles.phoneBox}>
                  <MaterialCommunityIcons name="cellphone" size={36} color="#FFFFFF" />
                </View>
              </View>
            </View>

            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Аты-жөні"
                placeholderTextColor="#A0AEC0"
                value={name}
                onChangeText={setName}
              />
            </View>

            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Электронды пошта"
                placeholderTextColor="#A0AEC0"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Құпия сөз"
                placeholderTextColor="#A0AEC0"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={styles.eyeIcon}
              >
                <Ionicons
                  name={showPassword ? 'chevron-up' : 'chevron-down'}
                  size={20}
                  color="#A0AEC0"
                />
              </TouchableOpacity>
            </View>

            <View style={styles.termsContainer}>
              <TouchableOpacity
                style={[styles.checkbox, isChecked && styles.checkboxChecked]}
                onPress={() => setIsChecked(!isChecked)}
              >
                {isChecked && <Ionicons name="checkmark" size={14} color="#FFFFFF" />}
              </TouchableOpacity>
              <Text style={styles.termsText}>
                Аккаунт құру арқылы сіз біздің{'\n'}
                <Text style={styles.termsLink}>Шарттарымыз бен ережелерімізге</Text> келісесіз
              </Text>
            </View>

            <TouchableOpacity 
              style={[styles.signUpButton, isFormValid && styles.signUpButtonActive]} 
              activeOpacity={0.8}
              onPress={handleSignUp}
              disabled={!isFormValid}
            >
              <Text style={[styles.signUpButtonText, isFormValid && styles.signUpButtonTextActive]}>
                Тіркелу
              </Text>
            </TouchableOpacity>

            <View style={styles.footer}>
              <Text style={styles.footerText}>Аккаунтыңыз бар ма? </Text>
              <TouchableOpacity onPress={onSwitchToSignIn}>
                <Text style={styles.signInLink}>Кіру</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#4C26C9' },
  topHeader: { height: 120, paddingHorizontal: 20, justifyContent: 'center' },
  headerContent: { flexDirection: 'row', alignItems: 'center', marginTop: 10 },
  backButton: { marginRight: 15 },
  headerTitle: { color: '#FFFFFF', fontSize: 20, fontWeight: '700' },
  contentContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 24,
  },
  scrollContent: { paddingTop: 28, paddingBottom: 30, alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#3B1E88', alignSelf: 'flex-start' },
  subtitle: { fontSize: 13, color: '#718096', alignSelf: 'flex-start', marginTop: 4, marginBottom: 15 },
  illustrationContainer: { width: 160, height: 160, justifyContent: 'center', alignItems: 'center', marginVertical: 10, position: 'relative' },
  circleBackground: { width: 120, height: 120, borderRadius: 60, backgroundColor: '#EEECFF', justifyContent: 'center', alignItems: 'center' },
  phoneBox: { width: 46, height: 64, borderRadius: 8, backgroundColor: '#5C3BFF', justifyContent: 'center', alignItems: 'center' },
  dot: { position: 'absolute', borderRadius: 50 },
  dotGreen: { width: 10, height: 10, backgroundColor: '#4EECD5', top: 50, left: 15 },
  dotOrange: { width: 14, height: 14, backgroundColor: '#FFB703', bottom: 35, left: 30 },
  dotPurple: { width: 10, height: 10, backgroundColor: '#4C26C9', top: 20, left: 55 },
  dotPink: { width: 20, height: 20, backgroundColor: '#FF4D6D', top: 45, right: 15 },
  dotBlue: { width: 10, height: 10, backgroundColor: '#00B4D8', bottom: 45, right: 35 },
  inputWrapper: { width: '100%', height: 52, borderWidth: 1, borderColor: '#E2E8F0', borderRadius: 26, paddingHorizontal: 20, justifyContent: 'center', marginTop: 12, position: 'relative' },
  input: { fontSize: 14, color: '#2D3748' },
  eyeIcon: { position: 'absolute', right: 20 },
  termsContainer: { flexDirection: 'row', alignItems: 'center', width: '100%', marginTop: 16, marginBottom: 20, paddingHorizontal: 4 },
  checkbox: { width: 20, height: 20, borderWidth: 1, borderColor: '#CBD5E0', borderRadius: 4, justifyContent: 'center', alignItems: 'center', marginRight: 10 },
  checkboxChecked: { backgroundColor: '#5C3BFF', borderColor: '#5C3BFF' },
  termsText: { fontSize: 12, color: '#718096', lineHeight: 16 },
  termsLink: { color: '#3B1E88', fontWeight: 'bold' },
  signUpButton: { width: '100%', height: 52, backgroundColor: '#F3F2F8', borderRadius: 26, justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
  signUpButtonActive: { backgroundColor: '#5C3BFF' },
  signUpButtonText: { fontSize: 16, fontWeight: '600', color: '#A0AEC0' },
  signUpButtonTextActive: { color: '#FFFFFF' },
  footer: { flexDirection: 'row', justifyContent: 'center' },
  footerText: { fontSize: 13, color: '#4A5568' },
  signInLink: { fontSize: 13, fontWeight: 'bold', color: '#3B1E88' },
});