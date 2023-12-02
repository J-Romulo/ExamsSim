import styled from 'styled-components/native';

export const FieldLabel = styled.Text`
  font-size: 16px;
  font-weight: bold;
`;

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
  color: black;
`;
