import { TextInput } from "react-native";
import * as S from './styles'

export function TextField({ label, error, ...inputProps }) {
    return (
        <S.InputContainer>
            <S.Label>{label}</S.Label>
            <S.TextField
                error={!!error}
                {...inputProps}
            />
              {!!error && <S.ErrorMessage>{error.message}</S.ErrorMessage>}
        </S.InputContainer>
    )
}