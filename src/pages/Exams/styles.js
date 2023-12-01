import styled from 'styled-components/native';

export const CreateButton = styled.TouchableOpacity`
  width: 60px;
  height: 60px;
  border-radius: 50px;
  border-style: solid;
  border-color: gray;
  border-width: 1px;
  background-color: white;

  position: absolute;

  right: 25px;
  bottom: 15px;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ItemTitle = styled.Text`
  font-size: 20px;
  color: black;
`;
