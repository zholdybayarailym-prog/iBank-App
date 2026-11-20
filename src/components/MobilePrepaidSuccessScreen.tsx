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

interface MobilePrepaidSuccessScreenProps {
  phoneNumber?: string;
  amount?: string;
  operator?: string;
  onConfirm?: () => void;
  onNavigateHome?: () => void;
}

export default function MobilePrepaidSuccessScreen({
  phoneNumber = '+7 (707) 459-97-21',
  amount = '$15.00',
  operator = 'Activ / Kcell',
  onConfirm,
  onNavigateHome,
}: MobilePrepaidSuccessScreenProps) {
  const handleDone = () => {
    if (onConfirm) {
      onConfirm();
    } else if (onNavigateHome) {
      onNavigateHome();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.content}>
        {/* Жоғарғы сәттілік иллюстрациясы */}
        <View style={styles.illustrationWrapper}>
          <View style={styles.outerCircle}>
            <View style={styles.innerCircle}>
              <Ionicons name="phone-portrait-outline" size={44} color="#3B1E88" />
            </View>
          </View>

          <View style={styles.checkBadge}>
            <Ionicons name="checkmark" size={20} color="#FFFFFF" />
          </View>

          <View style={styles.sparkleBadge}>
            <Ionicons name="wifi" size={18} color="#4C26C9" />
          </View>
        </View>

        {/* Тақырып және сипаттама */}
        <Text style={styles.title}>Төлем сәтті орындалды!</Text>
        <Text style={styles.subtitle}>
          Ұялы байланыс теңгерімі сәтті толтырылды.
        </Text>

        {/* Қысқаша түбіртек карточкасы */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Оператор</Text>
            <Text style={styles.summaryValue}>{operator}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Телефон нөмірі</Text>
            <Text style={styles.summaryValue}>{phoneNumber}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Төленген сома</Text>
            <Text style={styles.amountValue}>{amount}</Text>
          </View>
        </View>

        {/* Растау батырмасы */}
        <TouchableOpacity
          style={styles.confirmButton}
          activeOpacity={0.85}
          onPress={handleDone}
        >
          <Text style={styles.confirmButtonText}>Растау</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  illustrationWrapper: {
    width: 140,
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 28,
    position: 'relative',
  },
  outerCircle: {
    width: 124,
    height: 124,
    borderRadius: 62,
    backgroundColor: '#F3F0FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerCircle: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: '#E5DEFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkBadge: {
    position: 'absolute',
    bottom: 10,
    right: 12,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#10B981',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  sparkleBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#3B1E88',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#718096',
    textAlign: 'center',
    marginBottom: 28,
    lineHeight: 20,
  },
  summaryCard: {
    width: '100%',
    backgroundColor: '#F8F9FA',
    borderRadius: 18,
    paddingHorizontal: 18,
    paddingVertical: 14,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: '#EDF2F7',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  summaryLabel: {
    fontSize: 13,
    color: '#718096',
    fontWeight: '500',
  },
  summaryValue: {
    fontSize: 14,
    color: '#1A202C',
    fontWeight: '600',
  },
  amountValue: {
    fontSize: 16,
    color: '#3B1E88',
    fontWeight: '800',
  },
  divider: {
    height: 1,
    backgroundColor: '#E2E8F0',
  },
  confirmButton: {
    width: '100%',
    height: 54,
    backgroundColor: '#3B1E88',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#3B1E88',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});