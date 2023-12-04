import styled from 'styled-components/native';

export const MenuItem = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const MenuText = styled.Text`
  font-size: 17px;
  color: ${({ theme }) => theme.colors.text_on_background};
`;
