import styled from 'styled-components/native';

export const Container = styled.View`
  width: 80%;
  height: 50%;
  background-color: white;
  position: relative;

  display: flex;
  align-items: center;

  margin: auto;
  padding: 10px;
  shadowcolor: '#000';
  shadowoffset: {
    width: 0;
    height: 11;
  }
  shadowopacity: 0.55;
  shadowradius: 14.78;

  elevation: 22;

  border-radius: 5px;
  border-style: solid;
  border-width: 1px;
  border-color: ${(props) => props.theme.colors.secondary};
`;

export const TitleText = styled.Text`
  font-size: 20px;
`;

export const CloseButton = styled.TouchableOpacity`
  width: 25px;
  height: 25px;
  position: absolute;
  background-color: red;
  border-radius: 5px;
  right: 5;
  top: 5;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const AnswersTable = styled.View`
  flex: 1;
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0 5px;
  background-color: ${(props) => props.theme.colors.secondary};
  border-radius: 5px;

  height: 100%;
`;

export const TableHeader = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  padding: 0 5px;

  border-radius: 5px;
  margin-bottom: 5px;
  border-bottom-color: #fff;
  border-bottom-width: 2px;

  & {
    font-weight: bold;
  }
`;

export const TableRow = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  padding: 0 5px;

  border-radius: 5px;
  margin-bottom: 5px;
`;

export const TableColumn = styled.View``;

export const TableHeaderTitle = styled.Text`
  font-size: 15px;
  font-weight: bold;
`;

export const TableData = styled.Text`
  font-size: 15px;
`;
