import styled from 'styled-components/native';

export const Container = styled.View`
  min-width: 80%;
  width: fit-content;
  height: fit-content;
  background-color: ${(props) => props.theme.colors.card_background};
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
  border-color: ${(props) => props.theme.colors.background};
`;

export const CloseButton = styled.TouchableOpacity`
  width: 25px;
  height: 25px;
  position: absolute;
  background-color: ${(props) => props.theme.colors.red};
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
  color: ${({ theme }) => theme.colors.text_on_background};
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
  background-color: ${({ second, theme }) =>
    second ? theme.colors.secondary : theme.colors.primary};
  padding: 10px 2px;
  width: 40%;
  border-radius: 5px;
  border-width: 1px;
  border-style: solid;
  border-color: ${({ theme }) => theme.colors.primary};

  display: flex;
  align-items: center;
  justify-content: center;
  align-self: center;
`;

export const BttnText = styled.Text`
  color: ${({ second, theme }) =>
    second ? theme.colors.terciary : theme.colors.background_surface};
`;
