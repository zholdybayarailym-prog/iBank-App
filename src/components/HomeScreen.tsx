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
import { Ionicons, MaterialCommunityIcons, Feather } from '@expo/vector-icons';

interface HomeScreenProps {
  userName?: string;
  userBalance?: string;
  onNavigateToSearch?: () => void;
  onNavigateToExchange?: () => void;
  onNavigateToTransfer?: () => void;
  onNavigateToMessage?: () => void;
  onNavigateToSettings?: () => void; // <--- ЖАҢА: Баптауларға өту функциясы
}

export default function HomeScreen({ 
  userName = 'Арайлым Жолдыбай', 
  userBalance = '$3,469.52',
  onNavigateToSearch,
  onNavigateToExchange,
  onNavigateToTransfer,
  onNavigateToMessage,
  onNavigateToSettings, // <--- Қабылдап алу
}: HomeScreenProps) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Жоғарғы күлгін аймақ (Header) */}
      <View style={styles.topHeader}>
        <SafeAreaView>
          <View style={styles.headerContent}>
            <View style={styles.userInfo}>
              <View style={styles.avatarContainer}>
                <Ionicons name="person" size={22} color="#4C26C9" />
              </View>
              <Text style={styles.greetingText}>Сәлем, {userName}</Text>
            </View>

            <TouchableOpacity style={styles.notificationButton} activeOpacity={0.8}>
              <Ionicons name="notifications-outline" size={22} color="#FFFFFF" />
              <View style={styles.badge} />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>

      {/* Негізгі ақ контейнер */}
      <View style={styles.mainContainer}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          
         {/* Банк картасы */}
          <View style={styles.cardContainer}>
            <View style={styles.cardDesign}>
              <View style={styles.cardTopRow}>
                <Text style={styles.cardHolderName}>{userName}</Text>
              </View>
              
              <View>
                <Text style={styles.cardType}>Amazon Platinum</Text>
                <Text style={styles.cardNumber}>4758  ••••  ••••  9018</Text>
              </View>

              <View style={styles.cardBottomRow}>
                <Text style={styles.cardBalance}>{userBalance}</Text>
                <View style={styles.visaContainer}>
                  <Text style={styles.visaText}>VISA</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Қызметтер торы (Grid Menu) */}
          <View style={styles.gridContainer}>
            
            {/* 1. Шот пен карта */}
            <TouchableOpacity style={styles.gridItem} activeOpacity={0.7}>
              <View style={[styles.iconBox, { backgroundColor: '#EEECFF' }]}>
                <Ionicons name="wallet-outline" size={24} color="#5C3BFF" />
              </View>
              <Text style={styles.gridText}>Шот пен карта</Text>
            </TouchableOpacity>

            {/* 2. Ақша аудару */}
            <TouchableOpacity 
              style={styles.gridItem} 
              activeOpacity={0.7} 
              onPress={onNavigateToTransfer}
            >
              <View style={[styles.iconBox, { backgroundColor: '#FFE8EE' }]}>
                <MaterialCommunityIcons name="swap-horizontal" size={24} color="#FF4D6D" />
              </View>
              <Text style={styles.gridText}>Ақша аудару</Text>
            </TouchableOpacity>

            {/* 3. Қолма-қол алу */}
            <TouchableOpacity style={styles.gridItem} activeOpacity={0.7}>
              <View style={[styles.iconBox, { backgroundColor: '#E8F7FF' }]}>
                <MaterialCommunityIcons name="atm" size={24} color="#00B4D8" />
              </View>
              <Text style={styles.gridText}>Қолма-қол алу</Text>
            </TouchableOpacity>

            {/* 4. Мобильді байланыс */}
            <TouchableOpacity style={styles.gridItem} activeOpacity={0.7}>
              <View style={[styles.iconBox, { backgroundColor: '#FFF6E8' }]}>
                <Ionicons name="phone-portrait-outline" size={24} color="#FFB703" />
              </View>
              <Text style={styles.gridText}>Мобильді байланыс</Text>
            </TouchableOpacity>

            {/* 5. Төлем жасау */}
            <TouchableOpacity style={styles.gridItem} activeOpacity={0.7}>
              <View style={[styles.iconBox, { backgroundColor: '#E8F9F6' }]}>
                <Ionicons name="receipt-outline" size={24} color="#00B49D" />
              </View>
              <Text style={styles.gridText}>Төлем жасау</Text>
            </TouchableOpacity>

            {/* 6. Жинақ */}
            <TouchableOpacity style={styles.gridItem} activeOpacity={0.7}>
              <View style={[styles.iconBox, { backgroundColor: '#EEECFF' }]}>
                <MaterialCommunityIcons name="piggy-bank-outline" size={24} color="#5C3BFF" />
              </View>
              <Text style={styles.gridText}>Жинақ</Text>
            </TouchableOpacity>

            {/* 7. Несие картасы */}
            <TouchableOpacity style={styles.gridItem} activeOpacity={0.7}>
              <View style={[styles.iconBox, { backgroundColor: '#FFF2E8' }]}>
                <Ionicons name="card-outline" size={24} color="#F77F00" />
              </View>
              <Text style={styles.gridText}>Несие картасы</Text>
            </TouchableOpacity>

            {/* 8. Есеп беру */}
            <TouchableOpacity style={styles.gridItem} activeOpacity={0.7}>
              <View style={[styles.iconBox, { backgroundColor: '#EEECFF' }]}>
                <Ionicons name="bar-chart-outline" size={24} color="#4C26C9" />
              </View>
              <Text style={styles.gridText}>Есеп беру</Text>
            </TouchableOpacity>

            {/* 9. Алушылар */}
            <TouchableOpacity style={styles.gridItem} activeOpacity={0.7}>
              <View style={[styles.iconBox, { backgroundColor: '#FFE8EE' }]}>
                <Ionicons name="people-outline" size={24} color="#FF4D6D" />
              </View>
              <Text style={styles.gridText}>Алушылар</Text>
            </TouchableOpacity>

          </View>
        </ScrollView>

        {/* Төменгі навигация панелі (TabBar) */}
        <View style={styles.bottomTabBar}>
          <TouchableOpacity style={styles.tabItemActive}>
            <Ionicons name="home" size={20} color="#FFFFFF" />
            <Text style={styles.tabTextActive}>Басты бет</Text>
          </TouchableOpacity>

          {/* Іздеу бетіне өтетін түйме */}
          <TouchableOpacity style={styles.tabItem} onPress={onNavigateToSearch}>
            <Feather name="search" size={22} color="#A0AEC0" />
          </TouchableOpacity>

          {/* Хабарламалар бетіне өтетін түйме */}
          <TouchableOpacity style={styles.tabItem} onPress={onNavigateToMessage}>
            <Feather name="mail" size={22} color="#A0AEC0" />
          </TouchableOpacity>

          {/* Баптаулар бетіне өтетін түйме */}
          <TouchableOpacity style={styles.tabItem} onPress={onNavigateToSettings}>
            <Feather name="settings" size={22} color="#A0AEC0" />
          </TouchableOpacity>
        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#4C26C9' },
  topHeader: { height: 110, paddingHorizontal: 20, justifyContent: 'center' },
  headerContent: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  userInfo: { flexDirection: 'row', alignItems: 'center' },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  greetingText: { color: '#FFFFFF', fontSize: 16, fontWeight: '600' },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF4D6D',
  },
  mainContainer: {
    flex: 1,
    backgroundColor: '#F7FAFC',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: 'hidden',
  },
  scrollContent: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 90 },
  cardContainer: { width: '100%', marginBottom: 24 },
  cardDesign: {
    width: '100%',
    height: 190,
    borderRadius: 20,
    backgroundColor: '#3B1E88',
    padding: 20,
    justifyContent: 'space-between',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 5,
  },
  cardTopRow: { flexDirection: 'row', justifyContent: 'space-between' },
  cardHolderName: { color: '#FFFFFF', fontSize: 16, fontWeight: '600' },
  cardType: { color: '#A0AEC0', fontSize: 12, marginBottom: 4 },
  cardNumber: { color: '#FFFFFF', fontSize: 15, letterSpacing: 2 },
  cardBottomRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' },
  cardBalance: { color: '#FFFFFF', fontSize: 22, fontWeight: '700' },
  visaContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  visaText: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '900',
    fontStyle: 'italic',
    letterSpacing: 3,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gridItem: {
    width: '31%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: 'center',
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  gridText: { fontSize: 12, color: '#4A5568', fontWeight: '500', textAlign: 'center' },
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