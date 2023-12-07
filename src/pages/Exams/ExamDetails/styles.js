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
