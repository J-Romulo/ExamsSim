import styled from 'styled-components/native';

export const FieldLabel = styled.Text`
  font-size: 16px;
  font-weight: bold;
`;

export const FieldValue = styled.Text`
  font-size: 16px;
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
    case props.selected && props.finishedExam:
      return props.theme.colors.red;
    case props.selected:
      return props.theme.colors.primary;
    case props.disabled:
      return 'whitesmoke';
    default:
      return 'white';
  }
};

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

  background-color: ${getBackgroundColor};
`;

export const ItemTitle = styled.Text`
  font-size: 20px;
  color: black;
`;

export const ExamHeader = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  margin-top: 20px;
  margin-bottom: 10px;
`;

export const ArrowButton = styled.TouchableOpacity``;

export const QuestionsCount = styled.Text``;

export const FinishButton = styled.TouchableOpacity`
  width: fit-content;
  padding: 0 20px;
  height: 40px;
  border-radius: 10px;

  display: flex;
  align-items: center;
  justify-content: center;
  align-self: center;

  margin-top: 20px;

  background-color: #e14741;
`;

export const SeeReultsButton = styled.TouchableOpacity`
  width: 50%;
  height: 40px;
  border-radius: 10px;

  display: flex;
  align-items: center;
  justify-content: center;
  align-self: center;

  margin-top: 20px;

  background-color: ${(props) => props.theme.colors.green};
`;

export const ButtonText = styled.Text`
  color: white;
`;

export const ButtonsContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  column-gap: 20px;
`;
