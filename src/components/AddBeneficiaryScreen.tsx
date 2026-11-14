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
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

interface AddBeneficiaryScreenProps {
  onBack?: () => void;
  onSave?: (name: string, cardNumber: string) => void;
}

export default function AddBeneficiaryScreen({
  onBack,
  onSave,
}: AddBeneficiaryScreenProps) {
  const [selectedType, setSelectedType] = useState<'card' | 'sameBank' | 'anotherBank'>('anotherBank');
  const [bankName, setBankName] = useState('Citibank');
  const [branchName, setBranchName] = useState('New York');
  const [transactionName, setTransactionName] = useState('Арайлым Жолдыбай');
  const [cardNumber, setCardNumber] = useState('1235 6478 990');

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Жоғарғы панель */}
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.headerContent}>
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <Ionicons name="chevron-back" size={24} color="#1A202C" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Жаңа қосу</Text>
        </View>
      </SafeAreaView>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Профиль бөлігі */}
        <View style={styles.profileContainer}>
          <View style={styles.avatarPlaceholder}>
            <Ionicons name="person" size={36} color="#5C3BFF" />
          </View>
          <Text style={styles.profileName}>{transactionName || 'Алушы аты'}</Text>
        </View>

        {/* Аударым түрін таңдау санаттары */}
        <View style={styles.tabsContainer}>
          <TouchableOpacity 
            style={[styles.tabItem, selectedType === 'card' && styles.tabItemActive]}
            onPress={() => setSelectedType('card')}
          >
            <Ionicons name="card-outline" size={20} color={selectedType === 'card' ? '#FFFFFF' : '#718096'} />
            <Text style={[styles.tabText, selectedType === 'card' && styles.tabTextActive]}>
              Карта
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.tabItem, selectedType === 'sameBank' && styles.tabItemActive]}
            onPress={() => setSelectedType('sameBank')}
          >
            <Ionicons name="business-outline" size={20} color={selectedType === 'sameBank' ? '#FFFFFF' : '#718096'} />
            <Text style={[styles.tabText, selectedType === 'sameBank' && styles.tabTextActive]}>
              Сол банк
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.tabItemOrange, selectedType === 'anotherBank' && styles.tabItemOrangeActive]}
            onPress={() => setSelectedType('anotherBank')}
          >
            <MaterialCommunityIcons name="bank-outline" size={20} color="#FFFFFF" />
            <Text style={styles.tabTextOrange}>
              Басқа банк
            </Text>
          </TouchableOpacity>
        </View>

        {/* Форма өрістері */}
        <View style={styles.cardBox}>
          <View style={styles.inputGroup}>
            <TextInput
              style={styles.textInput}
              value={bankName}
              onChangeText={setBankName}
              placeholder="Банкті таңдаңыз"
              placeholderTextColor="#A0AEC0"
            />
          </View>

          <View style={styles.inputGroup}>
            <TextInput
              style={styles.textInput}
              value={branchName}
              onChangeText={setBranchName}
              placeholder="Бөлімшені таңдаңыз"
              placeholderTextColor="#A0AEC0"
            />
          </View>

          <View style={styles.inputGroup}>
            <TextInput
              style={styles.textInput}
              value={transactionName}
              onChangeText={setTransactionName}
              placeholder="Алушының аты-жөні"
              placeholderTextColor="#A0AEC0"
            />
          </View>

          <View style={styles.inputGroupLast}>
            <TextInput
              style={styles.textInput}
              value={cardNumber}
              onChangeText={setCardNumber}
              placeholder="Карта нөмірі"
              placeholderTextColor="#A0AEC0"
              keyboardType="numeric"
            />
          </View>
        </View>

        {/* Сақтау батырмасы */}
        <TouchableOpacity 
          style={styles.saveButton} 
          activeOpacity={0.8}
          onPress={() => onSave && onSave(transactionName, cardNumber)}
        >
          <Text style={styles.saveButtonText}>Анықтамалыққа сақтау</Text>
        </TouchableOpacity>

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
  headerTitle: { color: '#1A202C', fontSize: 18, fontWeight: '700' },
  scrollContent: { paddingHorizontal: 20, paddingTop: 15, paddingBottom: 40 },
  profileContainer: { alignItems: 'center', marginBottom: 20 },
  avatarPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#EEECFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  profileName: { fontSize: 16, fontWeight: '700', color: '#5C3BFF' },
  tabsContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  tabItem: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: 'center',
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  tabItemActive: { backgroundColor: '#5C3BFF', borderColor: '#5C3BFF' },
  tabItemOrange: {
    flex: 1.2,
    backgroundColor: '#F6AD55',
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  tabItemOrangeActive: { backgroundColor: '#DD6B20' },
  tabText: { fontSize: 12, color: '#718096', fontWeight: '600', marginTop: 4 },
  tabTextActive: { color: '#FFFFFF' },
  tabTextOrange: { fontSize: 12, color: '#FFFFFF', fontWeight: '600', marginLeft: 4 },
  cardBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 2,
  },
  inputGroup: { marginBottom: 14 },
  inputGroupLast: { marginBottom: 0 },
  textInput: {
    height: 50,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    paddingHorizontal: 14,
    fontSize: 14,
    color: '#1A202C',
    backgroundColor: '#FFFFFF',
  },
  saveButton: {
    height: 52,
    backgroundColor: '#5C3BFF',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#5C3BFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  saveButtonText: { fontSize: 16, fontWeight: '600', color: '#FFFFFF' },
});