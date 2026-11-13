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
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface MessageDetailScreenProps {
  onBack?: () => void;
  bankName?: string;
}

export default function MessageDetailScreen({
  onBack,
  bankName = 'Bank of America',
}: MessageDetailScreenProps) {
  const [inputText, setInputText] = useState('');

  // Әр банкке немесе категорияға сәйкес бөлек хабарламалар тізімі
  const getMessagesForBank = (name?: string) => {
    switch (name) {
      case 'Bank of America':
        return [
          { id: '1', sender: 'bank', date: 'Бүгін', text: 'Құрметті клиент, шотыңыздан $1,200 шешілді. Растау үшін ИӘ немесе ЖОҚ деп жауап беріңіз.' },
          { id: '2', sender: 'user', date: '', text: 'Иә' },
          { id: '3', sender: 'bank', date: 'Бүгін', text: 'Банк растау коды: 256438. 10 минут ішінде жарамды.' },
        ];
      case 'Қауіпсіздік':
      case 'Account':
        return [
          { id: '1', sender: 'bank', date: '12/10', text: 'Назар аударыңыз! Шотыңызға кіру шектелді. Деректерді тексеру қажет.' },
          { id: '2', sender: 'user', date: '', text: 'Қалай түзетемін?' },
          { id: '3', sender: 'bank', date: '12/10', text: 'Қосымша арқылы жеке басты растаудан өтіңіз.' },
        ];
      case 'Хабарлама':
      case 'Alert':
        return [
          { id: '1', sender: 'bank', date: '11/10', text: 'Сіздің айлық есеп-шот үзінді көшірмеңіз дайын болды.' },
        ];
      case 'Paypal':
        return [
          { id: '1', sender: 'bank', date: '10/11', text: 'PayPal шотыңызда күдікті әрекет байқалды. Шот уақытша бұғатталды.' },
          { id: '2', sender: 'user', date: '', text: 'Мен ештеңе істеген жоқпын!' },
          { id: '3', sender: 'bank', date: '10/11', text: 'Бұғатты шешу үшін қолдау қызметіне хабарласыңыз.' },
        ];
      case 'Ақша алу':
      case 'Withdraw':
        return [
          { id: '1', sender: 'bank', date: '10/12', text: 'Банкоматтан ақша шешуге арналған құпия код: 2987456. Ешкімге бермеңіз.' },
        ];
      default:
        return [
          { id: '1', sender: 'bank', date: 'Бүгін', text: `Сәлем! ${name || 'Банк'} қызметіне қош келдіңіз. Сізге қалай көмектесе аламыз?` },
        ];
    }
  };

  const [messages, setMessages] = useState(getMessagesForBank(bankName));

  const handleSendMessage = () => {
    if (inputText.trim() === '') return;
    setMessages([
      ...messages,
      {
        id: Date.now().toString(),
        sender: 'user',
        date: '',
        text: inputText,
      },
    ]);
    setInputText('');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <StatusBar barStyle="dark-content" />

      {/* Жоғарғы панель */}
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.headerContent}>
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <Ionicons name="chevron-back" size={24} color="#1A202C" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{bankName}</Text>
        </View>
      </SafeAreaView>

      {/* Чат хабарламалары */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {messages.map((item) => (
          <View key={item.id}>
            {item.date !== '' && (
              <Text style={styles.dateText}>{item.date}</Text>
            )}
            <View
              style={[
                styles.messageBubble,
                item.sender === 'user' ? styles.userBubble : styles.bankBubble,
              ]}
            >
              <Text
                style={[
                  styles.messageText,
                  item.sender === 'user' ? styles.userText : styles.bankText,
                ]}
              >
                {item.text}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Төменгі хат жазу өрісі */}
      <View style={styles.inputArea}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Хабарлама жазу..."
            placeholderTextColor="#A0AEC0"
            value={inputText}
            onChangeText={setInputText}
          />
          <TouchableOpacity
            style={styles.sendButton}
            onPress={handleSendMessage}
            activeOpacity={0.8}
          >
            <Ionicons name="add" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
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
  scrollContent: { padding: 20, paddingBottom: 30 },
  dateText: {
    textAlign: 'center',
    fontSize: 12,
    color: '#94A3B8',
    marginVertical: 12,
    fontWeight: '500',
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 16,
    borderRadius: 20,
    marginBottom: 10,
  },
  bankBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#F1F5F9',
    borderBottomLeftRadius: 4,
  },
  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: '#5C3BFF',
    borderBottomRightRadius: 4,
  },
  messageText: {
    fontSize: 14,
    lineHeight: 20,
  },
  bankText: {
    color: '#1E293B',
  },
  userText: {
    color: '#FFFFFF',
  },
  inputArea: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 30,
    paddingHorizontal: 16,
    height: 50,
    backgroundColor: '#FAFAFA',
  },
  textInput: {
    flex: 1,
    fontSize: 14,
    color: '#1A202C',
  },
  sendButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#5C3BFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
});