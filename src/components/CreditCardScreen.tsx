import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, StatusBar, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface CreditCardScreenProps {
  onBack?: () => void;
  onPay?: () => void;
}

export default function CreditCardScreen({ onBack, onPay }: CreditCardScreenProps) {
  const transactions = [
    { title: 'Камера сатып алу', date: '02.11.2018', amount: '-$1200', icon: 'camera-outline', color: '#5C3BFF', bg: '#EEECFF' },
    { title: 'Теледидар сатып алу', date: '02.11.2018', amount: '-$1200', icon: 'tv-outline', color: '#E53E3E', bg: '#FFF5F5' },
    { title: 'Камера сатып алу', date: '02.11.2018', amount: '-$1200', icon: 'camera-outline', color: '#3182CE', bg: '#EBF8FF' },
    { title: 'Теледидар сатып алу', date: '02.11.2018', amount: '-$1200', icon: 'tv-outline', color: '#D69E2E', bg: '#FEFCBF' },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.topHeader}>
        <SafeAreaView>
          <View style={styles.headerContent}>
            <TouchableOpacity style={styles.backButton} onPress={onBack}>
              <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Кредиттік карта</Text>
            <View style={{ width: 24 }} />
          </View>
        </SafeAreaView>
      </View>

      <View style={styles.mainContainer}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          <View style={styles.cardBox}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardHolder}>Зұпар Абдрахман</Text>
              <Text style={styles.cardType}>Amazon Platinum</Text>
            </View>
            <Text style={styles.cardNumber}>4756  ••••  ••••  9018</Text>
            <View style={styles.cardFooter}>
              <Text style={styles.cardBalance}>$3,469.52</Text>
              <Text style={styles.cardBrand}>VISA</Text>
            </View>
          </View>

          <View style={styles.transactionContainer}>
            {transactions.map((item, index) => (
              <View key={index} style={styles.transactionItem}>
                <View style={[styles.iconBox, { backgroundColor: item.bg }]}>
                  <Ionicons name={item.icon as any} size={20} color={item.color} />
                </View>
                <View style={styles.transactionInfo}>
                  <Text style={styles.transactionTitle}>{item.title}</Text>
                  <Text style={styles.transactionDate}>{item.date}</Text>
                </View>
                <Text style={styles.transactionAmount}>{item.amount}</Text>
              </View>
            ))}
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>БАРЛЫҒЫ</Text>
              <Text style={styles.totalAmount}>-$3100</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.payButton} activeOpacity={0.8} onPress={onPay}>
            <Text style={styles.payButtonText}>Төлеу</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#4C26C9' },
  topHeader: { paddingHorizontal: 20, paddingBottom: 20 },
  headerContent: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 10 },
  backButton: { padding: 4 },
  headerTitle: { color: '#FFFFFF', fontSize: 18, fontWeight: '700' },
  mainContainer: { flex: 1, backgroundColor: '#F7FAFC', borderTopLeftRadius: 30, borderTopRightRadius: 30, overflow: 'hidden' },
  scrollContent: { padding: 20, paddingBottom: 40 },
  cardBox: { backgroundColor: '#1E1B4B', borderRadius: 24, padding: 20, marginBottom: 24 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  cardHolder: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
  cardType: { color: '#A5B4FC', fontSize: 12, fontWeight: '600' },
  cardNumber: { color: '#E2E8F0', fontSize: 15, letterSpacing: 2, fontWeight: '600', marginBottom: 20 },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' },
  cardBalance: { color: '#FFFFFF', fontSize: 22, fontWeight: '800' },
  cardBrand: { color: '#60A5FA', fontSize: 18, fontWeight: '900', fontStyle: 'italic' },
  transactionContainer: { backgroundColor: '#FFFFFF', borderRadius: 20, paddingHorizontal: 16, paddingVertical: 6, marginBottom: 24 },
  transactionItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: '#F1F5F9' },
  iconBox: { width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginRight: 14 },
  transactionInfo: { flex: 1 },
  transactionTitle: { fontSize: 14, fontWeight: '700', color: '#1A202C', marginBottom: 2 },
  transactionDate: { fontSize: 12, color: '#A0AEC0' },
  transactionAmount: { fontSize: 15, fontWeight: '700', color: '#E53E3E' },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 16 },
  totalLabel: { fontSize: 13, fontWeight: '800', color: '#1A202C' },
  totalAmount: { fontSize: 17, fontWeight: '800', color: '#E53E3E' },
  payButton: { height: 54, backgroundColor: '#8B5CF6', borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
  payButtonText: { fontSize: 16, fontWeight: '700', color: '#FFFFFF' },
});