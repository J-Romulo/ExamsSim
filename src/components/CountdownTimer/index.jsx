import { Text } from 'react-native';

import * as S from './styles';

export function CountdownTimer({ hours, minutes, seconds }) {
  return (
    <S.TimerContainer>
      <S.Time>{String(hours).padStart('2', '0')}</S.Time>
      <Text>:</Text>
      <S.Time>{String(minutes).padStart('2', '0')}</S.Time>
      <Text>:</Text>
      <S.Time>{String(seconds).padStart('2', '0')}</S.Time>
    </S.TimerContainer>
  );
}
