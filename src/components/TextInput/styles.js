import styled from 'styled-components/native';

export const InputContainer = styled.View`
  width: 100%;
  display: flex;
  align-items: flex-start;
  margin-bottom: 18px;
`;

export const ErrorMessage = styled.Text`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.red};
`;
export const TextField = styled.TextInput`
  width: 100%;
  padding: 10px;
  border-width: 1px;
  border-radius: 10px;
  font-size: 15px;
  border-color: ${({ error, theme }) => (error ? theme.colors.red : 'black')};
  background-color: ${({ theme }) => theme.colors.background_surface};
`;
