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
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

interface ExchangeScreenProps {
  onBack?: () => void;
}

export default function ExchangeScreen({ onBack }: ExchangeScreenProps) {
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');

  // Валюта бағамын есептейтін функция
  const handleExchange = () => {
    Keyboard.dismiss(); // Пернетақтаны жабу
    if (!fromAmount) return;

    const num = parseFloat(fromAmount);
    if (isNaN(num)) return;

    // Шартты түрдегі курс коэффициенті
    let rate = 0.92; // Мысалы, USD -> EUR
    if (fromCurrency === toCurrency) {
      rate = 1;
    } else if (fromCurrency === 'EUR' && toCurrency === 'USD') {
      rate = 1.09;
    }

    const result = (num * rate).toFixed(2);
    setToAmount(result);
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
        {/* Жоғарғы иллюстрация бөлігі */}
        <View style={styles.illustrationContainer}>
          <View style={styles.phoneMockup}>
            <MaterialCommunityIcons name="cellphone" size={95} color="#5C3BFF" />
            <View style={styles.coinBadge}>
              <MaterialCommunityIcons name="currency-usd" size={28} color="#FFB703" />
            </View>
          </View>
        </View>

        {/* Негізгі ақ карточка контейнері */}
        <View style={styles.card}>
          {/* Қайдан (From) */}
          <Text style={styles.label}>Қайдан</Text>
          <View style={styles.inputRow}>
            <TextInput
              style={styles.input}
              placeholder="Сомасы"
              placeholderTextColor="#A0AEC0"
              keyboardType="numeric"
              value={fromAmount}
              onChangeText={setFromAmount}
            />
            <TouchableOpacity style={styles.currencySelector}>
              <Text style={styles.currencyText}>{fromCurrency}</Text>
              <Ionicons name="swap-vertical" size={16} color="#718096" />
            </TouchableOpacity>
          </View>

          {/* Ортадағы алмастыру түймесі (Swap) */}
          <View style={styles.swapContainer}>
            <TouchableOpacity 
              style={styles.swapButton} 
              activeOpacity={0.7}
              onPress={() => {
                // Валюталардың орнын өзара ауыстыру
                const temp = fromCurrency;
                setFromCurrency(toCurrency);
                setToCurrency(temp);
                setFromAmount(toAmount);
                setToAmount(fromAmount);
              }}
            >
              <Ionicons name="arrow-down" size={16} color="#5C3BFF" />
              <Ionicons name="arrow-up" size={16} color="#FF4D6D" />
            </TouchableOpacity>
          </View>

          {/* Қайда (To) */}
          <Text style={styles.label}>Қайда</Text>
          <View style={styles.inputRow}>
            <TextInput
              style={styles.input}
              placeholder="Сомасы"
              placeholderTextColor="#A0AEC0"
              keyboardType="numeric"
              value={toAmount}
              onChangeText={setToAmount}
            />
            <TouchableOpacity style={styles.currencySelector}>
              <Text style={styles.currencyText}>{toCurrency}</Text>
              <Ionicons name="swap-vertical" size={16} color="#718096" />
            </TouchableOpacity>
          </View>

          {/* Айырбастау батырмасы */}
          <TouchableOpacity 
            style={styles.exchangeButton} 
            activeOpacity={0.8}
            onPress={handleExchange}
          >
            <Text style={styles.exchangeButtonText}>Айырбастау</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
});