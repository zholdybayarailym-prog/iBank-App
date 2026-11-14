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
import { Ionicons } from '@expo/vector-icons';

interface ChooseCardScreenProps {
  userName?: string;
  onBack?: () => void;
  onSelectCard?: (cardName: string) => void;
  onAddCard?: () => void;
}

export default function ChooseCardScreen({
  userName = 'Зұпар Абдрахман',
  onBack,
  onSelectCard,
  onAddCard,
}: ChooseCardScreenProps) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Жоғарғы панель */}
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.headerContent}>
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <Ionicons name="chevron-back" size={24} color="#1A202C" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Картаны таңдау</Text>
        </View>
      </SafeAreaView>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* 1-ші карта (Көк Visa) */}
        <TouchableOpacity 
          style={[styles.card, styles.blueCard]} 
          activeOpacity={0.9}
          onPress={() => onSelectCard && onSelectCard('Amazon Platinum Visa')}
        >
          <View>
            <Text style={styles.cardHolder}>{userName}</Text>
            <Text style={styles.cardType}>Amazon Platinum</Text>
          </View>
          <View style={styles.cardDetailsRow}>
            <View>
              <Text style={styles.cardNumber}>4756  ••••  ••••  9018</Text>
              <Text style={styles.cardBalance}>$3,469.52</Text>
            </View>
            <Text style={styles.visaText}>VISA</Text>
          </View>
        </TouchableOpacity>

        {/* 2-ші карта (Сары Mastercard) */}
        <TouchableOpacity 
          style={[styles.card, styles.yellowCard]} 
          activeOpacity={0.9}
          onPress={() => onSelectCard && onSelectCard('Amazon Platinum Gold')}
        >
          <View>
            <Text style={styles.cardHolderDark}>{userName}</Text>
            <Text style={styles.cardTypeDark}>Amazon Platinum</Text>
          </View>
          <View style={styles.cardDetailsRow}>
            <View>
              <Text style={styles.cardNumberDark}>4756  ••••  ••••  9018</Text>
              <Text style={styles.cardBalanceDark}>$3,469.52</Text>
            </View>
            <View style={styles.mastercardCircles}>
              <View style={[styles.mcCircle, styles.mcRed]} />
              <View style={[styles.mcCircle, styles.mcYellow]} />
            </View>
          </View>
        </TouchableOpacity>

        {/* Жаңа карта қосу батырмасы */}
        <TouchableOpacity 
          style={styles.addCardButton} 
          activeOpacity={0.7}
          onPress={onAddCard}
        >
          <Text style={styles.addCardText}>Жаңа карта қосу</Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  safeArea: { backgroundColor: '#FFFFFF', borderBottomWidth: 1, borderBottomColor: '#F1F5F9' },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  backButton: { marginRight: 15, padding: 4 },
  headerTitle: { color: '#1A202C', fontSize: 18, fontWeight: '700' },

  scrollContent: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 40 },

  card: {
    width: '100%',
    height: 180,
    borderRadius: 20,
    padding: 22,
    justifyContent: 'space-between',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  blueCard: {
    backgroundColor: '#1E1B4B',
  },
  yellowCard: {
    backgroundColor: '#FBBF24',
  },

  cardHolder: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  cardType: {
    color: '#93C5FD',
    fontSize: 12,
    marginTop: 2,
  },
  cardDetailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  cardNumber: {
    color: '#FFFFFF',
    fontSize: 14,
    letterSpacing: 2,
    marginBottom: 4,
  },
  cardBalance: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
  visaText: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '900',
    fontStyle: 'italic',
    letterSpacing: 2,
  },

  cardHolderDark: {
    color: '#1E293B',
    fontSize: 16,
    fontWeight: '600',
  },
  cardTypeDark: {
    color: '#475569',
    fontSize: 12,
    marginTop: 2,
  },
  cardNumberDark: {
    color: '#334155',
    fontSize: 14,
    letterSpacing: 2,
    marginBottom: 4,
  },
  cardBalanceDark: {
    color: '#0F172A',
    fontSize: 18,
    fontWeight: '700',
  },
  mastercardCircles: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 36,
    height: 24,
  },
  mcCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    opacity: 0.85,
  },
  mcRed: {
    backgroundColor: '#EF4444',
    position: 'absolute',
    left: 0,
  },
  mcYellow: {
    backgroundColor: '#F59E0B',
    position: 'absolute',
    right: 0,
  },

  addCardButton: {
    width: '100%',
    height: 56,
    borderWidth: 1.5,
    borderColor: '#CBD5E1',
    borderStyle: 'dashed',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginTop: 5,
  },
  addCardText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#64748B',
  },
});
