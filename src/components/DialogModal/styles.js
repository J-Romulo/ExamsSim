import styled from 'styled-components/native';

export const Container = styled.View`
  min-width: 80%;
  width: fit-content;
  height: fit-content;
  background-color: white;
  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;

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
  border-color: #e0edff;
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

export const Message = styled.Text`
  font-size: 15px;
  margin: 10px 0;
  text-align: center;
`;

export const OptionsContainer = styled.View`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  column-gap: 10px;
  margin-top: 20px;
`;

export const Option = styled.TouchableOpacity`
  background-color: ${({ second }) => (second ? '#E0EDFF' : '#095fd9')};
  padding: 10px 2px;
  width: 40%;
  border-radius: 5px;
  border: 1px solid #095fd9;

  display: flex;
  align-items: center;
  justify-content: center;
  align-self: center;
`;

export const BttnText = styled.Text`
  color: ${({ second }) => (second ? '#095fd9' : 'white')};
`;
