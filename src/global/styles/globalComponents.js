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
