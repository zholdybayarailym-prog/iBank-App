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
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

interface ExchangeScreenProps {
  onBack?: () => void;
}

// Барлық валюта түрлері мен олардың бағамдары
const currencies = [
  { code: 'USD', name: 'АҚШ доллары', symbol: '$', rate: 1.0 },
  { code: 'KZT', name: 'Қазақ теңгесі', symbol: '₸', rate: 485.0 },
  { code: 'EUR', name: 'Еуро', symbol: '€', rate: 0.92 },
  { code: 'RUB', name: 'Ресей рублі', symbol: '₽', rate: 95.0 },
  { code: 'GBP', name: 'Британ фунты', symbol: '£', rate: 0.79 },
  { code: 'CNY', name: 'Қытай юаньі', symbol: '¥', rate: 7.2 },
];

export default function ExchangeScreen({ onBack }: ExchangeScreenProps) {
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState(currencies[0]); // USD
  const [toCurrency, setToCurrency] = useState(currencies[1]);     // KZT

  const [modalVisible, setModalVisible] = useState(false);
  const [activeSelection, setActiveSelection] = useState<'from' | 'to'>('from');

  const calculateExchange = (amount: string, from: typeof currencies[0], to: typeof currencies[0]) => {
    if (!amount) {
      setToAmount('');
      return;
    }
    const num = parseFloat(amount);
    if (isNaN(num)) {
      setToAmount('');
      return;
    }

    const amountInUSD = num / from.rate;
    const result = (amountInUSD * to.rate).toFixed(2);
    setToAmount(result);
  };

  const handleTextChange = (text: string) => {
    setFromAmount(text);
    calculateExchange(text, fromCurrency, toCurrency);
  };

  const handleSelectCurrency = (currency: typeof currencies[0]) => {
    if (activeSelection === 'from') {
      setFromCurrency(currency);
      calculateExchange(fromAmount, currency, toCurrency);
    } else {
      setToCurrency(currency);
      calculateExchange(fromAmount, fromCurrency, currency);
    }
    setModalVisible(false);
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
          <Text style={styles.headerTitle}>Айырбастау</Text>
        </View>
      </SafeAreaView>

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.illustrationContainer}>
          <View style={styles.phoneMockup}>
            <MaterialCommunityIcons name="cellphone" size={95} color="#5C3BFF" />
            <View style={styles.coinBadge}>
              <MaterialCommunityIcons name="currency-usd" size={28} color="#FFB703" />
            </View>
          </View>
        </View>

        <View style={styles.card}>
          {/* Қайдан */}
          <Text style={styles.label}>Қайдан</Text>
          <View style={styles.inputRow}>
            <TextInput
              style={styles.input}
              placeholder="Сомасы"
              placeholderTextColor="#A0AEC0"
              keyboardType="numeric"
              value={fromAmount}
              onChangeText={handleTextChange}
            />
            <TouchableOpacity 
              style={styles.currencySelector}
              onPress={() => {
                setActiveSelection('from');
                setModalVisible(true);
              }}
            >
              <Text style={styles.currencyText}>{fromCurrency.code}</Text>
              <Ionicons name="chevron-down" size={16} color="#718096" />
            </TouchableOpacity>
          </View>

          {/* Алмастыру батырмасы */}
          <View style={styles.swapContainer}>
            <TouchableOpacity 
              style={styles.swapButton} 
              activeOpacity={0.7}
              onPress={() => {
                const tempCurr = fromCurrency;
                setFromCurrency(toCurrency);
                setToCurrency(tempCurr);
                setFromAmount(toAmount);
                calculateExchange(toAmount, toCurrency, tempCurr);
              }}
            >
              <Ionicons name="arrow-down" size={16} color="#5C3BFF" />
              <Ionicons name="arrow-up" size={16} color="#FF4D6D" />
            </TouchableOpacity>
          </View>

          {/* Қайда */}
          <Text style={styles.label}>Қайда</Text>
          <View style={styles.inputRow}>
            <TextInput
              style={styles.input}
              placeholder="Нәтиже"
              placeholderTextColor="#A0AEC0"
              editable={false}
              value={toAmount}
            />
            <TouchableOpacity 
              style={styles.currencySelector}
              onPress={() => {
                setActiveSelection('to');
                setModalVisible(true);
              }}
            >
              <Text style={styles.currencyText}>{toCurrency.code}</Text>
              <Ionicons name="chevron-down" size={16} color="#718096" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity 
            style={styles.exchangeButton} 
            activeOpacity={0.8}
            onPress={() => {
              Keyboard.dismiss();
              calculateExchange(fromAmount, fromCurrency, toCurrency);
            }}
          >
            <Text style={styles.exchangeButtonText}>Есептеу</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Валюта таңдау терезесі (Modal) */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Валютаны таңдаңыз</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons name="close" size={24} color="#1A202C" />
              </TouchableOpacity>
            </View>

            <FlatList
              data={currencies}
              keyExtractor={(item) => item.code}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.currencyItem}
                  onPress={() => handleSelectCurrency(item)}
                >
                  <View style={styles.currencyItemLeft}>
                    <Text style={styles.currencySymbol}>{item.symbol}</Text>
                    <View>
                      <Text style={styles.currencyCodeText}>{item.code}</Text>
                      <Text style={styles.currencyNameText}>{item.name}</Text>
                    </View>
                  </View>
                  {((activeSelection === 'from' && fromCurrency.code === item.code) ||
                    (activeSelection === 'to' && toCurrency.code === item.code)) && (
                    <Ionicons name="checkmark" size={20} color="#5C3BFF" />
                  )}
                </TouchableOpacity>
              )}
            />
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
  scrollContent: { padding: 20, alignItems: 'center', paddingBottom: 40 },
  illustrationContainer: { 
    height: 170, 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginBottom: 10 
  },
  phoneMockup: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  coinBadge: {
    position: 'absolute',
    top: 15,
    right: -30,
    backgroundColor: '#FFF6E8',
    borderRadius: 16,
    padding: 6,
  },
  card: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 3,
  },
  label: {
    fontSize: 13,
    color: '#718096',
    fontWeight: '600',
    marginBottom: 6,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 14,
    paddingHorizontal: 14,
    height: 52,
    backgroundColor: '#FFFFFF',
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: '#2D3748',
  },
  currencySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 12,
    borderLeftWidth: 1,
    borderLeftColor: '#E2E8F0',
  },
  currencyText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#2D3748',
    marginRight: 6,
  },
  swapContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  swapButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#EEECFF',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  exchangeButton: {
    width: '100%',
    height: 52,
    backgroundColor: '#5C3BFF',
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
    shadowColor: '#5C3BFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
  },
  exchangeButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
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
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A202C',
  },
  currencyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  currencyItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  currencySymbol: {
    fontSize: 18,
    fontWeight: '700',
    color: '#5C3BFF',
    width: 36,
  },
  currencyCodeText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1A202C',
  },
  currencyNameText: {
    fontSize: 12,
    color: '#718096',
  },
});