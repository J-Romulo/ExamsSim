import { AntDesign, Ionicons } from '@expo/vector-icons';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { useEffect, useReducer, useState } from 'react';
import { FlatList, BackHandler } from 'react-native';
import { useTheme } from 'styled-components';

import { QuestionsReducer, QuestionsReducerActions } from './reducer';
import * as S from './styles';
import { EmptyContent } from '../../components/EmptyContent';
import { LoadingModal } from '../../components/LoadingModal';
import {
  Container,
  ItemContainer,
  SelectedItemOverlay,
} from '../../global/styles/globalComponents';
import { useStorage } from '../../hooks/useStorage';

export function Questions(props) {
  const theme = useTheme();

  const [loading, setLoading] = useState(false);
  const { fetchQuestions, deleteQuestions } = useStorage();
  const [refreshing, setRefreshing] = useState(false);

  const [state, dispatch] = useReducer(QuestionsReducer, {
    questions: [],
    filteredQuestions: [],
    selectedQuestions: [],
    selectingQuestions: false,
  });

  const { questions, filteredQuestions, selectedQuestions, selectingQuestions } = state;

  const { navigate } = useNavigation();
  const isFocused = useIsFocused();

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      if (selectingQuestions) {
        dispatch({ type: QuestionsReducerActions.RESET_SELECTION });
        return true;
      }
    });

    return () => backHandler.remove();
  }, [selectingQuestions]);

  async function fetchQuestionsItems() {
    setLoading(true);

    const questions_fetched = await fetchQuestions();
    dispatch({ type: QuestionsReducerActions.SET_QUESTIONS, payload: questions_fetched });

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

      dispatch({ type: QuestionsReducerActions.SET_FILTERED, payload: filter });
    }
  }, [props.searchText, questions]);

  function onRefresh() {
    setRefreshing(true);
    fetchQuestionsItems();
    setRefreshing(false);
  }

  function handleLongPress(item) {
    if (!selectingQuestions) dispatch({ type: QuestionsReducerActions.TOGGLE_SELECTING });

    if (selectedQuestions.includes(item.id)) {
      const newQuestionsSelected = selectedQuestions.filter((listItem) => listItem !== item.id);

      if (newQuestionsSelected.length === 0)
        dispatch({ type: QuestionsReducerActions.TOGGLE_SELECTING });

      return dispatch({
        type: QuestionsReducerActions.SET_SELECTED,
        payload: [...newQuestionsSelected],
      });
    }

    dispatch({
      type: QuestionsReducerActions.SET_SELECTED,
      payload: [...selectedQuestions, item.id],
    });
  }

  async function handleDeleteSelectedItems() {
    await deleteQuestions(selectedQuestions);
    dispatch({ type: QuestionsReducerActions.RESET_SELECTION });
    onRefresh();
  }

  function getSelected(item) {
    return selectedQuestions.includes(item.id);
  }

  function RenderQuestions(item) {
    const isQuestionSelected = getSelected(item.item);

    return (
      <ItemContainer
        onPress={() => {
          if (selectingQuestions) handleLongPress(item.item);
          else navigate('question_details', { id: item.item.id });
        }}
        onLongPress={() => handleLongPress(item.item)}>
        <S.ItemTitle>{item.item.question}</S.ItemTitle>
        {isQuestionSelected && <SelectedItemOverlay />}
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
      {selectingQuestions ? (
        <S.CreateButton onPress={handleDeleteSelectedItems}>
          <Ionicons name="trash-bin" size={24} color={theme.colors.text_on_background} />
        </S.CreateButton>
      ) : (
        <S.CreateButton
          onPress={() => {
            navigate('create_question');
          }}>
          <AntDesign name="plus" size={24} color={theme.colors.text_on_background} />
        </S.CreateButton>
      )}
    </Container>
  );
}
