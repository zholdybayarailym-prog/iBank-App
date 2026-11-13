import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface SettingScreenProps {
  onBack?: () => void;
  onNavigateToHome?: () => void;
  onNavigateToSearch?: () => void;
  onNavigateToMessage?: () => void;
  onNavigateToLanguage?: () => void;
  onNavigateToAppInfo?: () => void;
}

export default function SettingScreen({
  onBack,
  onNavigateToHome,
  onNavigateToSearch,
  onNavigateToMessage,
  onNavigateToLanguage,
  onNavigateToAppInfo,
}: SettingScreenProps) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Жоғарғы сия көк фон мен тақырып */}
      <View style={styles.headerBackground}>
        <SafeAreaView>
          <View style={styles.headerContent}>
            <TouchableOpacity style={styles.backButton} onPress={onBack}>
              <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Баптаулар</Text>
          </View>
        </SafeAreaView>
      </View>

      {/* Ақ түсті негізгі блок (профиль және мәзірлер) */}
      <View style={styles.contentCard}>
        {/* Профиль бөлігі */}
        <View style={styles.profileSection}>
          <Image
            source={require('../../assets/Ағаййй.jpeg')}
            style={styles.avatar}
          />
          <Text style={styles.profileName}>Зұпар Абдрахман</Text>
        </View>

        {/* Тізімдер */}
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.menuList}>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>Құпия сөз (Password)</Text>
            <Ionicons name="chevron-forward" size={18} color="#CBD5E1" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>Touch ID</Text>
            <Ionicons name="chevron-forward" size={18} color="#CBD5E1" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={onNavigateToLanguage}>
            <Text style={styles.menuText}>Тілдер (Languages)</Text>
            <Ionicons name="chevron-forward" size={18} color="#CBD5E1" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={onNavigateToAppInfo}>
            <Text style={styles.menuText}>Қолданба туралы (App information)</Text>
            <Ionicons name="chevron-forward" size={18} color="#CBD5E1" />
          </TouchableOpacity>

          <View style={styles.menuItemLast}>
            <Text style={styles.menuText}>Қолдау қызметі (Customer care)</Text>
            <Text style={styles.phoneText}>18008989</Text>
          </View>
        </ScrollView>
      </View>

      {/* Төменгі навигация панелі */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={onNavigateToHome}>
          <Ionicons name="home-outline" size={22} color="#94A3B8" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={onNavigateToSearch}>
          <Ionicons name="search-outline" size={22} color="#94A3B8" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={onNavigateToMessage}>
          <Ionicons name="mail-outline" size={22} color="#94A3B8" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.activeNavItem}>
          <Ionicons name="settings" size={20} color="#FFFFFF" />
          <Text style={styles.activeNavText}>Баптау</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#5C3BFF' },
  headerBackground: {
    backgroundColor: '#5C3BFF',
    paddingBottom: 40,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  backButton: { marginRight: 15, padding: 5 },
  headerTitle: { color: '#FFFFFF', fontSize: 18, fontWeight: '700' },
  contentCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 70,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 25,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#F1F5F9',
  },
  profileName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A202C',
  },
  menuList: {
    paddingBottom: 20,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F8FAFC',
  },
  menuItemLast: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
  },
  menuText: {
    fontSize: 14,
    color: '#1E293B',
    fontWeight: '500',
  },
  phoneText: {
    fontSize: 14,
    color: '#94A3B8',
    fontWeight: '600',
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
