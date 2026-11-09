import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface TransferSuccessScreenProps {
  onBackHome?: () => void;
  transferData?: {
    toName?: string;
    amount?: string;
  };
}

export default function TransferSuccessScreen({ 
  onBackHome,
  transferData = {
    toName: 'Amanda',
    amount: '$1,000',
  }
}: TransferSuccessScreenProps) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Жоғарғы панель */}
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.headerContent}>
          <TouchableOpacity style={styles.backButton} onPress={onBackHome}>
            <Ionicons name="chevron-back" size={24} color="#1A202C" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Растау</Text>
        </View>
      </SafeAreaView>

      <View style={styles.content}>
        {/* Белгіше */}
        <View style={styles.illustrationContainer}>
          <View style={styles.successCircle}>
            <Ionicons name="checkmark-sharp" size={60} color="#FFFFFF" />
          </View>
        </View>

        {/* Мәтіндер */}
        <Text style={styles.successTitle}>Аударым сәтті орындалды!</Text>
        <Text style={styles.successSubText}>
          Сіз <Text style={styles.boldText}>{transferData.toName}</Text> атты азаматқа <Text style={styles.boldText}>{transferData.amount}</Text> сомасын сәтті аудардыңыз!
        </Text>

        {/* Растау / Басты бетке қайту батырмасы */}
        <TouchableOpacity 
          style={styles.submitButton} 
          activeOpacity={0.8}
          onPress={onBackHome}
        >
          <Text style={styles.submitButtonText}>Растау</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  safeArea: { backgroundColor: '#FFFFFF' },
  headerContent: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingHorizontal: 20, 
    paddingVertical: 12,
  },
  backButton: { marginRight: 15, padding: 5 },
  headerTitle: { color: '#1A202C', fontSize: 18, fontWeight: '700' },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -40,
  },
  illustrationContainer: {
    marginBottom: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  successCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#5C3BFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#5C3BFF',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 5,
  },
  successTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1A202C',
    marginBottom: 12,
    textAlign: 'center',
  },
  successSubText: {
    fontSize: 14,
    color: '#718096',
    textAlign: 'center',
    marginBottom: 40,
    paddingHorizontal: 20,
    lineHeight: 20,
  },
  boldText: {
    color: '#1A202C',
    fontWeight: '700',
  },
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
  submitButtonText: { 
    fontSize: 16, 
    fontWeight: '700', 
    color: '#FFFFFF' 
  },
});