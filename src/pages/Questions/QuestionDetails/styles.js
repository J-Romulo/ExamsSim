import styled from 'styled-components/native';

export const FieldValue = styled.Text`
  font-size: 16px;
`;
export const QuestionValue = styled.Text`
  font-size: 25px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary_text};
  margin-bottom: 20px;
`;

export const QuestionsHeader = styled.View`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
`;

const getBackgroundColor = (props) => {
  switch (true) {
    case props.correct:
      return props.theme.colors.green;
    case props.disabled:
      return props.theme.colors.disabled_card_background;
    default:
      return props.theme.colors.card_background;
  }
};

export const ItemContainer = styled.View`
  width: 100%;
  height: 70px;
  border-radius: 10px;
  border-style: solid;
  border-width: 1px;
  border-color: ${(props) => props.theme.colors.lightGray};

  margin-bottom: 20px;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: ${getBackgroundColor};
`;

export const ItemTitle = styled.Text`
  font-size: 20px;
  color: ${(props) => props.theme.colors.text_on_background};
`;

export const SubjectListContainer = styled.View`
  display: flex;
  max-height: 60%;
  width: 100%;

  padding-top: 10px;

  border-top-color: ${({ theme }) => theme.colors.border_color};
  border-top-width: 3px;
`;

export const SubjectListTitle = styled.Text`
  font-size: 22px;
  margin-bottom: 4px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary_text};
`;

export const SubjectListBttn = styled.TouchableOpacity`
  width: 100%;
  height: 50px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
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
