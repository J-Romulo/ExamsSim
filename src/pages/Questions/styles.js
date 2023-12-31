import styled from 'styled-components/native';

export const ItemContainer = styled.TouchableOpacity`
  width: 100%;
  height: 70px;
  border-radius: 20px;
  border-style: solid;
  border-width: 1px;

  margin-bottom: 20px;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ItemTitle = styled.Text`
  font-size: 20px;
  color: ${({ theme }) => theme.colors.text_on_background};
`;

export const SelectText = styled.Text`
  font-size: 18px;
  color: ${({ theme }) => theme.colors.text_on_background};
`;

export const SelectButton = styled.TouchableOpacity`
  width: fit-content;
  height: 60px;
  padding: 10px;
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
