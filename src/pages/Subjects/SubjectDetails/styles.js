import styled from 'styled-components/native';

export const SubjectTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary_text};
`;

export const SubjectDescription = styled.Text`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.secondary_text};
`;

export const QuestionsHeader = styled.View`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;

  margin-bottom: 10px;
  margin-top: 10px;
`;

export const CreateQuestionButton = styled.TouchableOpacity`
  width: 30px;
  height: 30px;
  border-radius: 50px;
  border-style: solid;
  border-color: gray;
  border-width: 1px;
  background-color: ${({ theme }) => theme.colors.buttons_background};

  display: flex;
  align-items: center;
  justify-content: center;
`;

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

export const DeleteButton = styled.TouchableOpacity`
  width: 25px;
  height: 25px;
  border-radius: 50px;
  border-style: solid;
  border-color: ${({ theme }) => theme.colors.buttons_background};
  border-width: 1px;
  background-color: ${({ theme }) => theme.colors.red};

  display: flex;
  align-items: center;
  justify-content: center;

  position: absolute;
  right: 5px;
  top: 5px;
`;
