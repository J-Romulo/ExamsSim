import styled from 'styled-components/native';

export const FormContainer = styled.View`
  display: flex;
  height: 100%;
`;

export const DropdownFieldContainer = styled.View`
  margin-bottom: 18px;
`;

export const TimeInput = styled.View`
  width: 70%;
  display: flex;
  justify-content: space-between;
`;

export const ErrorMessage = styled.Text`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.red};
`;
export const ButtonContainer = styled.View`
  margin-top: auto;
`;
