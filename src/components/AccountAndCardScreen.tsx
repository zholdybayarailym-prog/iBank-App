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

interface AccountAndCardScreenProps {
  onBack?: () => void;
  userName?: string;
  onNavigateToCardDetail?: () => void;
}

interface CardItem {
  id: string;
  holderName: string;
  cardNumber: string;
  balance: string;
  type: string;
  cardStyle: 'blue' | 'yellow' | 'purple';
}

export default function AccountAndCardScreen({
  onBack,
  userName = 'Зұпар Абдрахман',
  onNavigateToCardDetail,
}: AccountAndCardScreenProps) {
  const [activeTab, setActiveTab] = useState<'account' | 'card'>('card');
  const [modalVisible, setModalVisible] = useState(false);

  // Карталар тізімін state арқылы сақтаймыз
  const [cards, setCards] = useState<CardItem[]>([
    {
      id: '1',
      holderName: userName,
      cardNumber: '4756  ••••  ••••  9018',
      balance: '$3,469.52',
      type: 'Amazon Platinum',
      cardStyle: 'blue',
    },
    {
      id: '2',
      holderName: userName,
      cardNumber: '4756  ••••  ••••  9018',
      balance: '$3,469.52',
      type: 'Amazon Platinum',
      cardStyle: 'yellow',
    },
  ]);

  // Жаңа карта формасының өрістері
  const [cardNumberInput, setCardNumberInput] = useState('');
  const [expiryInput, setExpiryInput] = useState('');
  const [cvvInput, setCvvInput] = useState('');

  const handleAddNewCard = () => {
    if (!cardNumberInput || !expiryInput || !cvvInput) {
      Alert.alert('Қате', 'Барлық өрістерді толтырыңыз!');
      return;
    }

    // Соңғы 4 цифрын немесе форматын әдемілеу
    const formattedNumber = `••••  ••••  ••••  ${cardNumberInput.slice(-4) || '9999'}`;

    const newCard: CardItem = {
      id: Date.now().toString(),
      holderName: userName,
      cardNumber: formattedNumber,
      balance: '$1,000.00', // Жаңа картаға бастапқы баланс
      type: 'Standard Card',
      cardStyle: 'purple',
    };

    // Карталар тізіміне жаңа картаны қосу
    setCards([...cards, newCard]);
    setModalVisible(false);

    // Өрістерді тазарту
    setCardNumberInput('');
    setExpiryInput('');
    setCvvInput('');

    Alert.alert('Сәтті', 'Жаңа карта тізімге қосылды!');
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
          <Text style={styles.headerTitle}>Шот пен карта</Text>
        </View>
      </SafeAreaView>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Ауыстырып-қосқыш түймелер */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tabButton, activeTab === 'account' && styles.activeTabButton]}
            onPress={() => setActiveTab('account')}
          >
            <Text style={[styles.tabText, activeTab === 'account' && styles.activeTabText]}>
              Шот
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tabButton, activeTab === 'card' && styles.activeTabButton]}
            onPress={() => setActiveTab('card')}
          >
            <Text style={[styles.tabText, activeTab === 'card' && styles.activeTabText]}>
              Карта
            </Text>
          </TouchableOpacity>
        </View>

        {activeTab === 'account' ? (
          <View>
            <View style={styles.accountCard}>
              <View style={styles.accountTopRow}>
                <Text style={styles.accountTitle}>№1 Шот</Text>
                <Text style={styles.accountNumber}>1900 8988 1234</Text>
              </View>
              <View style={styles.accountDetailRow}>
                <Text style={styles.label}>Қолжетімді баланс</Text>
                <Text style={styles.valueBlue}>$20,000</Text>
              </View>
              <View style={styles.accountDetailRowLast}>
                <Text style={styles.label}>Бөлімше</Text>
                <Text style={styles.valueText}>Алматы</Text>
              </View>
            </View>
          </View>
        ) : (
          <View>
            {/* Барлық карталарды цикл арқылы шығару (динамикалық) */}
            {cards.map((card) => {
              let cardStyle = styles.cardDesignBlue;
              if (card.cardStyle === 'yellow') cardStyle = styles.cardDesignYellow;
              if (card.cardStyle === 'purple') cardStyle = styles.cardDesignPurple;

              return (
                <TouchableOpacity 
                  key={card.id} 
                  activeOpacity={0.9} 
                  onPress={onNavigateToCardDetail}
                >
                  <View style={cardStyle}>
                    <View style={styles.cardTopRowCard}>
                      <Text style={styles.cardHolderName}>{card.holderName}</Text>
                    </View>
                    
                    <View>
                      <Text style={styles.cardType}>{card.type}</Text>
                      <Text style={styles.cardNumber}>{card.cardNumber}</Text>
                    </View>

                    <View style={styles.cardBottomRow}>
                      <Text style={styles.cardBalance}>{card.balance}</Text>
                      {card.cardStyle === 'yellow' ? (
                        <View style={styles.circlesContainer}>
                          <View style={styles.circleOrange} />
                          <View style={styles.circleWhite} />
                        </View>
                      ) : (
                        <View style={styles.visaContainer}>
                          <Text style={styles.visaText}>VISA</Text>
                        </View>
                      )}
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}

            {/* Карта қосу батырмасы */}
            <TouchableOpacity 
              style={styles.addCardButton} 
              activeOpacity={0.8}
              onPress={() => setModalVisible(true)}
            >
              <Text style={styles.addCardButtonText}>Карта қосу</Text>
            </TouchableOpacity>
          </View>
        )}

      </ScrollView>

      {/* Карта қосуға арналған қалқымалы терезе (Modal) */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Жаңа карта қосу</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons name="close" size={24} color="#1A202C" />
              </TouchableOpacity>
            </View>

            <Text style={styles.inputLabel}>Карта нөмірі</Text>
            <TextInput
              style={styles.input}
              placeholder="4756 •••• •••• ••••"
              placeholderTextColor="#A0AEC0"
              keyboardType="numeric"
              maxLength={19}
              value={cardNumberInput}
              onChangeText={setCardNumberInput}
            />

            <View style={styles.rowInputs}>
              <View style={{ flex: 1, marginRight: 10 }}>
                <Text style={styles.inputLabel}>Мерзімі</Text>
                <TextInput
                  style={styles.input}
                  placeholder="MM/YY"
                  placeholderTextColor="#A0AEC0"
                  maxLength={5}
                  value={expiryInput}
                  onChangeText={setExpiryInput}
                />
              </View>
              <View style={{ flex: 1, marginLeft: 10 }}>
                <Text style={styles.inputLabel}>CVV</Text>
                <TextInput
                  style={styles.input}
                  placeholder="123"
                  placeholderTextColor="#A0AEC0"
                  secureTextEntry
                  maxLength={3}
                  keyboardType="numeric"
                  value={cvvInput}
                  onChangeText={setCvvInput}
                />
              </View>
            </View>

            <TouchableOpacity 
              style={styles.saveButton} 
              activeOpacity={0.8}
              onPress={handleAddNewCard}
            >
              <Text style={styles.saveButtonText}>Қосу</Text>
            </TouchableOpacity>
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
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#F1F5F9',
    borderRadius: 16,
    padding: 4,
    marginBottom: 24,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 14,
  },
  activeTabButton: {
    backgroundColor: '#5C3BFF',
    shadowColor: '#5C3BFF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  tabText: { fontSize: 15, fontWeight: '600', color: '#64748B' },
  activeTabText: { color: '#FFFFFF' },
  accountCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  accountTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F8FAFC',
    paddingBottom: 10,
  },
  accountTitle: { fontSize: 16, fontWeight: '700', color: '#1A202C' },
  accountNumber: { fontSize: 14, fontWeight: '600', color: '#64748B' },
  accountDetailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  accountDetailRowLast: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: { fontSize: 14, color: '#64748B', fontWeight: '500' },
  valueBlue: { fontSize: 15, color: '#5C3BFF', fontWeight: '700' },
  valueText: { fontSize: 15, color: '#1A202C', fontWeight: '600' },
  cardDesignBlue: {
    width: '100%',
    height: 190,
    borderRadius: 20,
    backgroundColor: '#3B1E88',
    padding: 20,
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  cardDesignYellow: {
    width: '100%',
    height: 190,
    borderRadius: 20,
    backgroundColor: '#FFB703',
    padding: 20,
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  cardDesignPurple: {
    width: '100%',
    height: 190,
    borderRadius: 20,
    backgroundColor: '#4C26C9',
    padding: 20,
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  cardTopRowCard: { flexDirection: 'row', justifyContent: 'space-between' },
  cardHolderName: { color: '#FFFFFF', fontSize: 16, fontWeight: '600' },
  cardType: { color: '#A0AEC0', fontSize: 12, marginBottom: 4 },
  cardNumber: { color: '#FFFFFF', fontSize: 15, letterSpacing: 2 },
  cardBottomRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' },
  cardBalance: { color: '#FFFFFF', fontSize: 22, fontWeight: '700' },
  visaContainer: { justifyContent: 'center', alignItems: 'center' },
  visaText: { color: '#FFFFFF', fontSize: 22, fontWeight: '900', fontStyle: 'italic', letterSpacing: 3 },
  circlesContainer: { flexDirection: 'row', alignItems: 'center' },
  circleOrange: { width: 28, height: 28, borderRadius: 14, backgroundColor: '#FF7043', opacity: 0.8 },
  circleWhite: { width: 28, height: 28, borderRadius: 14, backgroundColor: '#FFFFFF', marginLeft: -12, opacity: 0.9 },
  addCardButton: {
    backgroundColor: '#5C3BFF',
    height: 52,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addCardButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingBottom: 40,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: { fontSize: 18, fontWeight: '700', color: '#1A202C' },
  inputLabel: { fontSize: 14, fontWeight: '600', color: '#4A5568', marginBottom: 8, marginTop: 12 },
  input: {
    backgroundColor: '#F7FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#1A202C',
  },
  rowInputs: { flexDirection: 'row' },
  saveButton: {
    backgroundColor: '#5C3BFF',
    height: 52,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },
  saveButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
});