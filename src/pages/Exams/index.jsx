import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Text } from 'react-native';

import * as S from './styles';
import { Container } from '../../global/styles/globalComponents';

export function Exams() {
  const { navigate } = useNavigation();

  return (
    <Container>
      <Text>Simulados</Text>
      <S.CreateButton
        onPress={() => {
          navigate('create_exam');
        }}>
        <AntDesign name="plus" size={24} color="black" />
      </S.CreateButton>
    </Container>
  );
}
