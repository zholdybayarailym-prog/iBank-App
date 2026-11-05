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

interface SignInScreenProps {
  onSwitchToSignUp: () => void;
  onSwitchToForgotPassword: () => void;
}

export default function SignInScreen({
  onSwitchToSignUp,
  onSwitchToForgotPassword,
}: SignInScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Күлгін жоғарғы панель */}
      <View style={styles.topHeader}>
        <SafeAreaView>
          <View style={styles.headerContent}>
            <TouchableOpacity style={styles.backButton} onPress={onSwitchToSignUp}>
              <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Sign in</Text>
          </View>
        </SafeAreaView>
      </View>

      {/* Ақ контейнер */}
      <View style={styles.contentContainer}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            <Text style={styles.title}>Welcome Back</Text>
            <Text style={styles.subtitle}>Hello there, sign in to continue</Text>

            {/* Иллюстрация */}
            <View style={styles.illustrationContainer}>
              <View style={[styles.dot, styles.dotPurple]} />
              <View style={[styles.dot, styles.dotPink]} />
              <View style={[styles.dot, styles.dotGreen]} />
              <View style={[styles.dot, styles.dotOrange]} />
              <View style={[styles.dot, styles.dotBlue]} />

              <View style={styles.lockCircle}>
                <View style={styles.lockBox}>
                  <Ionicons name="lock-closed" size={32} color="#FFFFFF" />
                  <Ionicons
                    name="bulb-outline"
                    size={14}
                    color="#6C47FF"
                    style={styles.bulbIcon}
                  />
                </View>
              </View>
            </View>

            {/* Input - Email */}
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Text input"
                placeholderTextColor="#A0AEC0"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
              />
            </View>

            {/* Input - Password */}
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Password"
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

            {/* Forgot password */}
            <TouchableOpacity
              style={styles.forgotPasswordContainer}
              onPress={onSwitchToForgotPassword}
            >
              <Text style={styles.forgotPasswordText}>Forgot your password ?</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.signInButton} activeOpacity={0.8}>
              <Text style={styles.signInButtonText}>Sign in</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.fingerprintContainer}>
              <MaterialCommunityIcons name="fingerprint" size={54} color="#5C3BFF" />
            </TouchableOpacity>

            {/* Sign Up бетіне ауысатын сілтеме */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>Don't have an account? </Text>
              <TouchableOpacity onPress={onSwitchToSignUp}>
                <Text style={styles.signUpText}>Sign Up</Text>
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
  scrollContent: { paddingTop: 28, paddingBottom: 20, alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#3B1E88', alignSelf: 'flex-start' },
  subtitle: { fontSize: 13, color: '#718096', alignSelf: 'flex-start', marginTop: 4, marginBottom: 20 },
  illustrationContainer: { width: 170, height: 170, justifyContent: 'center', alignItems: 'center', marginVertical: 10, position: 'relative' },
  lockCircle: { width: 130, height: 130, borderRadius: 65, backgroundColor: '#EEECFF', justifyContent: 'center', alignItems: 'center' },
  lockBox: { width: 52, height: 52, borderRadius: 12, backgroundColor: '#5C3BFF', justifyContent: 'center', alignItems: 'center', position: 'relative' },
  bulbIcon: { position: 'absolute', bottom: 10 },
  dot: { position: 'absolute', borderRadius: 50 },
  dotPurple: { width: 12, height: 12, backgroundColor: '#4C26C9', top: 20, left: 45 },
  dotPink: { width: 24, height: 24, backgroundColor: '#FF4D6D', top: 40, right: 15 },
  dotGreen: { width: 12, height: 12, backgroundColor: '#4EECD5', left: 15, top: 75 },
  dotOrange: { width: 18, height: 18, backgroundColor: '#FFB703', bottom: 30, left: 35 },
  dotBlue: { width: 12, height: 12, backgroundColor: '#00B4D8', bottom: 40, right: 35 },
  inputWrapper: { width: '100%', height: 52, borderWidth: 1, borderColor: '#E2E8F0', borderRadius: 26, paddingHorizontal: 20, justifyContent: 'center', marginTop: 14, position: 'relative' },
  input: { fontSize: 14, color: '#2D3748' },
  eyeIcon: { position: 'absolute', right: 20 },
  forgotPasswordContainer: { alignSelf: 'flex-end', marginTop: 10, marginBottom: 24 },
  forgotPasswordText: { fontSize: 12, color: '#718096', fontWeight: '600' },
  signInButton: { width: '100%', height: 52, backgroundColor: '#5C3BFF', borderRadius: 26, justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
  signInButtonText: { fontSize: 16, fontWeight: '600', color: '#FFFFFF' },
  fingerprintContainer: { marginVertical: 15 },
  footer: { flexDirection: 'row', marginTop: 10 },
  footerText: { fontSize: 13, color: '#4A5568' },
  signUpText: { fontSize: 13, fontWeight: 'bold', color: '#3B1E88' },
});