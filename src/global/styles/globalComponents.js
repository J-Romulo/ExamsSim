import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  padding: 10px 20px 15px 20px;
  background-color: ${({ theme }) => theme.colors.secondary};
`;

export const ItemContainer = styled.TouchableOpacity`
  width: 100%;
  height: 90px;

  border-radius: 3px;
  border-left-color: ${({ theme }) => theme.colors.primary};
  border-left-width: 4px;

  margin-bottom: 20px;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: white;

  shadowcolor: '#000';
  shadowoffset: {
    width: 0;
    height: 1;
  }
  shadowopacity: 0.22;
  shadowradius: 2.22;

  elevation: 3;
`;
