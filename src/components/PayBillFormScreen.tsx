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

interface PayBillFormScreenProps {
  onBack?: () => void;
  billType?: 'electric' | 'water' | 'mobile' | 'internet';
  onCheck?: (company: string, code: string) => void;
}

export default function PayBillFormScreen({
  onBack,
  billType = 'internet',
  onCheck,
}: PayBillFormScreenProps) {
  const [selectedCompany, setSelectedCompany] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [billCode, setBillCode] = useState('');

  // Төлем түріне қарай атаулар мен компаниялар тізімі
  const getConfig = () => {
    switch (billType) {
      case 'electric':
        return {
          title: 'Электр төлемі',
          label: 'Электр шот кодын енгізіңіз',
          placeholder: 'Электр шот коды',
          companies: ['AlmatyPowerMunay (АПК)', 'Жарық Транзит', 'ЭнергоСбыт Алматы'],
        };
      case 'water':
        return {
          title: 'Су төлемі',
          label: 'Су шот кодын енгізіңіз',
          placeholder: 'Су шот коды',
          companies: ['Алматы Су', 'Су Арнасы', 'ҚазВодоКнал'],
        };
      case 'mobile':
        return {
          title: 'Мобильді төлем',
          label: 'Телефон нөмірін немесе шотты енгізіңіз',
          placeholder: 'Нөмір немесе шот коды',
          companies: ['Kcell / Activ', 'Beeline Қазақстан', 'Tele2', 'Altel'],
        };
      case 'internet':
      default:
        return {
          title: 'Интернет төлемі',
          label: 'Интернет шот кодын енгізіңіз',
          placeholder: 'Шот коды',
          companies: ['Қазақтелеком', 'Beeline Интернет', 'Alma TV', 'Capi Telecom'],
        };
    }
  };

  const config = getConfig();
  const isFormValid = selectedCompany.length > 0 && billCode.trim().length > 0;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Жоғарғы панель */}
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.headerContent}>
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <Ionicons name="chevron-back" size={24} color="#1A202C" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{config.title}</Text>
        </View>
      </SafeAreaView>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Негізгі карточка */}
        <View style={styles.card}>
          
          {/* Компанияны таңдау */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Компанияны таңдаңыз</Text>
            <TouchableOpacity 
              style={styles.dropdownInput} 
              activeOpacity={0.7}
              onPress={() => setShowDropdown(!showDropdown)}
            >
              <Text style={selectedCompany ? styles.dropdownSelectedText : styles.dropdownPlaceholder}>
                {selectedCompany || 'Компанияны таңдаңыз'}
              </Text>
              <Ionicons name={showDropdown ? "chevron-up" : "chevron-down"} size={18} color="#A0AEC0" />
            </TouchableOpacity>

            {/* Төлем түріне сәйкес ашылатын компаниялар тізімі */}
            {showDropdown && (
              <View style={styles.dropdownList}>
                {config.companies.map((comp) => (
                  <TouchableOpacity
                    key={comp}
                    style={styles.dropdownItem}
                    onPress={() => {
                      setSelectedCompany(comp);
                      setShowDropdown(false);
                    }}
                  >
                    <Text style={styles.dropdownItemText}>{comp}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          {/* Шот кодын енгізу */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>{config.label}</Text>
            <TextInput
              style={styles.textInput}
              placeholder={config.placeholder}
              placeholderTextColor="#A0AEC0"
              value={billCode}
              onChangeText={setBillCode}
            />
          </View>

          {/* Түсіндірме мәтін */}
          <Text style={styles.helperText}>
            Ақпаратты тексеру үшін дұрыс шот кодын енгізіңіз.
          </Text>

          {/* Тексеру батырмасы */}
          <TouchableOpacity 
            style={[styles.checkButton, isFormValid && styles.checkButtonActive]} 
            activeOpacity={0.8}
            onPress={() => onCheck && onCheck(selectedCompany || config.companies[0], billCode || '#9941255')}
          >
            <Text style={[styles.checkButtonText, isFormValid && styles.checkButtonTextActive]}>
              Тексеру
            </Text>
          </TouchableOpacity>

        </View>

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

  scrollContent: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 40 },

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
    marginBottom: 20,
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
  dropdownPlaceholder: {
    fontSize: 15,
    color: '#A0AEC0',
    fontWeight: '400',
  },
  dropdownSelectedText: {
    fontSize: 15,
    color: '#1A202C',
    fontWeight: '500',
  },
  dropdownList: {
    marginTop: 6,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
  },
  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  dropdownItemText: {
    fontSize: 14,
    color: '#1A202C',
  },

  inputLabel: {
    fontSize: 14,
    color: '#718096',
    marginBottom: 8,
    fontWeight: '400',
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
    fontSize: 14,
    color: '#A0AEC0',
    lineHeight: 20,
    marginBottom: 24,
  },

  checkButton: {
    height: 52,
    backgroundColor: '#F3EEFF',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkButtonActive: {
    backgroundColor: '#5C3BFF',
  },
  checkButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#A78BFA',
  },
  checkButtonTextActive: {
    color: '#FFFFFF',
  },
});