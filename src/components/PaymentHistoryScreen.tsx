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
  onItemPress?: () => void;
}

export default function PaymentHistoryScreen({
  onBack,
  onItemPress,
}: PaymentHistoryScreenProps) {
  const [activeCategory, setActiveCategory] = useState('internet');

  const allHistoryData: { [key: string]: Array<{ month: string; date: string; status: string; isSuccess: boolean; amount: string; company: string }> } = {
    electric: [
      { month: 'October', date: '30/10/2019', status: 'Unsuccessfully', isSuccess: false, amount: '$50', company: 'Capi Telecom' },
      { month: 'September', date: '30/10/2019', status: 'Successfully', isSuccess: true, amount: '$50', company: 'Capi Telecom' },
    ],
    water: [
      { month: 'October', date: '28/10/2019', status: 'Successfully', isSuccess: true, amount: '$30', company: 'Water Service' },
    ],
    mobile: [
      { month: 'October', date: '01/10/2019', status: 'Successfully', isSuccess: true, amount: '$20', company: 'Tele2' },
    ],
    internet: [
      { month: 'October', date: '30/10/2019', status: 'Unsuccessfully', isSuccess: false, amount: '$50', company: 'Capi Telecom' },
      { month: 'September', date: '30/10/2019', status: 'Successfully', isSuccess: true, amount: '$50', company: 'Capi Telecom' },
      { month: 'August', date: '30/10/2019', status: 'Successfully', isSuccess: true, amount: '$50', company: 'Capi Telecom' },
      { month: 'July', date: '30/10/2019', status: 'Successfully', isSuccess: true, amount: '$50', company: 'Capi Telecom' },
      { month: 'June', date: '30/10/2019', status: 'Successfully', isSuccess: true, amount: '$50', company: 'Capi Telecom' },
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
          <Text style={styles.headerTitle}>Payment history</Text>
        </View>
      </SafeAreaView>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Санаттар */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesRow}>
          {['Water', 'Mobile', 'Internet', 'Electric'].map((cat) => {
            const key = cat.toLowerCase();
            const isActive = activeCategory === key;
            return (
              <TouchableOpacity
                key={cat}
                style={[styles.categoryTab, isActive && styles.activeCategoryTab]}
                onPress={() => setActiveCategory(key)}
              >
                <Text style={[styles.categoryText, isActive && styles.activeCategoryText]}>
                  {cat}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Төлемдер тізімі */}
        {currentData.map((item, index) => (
          <TouchableOpacity 
            key={index} 
            style={styles.historyCard} 
            activeOpacity={0.8}
            onPress={onItemPress}
          >
            <View style={styles.cardRow}>
              <Text style={styles.monthText}>{item.month}</Text>
              <Text style={styles.dateText}>{item.date}</Text>
            </View>

            <View style={styles.cardRowBottom}>
              <View>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Status</Text>
                  <Text style={[styles.statusValue, item.isSuccess ? styles.successText : styles.errorText]}>
                    {item.status}
                  </Text>
                </View>
                <View style={[styles.infoRow, { marginTop: 6 }]}>
                  <Text style={styles.infoLabel}>Company</Text>
                  <Text style={styles.companyValue}>{item.company}</Text>
                </View>
              </View>

              <View style={styles.amountBox}>
                <Text style={styles.amountLabel}>Amount</Text>
                <Text style={styles.amountValue}>{item.amount}</Text>
              </View>
            </View>
          </TouchableOpacity>
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
  scrollContent: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 40 },
  categoriesRow: { flexDirection: 'row', marginBottom: 20 },
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
  activeCategoryTab: { backgroundColor: '#5C3BFF' },
  categoryText: { fontSize: 14, fontWeight: '600', color: '#718096' },
  activeCategoryText: { color: '#FFFFFF' },
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
  monthText: { fontSize: 16, fontWeight: '700', color: '#1A202C' },
  dateText: { fontSize: 13, color: '#A0AEC0', fontWeight: '500' },
  cardRowBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  infoRow: { flexDirection: 'row', alignItems: 'center' },
  infoLabel: { fontSize: 13, color: '#718096', width: 65 },
  statusValue: { fontSize: 13, fontWeight: '600' },
  successText: { color: '#22C55E' },
  errorText: { color: '#EF4444' },
  companyValue: { fontSize: 13, fontWeight: '600', color: '#1A202C' },
  amountBox: { alignItems: 'flex-end' },
  amountLabel: { fontSize: 12, color: '#718096', marginBottom: 2 },
  amountValue: { fontSize: 16, fontWeight: '700', color: '#5C3BFF' },
});