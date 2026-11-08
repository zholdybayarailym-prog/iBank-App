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

interface ExchangeRateScreenProps {
  onNavigateBack?: () => void;
}

export default function ExchangeRateScreen({ onNavigateBack }: ExchangeRateScreenProps) {
  const rates = [
    { country: 'Вьетнам', flag: '🇻🇳', buy: '1.403', sell: '1.746' },
    { country: 'Никарагуа', flag: '🇳🇮', buy: '9.123', sell: '12.09' },
    { country: 'Корея', flag: '🇰🇷', buy: '3.704', sell: '5.151' },
    { country: 'Ресей', flag: '🇷🇺', buy: '116.0', sell: '144.4' },
    { country: 'Қытай', flag: '🇨🇳', buy: '1.725', sell: '2.234' },
    { country: 'Португалия', flag: '🇵🇹', buy: '1.403', sell: '1.746' },
    { country: 'Корея', flag: '🇰🇷', buy: '3.454', sell: '4.312' },
    { country: 'Франция', flag: '🇫🇷', buy: '23.45', sell: '34.56' },
    { country: 'Никарагуа', flag: '🇳🇮', buy: '263.1', sell: '300.3' },
    { country: 'Қытай', flag: '🇨🇳', buy: '1.725', sell: '2.234' },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.headerContent}>
          <TouchableOpacity style={styles.backButton} onPress={onNavigateBack}>
            <Ionicons name="chevron-back" size={24} color="#1A202C" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Валюта бағамы</Text>
        </View>

        <View style={styles.tableHeader}>
          <Text style={styles.columnHeaderCountry}>Ел</Text>
          <View style={styles.rightHeaderGroup}>
            <Text style={styles.columnHeaderBuy}>Сатып алу</Text>
            <Text style={styles.columnHeaderSell}>Сату</Text>
          </View>
        </View>
      </SafeAreaView>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {rates.map((item, index) => (
          <View key={index} style={styles.rowItem}>
            <View style={styles.countryContainer}>
              <Text style={styles.flagText}>{item.flag}</Text>
              <Text style={styles.rowCountry}>{item.country}</Text>
            </View>
            <View style={styles.rightRowGroup}>
              <Text style={styles.rowBuy}>{item.buy}</Text>
              <Text style={styles.rowSell}>{item.sell}</Text>
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
  columnHeaderCountry: { fontSize: 13, fontWeight: '600', color: '#A0AEC0' },
  rightHeaderGroup: { flexDirection: 'row', width: 160, justifyContent: 'space-between' },
  columnHeaderBuy: { fontSize: 13, fontWeight: '600', color: '#A0AEC0', textAlign: 'right', width: 75 },
  columnHeaderSell: { fontSize: 13, fontWeight: '600', color: '#A0AEC0', textAlign: 'right', width: 75 },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 30, paddingTop: 10 },
  rowItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 3,
    elevation: 1,
  },
  countryContainer: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  flagText: { fontSize: 22, marginRight: 12 },
  rowCountry: { fontSize: 14, fontWeight: '500', color: '#2D3748' },
  rightRowGroup: { flexDirection: 'row', width: 160, justifyContent: 'space-between', alignItems: 'center' },
  rowBuy: { fontSize: 14, color: '#718096', textAlign: 'right', width: 75 },
  rowSell: { fontSize: 15, fontWeight: '700', color: '#5C3BFF', textAlign: 'right', width: 75 },
});