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
import { Ionicons, MaterialCommunityIcons, FontAwesome5, Feather } from '@expo/vector-icons';

interface SearchScreenProps {
  onNavigateToHome?: () => void;
  onNavigateToBranch?: () => void;
  onNavigateToInterestRate?: () => void;
  onNavigateToExchangeRate?: () => void; // <--- Қосылды
}

export default function SearchScreen({ 
  onNavigateToHome, 
  onNavigateToBranch, 
  onNavigateToInterestRate,
  onNavigateToExchangeRate // <--- Қосылды
}: SearchScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const searchItems = [
    { title: 'Бөлімше', subtitle: 'Бөлімшені іздеу', icon: 'bank-outline', type: 'material-community', color: '#00B4D8', bg: '#E8F7FF' },
    { title: 'Пайыздық мөлшерлеме', subtitle: 'Мөлшерлемені іздеу', icon: 'trending-up', type: 'ionicons', color: '#FFB703', bg: '#FFF6E8' },
    { title: 'Валюта бағамы', subtitle: 'Бағамды іздеу', icon: 'exchange-alt', type: 'font-awesome5', color: '#FF4D6D', bg: '#FFE8EE' },
    { title: 'Айырбастау', subtitle: 'Ақша сомасын айырбастау', icon: 'currency-usd', type: 'material-community', color: '#5C3BFF', bg: '#EEECFF' },
  ];

  const filteredItems = searchItems.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <SafeAreaView style={styles.safeArea}>
        <View style={styles.headerContent}>
          <TouchableOpacity style={styles.backButton} onPress={onNavigateToHome}>
            <Ionicons name="chevron-back" size={24} color="#1A202C" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Іздеу</Text>
        </View>

        <View style={styles.searchBarContainer}>
          <Feather name="search" size={20} color="#A0AEC0" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Қызмет немесе бөлім іздеу..."
            placeholderTextColor="#A0AEC0"
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="default"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={18} color="#A0AEC0" />
            </TouchableOpacity>
          )}
        </View>
      </SafeAreaView>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {filteredItems.length > 0 ? (
          filteredItems.map((item, index) => (
            <TouchableOpacity 
              key={index} 
              style={styles.searchCard} 
              activeOpacity={0.7} 
              onPress={() => {
                if (item.title === 'Бөлімше' && onNavigateToBranch) {
                  onNavigateToBranch();
                } else if (item.title === 'Пайыздық мөлшерлеме' && onNavigateToInterestRate) {
                  onNavigateToInterestRate();
                } else if (item.title === 'Валюта бағамы' && onNavigateToExchangeRate) {
                  onNavigateToExchangeRate(); // <--- Қосылды
                }
              }}
            >
              <View style={styles.cardTextContainer}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
              </View>
              <View style={[styles.illustrationBox, { backgroundColor: item.bg }]}>
                {item.type === 'material-community' && (
                  <MaterialCommunityIcons name={item.icon as any} size={32} color={item.color} />
                )}
                {item.type === 'ionicons' && (
                  <Ionicons name={item.icon as any} size={30} color={item.color} />
                )}
                {item.type === 'font-awesome5' && (
                  <FontAwesome5 name={item.icon as any} size={24} color={item.color} />
                )}
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <View style={styles.noResultContainer}>
            <Text style={styles.noResultText}>Ештеңе табылмады</Text>
          </View>
        )}
      </ScrollView>

      <View style={styles.bottomTabBar}>
        <TouchableOpacity style={styles.tabItem} onPress={onNavigateToHome}>
          <Feather name="home" size={22} color="#A0AEC0" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabItemActive}>
          <Ionicons name="search" size={20} color="#FFFFFF" />
          <Text style={styles.tabTextActive}>Іздеу</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabItem}>
          <Feather name="mail" size={22} color="#A0AEC0" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabItem}>
          <Feather name="settings" size={22} color="#A0AEC0" />
        </TouchableOpacity>
      </View>
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
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    marginHorizontal: 20,
    marginBottom: 15,
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 46,
  },
  searchIcon: { marginRight: 8 },
  searchInput: { flex: 1, fontSize: 14, color: '#2D3748' },
  scrollContent: { padding: 20, paddingBottom: 90 },
  searchCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  cardTextContainer: { flex: 1, marginRight: 10 },
  cardTitle: { fontSize: 16, fontWeight: '700', color: '#1A202C', marginBottom: 6 },
  cardSubtitle: { fontSize: 13, color: '#718096' },
  illustrationBox: {
    width: 70,
    height: 70,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noResultContainer: { alignItems: 'center', marginTop: 40 },
  noResultText: { fontSize: 14, color: '#A0AEC0' },
  bottomTabBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    paddingHorizontal: 20,
  },
  tabItem: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabItemActive: {
    flexDirection: 'row',
    backgroundColor: '#5C3BFF',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignItems: 'center',
  },
  tabTextActive: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
    marginLeft: 6,
  },
});