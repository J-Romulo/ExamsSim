import {View, Text} from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import * as S from './styles'
import { useNavigation } from '@react-navigation/native';

export function Exams(){
    const { navigate } = useNavigation();
    
    return(
        <S.Container>
            <Text>
                Simulados
            </Text>
            <S.CreateButton
                onPress={() => {
                    navigate('create_exam')
                }}
            >
                <AntDesign name="plus" size={24} color="black" />
            </S.CreateButton>
        </S.Container>
    )
}