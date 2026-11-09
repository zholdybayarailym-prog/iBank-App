import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface LanguageScreenProps {
  onNavigateBack?: () => void;
}

export default function LanguageScreen({ onNavigateBack }: LanguageScreenProps) {
  // Тілдер тізімі (суреттегі үлгі бойынша)
  const [languages, setLanguages] = useState([
    { name: 'Вьетнамша', flag: '🇻🇳', selected: false },
    { name: 'Французша', flag: '🇫🇷', selected: false },
    { name: 'Ағылшынша (English)', flag: '🇬🇧', selected: true },
    { name: 'Жапонша', flag: '🇯🇵', selected: false },
    { name: 'Португалша', flag: '🇵🇹', selected: false },
    { name: 'Қытайша', flag: '🇨🇳', selected: false },
    { name: 'Корейше', flag: '🇰🇷', selected: false },
    { name: 'Никарагуанша', flag: '🇳🇮', selected: false },
    { name: 'Орысша', flag: '🇷🇺', selected: false },
  ]);

  const handleSelect = (index: number) => {
    const updated = languages.map((lang, i) => ({
      ...lang,
      selected: i === index,
    }));
    setLanguages(updated);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Жоғарғы панель (Header) */}
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.headerContent}>
          <TouchableOpacity style={styles.backButton} onPress={onNavigateBack}>
            <Ionicons name="chevron-back" size={24} color="#1A202C" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Тіл (Language)</Text>
        </View>
      </SafeAreaView>

      {/* Тізім аймағы */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {languages.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.rowItem}
            activeOpacity={0.7}
            onPress={() => handleSelect(index)}
          >
            <View style={styles.leftGroup}>
              <Text style={styles.flagText}>{item.flag}</Text>
              <Text style={styles.langName}>{item.name}</Text>
            </View>
            {item.selected && (
              <Ionicons name="checkmark" size={20} color="#5C3BFF" />
            )}
          </TouchableOpacity>
        ))}
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
  backButton: { marginRight: 15 },
  headerTitle: { color: '#1A202C', fontSize: 18, fontWeight: '700' },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 30, paddingTop: 10 },
  rowItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 3,
    elevation: 1,
  },
  leftGroup: { flexDirection: 'row', alignItems: 'center' },
  flagText: { fontSize: 22, marginRight: 14 },
  langName: { fontSize: 15, fontWeight: '500', color: '#2D3748' },
});