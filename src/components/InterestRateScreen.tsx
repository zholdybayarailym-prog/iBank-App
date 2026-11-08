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

interface InterestRateScreenProps {
  onNavigateBack?: () => void;
}

export default function InterestRateScreen({ onNavigateBack }: InterestRateScreenProps) {
  // Пайыздық мөлшерлемелер тізімі (суреттегі үлгі бойынша)
  const rates = [
    { kind: 'Жеке тұлғалар', deposit: '1 ай', rate: '4.50%' },
    { kind: 'Заңды тұлғалар', deposit: '2 ай', rate: '5.50%' },
    { kind: 'Жеке тұлғалар', deposit: '1 ай', rate: '4.50%' },
    { kind: 'Заңды тұлғалар', deposit: '6 ай', rate: '2.50%' },
    { kind: 'Жеке тұлғалар', deposit: '1 ай', rate: '4.50%' },
    { kind: 'Заңды тұлғалар', deposit: '8 ай', rate: '8.50%' },
    { kind: 'Жеке тұлғалар', deposit: '1 ай', rate: '4.50%' },
    { kind: 'Жеке тұлғалар', deposit: '1 ай', rate: '4.50%' },
    { kind: 'Заңды тұлғалар', deposit: '7 ай', rate: '8.80%' },
    { kind: 'Жеке тұлғалар', deposit: '1 ай', rate: '4.50%' },
    { kind: 'Заңды тұлғалар', deposit: '12 ай', rate: '5.90%' },
    { kind: 'Жеке тұлғалар', deposit: '1 ай', rate: '4.50%' },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Жоғарғы панель (Header) */}
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.headerContent}>
          <TouchableOpacity style={styles.backButton} onPress={onNavigateBack}>
            <Ionicons name="chevron-back" size={24} color="#1A202C" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Пайыздық мөлшерлеме</Text>
        </View>

        {/* Кесте тақырыптары */}
        <View style={styles.tableHeader}>
          <Text style={styles.columnHeaderTitle}>Түрі</Text>
          <View style={styles.rightHeaderGroup}>
            <Text style={styles.columnHeaderDeposit}>Мерзімі</Text>
            <Text style={styles.columnHeaderRate}>Мөлшерлеме</Text>
          </View>
        </View>
      </SafeAreaView>

      {/* Тізім аймағы */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {rates.map((item, index) => (
          <View key={index} style={styles.rowItem}>
            <Text style={styles.rowKind}>{item.kind}</Text>
            <View style={styles.rightRowGroup}>
              <Text style={styles.rowDeposit}>{item.deposit}</Text>
              <Text style={styles.rowRate}>{item.rate}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7FAFC' },
  safeArea: { backgroundColor: '#FFFFFF', borderBottomWidth: 1, borderBottomColor: '#F1F5F9' },
  headerContent: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingHorizontal: 20, 
    paddingVertical: 12,
  },
  backButton: { marginRight: 15 },
  headerTitle: { color: '#1A202C', fontSize: 18, fontWeight: '700' },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: '#FAFAFA',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  columnHeaderTitle: { fontSize: 13, fontWeight: '600', color: '#A0AEC0' },
  rightHeaderGroup: { flexDirection: 'row', width: 140, justifyContent: 'space-between' },
  columnHeaderDeposit: { fontSize: 13, fontWeight: '600', color: '#A0AEC0', textAlign: 'right' },
  columnHeaderRate: { fontSize: 13, fontWeight: '600', color: '#A0AEC0', textAlign: 'right', width: 60 },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 30, paddingTop: 10 },
  rowItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 3,
    elevation: 1,
  },
  rowKind: { fontSize: 14, fontWeight: '500', color: '#2D3748', flex: 1 },
  rightRowGroup: { flexDirection: 'row', width: 140, justifyContent: 'space-between', alignItems: 'center' },
  rowDeposit: { fontSize: 14, color: '#718096', textAlign: 'right' },
  rowRate: { fontSize: 15, fontWeight: '700', color: '#5C3BFF', textAlign: 'right', width: 60 },
});