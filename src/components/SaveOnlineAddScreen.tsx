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
  Modal,
} from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';

interface SaveOnlineAddScreenProps {
  onBack?: () => void;
  onVerify?: (account: string, term: string, amount: string) => void;
}

export default function SaveOnlineAddScreen({
  onBack,
  onVerify,
}: SaveOnlineAddScreenProps) {
  const [selectedAccount, setSelectedAccount] = useState('Шот 1900 8988 5456');
  const [showAccountDropdown, setShowAccountDropdown] = useState(false);

  const [selectedTerm, setSelectedTerm] = useState('12 ай (Пайыздық мөлшерлеме 5%)');
  const [showTermModal, setShowTermModal] = useState(false);

  const [amount, setAmount] = useState('3000');

  const accounts = ['Шот 1900 8988 5456 (Баланс: 10000$)', 'Amazon Platinum (...9018)', 'Негізгі шот'];
  
  const terms = [
    { label: '3 ай (Пайыздық мөлшерлеме 4%)', value: '3 ай (5%)' },
    { label: '6 ай (Пайыздық мөлшерлеме 4.5%)', value: '6 ай (4.5%)' },
    { label: '12 ай (Пайыздық мөлшерлеме 5%)', value: '12 ай (5%)' },
    { label: '16 ай (Пайыздық мөлшерлеме 5.5%)', value: '16 ай (5.5%)' },
    { label: '24 ай (Пайыздық мөлшерлеме 6%)', value: '24 ай (6%)' },
  ];

  const isFormValid = selectedAccount.length > 0 && selectedTerm.length > 0 && amount.trim().length > 0;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Жоғарғы панель */}
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.headerContent}>
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <Ionicons name="chevron-back" size={24} color="#1A202C" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Қосу</Text>
        </View>
      </SafeAreaView>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Иллюстрация */}
        <View style={styles.illustrationContainer}>
          <View style={styles.iconCircle}>
            <Feather name="shield" size={42} color="#5C3BFF" />
          </View>
        </View>

        {/* Форма карточкасы */}
        <View style={styles.card}>
          
          {/* 1. Шотты таңдау */}
          <View style={styles.inputGroup}>
            <TextInput
              style={styles.textInput}
              value={selectedAccount}
              editable={false}
            />
            <Text style={styles.helperText}>Қолжетімді баланс: 10000$</Text>
          </View>

          {/* 2. Депозит мерзімін таңдау (Модалды терезе ашады) */}
          <View style={styles.inputGroup}>
            <TouchableOpacity 
              style={styles.dropdownInput} 
              activeOpacity={0.7}
              onPress={() => setShowTermModal(true)}
            >
              <Text style={styles.dropdownSelectedText}>{selectedTerm}</Text>
              <Ionicons name="chevron-down" size={18} color="#A0AEC0" />
            </TouchableOpacity>
            <Text style={styles.helperText}>Пайыздық мөлшерлеме 5% / 12 ай</Text>
          </View>

          {/* 3. Соманы енгізу */}
          <View style={styles.inputGroup}>
            <TextInput
              style={styles.textInput}
              placeholder="$ 3000"
              placeholderTextColor="#A0AEC0"
              keyboardType="numeric"
              value={amount}
              onChangeText={setAmount}
            />
          </View>

          {/* Растау (Verify) батырмасы */}
          <TouchableOpacity 
            style={[styles.verifyButton, isFormValid && styles.verifyButtonActive]} 
            activeOpacity={0.8}
            onPress={() => onVerify && onVerify(selectedAccount, selectedTerm, amount)}
          >
            <Text style={[styles.verifyButtonText, isFormValid && styles.verifyButtonTextActive]}>
              Тексеру
            </Text>
          </TouchableOpacity>

        </View>

      </ScrollView>

      {/* Пайыздық мерзімді таңдайтын модалды терезе (Popup) */}
      <Modal
        visible={showTermModal}
        transparent={true}
        animationType="fade"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Депозит мерзімін таңдаңыз</Text>
              <TouchableOpacity onPress={() => setShowTermModal(false)}>
                <Ionicons name="close" size={22} color="#1A202C" />
              </TouchableOpacity>
            </View>

            {terms.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.modalItem}
                onPress={() => {
                  setSelectedTerm(item.label);
                  setShowTermModal(false);
                }}
              >
                <Text style={[styles.modalItemText, selectedTerm === item.label && styles.modalItemTextSelected]}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            ))}

          </View>
        </View>
      </Modal>

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

  scrollContent: { paddingHorizontal: 20, paddingTop: 10, paddingBottom: 40 },

  illustrationContainer: {
    alignItems: 'center',
    marginVertical: 15,
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F3EEFF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 2,
  },

  inputGroup: {
    marginBottom: 18,
  },

  textInput: {
    height: 52,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 14,
    paddingHorizontal: 16,
    fontSize: 15,
    color: '#1A202C',
    backgroundColor: '#FFFFFF',
  },
  helperText: {
    fontSize: 12,
    color: '#5C3BFF',
    marginTop: 6,
    marginLeft: 4,
    fontWeight: '500',
  },

  dropdownInput: {
    height: 52,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 14,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  dropdownSelectedText: {
    fontSize: 15,
    color: '#1A202C',
    fontWeight: '500',
  },

  verifyButton: {
    height: 52,
    backgroundColor: '#F3EEFF',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  verifyButtonActive: {
    backgroundColor: '#5C3BFF',
  },
  verifyButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#A78BFA',
  },
  verifyButtonTextActive: {
    color: '#FFFFFF',
  },

  // Модалды терезе стильдері
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  modalContent: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A202C',
  },
  modalItem: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F8FAFC',
  },
  modalItemText: {
    fontSize: 15,
    color: '#4A5568',
  },
  modalItemTextSelected: {
    color: '#5C3BFF',
    fontWeight: '700',
  },
});