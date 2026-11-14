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

interface BeneficiaryDetailScreenProps {
  beneficiaryName?: string;
  cardNumber?: string;
  onBack?: () => void;
  onConfirm?: () => void;
}

export default function BeneficiaryDetailScreen({
  beneficiaryName = 'Арайлым Жолдыбай',
  cardNumber = '1235 6478 990',
  onBack,
  onConfirm,
}: BeneficiaryDetailScreenProps) {
  const [bankName, setBankName] = useState('Citibank');
  const [branchName, setBranchName] = useState('New York');
  const [name, setName] = useState(beneficiaryName);
  const [card, setCard] = useState(cardNumber);

  // Аты-жөнінен инициалдарды алу (мысалы, АЖ)
  const getInitials = (fullName: string) => {
    const parts = fullName.trim().split(' ');
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return fullName.substring(0, 2).toUpperCase();
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Жоғарғы күлгін аймақ */}
      <View style={styles.topHeader}>
        <SafeAreaView>
          <View style={styles.headerContent}>
            <TouchableOpacity style={styles.backButton} onPress={onBack}>
              <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Алушы</Text>
            <View style={{ width: 24 }} />
          </View>
        </SafeAreaView>

        {/* Аватар / Инициал орналасқан дөңгелек */}
        <View style={styles.profileContainer}>
          <View style={styles.avatarPlaceholder}>
            <Text style={styles.avatarText}>{getInitials(name)}</Text>
          </View>
          <Text style={styles.profileName}>{name}</Text>
        </View>
      </View>

      {/* Ақ түсті негізгі контейнер */}
      <View style={styles.mainContainer}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          
          {/* Форма өрістері */}
          <View style={styles.cardBox}>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Банк</Text>
              <TextInput
                style={styles.textInput}
                value={bankName}
                onChangeText={setBankName}
                placeholder="Банкті таңдаңыз"
                placeholderTextColor="#A0AEC0"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Бөлімше</Text>
              <TextInput
                style={styles.textInput}
                value={branchName}
                onChangeText={setBranchName}
                placeholder="Бөлімшені таңдаңыз"
                placeholderTextColor="#A0AEC0"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Алушының аты</Text>
              <TextInput
                style={styles.textInput}
                value={name}
                onChangeText={setName}
                placeholder="Аты-жөні"
                placeholderTextColor="#A0AEC0"
              />
            </View>

            <View style={styles.inputGroupLast}>
              <Text style={styles.inputLabel}>Карта нөмірі</Text>
              <TextInput
                style={styles.textInput}
                value={card}
                onChangeText={setCard}
                placeholder="Карта нөмірі"
                placeholderTextColor="#A0AEC0"
                keyboardType="numeric"
              />
            </View>

          </View>

          {/* Растау батырмасы */}
          <TouchableOpacity 
            style={styles.confirmButton} 
            activeOpacity={0.8}
            onPress={onConfirm}
          >
            <Text style={styles.confirmButtonText}>Растау</Text>
          </TouchableOpacity>

        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#4C26C9' },
  topHeader: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  backButton: { padding: 4 },
  headerTitle: { color: '#FFFFFF', fontSize: 18, fontWeight: '700' },

  profileContainer: {
    alignItems: 'center',
    marginTop: 15,
  },
  avatarPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  avatarText: {
    fontSize: 22,
    fontWeight: '800',
    color: '#4C26C9',
  },
  profileName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  mainContainer: {
    flex: 1,
    backgroundColor: '#F7FAFC',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: 'hidden',
  },
  scrollContent: { padding: 20, paddingBottom: 40 },

  cardBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 2,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputGroupLast: {
    marginBottom: 0,
  },
  inputLabel: {
    fontSize: 12,
    color: '#718096',
    fontWeight: '600',
    marginBottom: 6,
  },
  textInput: {
    height: 50,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    paddingHorizontal: 14,
    fontSize: 15,
    color: '#1A202C',
    backgroundColor: '#FFFFFF',
  },

  confirmButton: {
    height: 54,
    backgroundColor: '#4C26C9',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#4C26C9',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
