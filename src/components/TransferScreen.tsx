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
  Keyboard,
  Modal,
  FlatList,
  Alert,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

interface TransferScreenProps {
  onBack?: () => void;
  onNavigateToConfirm?: (transferData: {
    fromAccount: string;
    toName: string;
    cardNumber: string;
    amount: string;
    content: string;
    bank?: string;
    branch?: string;
  }) => void;
}

const userAccounts = [
  { id: '1', name: 'Amazon Platinum', number: '4758 •••• •••• 9018', balance: '$3,469.52' },
  { id: '2', name: 'Kaspi Gold', number: '4400 •••• •••• 5521', balance: '125,400 ₸' },
  { id: '3', name: 'Digital USD Card', number: '5168 •••• •••• 1092', balance: '$500.00' },
];

// Банктердің тізімі (суреттегідей)
const bankList = [
  'Fifth Third',
  'Bank of the West',
  'Wells Fargo',
  'JP Morgan Chase',
  'US bank',
  'HSBS bank',
  'Citybank',
  'Ame Express',
];

export default function TransferScreen({ onBack, onNavigateToConfirm }: TransferScreenProps) {
  const [selectedMethod, setSelectedMethod] = useState<number>(2); // 2: Басқа банкке
  
  const [beneficiaries, setBeneficiaries] = useState([
    { id: '1', name: 'Nursulu Makhasheva', shortName: 'Nursulu', card: '4400123456789012', bank: 'US bank', branch: 'Алматы филиалы' },
    { id: '2', name: 'Abdrakhman Zupar', shortName: 'Abdrakhman', card: '4400430389983550', bank: 'US bank', branch: 'Астана филиалы' },
  ]);

  const [selectedBeneficiaryId, setSelectedBeneficiaryId] = useState<string>('1');
  const [selectedAccount, setSelectedAccount] = useState(userAccounts[0]);
  const [accountModalVisible, setAccountModalVisible] = useState(false);

  // Банк таңдайтын модаль күйлері
  const [bankModalVisible, setBankModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const [newBeneficiaryModalVisible, setNewBeneficiaryModalVisible] = useState(false);
  const [newFullName, setNewFullName] = useState('');
  const [newCardNumber, setNewCardNumber] = useState('');

  const [bank, setBank] = useState('US bank');
  const [branch, setBranch] = useState('Алматы филиалы');
  const [name, setName] = useState('Nursulu Makhasheva');
  const [cardNumber, setCardNumber] = useState('4400123456789012');
  const [amount, setAmount] = useState('1000');
  const [content, setContent] = useState('Ақша аудару');
  const [saveBeneficiary, setSaveBeneficiary] = useState(false);

  const handleTransfer = () => {
    Keyboard.dismiss();

    if (!cardNumber || !amount) {
      Alert.alert('Қате', 'Карта нөмірі мен сомасын толтырыңыз!');
      return;
    }

    if (onNavigateToConfirm) {
      onNavigateToConfirm({
        fromAccount: `${selectedAccount.name} (${selectedAccount.number})`,
        toName: name,
        cardNumber: cardNumber,
        amount: amount,
        content: content || 'Ақша аудару',
        bank: bank,
        branch: branch,
      });
    }
  };

  const handleAddNewBeneficiary = () => {
    if (!newFullName || !newCardNumber) {
      Alert.alert('Қате', 'Аты-жөні мен карта нөмірін толтырыңыз!');
      return;
    }

    const short = newFullName.split(' ')[0]; 
    const newObj = {
      id: Date.now().toString(),
      name: newFullName,
      shortName: short,
      card: newCardNumber,
      bank: 'US bank',
      branch: 'Алматы филиалы',
    };

    setBeneficiaries([...beneficiaries, newObj]);
    setSelectedBeneficiaryId(newObj.id);
    setName(newObj.name);
    setCardNumber(newObj.card);

    setNewFullName('');
    setNewCardNumber('');
    setNewBeneficiaryModalVisible(false);
  };

  // Банктерді іздеу фильтрі
  const filteredBanks = bankList.filter((item) =>
    item.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Жоғарғы панель */}
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.headerContent}>
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <Ionicons name="chevron-back" size={24} color="#1A202C" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Аударым</Text>
        </View>
      </SafeAreaView>

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={true}
        keyboardShouldPersistTaps="handled"
      >
        {/* Шотты/картаны таңдау өрісі */}
        <Text style={styles.labelTitle}>Шотты/картаны таңдау</Text>
        <TouchableOpacity 
          style={styles.accountDropdown}
          onPress={() => setAccountModalVisible(true)}
        >
          <View>
            <Text style={styles.accountDropdownTitle}>{selectedAccount.name} ({selectedAccount.balance})</Text>
            <Text style={styles.accountDropdownSub}>{selectedAccount.number}</Text>
          </View>
          <Ionicons name="chevron-down" size={18} color="#718096" />
        </TouchableOpacity>

        {/* Аудару түрі */}
        <Text style={styles.sectionTitle}>Аудару түрі</Text>
        <View style={styles.transactionTypesRow}>
          <TouchableOpacity 
            style={[styles.transTypeCard, selectedMethod === 0 && styles.transTypeCardActive]}
            onPress={() => setSelectedMethod(0)}
          >
            <MaterialCommunityIcons name="credit-card-outline" size={24} color={selectedMethod === 0 ? '#5C3BFF' : '#718096'} />
            <Text style={[styles.transTypeText, selectedMethod === 0 && styles.transTypeTextActive]}>Карта арқылы</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.transTypeCard, selectedMethod === 1 && styles.transTypeCardActive]}
            onPress={() => setSelectedMethod(1)}
          >
            <Ionicons name="person-outline" size={24} color={selectedMethod === 1 ? '#5C3BFF' : '#718096'} />
            <Text style={[styles.transTypeText, selectedMethod === 1 && styles.transTypeTextActive]}>Өз банкі ішінде</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.transTypeCard, selectedMethod === 2 && styles.transTypeCardActive]}
            onPress={() => setSelectedMethod(2)}
          >
            <Ionicons name="business-outline" size={24} color={selectedMethod === 2 ? '#5C3BFF' : '#718096'} />
            <Text style={[styles.transTypeText, selectedMethod === 2 && styles.transTypeTextActive]}>Басқа банкке</Text>
          </TouchableOpacity>
        </View>

        {/* Алушыны таңдау */}
        <View style={styles.beneficiaryHeader}>
          <Text style={styles.sectionTitle}>Алушыны таңдау</Text>
          <TouchableOpacity>
            <Text style={styles.findBeneficiaryText}>Алушыны табу</Text>
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.beneficiaryScroll}>
          <TouchableOpacity 
            style={styles.beneficiaryCard}
            onPress={() => setNewBeneficiaryModalVisible(true)}
          >
            <View style={styles.addBeneficiaryIcon}>
              <Ionicons name="add" size={24} color="#5C3BFF" />
            </View>
            <Text style={styles.beneficiaryName}>Жаңа</Text>
          </TouchableOpacity>

          {beneficiaries.map((item) => (
            <TouchableOpacity 
              key={item.id}
              style={[styles.beneficiaryCard, selectedBeneficiaryId === item.id && styles.beneficiaryCardActive]}
              onPress={() => {
                setSelectedBeneficiaryId(item.id);
                setName(item.name);
                setCardNumber(item.card);
                setBank(item.bank);
                setBranch(item.branch);
              }}
            >
              <View style={styles.beneficiaryAvatar}>
                <Ionicons name="person" size={20} color="#5C3BFF" />
              </View>
              <Text style={styles.beneficiaryName} numberOfLines={1}>{item.shortName}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Форма карточкасы */}
        <View style={styles.formCard}>
          {/* Басқа банкке таңдалғанда банк таңдайтын өріс */}
          {selectedMethod === 2 && (
            <>
              <Text style={styles.inputLabel}>Банкті таңдау</Text>
              <TouchableOpacity 
                style={styles.inputContainer}
                onPress={() => setBankModalVisible(true)}
              >
                <Text style={{ fontSize: 14, color: '#2D3748' }}>{bank}</Text>
                <Ionicons name="chevron-down" size={18} color="#A0AEC0" />
              </TouchableOpacity>

              <Text style={styles.inputLabel}>Филиалды таңдау</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Филиалды таңдаңыз"
                  placeholderTextColor="#A0AEC0"
                  value={branch}
                  onChangeText={setBranch}
                />
                <Ionicons name="chevron-down" size={18} color="#A0AEC0" />
              </View>
            </>
          )}

          <Text style={styles.inputLabel}>Аты-жөні</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Алушының аты-жөні"
              placeholderTextColor="#A0AEC0"
              value={name}
              onChangeText={setName}
            />
          </View>

          <Text style={styles.inputLabel}>Карта нөмірі</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Карта нөмірі"
              placeholderTextColor="#A0AEC0"
              keyboardType="numeric"
              value={cardNumber}
              onChangeText={setCardNumber}
            />
          </View>

          <Text style={styles.inputLabel}>Сомасы</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Соманы енгізіңіз"
              placeholderTextColor="#A0AEC0"
              keyboardType="numeric"
              value={amount}
              onChangeText={setAmount}
            />
          </View>

          <Text style={styles.inputLabel}>Ескерту</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Мақсатын жазыңыз"
              placeholderTextColor="#A0AEC0"
              value={content}
              onChangeText={setContent}
            />
          </View>

          <TouchableOpacity 
            style={styles.checkboxRow} 
            activeOpacity={0.8}
            onPress={() => setSaveBeneficiary(!saveBeneficiary)}
          >
            <View style={[styles.checkbox, saveBeneficiary && styles.checkboxChecked]}>
              {saveBeneficiary && <Ionicons name="checkmark" size={14} color="#FFFFFF" />}
            </View>
            <Text style={styles.checkboxText}>Алушылар тізіміне сақтау</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.submitButton} 
            activeOpacity={0.8}
            onPress={handleTransfer}
          >
            <Text style={styles.submitButtonText}>Растау</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* 1. БАНКТІ ТАҢДАУҒА АРНАЛҒАН МОДАЛЬДЫ ТЕРЕЗЕ (Суреттегідей) */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={bankModalVisible}
        onRequestClose={() => setBankModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.bankModalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Choose beneficiary bank</Text>
              <TouchableOpacity onPress={() => setBankModalVisible(false)}>
                <Ionicons name="close" size={24} color="#1A202C" />
              </TouchableOpacity>
            </View>

            {/* Іздеу жолағы */}
            <View style={styles.searchContainer}>
              <Ionicons name="search" size={18} color="#A0AEC0" style={{ marginRight: 8 }} />
              <TextInput
                style={styles.searchInput}
                placeholder="Search"
                placeholderTextColor="#A0AEC0"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>

            {/* Банктер тізімі */}
            <FlatList
              data={filteredBanks}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.bankItem}
                  onPress={() => {
                    setBank(item);
                    setBankModalVisible(false);
                    setSearchQuery('');
                  }}
                >
                  <Text style={styles.bankItemText}>{item}</Text>
                  {bank === item && (
                    <Ionicons name="checkmark" size={18} color="#5C3BFF" />
                  )}
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>

      {/* 2. ШОТТЫ ТАҢДАУ МОДАЛЫ */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={accountModalVisible}
        onRequestClose={() => setAccountModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Шотты немесе картаны таңдаңыз</Text>
              <TouchableOpacity onPress={() => setAccountModalVisible(false)}>
                <Ionicons name="close" size={24} color="#1A202C" />
              </TouchableOpacity>
            </View>

            <FlatList
              data={userAccounts}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.accountItem}
                  onPress={() => {
                    setSelectedAccount(item);
                    setAccountModalVisible(false);
                  }}
                >
                  <View>
                    <Text style={styles.accountItemTitle}>{item.name}</Text>
                    <Text style={styles.accountItemSub}>{item.number}</Text>
                  </View>
                  <View style={styles.accountItemRight}>
                    <Text style={styles.accountItemBalance}>{item.balance}</Text>
                    {selectedAccount.id === item.id && (
                      <Ionicons name="checkmark-circle" size={20} color="#5C3BFF" style={{marginTop: 4}} />
                    )}
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>

      {/* 3. ЖАҢА АЛУШЫ ҚОСУ МОДАЛЫ */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={newBeneficiaryModalVisible}
        onRequestClose={() => setNewBeneficiaryModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Жаңа алушы қосу</Text>
              <TouchableOpacity onPress={() => setNewBeneficiaryModalVisible(false)}>
                <Ionicons name="close" size={24} color="#1A202C" />
              </TouchableOpacity>
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Аты-жөні"
                placeholderTextColor="#A0AEC0"
                value={newFullName}
                onChangeText={setNewFullName}
              />
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Карта нөмірі"
                placeholderTextColor="#A0AEC0"
                keyboardType="numeric"
                value={newCardNumber}
                onChangeText={setNewCardNumber}
              />
            </View>

            <TouchableOpacity 
              style={[styles.submitButton, { marginTop: 10 }]} 
              activeOpacity={0.8}
              onPress={handleAddNewBeneficiary}
            >
              <Text style={styles.submitButtonText}>Қосу</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  backButton: { marginRight: 15, padding: 5 },
  headerTitle: { color: '#1A202C', fontSize: 18, fontWeight: '700' },
  scrollContent: { padding: 20, paddingBottom: 120 },
  labelTitle: { fontSize: 12, color: '#718096', fontWeight: '600', marginBottom: 6 },
  accountDropdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 20,
  },
  accountDropdownTitle: { fontSize: 14, color: '#1A202C', fontWeight: '700' },
  accountDropdownSub: { fontSize: 12, color: '#718096', marginTop: 2 },
  sectionTitle: { fontSize: 13, fontWeight: '700', color: '#1A202C', marginBottom: 10 },
  transactionTypesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  transTypeCard: {
    width: '31%',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    height: 85,
    justifyContent: 'center',
  },
  transTypeCardActive: {
    borderColor: '#5C3BFF',
    backgroundColor: '#EEECFF',
  },
  transTypeText: { fontSize: 11, color: '#718096', textAlign: 'center', marginTop: 4, fontWeight: '500' },
  transTypeTextActive: { color: '#5C3BFF', fontWeight: '700' },
  beneficiaryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  findBeneficiaryText: { fontSize: 12, color: '#5C3BFF', fontWeight: '600' },
  beneficiaryScroll: { marginBottom: 20 },
  beneficiaryCard: {
    alignItems: 'center',
    marginRight: 12,
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 14,
    width: 80,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    justifyContent: 'center',
  },
  beneficiaryCardActive: {
    borderColor: '#5C3BFF',
    backgroundColor: '#EEECFF',
  },
  addBeneficiaryIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#EEECFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  beneficiaryAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  beneficiaryName: { fontSize: 11, color: '#2D3748', fontWeight: '600', textAlign: 'center' },
  formCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 2,
  },
  inputLabel: { fontSize: 12, color: '#718096', fontWeight: '600', marginBottom: 6 },
  inputContainer: {
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 14,
    paddingHorizontal: 14,
    height: 48,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 12,
    backgroundColor: '#FFFFFF',
  },
  input: { flex: 1, fontSize: 14, color: '#2D3748' },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    marginBottom: 16,
  },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#CBD5E0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  checkboxChecked: {
    backgroundColor: '#5C3BFF',
    borderColor: '#5C3BFF',
  },
  checkboxText: { fontSize: 12, color: '#4A5568', fontWeight: '500' },
  submitButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#5C3BFF',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#5C3BFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 2,
  },
  submitButtonText: { fontSize: 15, fontWeight: '700', color: '#FFFFFF' },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 24,
    maxHeight: '50%',
  },
  bankModalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 24,
    height: '65%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: { fontSize: 16, fontWeight: '700', color: '#1A202C' },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 46,
    backgroundColor: '#F8FAFC',
    marginBottom: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#2D3748',
  },
  bankItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  bankItemText: {
    fontSize: 14,
    color: '#2D3748',
    fontWeight: '500',
  },
  accountItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  accountItemTitle: { fontSize: 15, fontWeight: '700', color: '#1A202C' },
  accountItemSub: { fontSize: 12, color: '#718096', marginTop: 2 },
  accountItemRight: { alignItems: 'flex-end' },
  accountItemBalance: { fontSize: 14, fontWeight: '700', color: '#5C3BFF' },
});