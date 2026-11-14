import React, { useState } from 'react';
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

interface AccountAndCardScreenProps {
  onBack?: () => void;
  userName?: string;
}

export default function AccountAndCardScreen({
  onBack,
  userName = 'Зұпар Абдрахман',
}: AccountAndCardScreenProps) {
  const [activeTab, setActiveTab] = useState<'account' | 'card'>('account');

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Жоғарғы панель */}
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.headerContent}>
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <Ionicons name="chevron-back" size={24} color="#1A202C" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Шот пен карта</Text>
        </View>
      </SafeAreaView>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Ауыстырып-қосқыш түймелер (Account / Card) */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tabButton, activeTab === 'account' && styles.activeTabButton]}
            onPress={() => setActiveTab('account')}
          >
            <Text style={[styles.tabText, activeTab === 'account' && styles.activeTabText]}>
              Шот
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tabButton, activeTab === 'card' && styles.activeTabButton]}
            onPress={() => setActiveTab('card')}
          >
            <Text style={[styles.tabText, activeTab === 'card' && styles.activeTabText]}>
              Карта
            </Text>
          </TouchableOpacity>
        </View>

        {/* Шот қойындысы (Account) */}
        {activeTab === 'account' ? (
          <View>
            {/* 1-ші шот */}
            <View style={styles.accountCard}>
              <View style={styles.accountTopRow}>
                <Text style={styles.accountTitle}>№1 Шот</Text>
                <Text style={styles.accountNumber}>1900 8988 1234</Text>
              </View>
              <View style={styles.accountDetailRow}>
                <Text style={styles.label}>Қолжетімді баланс</Text>
                <Text style={styles.valueBlue}>$20,000</Text>
              </View>
              <View style={styles.accountDetailRowLast}>
                <Text style={styles.label}>Бөлімше</Text>
                <Text style={styles.valueText}>Алматы</Text>
              </View>
            </View>

            {/* 2-ші шот */}
            <View style={styles.accountCard}>
              <View style={styles.accountTopRow}>
                <Text style={styles.accountTitle}>№2 Шот</Text>
                <Text style={styles.accountNumber}>8988 1234</Text>
              </View>
              <View style={styles.accountDetailRow}>
                <Text style={styles.label}>Қолжетімді баланс</Text>
                <Text style={styles.valueBlue}>$12,000</Text>
              </View>
              <View style={styles.accountDetailRowLast}>
                <Text style={styles.label}>Бөлімше</Text>
                <Text style={styles.valueText}>Алматы</Text>
              </View>
            </View>

            {/* 3-ші шот */}
            <View style={styles.accountCard}>
              <View style={styles.accountTopRow}>
                <Text style={styles.accountTitle}>№3 Шот</Text>
                <Text style={styles.accountNumber}>1900 1234 2222</Text>
              </View>
              <View style={styles.accountDetailRow}>
                <Text style={styles.label}>Қолжетімді баланс</Text>
                <Text style={styles.valueBlue}>$230,000</Text>
              </View>
              <View style={styles.accountDetailRowLast}>
                <Text style={styles.label}>Бөлімше</Text>
                <Text style={styles.valueText}>Алматы</Text>
              </View>
            </View>
          </View>
        ) : (
          /* Карта қойындысы (Card) */
          <View>
            {/* 1-ші Карта (Көк фонды) */}
            <View style={styles.cardDesignBlue}>
              <View style={styles.cardTopRowCard}>
                <Text style={styles.cardHolderName}>{userName}</Text>
              </View>
              
              <View>
                <Text style={styles.cardType}>Amazon Platinum</Text>
                <Text style={styles.cardNumber}>4756  ••••  ••••  9018</Text>
              </View>

              <View style={styles.cardBottomRow}>
                <Text style={styles.cardBalance}>$3,469.52</Text>
                <View style={styles.visaContainer}>
                  <Text style={styles.visaText}>VISA</Text>
                </View>
              </View>
            </View>

            {/* 2-ші Карта (Сары фонды) */}
            <View style={styles.cardDesignYellow}>
              <View style={styles.cardTopRowCard}>
                <Text style={styles.cardHolderNameYellow}>{userName}</Text>
              </View>
              
              <View>
                <Text style={styles.cardTypeYellow}>Amazon Platinum</Text>
                <Text style={styles.cardNumberYellow}>4756  ••••  ••••  9018</Text>
              </View>

              <View style={styles.cardBottomRow}>
                <Text style={styles.cardBalanceYellow}>$3,469.52</Text>
                <View style={styles.circlesContainer}>
                  <View style={styles.circleOrange} />
                  <View style={styles.circleWhite} />
                </View>
              </View>
            </View>

            {/* Карта қосу түймесі (Add card) */}
            <TouchableOpacity style={styles.addCardButton} activeOpacity={0.8}>
              <Text style={styles.addCardButtonText}>Карта қосу</Text>
            </TouchableOpacity>
          </View>
        )}

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  safeArea: { backgroundColor: '#FFFFFF', borderBottomWidth: 1, borderBottomColor: '#F1F5F9' },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  backButton: { marginRight: 15, padding: 5 },
  headerTitle: { color: '#1A202C', fontSize: 18, fontWeight: '700' },
  scrollContent: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 40 },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#F1F5F9',
    borderRadius: 16,
    padding: 4,
    marginBottom: 24,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 14,
  },
  activeTabButton: {
    backgroundColor: '#5C3BFF',
    shadowColor: '#5C3BFF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  tabText: { fontSize: 15, fontWeight: '600', color: '#64748B' },
  activeTabText: { color: '#FFFFFF' },
  
  /* Шот карточкаларының стильдері */
  accountCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  accountTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F8FAFC',
    paddingBottom: 10,
  },
  accountTitle: { fontSize: 16, fontWeight: '700', color: '#1A202C' },
  accountNumber: { fontSize: 14, fontWeight: '600', color: '#64748B' },
  accountDetailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  accountDetailRowLast: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: { fontSize: 14, color: '#64748B', fontWeight: '500' },
  valueBlue: { fontSize: 15, color: '#5C3BFF', fontWeight: '700' },
  valueText: { fontSize: 15, color: '#1A202C', fontWeight: '600' },

  /* Көк карта стилі */
  cardDesignBlue: {
    width: '100%',
    height: 190,
    borderRadius: 20,
    backgroundColor: '#3B1E88',
    padding: 20,
    justifyContent: 'space-between',
    marginBottom: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 5,
  },
  cardTopRowCard: { flexDirection: 'row', justifyContent: 'space-between' },
  cardHolderName: { color: '#FFFFFF', fontSize: 16, fontWeight: '600' },
  cardType: { color: '#A0AEC0', fontSize: 12, marginBottom: 4 },
  cardNumber: { color: '#FFFFFF', fontSize: 15, letterSpacing: 2 },
  cardBottomRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' },
  cardBalance: { color: '#FFFFFF', fontSize: 22, fontWeight: '700' },
  visaContainer: { justifyContent: 'center', alignItems: 'center' },
  visaText: { color: '#FFFFFF', fontSize: 22, fontWeight: '900', fontStyle: 'italic', letterSpacing: 3 },

  /* Сары карта стилі */
  cardDesignYellow: {
    width: '100%',
    height: 190,
    borderRadius: 20,
    backgroundColor: '#FFB703',
    padding: 20,
    justifyContent: 'space-between',
    marginBottom: 25,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 5,
  },
  cardHolderNameYellow: { color: '#FFFFFF', fontSize: 16, fontWeight: '600' },
  cardTypeYellow: { color: 'rgba(255, 255, 255, 0.8)', fontSize: 12, marginBottom: 4 },
  cardNumberYellow: { color: '#FFFFFF', fontSize: 15, letterSpacing: 2 },
  cardBalanceYellow: { color: '#FFFFFF', fontSize: 22, fontWeight: '700' },
  circlesContainer: { flexDirection: 'row', alignItems: 'center' },
  circleOrange: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FF7043',
    opacity: 0.8,
  },
  circleWhite: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    marginLeft: -12,
    opacity: 0.9,
  },

  /* Карта қосу түймесі */
  addCardButton: {
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
  addCardButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
});