import { AntDesign } from '@expo/vector-icons';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import { FlatList } from 'react-native';

import * as S from './styles';
import { EmptyContent } from '../../../components/EmptyContent';
import { LoadingModal } from '../../../components/LoadingModal';
import { Container, ItemContainer } from '../../../global/styles/globalComponents';
import { useStorage } from '../../../hooks/useStorage';

export function SubjectDetails({ route }) {
  const [loading, setLoading] = useState(false);

  const { id } = route.params;
  const { fetchSubject, dissociateQuestionFromSubject } = useStorage();
  const [subject, setSubject] = useState();
  const [refreshing, setRefreshing] = useState(false);

  const isFocused = useIsFocused();
  const { navigate } = useNavigation();

  async function fetchSubjectItem() {
    setLoading(true);
    const subject = await fetchSubject(id);

    setSubject(subject);
    setLoading(false);
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

  async function dissociateQuestion(question_id) {
    setLoading(true);
    await dissociateQuestionFromSubject(subject.id, question_id);
    fetchSubjectItem();
  }

  function RenderQuestion(item) {
    return (
      <>
        <ItemContainer
          onPress={() => {
            navigate('question_details_subject', { id: item.item.id });
          }}>
          <S.ItemTitle>{item.item.question}</S.ItemTitle>
        </ItemContainer>

        <S.DeleteButton
          onPress={() => {
            dissociateQuestion(item.item.id);
          }}>
          <AntDesign name="minus" size={12} color="white" />
        </S.DeleteButton>
      </>
    );
  }

  return (
    <Container>
      <LoadingModal isVisible={loading} />
      <S.SubjectTitle>{subject?.title}</S.SubjectTitle>

      <S.SubjectDescription>{subject?.description}</S.SubjectDescription>

      <S.QuestionsHeader>
        <S.SubjectTitle>Questões associadas</S.SubjectTitle>
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
