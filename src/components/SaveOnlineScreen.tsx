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

interface SaveOnlineScreenProps {
  onBack?: () => void;
  onNavigateToAdd?: () => void;
  onNavigateToManagement?: () => void;
}

export default function SaveOnlineScreen({
  onBack,
  onNavigateToAdd,
  onNavigateToManagement,
}: SaveOnlineScreenProps) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Жоғарғы панель */}
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.headerContent}>
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <Ionicons name="chevron-back" size={24} color="#1A202C" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Онлайн жинақтау</Text>
        </View>
      </SafeAreaView>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Қосу (Add) карточкасы */}
        <TouchableOpacity 
          style={styles.card} 
          activeOpacity={0.8}
          onPress={onNavigateToAdd}
        >
          <View style={styles.cardInfo}>
            <Text style={styles.cardTitle}>Қосу</Text>
            <Text style={styles.cardSubtitle}>Жаңа онлайн жинақ шотын ашу</Text>
          </View>
          <View style={styles.iconBox}>
            <Feather name="plus-circle" size={32} color="#5C3BFF" />
          </View>
        </TouchableOpacity>

        {/* Басқару (Management) карточкасы */}
        <TouchableOpacity 
          style={styles.card} 
          activeOpacity={0.8}
          onPress={onNavigateToManagement}
        >
          <View style={styles.cardInfo}>
            <Text style={styles.cardTitle}>Басқару</Text>
            <Text style={styles.cardSubtitle}>Онлайн жинақ шоттарын басқару</Text>
          </View>
          <View style={styles.iconBox}>
            <Feather name="sliders" size={30} color="#10B981" />
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
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  backButton: { marginRight: 15, padding: 4 },
  headerTitle: { color: '#1A202C', fontSize: 18, fontWeight: '700' },

  scrollContent: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 40 },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 2,
  },
  cardInfo: {
    flex: 1,
    marginRight: 12,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1A202C',
    marginBottom: 6,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#718096',
    lineHeight: 20,
  },
  iconBox: {
    width: 60,
    height: 60,
    borderRadius: 18,
    backgroundColor: '#F8FAFC',
    justifyContent: 'center',
    alignItems: 'center',
  },
});