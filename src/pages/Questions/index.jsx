import { AntDesign } from '@expo/vector-icons';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { useTheme } from 'styled-components';

import * as S from './styles';
import { EmptyContent } from '../../components/EmptyContent';
import { LoadingModal } from '../../components/LoadingModal';
import { Container, ItemContainer } from '../../global/styles/globalComponents';
import { useStorage } from '../../hooks/useStorage';

export function Questions(props) {
  const theme = useTheme();

  const [loading, setLoading] = useState(false);
  const { fetchQuestions } = useStorage();
  const [refreshing, setRefreshing] = useState(false);

  const [questions, setQuestions] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);

  const { navigate } = useNavigation();
  const isFocused = useIsFocused();

  async function fetchQuestionsItems() {
    setLoading(true);
    const questions_fetched = await fetchQuestions();

    setQuestions(questions_fetched);
    setFilteredQuestions(questions_fetched);
    setLoading(false);
  }

  useEffect(() => {
    if (isFocused) {
      onRefresh();
    }
  }, [isFocused]);

  useEffect(() => {
    if (questions && questions.length) {
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

  function RenderQuestions(item) {
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
      <LoadingModal isVisible={!filteredQuestions.length && loading} />
      <FlatList
        data={filteredQuestions}
        renderItem={RenderQuestions}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={EmptyContent({ emptyText: 'Nenhuma questão encontrada' })}
        onRefresh={onRefresh}
        refreshing={refreshing}
      />
      <S.CreateButton
        onPress={() => {
          navigate('create_question');
        }}>
        <AntDesign name="plus" size={24} color={theme.colors.text_on_background} />
      </S.CreateButton>
    </Container>
  );
}
