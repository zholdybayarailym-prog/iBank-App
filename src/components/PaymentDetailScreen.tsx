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

interface PaymentDetailScreenProps {
  onBack?: () => void;
  paymentData?: {
    title: string;
    name: string;
    address: string;
    phone: string;
    code: string;
    from: string;
    to: string;
    fee: string;
    tax: string;
    total: string;
  };
}

export default function PaymentDetailScreen({
  onBack,
  paymentData = {
    title: 'Electric payment',
    name: 'Jackson Maine',
    address: '403 East 4th Street,\nSanta Ana',
    phone: '+8424599721',
    code: '#2343543',
    from: '01/10/2019',
    to: '01/11/2019',
    fee: '$50',
    tax: '$10',
    total: '$60',
  },
}: PaymentDetailScreenProps) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Жоғарғы панель */}
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.headerContent}>
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <Ionicons name="chevron-back" size={24} color="#1A202C" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{paymentData.title}</Text>
        </View>
      </SafeAreaView>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Чек карточкасы */}
        <View style={styles.detailCard}>
          <View style={styles.row}>
            <Text style={styles.label}>Name</Text>
            <Text style={styles.valueBold}>{paymentData.name}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Address</Text>
            <Text style={[styles.valueBold, styles.addressText]}>{paymentData.address}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Phone number</Text>
            <Text style={styles.value}>{paymentData.phone}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Code</Text>
            <Text style={styles.value}>{paymentData.code}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>From</Text>
            <Text style={styles.value}>{paymentData.from}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>To</Text>
            <Text style={styles.value}>{paymentData.to}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Internet fee</Text>
            <Text style={styles.feeValue}>{paymentData.fee}</Text>
          </View>

          <View style={styles.dashDivider} />

          <View style={styles.row}>
            <Text style={styles.label}>Tax</Text>
            <Text style={styles.feeValue}>{paymentData.tax}</Text>
          </View>

          <View style={styles.dashDivider} />

          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>TOTAL</Text>
            <Text style={styles.totalValue}>{paymentData.total}</Text>
          </View>
        </View>

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
  headerTitle: { color: '#1A202C', fontSize: 20, fontWeight: '700' },

  scrollContent: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 40 },

  detailCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 18,
  },
  label: {
    fontSize: 15,
    color: '#A0AEC0',
    fontWeight: '400',
  },
  value: {
    fontSize: 15,
    color: '#1A202C',
    fontWeight: '500',
  },
  valueBold: {
    fontSize: 15,
    color: '#1A202C',
    fontWeight: '600',
  },
  addressText: {
    textAlign: 'right',
    maxWidth: '55%',
    lineHeight: 20,
  },
  dashDivider: {
    height: 1,
    borderWidth: 0.8,
    borderColor: '#EDF2F7',
    borderStyle: 'dashed',
    marginBottom: 18,
  },
  feeValue: {
    fontSize: 16,
    color: '#5C3BFF',
    fontWeight: '700',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1A202C',
  },
  totalValue: {
    fontSize: 22,
    fontWeight: '800',
    color: '#FF4D6D',
  },
});