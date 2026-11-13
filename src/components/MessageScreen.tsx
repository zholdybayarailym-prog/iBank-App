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
import { Ionicons } from '@expo/vector-icons';

interface MessageScreenProps {
  onBack?: () => void;
  onNavigateToHome?: () => void;
  onNavigateToSearch?: () => void;
  onNavigateToSettings?: () => void;
  onNavigateToDetail?: (bankName: string) => void;
}

const messagesData = [
  {
    id: '1',
    title: 'Bank of America',
    description: 'Сіздің шотыңыздан $1,200 көлемінде аударым жасалды. Растау үшін тексеріңіз.',
    time: 'Бүгін',
    icon: 'business',
    iconBg: '#4F46E5',
  },
  {
    id: '2',
    title: 'Қауіпсіздік',
    description: 'Шотқа кіру шектелді. Қауіпсіздік үшін деректеріңізді жаңартыңыз.',
    time: '12/10',
    icon: 'person',
    iconBg: '#EF4444',
  },
  {
    id: '3',
    title: 'Хабарлама',
    description: 'Жаңа айлық үзінді көшірмеңіз дайын болды. Көру үшін басыңыз.',
    time: '11/10',
    icon: 'notifications',
    iconBg: '#0EA5E9',
  },
  {
    id: '4',
    title: 'PayPal',
    description: 'Шот қауіпсіздік мақсатында уақытша бұғатталды. Шешу жолдарын қараңыз.',
    time: '10/11',
    icon: 'logo-paypal',
    iconBg: '#F59E0B',
  },
  {
    id: '5',
    title: 'Ақша алу',
    description: 'Құрметті клиент, банкоматтан ақша шешуге арналған растау коды: 2987456.',
    time: '10/12',
    icon: 'card',
    iconBg: '#10B981',
  },
];

export default function MessageScreen({
  onBack,
  onNavigateToHome,
  onNavigateToSearch,
  onNavigateToSettings,
  onNavigateToDetail,
}: MessageScreenProps) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Жоғарғы панель */}
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.headerContent}>
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <Ionicons name="chevron-back" size={24} color="#1A202C" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Хабарламалар</Text>
        </View>
      </SafeAreaView>

      {/* Хабарламалар тізімі */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {messagesData.map((item) => (
          <TouchableOpacity 
            key={item.id} 
            style={styles.messageCard} 
            activeOpacity={0.7}
            onPress={() => onNavigateToDetail?.(item.title)}
          >
            <View style={[styles.iconContainer, { backgroundColor: item.iconBg }]}>
              <Ionicons name={item.icon as any} size={22} color="#FFFFFF" />
            </View>
            <View style={styles.textContainer}>
              <View style={styles.cardHeaderRow}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardTime}>{item.time}</Text>
              </View>
              <Text style={styles.cardDescription} numberOfLines={1}>
                {item.description}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Төменгі навигация панелі */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={onNavigateToHome}>
          <Ionicons name="home-outline" size={22} color="#94A3B8" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={onNavigateToSearch}>
          <Ionicons name="search-outline" size={22} color="#94A3B8" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.activeNavItem}>
          <Ionicons name="mail" size={20} color="#FFFFFF" />
          <Text style={styles.activeNavText}>Хабарлама</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={onNavigateToSettings}>
          <Ionicons name="settings-outline" size={22} color="#94A3B8" />
        </TouchableOpacity>
      </View>
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
    paddingVertical: 12,
  },
  backButton: { marginRight: 15, padding: 5 },
  headerTitle: { color: '#1A202C', fontSize: 18, fontWeight: '700' },
  scrollContent: { padding: 20, paddingBottom: 100 },
  messageCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 14,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 2,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  textContainer: {
    flex: 1,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1A202C',
  },
  cardTime: {
    fontSize: 12,
    color: '#94A3B8',
    fontWeight: '500',
  },
  cardDescription: {
    fontSize: 13,
    color: '#64748B',
  },
  bottomNav: {
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
    borderTopColor: '#F1F5F9',
    paddingBottom: 10,
  },
  navItem: {
    padding: 10,
  },
  activeNavItem: {
    flexDirection: 'row',
    backgroundColor: '#5C3BFF',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: 'center',
  },
  activeNavText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
    marginLeft: 6,
  },
});