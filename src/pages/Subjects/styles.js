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
