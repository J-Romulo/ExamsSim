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
  FloatingActionButton,
  ItemContainer,
  SelectedItemOverlay,
} from '../../global/styles/globalComponents';
import { useStorage } from '../../hooks/useStorage';

export function Questions(props) {
  const theme = useTheme();

  const { route } = props;

  const [loading, setLoading] = useState(false);
  const { fetchQuestions, deleteQuestions, associateQuestionsToSubject } = useStorage();
  const [refreshing, setRefreshing] = useState(false);

  const [state, dispatch] = useReducer(QuestionsReducer, {
    questions: [],
    filteredQuestions: [],
    selectedQuestions: [],
    selectingQuestions: false,
  });

  const { questions, filteredQuestions, selectedQuestions, selectingQuestions } = state;

  const { navigate, goBack } = useNavigation();
  const isFocused = useIsFocused();

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      if (selectingQuestions && !route?.params.add_subject) {
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

  useEffect(() => {
    if (route && route.params.add_subject) {
      dispatch({ type: QuestionsReducerActions.TOGGLE_SELECTING });
    }
  }, [route]);

  function onRefresh() {
    setRefreshing(true);
    fetchQuestionsItems();
    setRefreshing(false);
  }

  function handleLongPress(item) {
    if (!selectingQuestions) dispatch({ type: QuestionsReducerActions.TOGGLE_SELECTING });

    if (selectedQuestions.includes(item.id)) {
      const newQuestionsSelected = selectedQuestions.filter((listItem) => listItem !== item.id);

      if (newQuestionsSelected.length === 0 && !route?.params.add_subject)
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

  async function handleAddToSubjectSelectedItems() {
    await associateQuestionsToSubject(selectedQuestions, route?.params.add_subject);
    dispatch({ type: QuestionsReducerActions.RESET_SELECTION });
    goBack();
  }

  function getSelected(item) {
    return selectedQuestions.includes(item.id);
  }

  function renderActionButton() {
    if (selectingQuestions) {
      if (props.route?.params?.add_subject) {
        return (
          <S.SelectButton onPress={handleAddToSubjectSelectedItems}>
            <S.SelectText>Adicionar à matéria</S.SelectText>
          </S.SelectButton>
        );
      }

      return (
        <FloatingActionButton onPress={handleDeleteSelectedItems}>
          <Ionicons name="trash-bin" size={24} color={theme.colors.text_on_background} />
        </FloatingActionButton>
      );
    }

    return (
      <FloatingActionButton
        onPress={() => {
          navigate('create_question');
        }}>
        <AntDesign name="plus" size={24} color={theme.colors.text_on_background} />
      </FloatingActionButton>
    );
  }

  function RenderQuestions(item) {
    const isQuestionSelected = getSelected(item.item);

    const isSelectingToSubject = selectingQuestions && route?.params.add_subject;
    let alreadyAssociateWithSubject = false;

    if (isSelectingToSubject) {
      alreadyAssociateWithSubject = item.item.subjects.includes(route?.params.add_subject);
    }

    return (
      <ItemContainer
        onPress={() => {
          if (selectingQuestions) handleLongPress(item.item);
          else navigate('question_details', { id: item.item.id });
        }}
        onLongPress={() => handleLongPress(item.item)}
        disabled={alreadyAssociateWithSubject}>
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
        initialNumToRender={20}
        maxToRenderPerBatch={10}
        getItemLayout={(_, index) => ({ length: 90, offset: 90 * index, index })}
      />

      {renderActionButton()}
    </Container>
  );
}
