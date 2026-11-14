import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface MobilePrepaidScreenProps {
  onBack?: () => void;
  onSuccess?: (data: { phoneNumber: string; amount: string; accountNumber: string }) => void;
}

export default function MobilePrepaidScreen({
  onBack,
  onSuccess,
}: MobilePrepaidScreenProps) {
  const [accountNumber, setAccountNumber] = useState('VISA **** **** 1234');
  const [selectedContact, setSelectedContact] = useState<string | null>(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedAmount, setSelectedAmount] = useState<string | null>(null);

  const contacts = [
    { name: 'Makhasheva Nursulu', phone: '+8564757899' },
    { name: 'Zupar Abdrakhman', phone: '+8569876543' },
  ];

  const handleNext = () => {
    if (onSuccess) {
      onSuccess({
        phoneNumber: phoneNumber || '+8564757899',
        amount: selectedAmount || '$10',
        accountNumber: accountNumber || 'VISA **** **** 1234',
      });
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Жоғарғы панель */}
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.headerContent}>
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <Ionicons name="chevron-back" size={24} color="#1A202C" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Мобильді байланыс</Text>
        </View>
      </SafeAreaView>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Шотты таңдау */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Шотты / картаны таңдаңыз</Text>
          <View style={styles.readOnlyInput}>
            <Text style={styles.inputText}>{accountNumber}</Text>
          </View>
          <Text style={styles.balanceText}>Қолжетімді баланс : 10,000$</Text>
        </View>

        {/* Directory / Тізім */}
        <View style={styles.directoryHeader}>
          <Text style={styles.sectionTitle}>Байланыстар</Text>
          <TouchableOpacity>
            <Text style={styles.findBeneficiary}>Алушыны табу</Text>
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.contactsRow}>
          <TouchableOpacity style={styles.addContactButton}>
            <Ionicons name="add" size={24} color="#5C3BFF" />
          </TouchableOpacity>

          {contacts.map((item, index) => {
            const isSelected = selectedContact === item.name;
            return (
              <TouchableOpacity
                key={index}
                style={styles.contactItem}
                onPress={() => {
                  setSelectedContact(item.name);
                  setPhoneNumber(item.phone);
                }}
              >
                <View style={[styles.avatarContainer, isSelected && styles.selectedAvatarContainer]}>
                  <Ionicons name="person" size={24} color={isSelected ? '#FFFFFF' : '#5C3BFF'} />
                </View>
                <Text style={[styles.contactName, isSelected && styles.selectedContactName]} numberOfLines={1}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Телефон нөмірі */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Телефон нөмірі</Text>
          <TextInput
            style={styles.textInput}
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            placeholder="+856..."
            placeholderTextColor="#A0AEC0"
            keyboardType="phone-pad"
          />
        </View>

        {/* Соманы таңдау */}
        <Text style={styles.inputLabel}>Соманы таңдаңыз</Text>
        <View style={styles.amountsRow}>
          {['$10', '$20', '$30'].map((amount) => {
            const isSelected = selectedAmount === amount;
            return (
              <TouchableOpacity
                key={amount}
                style={[styles.amountCard, isSelected && styles.selectedAmountCard]}
                onPress={() => setSelectedAmount(amount)}
              >
                <Text style={[styles.amountText, isSelected && styles.selectedAmountText]}>
                  {amount}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Растау түймесі */}
        <TouchableOpacity
          style={styles.confirmButton}
          activeOpacity={0.8}
          onPress={handleNext}
        >
          <Text style={styles.confirmButtonText}>Растау</Text>
        </TouchableOpacity>

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

  inputGroup: { marginBottom: 16 },
  inputLabel: { fontSize: 14, fontWeight: '600', color: '#718096', marginBottom: 6 },
  readOnlyInput: {
    backgroundColor: '#F7FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 14,
    paddingHorizontal: 16,
    height: 52,
    justifyContent: 'center',
  },
  inputText: { fontSize: 16, color: '#1A202C', fontWeight: '500' },
  balanceText: { fontSize: 12, color: '#5C3BFF', fontWeight: '600', marginTop: 6 },

  directoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: { fontSize: 14, fontWeight: '600', color: '#718096' },
  findBeneficiary: { fontSize: 14, fontWeight: '600', color: '#5C3BFF' },

  contactsRow: { flexDirection: 'row', marginBottom: 20 },
  addContactButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#F7FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  contactItem: { alignItems: 'center', marginRight: 16, width: 80 },
  avatarContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#F7FAFC',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  selectedAvatarContainer: {
    backgroundColor: '#5C3BFF',
    borderColor: '#5C3BFF',
  },
  contactName: { fontSize: 12, color: '#718096', fontWeight: '500', textAlign: 'center' },
  selectedContactName: { color: '#5C3BFF', fontWeight: '700' },

  textInput: {
    backgroundColor: '#F7FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 14,
    paddingHorizontal: 16,
    height: 52,
    fontSize: 16,
    color: '#1A202C',
  },

  amountsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  amountCard: {
    flex: 1,
    backgroundColor: '#F7FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 14,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
  },
  selectedAmountCard: {
    backgroundColor: '#5C3BFF',
    borderColor: '#5C3BFF',
  },
  amountText: { fontSize: 16, fontWeight: '600', color: '#1A202C' },
  selectedAmountText: { color: '#FFFFFF' },

  confirmButton: {
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
  confirmButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
});