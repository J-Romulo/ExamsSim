import { useIsFocused } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import { FlatList } from 'react-native';

import * as S from './styles';
import { LoadingModal } from '../../../components/LoadingModal';
import { Container } from '../../../global/styles/globalComponents';
import { useStorage } from '../../../hooks/useStorage';

export function QuestionDetails({ route }) {
  const { id } = route.params;
  const { fetchQuestion, loading } = useStorage();
  const [question, setQuestion] = useState();
  const isFocused = useIsFocused();

  async function fetchQuestionItem() {
    const question = await fetchQuestion(id);

    setQuestion(question);
  }

  useEffect(() => {
    if (id) {
      fetchQuestionItem();
    }
  }, [isFocused, id]);

  function RenderQuestion(item) {
    const correctAnswer = Number(question.correct_answer) === Number(item.index);

    return (
      <S.ItemContainer correct={correctAnswer}>
        <S.ItemTitle>{item.item}</S.ItemTitle>
      </S.ItemContainer>
    );
  }

  return (
    <Container>
      <LoadingModal isVisible={loading} />

      <S.QuestionValue>{question?.question}</S.QuestionValue>

      <FlatList
        data={question?.answers}
        renderItem={RenderQuestion}
        keyExtractor={(item) => item}
      />
    </Container>
  );
}
