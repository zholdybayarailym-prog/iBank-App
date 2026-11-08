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
import { Ionicons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';

interface BranchScreenProps {
  onBack?: () => void;
}

export default function BranchScreen({ onBack }: BranchScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const branches = [
    { name: 'Банк 1656 Union Street', distance: '50 м' },
    { name: 'Банк Secaucus', distance: '1.2 км' },
    { name: 'Банк 1657 Riverside Drive', distance: '5.3 км' },
    { name: 'Банк Rutherford', distance: '70 м' },
    { name: 'Банк 1656 Union Street', distance: '30 м' },
  ];

  const filteredBranches = branches.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <SafeAreaView style={styles.safeArea}>
        <View style={styles.headerContent}>
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <Ionicons name="chevron-back" size={24} color="#1A202C" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Бөлімшелер</Text>
        </View>
      </SafeAreaView>

      <View style={styles.mapContainer}>
        <View style={styles.mapBackground}>
          <View style={[styles.mapPin, { top: '30%', left: '20%' }]}>
            <Ionicons name="location" size={24} color="#4C26C9" />
          </View>
          <View style={[styles.mapPin, { top: '20%', right: '30%' }]}>
            <Ionicons name="location" size={24} color="#4C26C9" />
          </View>
          <View style={[styles.mapPin, { bottom: '30%', left: '35%' }]}>
            <Ionicons name="location" size={24} color="#4C26C9" />
          </View>
          <View style={[styles.mapPin, { bottom: '25%', right: '20%' }]}>
            <Ionicons name="location" size={24} color="#4C26C9" />
          </View>
          <View style={styles.userLocationPin}>
            <MaterialCommunityIcons name="navigation" size={20} color="#FF4D6D" />
          </View>
        </View>
      </View>

      <View style={styles.bottomSheet}>
        <View style={styles.dragHandle} />

        <View style={styles.searchBar}>
          <Feather name="search" size={18} color="#A0AEC0" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Банк немесе мекенжай іздеу..."
            placeholderTextColor="#A0AEC0"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={18} color="#A0AEC0" />
            </TouchableOpacity>
          )}
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.listContent}>
          {filteredBranches.length > 0 ? (
            filteredBranches.map((item, index) => (
              <TouchableOpacity key={index} style={styles.branchItem} activeOpacity={0.7}>
                <View style={styles.branchIconBox}>
                  <Ionicons name="location-outline" size={20} color="#4C26C9" />
                </View>
                <View style={styles.branchInfo}>
                  <Text style={styles.branchName}>{item.name}</Text>
                </View>
                <Text style={styles.branchDistance}>{item.distance}</Text>
              </TouchableOpacity>
            ))
          ) : (
            <View style={styles.noResult}>
              <Text style={styles.noResultText}>Бөлімше табылмады</Text>
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7FAFC' },
  safeArea: { backgroundColor: '#FFFFFF' },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  backButton: { marginRight: 15 },
  headerTitle: { color: '#1A202C', fontSize: 18, fontWeight: '700' },
  mapContainer: {
    height: '35%',
    width: '100%',
    backgroundColor: '#E2E8F0',
    position: 'relative',
  },
  mapBackground: {
    flex: 1,
    backgroundColor: '#EAEFF5',
    position: 'relative',
    overflow: 'hidden',
  },
  mapPin: {
    position: 'absolute',
  },
  userLocationPin: {
    position: 'absolute',
    top: '50%',
    left: '48%',
    backgroundColor: '#FFE8EE',
    padding: 6,
    borderRadius: 20,
  },
  bottomSheet: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -25,
    paddingHorizontal: 20,
    paddingTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  dragHandle: {
    width: 40,
    height: 4,
    backgroundColor: '#CBD5E0',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 15,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 14,
    paddingHorizontal: 14,
    height: 48,
    marginBottom: 15,
  },
  searchIcon: { marginRight: 8 },
  searchInput: { flex: 1, fontSize: 14, color: '#2D3748' },
  listContent: { paddingBottom: 30 },
  branchItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  branchIconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#EEECFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  branchInfo: { flex: 1 },
  branchName: { fontSize: 15, fontWeight: '600', color: '#1A202C' },
  branchDistance: { fontSize: 13, color: '#718096', fontWeight: '500' },
  noResult: { alignItems: 'center', marginTop: 30 },
  noResultText: { fontSize: 14, color: '#A0AEC0' },
});
