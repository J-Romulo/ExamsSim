import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  margin-right: -16px;
`;
export const TextField = styled.TextInput`
  width: 80%;
  height: 50px;
  padding: 10px;
  border-width: 1px;
  border-radius: 10px;
  border-color: white;
  font-size: 15px;
`;

export const CreateButton = styled.TouchableOpacity`
  width: 50px;
  height: 60px;
  border-radius: 50px;

  display: flex;
  align-items: center;
  justify-content: center;
`;
