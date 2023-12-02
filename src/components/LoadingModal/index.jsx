import React from 'react';
import { ActivityIndicator, Modal, Text } from 'react-native';

import * as S from './styles';

export function LoadingModal({ isVisible }) {
  return (
    <Modal transparent animationType="none" visible={isVisible}>
      <S.Container>
        <ActivityIndicator animating size="large" style={{ opacity: 1 }} color="#fff" />
      </S.Container>
    </Modal>
  );
}
