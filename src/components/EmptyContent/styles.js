import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;

  margin-top: 20px;
  margin-bottom: 20px;
`;

export const Text = styled.Text`
  font-size: 15px;
  font-style: italic;
  color: ${({ theme }) => theme.colors.secondary_text};
`;
