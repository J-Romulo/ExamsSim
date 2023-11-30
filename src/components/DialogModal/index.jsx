import { AntDesign, FontAwesome } from '@expo/vector-icons';
import React from 'react';
import Modal from 'react-native-modal';

import * as S from './styles';

export function DialogModal({ state, closeModal, submit }) {
  return (
    <Modal
      visible={state.isOpen}
      hasBackdrop
      backdropColor="black"
      backdropOpacity={0.4}
      onRequestClose={closeModal}>
      <S.Container>
        {state.enableClose && (
          <S.CloseButton onPress={closeModal}>
            <AntDesign name="close" size={24} color="white" />
          </S.CloseButton>
        )}
        <FontAwesome name="exclamation-circle" size={70} color="#595959" />
        <S.Message>{state.message}</S.Message>

        <S.OptionsContainer>
          <S.Option second={false} onPress={submit}>
            <S.BttnText>{state.mainOptMessage}</S.BttnText>
          </S.Option>
        </S.OptionsContainer>
      </S.Container>
    </Modal>
  );
}
