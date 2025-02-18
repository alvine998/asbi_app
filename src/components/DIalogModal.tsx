import React from 'react';
import {
  Modal,
  View,
  Text,
  Button,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';

interface DialogModalProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  isCloseButton?: boolean;
  children: React.ReactNode;
}

const DialogModal: React.FC<DialogModalProps> = ({
  visible,
  onClose,
  title,
  isCloseButton,
  children,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          {title && <Text style={styles.modalTitle}>{title}</Text>}
          <View style={styles.modalContent}>{children}</View>
          {isCloseButton && (
            <View style={{width: '100%'}}>
              <Button title="Batalkan" onPress={onClose} />
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    paddingTop: 50,
    alignItems: 'center',
    backgroundColor: 'white', // Semi-transparent black background
  } as ViewStyle,
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  } as ViewStyle,
  modalTitle: {
    marginBottom: 15,
    fontSize: 34,
    fontWeight: 'bold',
    textAlign: 'center',
  } as TextStyle,
  modalContent: {
    marginBottom: 20,
  } as ViewStyle,
});

export default DialogModal;
