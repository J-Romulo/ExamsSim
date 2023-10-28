import styled from 'styled-components/native';

export const InputContainer = styled.View`
  width: 100%;
  display: flex;
  align-items: flex-start;
  margin-bottom: 10px;
`;

export const Label = styled.Text`
  font-size: 18px;
`;

export const ErrorMessage = styled.Text`
  font-size: 13px;
  color: red;
`;
export const TextField = styled.TextInput`
  width: 100%;
  padding: 10px;
  border-width: 1px;
  border-radius: 10px;
  font-size: 15px;
  border-color: ${({ error }) => (error ? 'red' : 'black')};
  background-color: white;
`;
