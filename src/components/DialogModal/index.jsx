import { AntDesign, FontAwesome } from '@expo/vector-icons';
import React from 'react';
import Modal from 'react-native-modal';
import { useTheme } from 'styled-components';

import * as S from './styles';
import { ModalCloseButton } from '../../global/styles/globalComponents';


export function DialogModal({ state, closeModal, submit }) {
  const theme = useTheme();

  return (
    <Modal
      visible={state.isOpen}
      hasBackdrop
      backdropColor="black"
      backdropOpacity={0.4}
      onRequestClose={closeModal}>
      <S.Container>
        {state.enableClose && (
          <ModalCloseButton onPress={closeModal}>
            <AntDesign name="close" size={24} color="white" />
          </ModalCloseButton>
        )}
        <FontAwesome name="exclamation-circle" size={70} color={theme.colors.secondary_text} />
        <S.Message>{state.message}</S.Message>

        <S.OptionsContainer>
          <S.Option second={false} onPress={submit}>
            <S.BttnText>{state.mainOptMessage}</S.BttnText>
          </S.Option>

          {!!state.secondOptMessage && (
            <S.Option second onPress={closeModal}>
              <S.BttnText second>{state.secondOptMessage}</S.BttnText>
            </S.Option>
          )}
        </S.OptionsContainer>
      </S.Container>
    </Modal>
  );
}
