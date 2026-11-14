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

interface PaymentSuccessScreenProps {
  onConfirm?: () => void;
  title?: string;
}

export default function PaymentSuccessScreen({
  onConfirm,
  title = 'Интернет төлемі',
}: PaymentSuccessScreenProps) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Жоғарғы панель */}
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>{title}</Text>
        </View>
      </SafeAreaView>

      <View style={styles.content}>
        
        {/* Иллюстрация орны / Белгіше */}
        <View style={styles.iconContainer}>
          <View style={styles.iconCircle}>
            <Ionicons name="shield-checkmark" size={54} color="#5C3BFF" />
          </View>
        </View>

        {/* Хабарламалар */}
        <Text style={styles.successTitle}>Төлем сәтті өтті!</Text>
        <Text style={styles.successSubtitle}>Сіз шот бойынша төлем жасадыңыз!</Text>

        {/* Растау (Confirm) батырмасы */}
        <TouchableOpacity 
          style={styles.confirmButton} 
          activeOpacity={0.8}
          onPress={onConfirm}
        >
          <Text style={styles.confirmButtonText}>Растау</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  safeArea: { backgroundColor: '#FFFFFF', borderBottomWidth: 1, borderBottomColor: '#F1F5F9' },
  headerContent: {
    paddingHorizontal: 20,
    paddingVertical: 14,
    alignItems: 'center',
  },
  headerTitle: { color: '#1A202C', fontSize: 18, fontWeight: '700' },

  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 60,
  },

  iconContainer: {
    marginBottom: 30,
    alignItems: 'center',
  },
  iconCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#F3EEFF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  successTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1A202C',
    marginBottom: 10,
    textAlign: 'center',
  },
  successSubtitle: {
    fontSize: 15,
    color: '#718096',
    textAlign: 'center',
    marginBottom: 40,
  },

  confirmButton: {
    width: '100%',
    height: 52,
    backgroundColor: '#5C3BFF',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
