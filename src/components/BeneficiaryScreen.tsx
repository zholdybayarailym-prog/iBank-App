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

interface BeneficiaryScreenProps {
  onBack?: () => void;
  onSearch?: () => void;
  onAddBeneficiary?: () => void;
  onSelectBeneficiary?: (name: string, cardNumber: string) => void;
}

export default function BeneficiaryScreen({
  onBack,
  onSearch,
  onAddBeneficiary,
  onSelectBeneficiary,
}: BeneficiaryScreenProps) {
  
  const sections = [
    {
      title: 'Карта нөмірі арқылы аударым',
      data: [
        { name: 'Арайлым Жолдыбай', card: '1278 8980 890', initials: 'АЖ' },
        { name: 'Амина Абдықалыкова', card: '0345 9762 310', initials: 'АА' },
      ],
    },
    {
      title: 'Сол банкке аударым',
      data: [
        { name: 'Айзере Касей', card: '1278 8112 890', initials: 'АК' },
        { name: 'Аяулым Усер', card: '0345 4411 231', initials: 'АУ' },
      ],
    },
    {
      title: 'Басқа банкке аударым',
      data: [
        { name: 'Нұрсұлтан Ерболатұлы', card: '1278 5544 890', initials: 'НЕ' },
        { name: 'Дильназ Маратқызы', card: '0345 7788 231', initials: 'ДМ' },
        { name: 'Бексұлтан Тілеуқұл', card: '1278 9900 890', initials: 'БТ' },
      ],
    },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Жоғарғы панель */}
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.headerContent}>
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <Ionicons name="chevron-back" size={24} color="#1A202C" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Алушылар</Text>
          <TouchableOpacity style={styles.searchButton} onPress={onSearch}>
            <Feather name="search" size={20} color="#1A202C" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {sections.map((section, sIndex) => (
          <View key={sIndex} style={styles.sectionContainer}>
            <Text style={styles.sectionHeader}>{section.title}</Text>
            
            <View style={styles.cardBox}>
              {section.data.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.itemRow,
                    index === section.data.length - 1 && styles.lastItemRow,
                  ]}
                  activeOpacity={0.7}
                  onPress={() => onSelectBeneficiary && onSelectBeneficiary(item.name, item.card)}
                >
                  <View style={styles.avatarPlaceholder}>
                    <Text style={styles.avatarText}>{item.initials}</Text>
                  </View>
                  <View style={styles.infoBox}>
                    <Text style={styles.nameText}>{item.name}</Text>
                    <Text style={styles.cardText}>{item.card}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

      </ScrollView>

      {/* Қалқымалы жаңа алушы қосу батырмасы (+) */}
      <TouchableOpacity 
        style={styles.floatingButton} 
        activeOpacity={0.8}
        onPress={onAddBeneficiary}
      >
        <Ionicons name="add" size={28} color="#FFFFFF" />
      </TouchableOpacity>

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
  backButton: { padding: 4 },
  searchButton: { padding: 4 },
  headerTitle: { color: '#1A202C', fontSize: 18, fontWeight: '700' },

  scrollContent: { paddingHorizontal: 20, paddingTop: 15, paddingBottom: 80 },

  sectionContainer: {
    marginBottom: 20,
  },
  sectionHeader: {
    fontSize: 13,
    color: '#718096',
    fontWeight: '600',
    marginBottom: 8,
    marginLeft: 4,
  },
  cardBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 2,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  lastItemRow: {
    borderBottomWidth: 0,
  },
  avatarPlaceholder: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#EEECFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  avatarText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#5C3BFF',
  },
  infoBox: {
    flex: 1,
  },
  nameText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1A202C',
    marginBottom: 2,
  },
  cardText: {
    fontSize: 13,
    color: '#718096',
  },

  floatingButton: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#5C3BFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#5C3BFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
});