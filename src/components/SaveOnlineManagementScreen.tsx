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

interface SaveOnlineManagementScreenProps {
  onBack?: () => void;
  onSelectAccount?: (accountNumber: string) => void;
}

export default function SaveOnlineManagementScreen({
  onBack,
  onSelectAccount,
}: SaveOnlineManagementScreenProps) {
  const accounts = [
    {
      accountNumber: '1900 8988 5456',
      from: '02/11/2019',
      to: '02/11/2020',
      timeDeposit: '12 ай',
      interestRate: '5%',
    },
    {
      accountNumber: '1900 8112 5222',
      from: '02/11/2019',
      to: '02/11/2020',
      timeDeposit: '12 ай',
      interestRate: '5%',
    },
    {
      accountNumber: '4411 0000 1234',
      from: '02/11/2019',
      to: '02/11/2020',
      timeDeposit: '12 ай',
      interestRate: '5%',
    },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Жоғарғы панель */}
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.headerContent}>
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <Ionicons name="chevron-back" size={24} color="#1A202C" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Басқару</Text>
        </View>
      </SafeAreaView>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {accounts.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.card}
            activeOpacity={0.9}
            onPress={() => onSelectAccount && onSelectAccount(item.accountNumber)}
          >
            <View style={styles.row}>
              <Text style={styles.label}>Шот</Text>
              <Text style={styles.accountNumber}>{item.accountNumber}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.subLabel}>Басталуы</Text>
              <Text style={styles.value}>{item.from}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.subLabel}>Аяқталуы</Text>
              <Text style={styles.value}>{item.to}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.subLabel}>Депозит мерзімі</Text>
              <Text style={styles.value}>{item.timeDeposit}</Text>
            </View>

            <View style={[styles.row, { borderBottomWidth: 0, paddingBottom: 0 }]}>
              <Text style={styles.subLabel}>Пайыздық мөлшерлеме</Text>
              <Text style={styles.rateValue}>{item.interestRate}</Text>
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

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F8FAFC',
  },
  label: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1A202C',
  },
  accountNumber: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1A202C',
  },
  subLabel: {
    fontSize: 14,
    color: '#718096',
  },
  value: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1A202C',
  },
  rateValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#5C3BFF',
  },
});
