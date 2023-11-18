import { AntDesign } from '@expo/vector-icons';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { FlatList } from 'react-native';

import * as S from './styles';
import { EmptyContent } from '../../components/EmptyContent';
import { LoadingModal } from '../../components/LoadingModal';
import { Container, ItemContainer } from '../../global/styles/globalComponents';
import { useStorage } from '../../hooks/useStorage';

export function Questions(props) {
  const { fetchQuestions, loading } = useStorage();
  const [refreshing, setRefreshing] = useState(false);

  const [questions, setQuestions] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);

  const { navigate } = useNavigation();
  const isFocused = useIsFocused();

  async function fetchQuestionsItems() {
    const questions = await fetchQuestions();

    setQuestions(questions);
    setFilteredQuestions(questions);
  }

  useEffect(() => {
    if (isFocused) {
      fetchQuestionsItems();
    }
  }, [isFocused]);

  useEffect(() => {
    if (questions) {
      const filter = questions.filter((questionItem) => {
        return String(questionItem.question).toUpperCase().includes(props.searchText.toUpperCase());
      });

      setFilteredQuestions(filter);
    }
  }, [props.searchText, questions]);

  function onRefresh() {
    setRefreshing(true);
    fetchQuestionsItems();
    setRefreshing(false);
  }

  function RenderSubject(item) {
    return (
      <ItemContainer
        onPress={() => {
          navigate('question_details', { id: item.item.id });
        }}>
        <S.ItemTitle>{item.item.question}</S.ItemTitle>
      </ItemContainer>
    );
  }

  return (
    <Container>
      <LoadingModal isVisible={!questions.length && loading} />
      <FlatList
        data={filteredQuestions}
        renderItem={RenderSubject}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={EmptyContent({ emptyText: 'Nenhuma questão encontrada' })}
        onRefresh={onRefresh}
        refreshing={refreshing}
      />
      <S.CreateButton
        onPress={() => {
          navigate('create_question');
        }}>
        <AntDesign name="plus" size={24} color="black" />
      </S.CreateButton>
    </Container>
  );
}
