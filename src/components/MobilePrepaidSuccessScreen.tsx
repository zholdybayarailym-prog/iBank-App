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

interface MobilePrepaidSuccessScreenProps {
  onConfirm?: () => void;
}

export default function MobilePrepaidSuccessScreen({
  onConfirm,
}: MobilePrepaidSuccessScreenProps) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Жоғарғы панель */}
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.headerContent}>
          <Text style={styles.headerTime}>9:09</Text>
          <View style={styles.headerIcons}>
            <Ionicons name="cellular" size={16} color="#1A202C" style={styles.iconSpacing} />
            <Ionicons name="wifi" size={16} color="#1A202C" style={styles.iconSpacing} />
            <Ionicons name="battery-full" size={20} color="#1A202C" />
          </View>
        </View>
      </SafeAreaView>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Иллюстрация блогы */}
        <View style={styles.illustrationContainer}>
          <View style={styles.cardIllustration}>
            <MaterialCommunityIcons name="credit-card-outline" size={80} color="#5C3BFF" />
            <View style={styles.shieldBadge}>
              <Ionicons name="checkmark" size={16} color="#FFFFFF" />
            </View>
          </View>
          <View style={styles.coinsRow}>
            <MaterialCommunityIcons name="cash" size={32} color="#F6AD55" />
            <MaterialCommunityIcons name="cash" size={38} color="#ED8936" />
            <MaterialCommunityIcons name="cash" size={44} color="#DD6B20" />
          </View>
        </View>

        {/* Мәтіндік хабарлама */}
        <Text style={styles.successTitle}>Төлем сәтті өтті!</Text>
        <Text style={styles.successSubtitle}>
          Сіз мобильді байланыс үшін төлемді сәтті жасадыңыз!
        </Text>

        {/* Растау түймесі */}
        <TouchableOpacity
          style={styles.confirmButton}
          activeOpacity={0.8}
          onPress={onConfirm}
        >
          <Text style={styles.confirmButtonText}>Растау</Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  safeArea: { backgroundColor: '#FFFFFF' },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  headerTime: { fontSize: 15, fontWeight: '600', color: '#1A202C' },
  headerIcons: { flexDirection: 'row', alignItems: 'center' },
  iconSpacing: { marginRight: 6 },

  scrollContent: { 
    paddingHorizontal: 24, 
    paddingTop: 40, 
    paddingBottom: 40,
    alignItems: 'center',
  },

  illustrationContainer: {
    width: '100%',
    height: 220,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    backgroundColor: '#F8FAFC',
    borderRadius: 24,
    position: 'relative',
  },
  cardIllustration: {
    width: 140,
    height: 90,
    backgroundColor: '#EEF2FF',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#5C3BFF',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 4,
  },
  shieldBadge: {
    position: 'absolute',
    bottom: -10,
    backgroundColor: '#5C3BFF',
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  coinsRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    position: 'absolute',
    right: 40,
    bottom: 30,
  },

  successTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1A202C',
    marginBottom: 10,
    textAlign: 'center',
  },
  successSubtitle: {
    fontSize: 14,
    color: '#718096',
    textAlign: 'center',
    marginBottom: 40,
    paddingHorizontal: 20,
  },

  confirmButton: {
    width: '100%',
    backgroundColor: '#5C3BFF',
    height: 52,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#5C3BFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
  },
  confirmButtonText: { 
    color: '#FFFFFF', 
    fontSize: 16, 
    fontWeight: '700' 
  },
});