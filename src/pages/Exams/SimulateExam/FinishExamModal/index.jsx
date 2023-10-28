import { AntDesign } from '@expo/vector-icons';
import React, { useState } from 'react';
import Modal from 'react-native-modal';

import * as S from './styles';

export function FinishExamModal() {
  const [isModalVisible, setModalVisible] = useState(true);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <Modal visible={isModalVisible} hasBackdrop backdropColor="black" backdropOpacity={0.4}>
      <S.Container>
        <S.CloseButton onPress={toggleModal}>
          <AntDesign name="close" size={24} color="white" />
        </S.CloseButton>

        <S.TitleText>Simulado finalizado!</S.TitleText>
        <S.TitleText>Confira seu resultado:</S.TitleText>
      </S.Container>
    </Modal>
  );
}
