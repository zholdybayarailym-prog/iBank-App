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

interface PaymentHistoryScreenProps {
  onBack?: () => void;
}

export default function PaymentHistoryScreen({
  onBack,
}: PaymentHistoryScreenProps) {
  // Санаттар: 'electric', 'water', 'mobile', 'internet'
  const [activeCategory, setActiveCategory] = useState('electric');

  // Барлық санаттардың тарихы (Интернет төлемі де қосылды)
  const allHistoryData: { [key: string]: Array<{ month: string; date: string; status: string; isSuccess: boolean; amount: string }> } = {
    electric: [
      { month: 'Қазан', date: '30/10/2019', status: 'Сәтсіз', isSuccess: false, amount: '$480' },
      { month: 'Қыркүйек', date: '30/09/2019', status: 'Сәтті', isSuccess: true, amount: '$450' },
      { month: 'Тамыз', date: '30/08/2019', status: 'Сәтті', isSuccess: true, amount: '$520' },
      { month: 'Шілде', date: '30/07/2019', status: 'Сәтті', isSuccess: true, amount: '$490' },
    ],
    water: [
      { month: 'Қазан', date: '28/10/2019', status: 'Сәтті', isSuccess: true, amount: '$120' },
      { month: 'Қыркүйек', date: '27/09/2019', status: 'Сәтті', isSuccess: true, amount: '$115' },
      { month: 'Тамыз', date: '25/08/2019', status: 'Сәтсіз', isSuccess: false, amount: '$130' },
      { month: 'Шілде', date: '29/07/2019', status: 'Сәтті', isSuccess: true, amount: '$110' },
    ],
    mobile: [
      { month: 'Қазан', date: '01/10/2019', status: 'Сәтті', isSuccess: true, amount: '$45' },
      { month: 'Қыркүйек', date: '01/09/2019', status: 'Сәтті', isSuccess: true, amount: '$45' },
      { month: 'Тамыз', date: '01/08/2019', status: 'Сәтті', isSuccess: true, amount: '$50' },
      { month: 'Шілде', date: '01/07/2019', status: 'Сәтсіз', isSuccess: false, amount: '$45' },
    ],
    internet: [
      { month: 'Қазан', date: '05/10/2019', status: 'Сәтті', isSuccess: true, amount: '$85' },
      { month: 'Қыркүйек', date: '05/09/2019', status: 'Сәтті', isSuccess: true, amount: '$85' },
      { month: 'Тамыз', date: '05/08/2019', status: 'Сәтсіз', isSuccess: false, amount: '$85' },
      { month: 'Шілде', date: '05/07/2019', status: 'Сәтті', isSuccess: true, amount: '$80' },
    ],
  };

  const currentData = allHistoryData[activeCategory] || [];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Жоғарғы панель */}
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.headerContent}>
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <Ionicons name="chevron-back" size={24} color="#1A202C" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Төлемдер тарихы</Text>
        </View>
      </SafeAreaView>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Санаттарды таңдау батырмалары */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesRow}>
          <TouchableOpacity
            style={[styles.categoryTab, activeCategory === 'electric' && styles.activeCategoryTab]}
            onPress={() => setActiveCategory('electric')}
          >
            <Text style={[styles.categoryText, activeCategory === 'electric' && styles.activeCategoryText]}>
              Электр
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.categoryTab, activeCategory === 'water' && styles.activeCategoryTab]}
            onPress={() => setActiveCategory('water')}
          >
            <Text style={[styles.categoryText, activeCategory === 'water' && styles.activeCategoryText]}>
              Су
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.categoryTab, activeCategory === 'mobile' && styles.activeCategoryTab]}
            onPress={() => setActiveCategory('mobile')}
          >
            <Text style={[styles.categoryText, activeCategory === 'mobile' && styles.activeCategoryText]}>
              Мобильді
            </Text>
          </TouchableOpacity>

          {/* Интернет санаты қосылды */}
          <TouchableOpacity
            style={[styles.categoryTab, activeCategory === 'internet' && styles.activeCategoryTab]}
            onPress={() => setActiveCategory('internet')}
          >
            <Text style={[styles.categoryText, activeCategory === 'internet' && styles.activeCategoryText]}>
              Интернет
            </Text>
          </TouchableOpacity>
        </ScrollView>

        {/* Төлемдер тізімі */}
        {currentData.map((item, index) => (
          <View key={index} style={styles.historyCard}>
            <View style={styles.cardRow}>
              <Text style={styles.monthText}>{item.month}</Text>
              <Text style={styles.dateText}>{item.date}</Text>
            </View>

            <View style={styles.cardRowBottom}>
              <View style={styles.statusContainer}>
                <Text style={styles.statusLabel}>Статус: </Text>
                <Text style={[styles.statusValue, item.isSuccess ? styles.successText : styles.errorText]}>
                  {item.status}
                </Text>
              </View>

              <View style={styles.amountContainer}>
                <Text style={styles.amountLabel}>Сомасы: </Text>
                <Text style={styles.amountValue}>{item.amount}</Text>
              </View>
            </View>
          </View>
        ))}

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

  scrollContent: { 
    paddingHorizontal: 20, 
    paddingTop: 20, 
    paddingBottom: 40 
  },

  categoriesRow: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  categoryTab: {
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 20,
    backgroundColor: '#EDF2F7',
    marginRight: 12,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeCategoryTab: {
    backgroundColor: '#5C3BFF',
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#718096',
  },
  activeCategoryText: {
    color: '#FFFFFF',
  },

  historyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 18,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  monthText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A202C',
  },
  dateText: {
    fontSize: 13,
    color: '#A0AEC0',
    fontWeight: '500',
  },
  cardRowBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusLabel: {
    fontSize: 13,
    color: '#718096',
  },
  statusValue: {
    fontSize: 13,
    fontWeight: '600',
  },
  successText: {
    color: '#22C55E',
  },
  errorText: {
    color: '#EF4444',
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  amountLabel: {
    fontSize: 13,
    color: '#718096',
  },
  amountValue: {
    fontSize: 15,
    fontWeight: '700',
    color: '#5C3BFF',
  },
});