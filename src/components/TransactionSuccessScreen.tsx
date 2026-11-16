import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';

interface TransactionSuccessScreenProps {
  title?: string;
  subtitle?: string;
  onConfirm?: () => void;
}

export default function TransactionSuccessScreen({
  title = 'Транзакция сәтті аяқталды!',
  subtitle = 'Сіз төлемді сәтті орындадыңыз!',
  onConfirm,
}: TransactionSuccessScreenProps) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.content}>
        {/* Векторлық иллюстрация композициясы */}
        <View style={styles.illustrationWrapper}>
          {/* Артқы қызғылт карта */}
          <View style={styles.backCard}>
            <View style={styles.backCardStripe} />
          </View>

          {/* Негізгі күлгін карта */}
          <View style={styles.frontCard}>
            {/* Чип және жолақтар */}
            <View style={styles.cardChip} />
            <View style={styles.cardLineLong} />
            <View style={styles.cardLinesRow}>
              <View style={styles.cardLineShort} />
              <View style={styles.cardLineShort} />
            </View>

            {/* Оң жақтағы қос шеңбер (логотип) */}
            <View style={styles.cardCircles}>
              <View style={styles.circleLeft} />
              <View style={styles.circleRight} />
            </View>
          </View>

          {/* Жоғарғы оң жақтағы "+" белгісі */}
          <View style={styles.plusBadge}>
            <Ionicons name="add" size={24} color="#4C26C9" />
          </View>

          {/* Төменгі сол жақтағы қауіпсіздік қалқаны */}
          <View style={styles.shieldBadge}>
            <Ionicons name="shield-checkmark" size={34} color="#2563EB" />
          </View>

          {/* Төменгі оң жақтағы алтын тиындар (монеталар) */}
          <View style={styles.coinsBadge}>
            <FontAwesome5 name="coins" size={36} color="#F59E0B" />
          </View>
        </View>

        {/* Мәтіндер */}
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>

        {/* Растау батырмасы */}
        <TouchableOpacity
          style={styles.confirmButton}
          activeOpacity={0.85}
          onPress={onConfirm}
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
    paddingHorizontal: 28,
  },
  illustrationWrapper: {
    width: 260,
    height: 190,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
    position: 'relative',
  },
  backCard: {
    position: 'absolute',
    top: 14,
    width: 200,
    height: 120,
    backgroundColor: '#1E1B4B',
    borderRadius: 16,
    transform: [{ rotate: '-8deg' }],
    overflow: 'hidden',
  },
  backCardStripe: {
    width: '100%',
    height: 22,
    backgroundColor: '#FF4D6D',
    marginTop: 14,
  },
  frontCard: {
    width: 210,
    height: 130,
    backgroundColor: '#3B1E88',
    borderRadius: 18,
    padding: 18,
    justifyContent: 'center',
    shadowColor: '#3B1E88',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 6,
  },
  cardChip: {
    width: 30,
    height: 22,
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
    marginBottom: 14,
  },
  cardLineLong: {
    width: 90,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FFFFFF',
    marginBottom: 8,
  },
  cardLinesRow: {
    flexDirection: 'row',
    gap: 8,
  },
  cardLineShort: {
    width: 32,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#CBD5E0',
  },
  cardCircles: {
    position: 'absolute',
    top: 36,
    right: 18,
    flexDirection: 'row',
  },
  circleLeft: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#FFFFFF',
  },
  circleRight: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#E2E8F0',
    marginLeft: -6,
  },
  plusBadge: {
    position: 'absolute',
    top: 8,
    right: 36,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  shieldBadge: {
    position: 'absolute',
    bottom: 6,
    left: 42,
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#EBF8FF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  coinsBadge: {
    position: 'absolute',
    bottom: 10,
    right: 26,
    backgroundColor: '#FEF3C7',
    padding: 10,
    borderRadius: 20,
    shadowColor: '#F59E0B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#3B1E88',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#2D3748',
    textAlign: 'center',
    marginBottom: 38,
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