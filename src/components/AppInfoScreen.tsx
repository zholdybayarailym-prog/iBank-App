import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface AppInfoScreenProps {
  onBack?: () => void;
}

export default function AppInfoScreen({ onBack }: AppInfoScreenProps) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Жоғарғы панель (Header) */}
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.headerContent}>
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <Ionicons name="chevron-back" size={24} color="#1A202C" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Қолданба туралы</Text>
        </View>
      </SafeAreaView>

      {/* Негізгі мазмұн */}
      <View style={styles.content}>
        {/* Қолданба атауы */}
        <Text style={styles.appName}>iBank E-mobile Banking</Text>

        {/* Ақпараттық қатарлар */}
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Шығарылған күні</Text>
          <Text style={styles.infoValue}>Желтоқсан 2026</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Нұсқасы (Version)</Text>
          <Text style={styles.infoValue}>9.0.2</Text>
        </View>

        <View style={styles.infoRowLast}>
          <Text style={styles.infoLabel}>Тілі</Text>
          <Text style={styles.infoValue}>Қазақша</Text>
        </View>
      </View>
    </View>
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
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 30,
  },
  appName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A202C',
    textAlign: 'center',
    marginBottom: 40,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  infoRowLast: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 18,
  },
  infoLabel: {
    fontSize: 15,
    color: '#1E293B',
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 15,
    color: '#5C3BFF',
    fontWeight: '600',
  },
});
