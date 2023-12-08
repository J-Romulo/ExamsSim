import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  padding: 10px 20px 15px 20px;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const ItemContainer = styled.TouchableOpacity`
  width: 100%;
  height: 90px;

  border-radius: 3px;
  border-left-color: ${({ theme }) => theme.colors.border_color};
  border-left-width: 4px;

  margin-bottom: 20px;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: ${({ theme }) => theme.colors.card_background};

  shadowcolor: '#000';
  shadowoffset: {
    width: 0;
    height: 1;
  }
  shadowopacity: 0.22;
  shadowradius: 2.22;

  elevation: 3;
`;

export const SelectedItemOverlay = styled.View`
  position: absolute;
  width: 100%;
  height: 100%;

  background-color: 'rgba(255,0,0,0.5)';
`;

export const DeleteButton = styled.TouchableOpacity`
  width: 20px;
  height: 20px;
  border-radius: 50px;
  border-style: solid;
  border-color: gray;
  border-width: 1px;
  background-color: ${({ theme }) => theme.colors.red};

  display: flex;
  align-items: center;
  justify-content: center;

  position: absolute;
  right: 1px;
`;

export const Label = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.secondary_text};
  margin-bottom: 5px;
`;

export const ModalCloseButton = styled.TouchableOpacity`
  width: 25px;
  height: 25px;
  position: absolute;
  background-color: ${(props) => props.theme.colors.red};
  border-radius: 5px;
  right: 5;
  top: 5;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const FloatingActionButton = styled.TouchableOpacity`
  width: 60px;
  height: 60px;
  border-radius: 50px;
  border-style: solid;
  border-color: gray;
  border-width: 1px;
  background-color: ${({ theme }) => theme.colors.card_background};

  position: absolute;

  right: 25px;
  bottom: 15px;

  display: flex;
  align-items: center;
  justify-content: center;
`;
