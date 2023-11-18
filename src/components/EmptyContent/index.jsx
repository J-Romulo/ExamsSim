import { FontAwesome } from '@expo/vector-icons';

import * as S from './styles';

export function EmptyContent({ emptyText }) {
  return (
    <S.Container>
      <FontAwesome name="exclamation-circle" size={75} color="#595959" />
      <S.Text>{emptyText}</S.Text>
    </S.Container>
  );
}
