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
