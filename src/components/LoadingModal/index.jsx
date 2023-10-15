import { ActivityIndicator, Modal, Text } from 'react-native';
import * as S from './styles'
import React from 'react';

export function LoadingModal({isVisible}){
    return (
        <Modal
          transparent={true}
          animationType={'none'}
          visible={isVisible}
        >
          <S.Container>
            <ActivityIndicator animating={true} size="large" style={{opacity:1}} color="#fff" />
          </S.Container>
        </Modal>
    );
}