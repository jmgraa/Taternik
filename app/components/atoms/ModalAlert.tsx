import React from 'react'
import { View, Text, Modal } from 'react-native'
import RoundButton from './RoundButton';
import { icons } from '@/constants';

interface ModalAlertProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  message: string;
}

const ModalAlert: React.FC<ModalAlertProps> = ({ visible, onClose, title, message }) => {
  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
    >
      <View className='flex-1 justify-center items-center bg-black/40'>
        <View className='w-3/4 bg-black/75 rounded-lg p-5'>
          <Text className='text-white text-2xl font-bold mb-3'>{title}</Text>
          <Text className='text-white text-xl mb-5'>{message}</Text>
          <RoundButton
            icon={icons.close}
            onPress={onClose}
            buttonStyle='bg-red-500 ml-auto'
          />
        </View>
      </View>
    </Modal>
  );
}

export default ModalAlert
