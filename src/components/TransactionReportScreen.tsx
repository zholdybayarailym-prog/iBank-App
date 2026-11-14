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
import { Ionicons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';

interface TransactionReportScreenProps {
  onBack?: () => void;
  userName?: string;
  userBalance?: string;
}

export default function TransactionReportScreen({
  onBack,
  userName = 'Зұпар Абдрахман',
  userBalance = '$3,469.52',
}: TransactionReportScreenProps) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Жоғарғы сия көк фон мен тақырып */}
      <View style={styles.topHeader}>
        <SafeAreaView>
          <View style={styles.headerContent}>
            <TouchableOpacity style={styles.backButton} onPress={onBack}>
              <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Транзакциялар есебі</Text>
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
                <Text style={styles.cardNumber}>4756  ••••  ••••  9018</Text>
              </View>

              <View style={styles.cardBottomRow}>
                <Text style={styles.cardBalance}>{userBalance}</Text>
                <View style={styles.visaContainer}>
                  <Text style={styles.visaText}>VISA</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Бүгінгі транзакциялар */}
          <Text style={styles.sectionHeader}>Бүгін</Text>
          
          <View style={styles.transactionItem}>
            <View style={[styles.iconBox, { backgroundColor: '#3B1E88' }]}>
              <Ionicons name="water" size={20} color="#FFFFFF" />
            </View>
            <View style={styles.transactionInfo}>
              <Text style={styles.transactionTitle}>Су төлемі</Text>
              <Text style={styles.transactionSubtitle}>Сәтсіз аяқталды</Text>
            </View>
            <Text style={styles.amountNegative}>- $280</Text>
          </View>

          {/* Кешегі транзакциялар */}
          <Text style={styles.sectionHeader}>Кеше</Text>

          <View style={styles.transactionItem}>
            <View style={[styles.iconBox, { backgroundColor: '#FF4D6D' }]}>
              <FontAwesome5 name="wallet" size={18} color="#FFFFFF" />
            </View>
            <View style={styles.transactionInfo}>
              <Text style={styles.transactionTitle}>Кіріс: Қазан айлығы</Text>
            </View>
            <Text style={styles.amountPositive}>+$1200</Text>
          </View>

          <View style={styles.transactionItem}>
            <View style={[styles.iconBox, { backgroundColor: '#0096FF' }]}>
              <Ionicons name="flash" size={18} color="#FFFFFF" />
            </View>
            <View style={styles.transactionInfo}>
              <Text style={styles.transactionTitle}>Электр жарығы төлемі</Text>
              <Text style={styles.transactionSubtitle}>Сәтті өтті</Text>
            </View>
            <Text style={styles.amountNegative}>- $480</Text>
          </View>

          <View style={styles.transactionItem}>
            <View style={[styles.iconBox, { backgroundColor: '#FFB703' }]}>
              <MaterialCommunityIcons name="swap-horizontal" size={20} color="#FFFFFF" />
            </View>
            <View style={styles.transactionInfo}>
              <Text style={styles.transactionTitle}>Кіріс: Жанет аударымы</Text>
            </View>
            <Text style={styles.amountPositive}>+$500</Text>
          </View>

          <View style={styles.transactionItem}>
            <View style={[styles.iconBox, { backgroundColor: '#00B49D' }]}>
              <Ionicons name="wifi" size={18} color="#FFFFFF" />
            </View>
            <View style={styles.transactionInfo}>
              <Text style={styles.transactionTitle}>Интернет төлемі</Text>
              <Text style={styles.transactionSubtitle}>Сәтті өтті</Text>
            </View>
            <Text style={styles.amountNegative}>- $100</Text>
          </View>

        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#4C26C9' },
  topHeader: { height: 110, paddingHorizontal: 20, justifyContent: 'center' },
  headerContent: { flexDirection: 'row', alignItems: 'center' },
  backButton: { marginRight: 15, padding: 5 },
  headerTitle: { color: '#FFFFFF', fontSize: 18, fontWeight: '700' },
  mainContainer: {
    flex: 1,
    backgroundColor: '#F7FAFC',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: 'hidden',
  },
  scrollContent: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 40 },
  cardContainer: { width: '100%', marginBottom: 20 },
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
  visaContainer: { justifyContent: 'center', alignItems: 'center' },
  visaText: { color: '#FFFFFF', fontSize: 22, fontWeight: '900', fontStyle: 'italic', letterSpacing: 3 },
  sectionHeader: { fontSize: 15, fontWeight: '700', color: '#1A202C', marginBottom: 12, marginTop: 10 },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  transactionInfo: { flex: 1 },
  transactionTitle: { fontSize: 15, fontWeight: '600', color: '#1A202C', marginBottom: 2 },
  transactionSubtitle: { fontSize: 12, color: '#A0AEC0' },
  amountNegative: { fontSize: 15, fontWeight: '700', color: '#FF4D6D' },
  amountPositive: { fontSize: 15, fontWeight: '700', color: '#5C3BFF' },
});
