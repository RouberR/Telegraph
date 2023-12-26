import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';

import {useStyles} from '../utils/hooks';
import {TColors} from '../utils/theme/colors';
import Modal from 'react-native-modal';

type IModalCustomProps = {
  isModalVisible: boolean;
  subTitle?: string;
  title?: string;
  setIsModalVisible: (isVisible: boolean) => void;
};

export const ModalCustom: React.FC<IModalCustomProps> = ({
  isModalVisible = false,
  subTitle = 'An error occurred',
  title = 'Error',
  setIsModalVisible,
}) => {
  const {colors, styles} = useStyles(createStyles);

  const handleClose = () => {
    setIsModalVisible(false);
  };
  return (
    <Modal
      isVisible={isModalVisible}
      onBackdropPress={handleClose}
      animationIn="fadeIn"
      animationOut="fadeOut"
      useNativeDriver={true}
      hideModalContentWhileAnimating={true}
      backdropTransitionOutTiming={0}
      animationInTiming={500}
      animationOutTiming={500}
      avoidKeyboard={true}>
      <View style={styles.modalContainer}>
        <Text style={styles.modalTitle}>{title}</Text>
        <Text style={styles.subTitle}>{subTitle}</Text>
        <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const createStyles = (colors: TColors) =>
  StyleSheet.create({
    modalContainer: {
      backgroundColor: colors.white,
      padding: 20,
      borderRadius: 10,
    },
    modalTitle: {
      fontSize: 22,
      fontWeight: 'bold',
      marginBottom: 10,
      textAlign: 'center',
      color: colors.red,
    },
    subTitle: {
      fontSize: 16,
      marginBottom: 20,
    },
    closeButton: {
      backgroundColor: colors.primary,
      padding: 10,
      borderRadius: 16,
      alignSelf: 'flex-end',
    },
    closeButtonText: {
      color: colors.white,
      fontSize: 16,
    },
  });
