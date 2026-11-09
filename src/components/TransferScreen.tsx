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
}

const userAccounts = [
  { id: '1', name: 'Amazon Platinum', number: '4758 •••• •••• 9018', balance: '$3,469.52' },
  { id: '2', name: 'Kaspi Gold', number: '4400 •••• •••• 5521', balance: '125,400 ₸' },
  { id: '3', name: 'Digital USD Card', number: '5168 •••• •••• 1092', balance: '$500.00' },
];

export default function TransferScreen({ onBack }: TransferScreenProps) {
  const [selectedMethod, setSelectedMethod] = useState<number>(0);
  
  // Бастапқы алушылар тізімі
  const [beneficiaries, setBeneficiaries] = useState([
    { id: '1', name: 'Abdrakhman Zupar', shortName: 'Abdrakhman', card: '4400430389983550' },
    { id: '2', name: 'Nursulu Makhasheva', shortName: 'Nursulu', card: '4400123456789012' },
  ]);

  const [selectedBeneficiaryId, setSelectedBeneficiaryId] = useState<string>('1');
  
  const [selectedAccount, setSelectedAccount] = useState(userAccounts[0]);
  const [accountModalVisible, setAccountModalVisible] = useState(false);

  // Жаңа алушы қосуға арналған Modal күйлері
  const [newBeneficiaryModalVisible, setNewBeneficiaryModalVisible] = useState(false);
  const [newFullName, setNewFullName] = useState('');
  const [newCardNumber, setNewCardNumber] = useState('');

  const [name, setName] = useState('Abdrakhman Zupar');
  const [cardNumber, setCardNumber] = useState('4400430389983550');
  const [amount, setAmount] = useState('');
  const [content, setContent] = useState('');
  const [saveBeneficiary, setSaveBeneficiary] = useState(false);

  const handleTransfer = () => {
    Keyboard.dismiss();

    if (!cardNumber || !amount) {
      Alert.alert('Қате', 'Карта нөмірі мен сомасын толтырыңыз!');
      return;
    }

    Alert.alert(
      'Сәтті аяқталды!',
      `${amount} сомасы ${name} атты азаматқа (${selectedAccount.name}) шотынан сәтті аударылды.`,
      [{ text: 'Жарайды', onPress: onBack }]
    );
  };

  // Жаңа алушыны тізімге қосу функциясы
  const handleAddNewBeneficiary = () => {
    if (!newFullName || !newCardNumber) {
      Alert.alert('Қате', 'Аты-жөні мен карта нөмірін толтырыңыз!');
      return;
    }

    const short = newFullName.split(' ')[0]; // Есімнің бірінші сөзін қысқа ат ретінде аламыз
    const newObj = {
      id: Date.now().toString(),
      name: newFullName,
      shortName: short,
      card: newCardNumber,
    };

    setBeneficiaries([...beneficiaries, newObj]);
    setSelectedBeneficiaryId(newObj.id);
    setName(newObj.name);
    setCardNumber(newObj.card);

    setNewFullName('');
    setNewCardNumber('');
    setNewBeneficiaryModalVisible(false);
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
          <Text style={styles.headerTitle}>Ақша аудару</Text>
        </View>
      </SafeAreaView>

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Шотты/картаны таңдау өрісі */}
        <Text style={styles.labelTitle}>Қай шоттан жіберу керек?</Text>
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
            <MaterialCommunityIcons name="credit-card-outline" size={26} color={selectedMethod === 0 ? '#5C3BFF' : '#718096'} />
            <Text style={[styles.transTypeText, selectedMethod === 0 && styles.transTypeTextActive]}>Карта нөмірі арқылы</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.transTypeCard, selectedMethod === 1 && styles.transTypeCardActive]}
            onPress={() => setSelectedMethod(1)}
          >
            <Ionicons name="person-outline" size={26} color={selectedMethod === 1 ? '#5C3BFF' : '#718096'} />
            <Text style={[styles.transTypeText, selectedMethod === 1 && styles.transTypeTextActive]}>Өз банкі ішінде</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.transTypeCard, selectedMethod === 2 && styles.transTypeCardActive]}
            onPress={() => setSelectedMethod(2)}
          >
            <Ionicons name="business-outline" size={26} color={selectedMethod === 2 ? '#5C3BFF' : '#718096'} />
            <Text style={[styles.transTypeText, selectedMethod === 2 && styles.transTypeTextActive]}>Басқа банкке</Text>
          </TouchableOpacity>
        </View>

        {/* Алушыны таңдау */}
        <View style={styles.beneficiaryHeader}>
          <Text style={styles.sectionTitle}>Алушыны таңдау</Text>
          <TouchableOpacity>
            <Text style={styles.findBeneficiaryText}>Алушыны іздеу</Text>
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.beneficiaryScroll}>
          {/* Жаңа алушы қосу түймесі (+) */}
          <TouchableOpacity 
            style={styles.beneficiaryCard}
            onPress={() => setNewBeneficiaryModalVisible(true)}
          >
            <View style={styles.addBeneficiaryIcon}>
              <Ionicons name="add" size={24} color="#5C3BFF" />
            </View>
            <Text style={styles.beneficiaryName}>Жаңа</Text>
          </TouchableOpacity>

          {/* Тізімдегі алушылар */}
          {beneficiaries.map((item) => (
            <TouchableOpacity 
              key={item.id}
              style={[styles.beneficiaryCard, selectedBeneficiaryId === item.id && styles.beneficiaryCardActive]}
              onPress={() => {
                setSelectedBeneficiaryId(item.id);
                setName(item.name);
                setCardNumber(item.card);
              }}
            >
              <View style={styles.beneficiaryAvatar}>
                <Ionicons name="person" size={22} color="#5C3BFF" />
              </View>
              <Text style={styles.beneficiaryName} numberOfLines={1}>{item.shortName}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Форма карточкасы */}
        <View style={styles.formCard}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Аты-жөні"
              placeholderTextColor="#A0AEC0"
              value={name}
              onChangeText={setName}
            />
          </View>

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

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Сомасы"
              placeholderTextColor="#A0AEC0"
              keyboardType="numeric"
              value={amount}
              onChangeText={setAmount}
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Түсіндірме / Мақсаты"
              placeholderTextColor="#A0AEC0"
              value={content}
              onChangeText={setContent}
            />
          </View>

          {/* Сақтау құсбелгісі */}
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

          {/* Жіберу батырмасы */}
          <TouchableOpacity 
            style={styles.submitButton} 
            activeOpacity={0.8}
            onPress={handleTransfer}
          >
            <Text style={styles.submitButtonText}>Аудару</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Шотты таңдауға арналған модальды терезе */}
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

      {/* Жаңа алушы қосуға арналған модальды терезе */}
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
                placeholder="Аты-жөні (Мысалы: Айбек Серік)"
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
  scrollContent: { padding: 20, paddingBottom: 60 },
  labelTitle: { fontSize: 13, color: '#718096', fontWeight: '600', marginBottom: 6 },
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
  sectionTitle: { fontSize: 14, fontWeight: '700', color: '#1A202C', marginBottom: 12 },
  transactionTypesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  transTypeCard: {
    width: '31%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    height: 95,
    justifyContent: 'center',
  },
  transTypeCardActive: {
    borderColor: '#5C3BFF',
    backgroundColor: '#EEECFF',
  },
  transTypeText: { fontSize: 11, color: '#718096', textAlign: 'center', marginTop: 6, fontWeight: '500' },
  transTypeTextActive: { color: '#5C3BFF', fontWeight: '700' },
  beneficiaryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  findBeneficiaryText: { fontSize: 13, color: '#5C3BFF', fontWeight: '600' },
  beneficiaryScroll: { marginBottom: 24 },
  beneficiaryCard: {
    alignItems: 'center',
    marginRight: 12,
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 16,
    width: 90,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    justifyContent: 'center',
  },
  beneficiaryCardActive: {
    borderColor: '#5C3BFF',
    backgroundColor: '#EEECFF',
  },
  addBeneficiaryIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EEECFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  beneficiaryAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  beneficiaryName: { fontSize: 11, color: '#2D3748', fontWeight: '600', textAlign: 'center' },
  formCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 14,
    paddingHorizontal: 14,
    height: 50,
    justifyContent: 'center',
    marginBottom: 14,
    backgroundColor: '#FFFFFF',
  },
  input: { fontSize: 14, color: '#2D3748' },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    marginBottom: 20,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#CBD5E0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  checkboxChecked: {
    backgroundColor: '#5C3BFF',
    borderColor: '#5C3BFF',
  },
  checkboxText: { fontSize: 13, color: '#4A5568', fontWeight: '500' },
  submitButton: {
    width: '100%',
    height: 52,
    backgroundColor: '#5C3BFF',
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#5C3BFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
  },
  submitButtonText: { fontSize: 16, fontWeight: '700', color: '#FFFFFF' },
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
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: { fontSize: 16, fontWeight: '700', color: '#1A202C' },
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