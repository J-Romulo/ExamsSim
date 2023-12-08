import styled from 'styled-components/native';

export const ExamTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary_text};
`;

export const ExamDescription = styled.Text`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.secondary_text};
`;

export const ItemTitle = styled.Text`
  font-size: 20px;
  color: ${(props) => props.theme.colors.text_on_background};
`;

export const SubjectListContainer = styled.View`
  display: flex;
  max-height: 490px;
  width: 100%;

  padding-top: 10px;
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
