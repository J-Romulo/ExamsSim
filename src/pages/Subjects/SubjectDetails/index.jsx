import { AntDesign } from '@expo/vector-icons';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import { FlatList } from 'react-native';

import * as S from './styles';
import { EmptyContent } from '../../../components/EmptyContent';
import { LoadingModal } from '../../../components/LoadingModal';
import { Container } from '../../../global/styles/globalComponents';
import { useStorage } from '../../../hooks/useStorage';

export function SubjectDetails({ route }) {
  const { id } = route.params;
  const { fetchSubject, loading } = useStorage();
  const [subject, setSubject] = useState();
  const [refreshing, setRefreshing] = useState(false);

  const isFocused = useIsFocused();
  const { navigate } = useNavigation();

  async function fetchSubjectItem() {
    const subject = await fetchSubject(id);

    setSubject(subject);
  }

  useEffect(() => {
    if (id) {
      fetchSubjectItem();
    }
  }, [isFocused, id]);

  function onRefresh() {
    setRefreshing(true);
    fetchSubjectItem();
    setRefreshing(false);
  }

  function RenderQuestion(item) {
    return (
      <S.ItemContainer
        onPress={() => {
          navigate('question_details_subject', { id: item.item.id });
        }}>
        <S.ItemTitle>{item.item.question}</S.ItemTitle>
      </S.ItemContainer>
    );
  }

  return (
    <Container>
      <LoadingModal isVisible={loading} />
      <S.FieldLabel>Título</S.FieldLabel>
      <S.FieldValue>{subject?.title}</S.FieldValue>

      <S.FieldLabel>Descrição</S.FieldLabel>
      <S.FieldValue>{subject?.description}</S.FieldValue>

      <S.QuestionsHeader>
        <S.FieldLabel>Questões associadas</S.FieldLabel>
        <S.CreateQuestionButton
          onPress={() => {
            navigate('create_question_subject', { id_subject: subject?.id });
          }}>
          <AntDesign name="plus" size={12} color="black" />
        </S.CreateQuestionButton>
      </S.QuestionsHeader>
      <FlatList
        data={subject?.questions}
        renderItem={RenderQuestion}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={EmptyContent({ emptyText: 'Nenhuma questão encontrada' })}
        onRefresh={onRefresh}
        refreshing={refreshing}
      />
    </Container>
  );
}
