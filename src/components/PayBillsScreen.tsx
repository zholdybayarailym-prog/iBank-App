import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
} from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';

interface PayBillsScreenProps {
  onBack?: () => void;
  onNavigateToMobilePrepaid?: () => void;
  onNavigateToInternet?: () => void; // <--- Қате шықпас үшін қосылған функция
  onNavigateToHistory?: () => void;
}

export default function PayBillsScreen({
  onBack,
  onNavigateToMobilePrepaid,
  onNavigateToInternet,
  onNavigateToHistory,
}: PayBillsScreenProps) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Жоғарғы панель */}
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.headerContent}>
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <Ionicons name="chevron-back" size={24} color="#1A202C" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Төлем жасау</Text>

          {/* Төлемдер тарихына өтетін сағат белгішесі */}
          <TouchableOpacity style={styles.historyButton} onPress={onNavigateToHistory} activeOpacity={0.7}>
            <Ionicons name="time-outline" size={22} color="#5C3BFF" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* 1. Электр энергиясы */}
        <TouchableOpacity style={styles.billCard} activeOpacity={0.8}>
          <View style={styles.billInfo}>
            <Text style={styles.billTitle}>Электр энергиясы</Text>
            <Text style={styles.billSubtitle}>Осы айдағы электр төлемі</Text>
          </View>
          <View style={styles.illustrationBox}>
            <Ionicons name="flash-outline" size={32} color="#F59E0B" />
          </View>
        </TouchableOpacity>

        {/* 2. Су төлемі */}
        <TouchableOpacity style={styles.billCard} activeOpacity={0.8}>
          <View style={styles.billInfo}>
            <Text style={styles.billTitle}>Су төлемі</Text>
            <Text style={styles.billSubtitle}>Осы айдағы су төлемі</Text>
          </View>
          <View style={styles.illustrationBox}>
            <Ionicons name="water-outline" size={32} color="#0EA5E9" />
          </View>
        </TouchableOpacity>

        {/* 3. Мобильді байланыс */}
        <TouchableOpacity 
          style={styles.billCard} 
          activeOpacity={0.8}
          onPress={onNavigateToMobilePrepaid}
        >
          <View style={styles.billInfo}>
            <Text style={styles.billTitle}>Мобильді байланыс</Text>
            <Text style={styles.billSubtitle}>Осы айдағы ұялы байланыс төлемі</Text>
          </View>
          <View style={styles.illustrationBox}>
            <Ionicons name="phone-portrait-outline" size={32} color="#5C3BFF" />
          </View>
        </TouchableOpacity>

        {/* 4. Интернет */}
        <TouchableOpacity 
          style={styles.billCard} 
          activeOpacity={0.8}
          onPress={onNavigateToInternet} // <--- Интернет чегіне немесе төлеміне бағыттау
        >
          <View style={styles.billInfo}>
            <Text style={styles.billTitle}>Интернет төлемі</Text>
            <Text style={styles.billSubtitle}>Осы айдағы интернет төлемі</Text>
          </View>
          <View style={styles.illustrationBox}>
            <Feather name="wifi" size={30} color="#10B981" />
          </View>
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
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  backButton: { marginRight: 15, padding: 4 },
  headerTitle: { color: '#1A202C', fontSize: 18, fontWeight: '700', flex: 1 },
  historyButton: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#EEECFF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  scrollContent: { 
    paddingHorizontal: 20, 
    paddingTop: 20, 
    paddingBottom: 40 
  },

  billCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  billInfo: {
    flex: 1,
    marginRight: 12,
  },
  billTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A202C',
    marginBottom: 6,
  },
  billSubtitle: {
    fontSize: 13,
    color: '#718096',
    fontWeight: '400',
  },
  illustrationBox: {
    width: 60,
    height: 60,
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#EDF2F7',
  },
});