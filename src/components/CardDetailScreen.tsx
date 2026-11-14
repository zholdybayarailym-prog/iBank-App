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

interface CardDetailScreenProps {
  onBack?: () => void;
  userName?: string;
}

export default function CardDetailScreen({
  onBack,
  userName = 'Зұпар Абдрахман',
}: CardDetailScreenProps) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Жоғарғы панель */}
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.headerContent}>
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <Ionicons name="chevron-back" size={24} color="#1A202C" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Карта</Text>
        </View>
      </SafeAreaView>

      {/* Негізгі ақпараттар тізімі */}
      <View style={styles.contentContainer}>
        
        <View style={styles.rowItem}>
          <Text style={styles.label}>Аты-жөні</Text>
          <Text style={styles.value}>{userName}</Text>
        </View>

        <View style={styles.rowItem}>
          <Text style={styles.label}>Карта нөмірі</Text>
          <Text style={styles.value}>**** **** 9018</Text>
        </View>

        <View style={styles.rowItem}>
          <Text style={styles.label}>Жарамдылық мерзімі</Text>
          <Text style={styles.value}>10/15</Text>
        </View>

        <View style={styles.rowItem}>
          <Text style={styles.label}>Қолдану мерзімі</Text>
          <Text style={styles.value}>10/20</Text>
        </View>

        <View style={styles.rowItemLast}>
          <Text style={styles.label}>Қолжетімді баланс</Text>
          <Text style={styles.value}>$10,000</Text>
        </View>

        {/* Картаны жою түймесі */}
        <TouchableOpacity style={styles.deleteButton} activeOpacity={0.7}>
          <Text style={styles.deleteButtonText}>Картаны жою</Text>
        </TouchableOpacity>

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
  contentContainer: { flex: 1, paddingHorizontal: 20, paddingTop: 20 },
  rowItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  rowItemLast: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    marginBottom: 40,
  },
  label: { fontSize: 15, color: '#64748B', fontWeight: '500' },
  value: { fontSize: 16, color: '#3B1E88', fontWeight: '700' },
  deleteButton: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  deleteButtonText: {
    fontSize: 16,
    color: '#FF4D6D',
    fontWeight: '700',
  },
});