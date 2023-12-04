import styled from 'styled-components/native';

export const TimerContainer = styled.View`
  display: flex;
  flex-direction: row;
`;

export const Time = styled.Text`
  color: ${(props) => props.theme.colors.text_on_background};
`;
