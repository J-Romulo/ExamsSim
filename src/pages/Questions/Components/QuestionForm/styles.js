import styled from 'styled-components/native';

export const ButtonContainer = styled.View`
  margin-top: auto;
  padding-top: 10px;
`;

export const AnswersContainer = styled.View`
  display: flex;
`;

export const AnswersHeader = styled.View`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
`;

export const AddAnswerButton = styled.TouchableOpacity`
  width: 30px;
  height: 30px;
  border-radius: 50px;
  border-style: solid;
  border-color: gray;
  border-width: 1px;
  background-color: ${({ theme }) => theme.colors.card_background};

  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1px;
`;

export const CorrectAnswerContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const ErrorMessage = styled.Text`
  font-size: 13px;
  color: red;
`;

export const RadioButtonContainer = styled.View`
  display: flex;
  align-items: center;
`;

export const RadioButtonLabel = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.secondary_text};
`;
