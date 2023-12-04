import * as S from './styles';
import { Label } from '../../global/styles/globalComponents';

export function TextField({ label, error, ...inputProps }) {
  return (
    <S.InputContainer>
      <Label>{label}</Label>
      <S.TextField error={!!error} {...inputProps} />
      {!!error && <S.ErrorMessage>{error.message}</S.ErrorMessage>}
    </S.InputContainer>
  );
}
