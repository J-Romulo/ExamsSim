import { FontAwesome } from '@expo/vector-icons';
import { useTheme } from 'styled-components';

import * as S from './styles';

export function EmptyContent({ emptyText }) {
  const theme = useTheme();

  return (
    <S.Container>
      <FontAwesome name="exclamation-circle" size={75} color={`${theme.colors.secondary_text}`} />
      <S.Text>{emptyText}</S.Text>
    </S.Container>
  );
}
