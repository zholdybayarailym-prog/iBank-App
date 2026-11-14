import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Modal,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

interface MobilePrepaidConfirmScreenProps {
  phoneNumber?: string;
  amount?: string;
  accountNumber?: string;
  onBack?: () => void;
  onSuccess?: () => void;
}

export default function MobilePrepaidConfirmScreen({
  phoneNumber = '+8564757899',
  amount = '$10',
  accountNumber = '**** **** 6789',
  onBack,
  onSuccess,
}: MobilePrepaidConfirmScreenProps) {
  const [showTouchIdModal, setShowTouchIdModal] = useState(false);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Жоғарғы панель */}
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.headerContent}>
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <Ionicons name="chevron-back" size={24} color="#1A202C" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Растау</Text>
        </View>
      </SafeAreaView>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        <Text style={styles.sectionHeaderTitle}>Транзакция ақпаратын растау</Text>

        {/* Қайдан (From) */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Қайдан</Text>
          <View style={styles.readOnlyInput}>
            <Text style={styles.inputText}>{accountNumber}</Text>
          </View>
        </View>

        {/* Қайда (To) */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Қайда</Text>
          <View style={styles.readOnlyInput}>
            <Text style={styles.inputText}>{phoneNumber}</Text>
          </View>
        </View>

        {/* Сома (Amount) */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Сомасы</Text>
          <View style={styles.readOnlyInput}>
            <Text style={styles.inputText}>{amount}</Text>
          </View>
        </View>

        {/* Touch ID нұсқауы */}
        <Text style={styles.touchIdInstruction}>Транзакцияны растау үшін саусақ ізін пайдаланыңыз</Text>
        
        {/* Саусақ ізі батырмасы */}
        <TouchableOpacity 
          style={styles.fingerprintCenter}
          activeOpacity={0.8}
          onPress={() => setShowTouchIdModal(true)}
        >
          <MaterialCommunityIcons name="fingerprint" size={70} color="#5C3BFF" />
        </TouchableOpacity>

        {/* Растау түймесі */}
        <TouchableOpacity
          style={styles.confirmButton}
          activeOpacity={0.8}
          onPress={onSuccess}
        >
          <Text style={styles.confirmButtonText}>Растау</Text>
        </TouchableOpacity>

      </ScrollView>

      {/* Touch ID модалды терезесі */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={showTouchIdModal}
        onRequestClose={() => setShowTouchIdModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalIconContainer}>
              <MaterialCommunityIcons name="fingerprint" size={40} color="#FF3B30" />
            </View>
            <Text style={styles.modalTitle}>iBank үшін Touch ID</Text>
            <Text style={styles.modalSubtitle}>Қолданбаға кіру / растау</Text>

            <TouchableOpacity 
              style={styles.cancelButton}
              onPress={() => {
                setShowTouchIdModal(false);
                if (onSuccess) onSuccess();
              }}
            >
              <Text style={styles.cancelButtonText}>Болдырмау</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  scrollContent: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 40 },
  
  sectionHeaderTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#718096',
    marginBottom: 20,
  },

  inputGroup: { marginBottom: 16 },
  inputLabel: { fontSize: 14, fontWeight: '600', color: '#718096', marginBottom: 6 },
  readOnlyInput: {
    backgroundColor: '#F7FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 14,
    paddingHorizontal: 16,
    height: 52,
    justifyContent: 'center',
  },
  inputText: { fontSize: 16, color: '#1A202C', fontWeight: '500' },

  touchIdInstruction: {
    fontSize: 13,
    color: '#718096',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 15,
  },
  fingerprintCenter: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },

  confirmButton: {
    backgroundColor: '#5C3BFF',
    height: 52,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#5C3BFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
  },
  confirmButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: 270,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    alignItems: 'center',
    paddingTop: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalIconContainer: {
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 4,
  },
  modalSubtitle: {
    fontSize: 13,
    color: '#3C3C43',
    marginBottom: 20,
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  cancelButton: {
    width: '100%',
    paddingVertical: 12,
    borderTopWidth: 0.5,
    borderTopColor: '#3C3C434D',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButtonText: {
    fontSize: 17,
    color: '#007AFF',
    fontWeight: '400',
  },
});