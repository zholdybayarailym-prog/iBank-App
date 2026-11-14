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
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface WithdrawScreenProps {
  onBack?: () => void;
  onSuccess?: () => void;
}

export default function WithdrawScreen({
  onBack,
  onSuccess,
}: WithdrawScreenProps) {
  const [selectedAccount, setSelectedAccount] = useState('VISA  ••••  ••••  ••••  1234');
  const [availableBalance, setAvailableBalance] = useState('10,000$');
  const [phoneNumber, setPhoneNumber] = useState('+8564757899');
  const [amountInput, setAmountInput] = useState('$ 1000');
  const [modalVisible, setModalVisible] = useState(false);
  const [isSuccessView, setIsSuccessView] = useState(false); // Сәтті аяқталғанын көрсететін штат

  const accountList = [
    { number: '1900 8988 5456', balance: '5,400$' },
    { number: '1900 8112 5222', balance: '12,350$' },
    { number: '4411 0000 1234', balance: '10,000$' },
    { number: '1900 8988 7890', balance: '3,200$' },
    { number: '1900 8988 9911', balance: '8,750$' },
  ];

  const handleVerify = () => {
    if (!phoneNumber) {
      Alert.alert('Қате', 'Телефон нөмірін енгізіңіз!');
      return;
    }
    if (!amountInput) {
      Alert.alert('Қате', 'Соманы енгізіңіз!');
      return;
    }
    // Растау батырмасын басқан кезде сәтті аяқталған экранға ауыстырамыз
    setIsSuccessView(true);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Жоғарғы панель */}
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.headerContent}>
          <TouchableOpacity style={styles.backButton} onPress={isSuccessView ? () => setIsSuccessView(false) : onBack}>
            <Ionicons name="chevron-back" size={24} color="#1A202C" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Қолма-қол алу</Text>
        </View>
      </SafeAreaView>

      {!isSuccessView ? (
        /* Енгізу экраны */
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          
          {/* Иллюстрация декорациясы */}
          <View style={styles.illustrationContainer}>
            <View style={styles.walletBox}>
              <Ionicons name="wallet" size={36} color="#5C3BFF" />
            </View>
            <View style={styles.personBox}>
              <Ionicons name="person" size={24} color="#FF4D6D" />
            </View>
            <View style={styles.phoneBox}>
              <Ionicons name="phone-portrait" size={32} color="#5C3BFF" />
            </View>
          </View>

          {/* Шотты / картаны таңдау түймесі */}
          <View style={styles.inputGroup}>
            <TouchableOpacity 
              style={styles.dropdownInput}
              activeOpacity={0.8}
              onPress={() => setModalVisible(true)}
            >
              <Text style={styles.inputTextActive}>{selectedAccount}</Text>
              <Ionicons name="chevron-down" size={20} color="#A0AEC0" />
            </TouchableOpacity>
            {/* Қолжетімді баланс */}
            <Text style={styles.balanceText}>Қолжетімді баланс : {availableBalance}</Text>
          </View>

          {/* Телефон нөмірі */}
          <View style={styles.inputGroupPhone}>
            <TextInput
              style={styles.input}
              placeholder="Телефон нөмірі"
              placeholderTextColor="#A0AEC0"
              keyboardType="phone-pad"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
            />
          </View>

          {/* Соманы таңдау атауы */}
          <Text style={styles.sectionLabel}>Соманы таңдаңыз</Text>

          {/* Соманы қолмен енгізу өрісі */}
          <View style={styles.inputGroup}>
            <TextInput
              style={styles.input}
              placeholder="Сома"
              placeholderTextColor="#A0AEC0"
              keyboardType="numeric"
              value={amountInput}
              onChangeText={setAmountInput}
            />
          </View>

          {/* Растау батырмасы */}
          <TouchableOpacity
            style={[styles.verifyButton, !amountInput && styles.verifyButtonDisabled]}
            activeOpacity={0.8}
            onPress={handleVerify}
          >
            <Text style={[styles.verifyButtonText, !amountInput && styles.verifyButtonTextDisabled]}>
              Растау
            </Text>
          </TouchableOpacity>

        </ScrollView>
      ) : (
        /* Сәтті аяқталды экраны (Success View) */
        <View style={styles.successContainer}>
          <View style={styles.illustrationContainer}>
            <View style={styles.walletBox}>
              <Ionicons name="wallet" size={36} color="#5C3BFF" />
            </View>
            <View style={styles.personBox}>
              <Ionicons name="person" size={24} color="#FF4D6D" />
            </View>
            <View style={styles.phoneBox}>
              <Ionicons name="phone-portrait" size={32} color="#5C3BFF" />
            </View>
          </View>

          <Text style={styles.successTitle}>Ақша сәтті шешілді!</Text>
          <Text style={styles.successSubtitle}>
            Сіз шотыңыздан ақшаны сәтті шештіңіз!{'\n'}Картаны басқару бөлімінен балансты тексеріңіз.
          </Text>

          <TouchableOpacity
            style={styles.confirmButton}
            activeOpacity={0.8}
            onPress={onSuccess}
          >
            <Text style={styles.confirmButtonText}>Растау</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Шоттарды таңдайтын қалқымалы терезе (Modal) */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Шотты таңдаңыз:</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons name="close" size={22} color="#1A202C" />
              </TouchableOpacity>
            </View>

            {accountList.map((item, index) => {
              const isSelected = selectedAccount.includes(item.number);
              return (
                <TouchableOpacity
                  key={index}
                  style={styles.accountRow}
                  activeOpacity={0.7}
                  onPress={() => {
                    setSelectedAccount(item.number);
                    setAvailableBalance(item.balance);
                    setModalVisible(false);
                  }}
                >
                  <Text style={[styles.accountText, isSelected && styles.accountTextSelected]}>
                    {item.number}
                  </Text>
                  {isSelected && (
                    <Ionicons name="checkmark" size={20} color="#5C3BFF" />
                  )}
                </TouchableOpacity>
              );
            })}

          </View>
        </View>
      </Modal>

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
  
  illustrationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 140,
    marginBottom: 24,
    backgroundColor: '#F8FAFC',
    borderRadius: 20,
  },
  walletBox: {
    width: 60,
    height: 60,
    borderRadius: 16,
    backgroundColor: '#EEECFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  personBox: {
    width: 40,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  phoneBox: {
    width: 45,
    height: 75,
    borderRadius: 10,
    backgroundColor: '#EEECFF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  inputGroup: { marginBottom: 16 },
  inputGroupPhone: { marginBottom: 20 },
  dropdownInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F7FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 14,
    paddingHorizontal: 16,
    height: 52,
    marginBottom: 8,
  },
  inputTextActive: { fontSize: 15, color: '#1A202C', fontWeight: '600' },
  balanceText: { fontSize: 13, color: '#5C3BFF', fontWeight: '600', marginLeft: 4 },
  
  input: {
    backgroundColor: '#F7FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 14,
    paddingHorizontal: 16,
    height: 52,
    fontSize: 16,
    color: '#1A202C',
  },
  sectionLabel: { fontSize: 14, fontWeight: '600', color: '#A0AEC0', marginBottom: 10, marginTop: 4 },
  
  verifyButton: {
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
    marginTop: 10,
  },
  verifyButtonDisabled: {
    backgroundColor: '#E2E8F0',
    shadowOpacity: 0,
  },
  verifyButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
  verifyButtonTextDisabled: { color: '#A0AEC0' },

  /* Сәтті аяқталды экранының стильдері */
  successContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
    alignItems: 'center',
  },
  successTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A202C',
    marginBottom: 12,
    textAlign: 'center',
  },
  successSubtitle: {
    fontSize: 14,
    color: '#718096',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 40,
  },
  confirmButton: {
    width: '100%',
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

  /* Modal стильдері */
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
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: { fontSize: 16, fontWeight: '700', color: '#1A202C' },
  accountRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F8FAFC',
  },
  accountText: { fontSize: 15, color: '#718096', fontWeight: '500' },
  accountTextSelected: { color: '#5C3BFF', fontWeight: '700' },
});