import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

interface PasswordChangedScreenProps {
  onBack?: () => void;
  onSuccess: () => void; // «Жарайды» батырмасы басылғанда Кіру бетіне қайтару үшін
}

export default function PasswordChangedScreen({ onBack, onSuccess }: PasswordChangedScreenProps) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Жоғарғы панель (артқа қайту батырмасымен) */}
      <SafeAreaView>
        <View style={styles.headerContent}>
          {onBack && (
            <TouchableOpacity style={styles.backButton} onPress={onBack}>
              <Ionicons name="chevron-back" size={24} color="#1A202C" />
            </TouchableOpacity>
          )}
        </View>
      </SafeAreaView>

      {/* Контент бөлігі */}
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Иллюстрация аймағы */}
        <View style={styles.illustrationContainer}>
          {/* Фондағы түрлі-түсті элементтер мен өрнектер */}
          <View style={[styles.dot, styles.dotPurple]} />
          <View style={[styles.dot, styles.dotGreen1]} />
          <View style={[styles.dot, styles.dotGreen2]} />
          <View style={[styles.dot, styles.dotOrange]} />

          {/* Телефон және қалқан иллюстрациясы */}
          <View style={styles.phoneMockup}>
            <View style={styles.checkCircle}>
              <Ionicons name="checkmark" size={20} color="#FFFFFF" />
            </View>
          </View>

          <View style={styles.shieldBox}>
            <Ionicons name="shield" size={40} color="#5C3BFF" />
          </View>

          <View style={styles.keyIconContainer}>
            <MaterialCommunityIcons name="key" size={24} color="#FFB703" />
          </View>
        </View>

        {/* Мәтіндер */}
        <Text style={styles.title}>Құпия сөз сәтті өзгертілді!</Text>
        <Text style={styles.subtitle}>
          Құпия сөзіңіз сәтті өзгертілді.{'\n'}Жүйеге кірген кезде жаңа құпия сөзді пайдаланыңыз.
        </Text>

        {/* Жарайды батырмасы */}
        <TouchableOpacity 
          style={styles.okButton} 
          activeOpacity={0.8}
          onPress={onSuccess}
        >
          <Text style={styles.okButtonText}>Жарайды</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  headerContent: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 10 },
  backButton: { marginRight: 15 },
  scrollContent: { paddingHorizontal: 24, alignItems: 'center', paddingTop: 20, paddingBottom: 40 },
  
  illustrationContainer: { 
    width: 240, 
    height: 220, 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginVertical: 20, 
    position: 'relative' 
  },
  
  phoneMockup: {
    width: 90,
    height: 160,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#5C3BFF',
    backgroundColor: '#FAFAFA',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 60,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  checkCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#5C3BFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  shieldBox: {
    position: 'absolute',
    right: 50,
    bottom: 30,
    zIndex: 2,
  },
  keyIconContainer: {
    position: 'absolute',
    bottom: 10,
    left: 80,
    zIndex: 2,
  },

  dot: { position: 'absolute', borderRadius: 50 },
  dotPurple: { width: 10, height: 10, backgroundColor: '#4C26C9', top: 20, left: 40 },
  dotGreen1: { width: 14, height: 14, backgroundColor: '#4EECD5', top: 50, right: 40 },
  dotGreen2: { width: 12, height: 12, backgroundColor: '#4EECD5', bottom: 40, left: 20 },
  dotOrange: { width: 10, height: 10, backgroundColor: '#FFB703', bottom: 20, right: 60 },

  title: { 
    fontSize: 20, 
    fontWeight: '700', 
    color: '#3B1E88', 
    textAlign: 'center', 
    marginBottom: 12 
  },
  subtitle: { 
    fontSize: 13, 
    color: '#718096', 
    textAlign: 'center', 
    lineHeight: 18, 
    marginBottom: 40 
  },
  okButton: { 
    width: '100%', 
    height: 52, 
    backgroundColor: '#5C3BFF', 
    borderRadius: 26, 
    justifyContent: 'center', 
    alignItems: 'center',
    shadowColor: '#5C3BFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  okButtonText: { 
    fontSize: 16, 
    fontWeight: '600', 
    color: '#FFFFFF' 
  },
});