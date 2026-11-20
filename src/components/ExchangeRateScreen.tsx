import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getLatestRates } from '../services/currencyApi';

interface ExchangeRateScreenProps {
  onNavigateBack?: () => void;
}

interface RateRow {
  country: string;
  flag: string;
  buy: string;
  sell: string;
}

const COUNTRY_META: Record<string, { country: string; flag: string }> = {
  EUR: { country: 'Еуропа Одағы (EUR)', flag: '🇪🇺' },
  GBP: { country: 'Ұлыбритания (GBP)', flag: '🇬🇧' },
  JPY: { country: 'Жапония (JPY)', flag: '🇯🇵' },
  KRW: { country: 'Оңтүстік Корея (KRW)', flag: '🇰🇷' },
  CNY: { country: 'Қытай (CNY)', flag: '🇨🇳' },
  CAD: { country: 'Канада (CAD)', flag: '🇨🇦' },
  AUD: { country: 'Австралия (AUD)', flag: '🇦🇺' },
  CHF: { country: 'Швейцария (CHF)', flag: '🇨🇭' },
  TRY: { country: 'Түркия (TRY)', flag: '🇹🇷' },
  PLN: { country: 'Польша (PLN)', flag: '🇵🇱' },
};

export default function ExchangeRateScreen({ onNavigateBack }: ExchangeRateScreenProps) {
  const [rates, setRates] = useState<RateRow[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [lastUpdated, setLastUpdated] = useState<string>('');

  useEffect(() => {
    loadRates();
  }, []);

  const loadRates = async () => {
    try {
      setLoading(true);
      const data = await getLatestRates('USD');
      setLastUpdated(data.date);

      const formattedRates: RateRow[] = Object.keys(COUNTRY_META)
        .filter((code) => data.rates[code] !== undefined)
        .map((code) => {
          const baseRate = data.rates[code];
          // Банктік спред (сатып алу және сату айырмашылығы)
          const buyRate = (baseRate * 0.99).toFixed(3);
          const sellRate = (baseRate * 1.01).toFixed(3);

          return {
            country: COUNTRY_META[code].country,
            flag: COUNTRY_META[code].flag,
            buy: buyRate,
            sell: sellRate,
          };
        });

      setRates(formattedRates);
    } catch (error) {
      // Интернет болмаса, резервтік тізімді көрсетеді
      setRates([
        { country: 'Еуропа Одағы (EUR)', flag: '🇪🇺', buy: '0.912', sell: '0.935' },
        { country: 'Ұлыбритания (GBP)', flag: '🇬🇧', buy: '0.781', sell: '0.802' },
        { country: 'Оңтүстік Корея (KRW)', flag: '🇰🇷', buy: '1365.0', sell: '1395.0' },
        { country: 'Қытай (CNY)', flag: '🇨🇳', buy: '7.180', sell: '7.310' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.headerContent}>
          <TouchableOpacity style={styles.backButton} onPress={onNavigateBack}>
            <Ionicons name="chevron-back" size={24} color="#1A202C" />
          </TouchableOpacity>
          <View style={styles.titleWrapper}>
            <Text style={styles.headerTitle}>Валюта бағамы (USD)</Text>
            {lastUpdated ? (
              <Text style={styles.dateSubtitle}>API жаңартылды: {lastUpdated}</Text>
            ) : null}
          </View>
          <TouchableOpacity onPress={loadRates} style={styles.refreshButton}>
            <Ionicons name="refresh" size={20} color="#5C3BFF" />
          </TouchableOpacity>
        </View>

        <View style={styles.tableHeader}>
          <Text style={styles.columnHeaderCountry}>Ел</Text>
          <View style={styles.rightHeaderGroup}>
            <Text style={styles.columnHeaderBuy}>Сатып алу</Text>
            <Text style={styles.columnHeaderSell}>Сату</Text>
          </View>
        </View>
      </SafeAreaView>

      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#5C3BFF" />
          <Text style={styles.loaderText}>Бағамдар жүктелуде...</Text>
        </View>
      ) : (
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
      )}
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
  titleWrapper: { flex: 1 },
  headerTitle: { color: '#1A202C', fontSize: 18, fontWeight: '700' },
  dateSubtitle: { fontSize: 11, color: '#A0AEC0', marginTop: 2 },
  refreshButton: { padding: 6 },
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
  loaderContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loaderText: { marginTop: 10, fontSize: 13, color: '#718096' },
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