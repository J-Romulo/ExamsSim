import { AntDesign, Ionicons } from '@expo/vector-icons';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { useEffect, useReducer, useState } from 'react';
import { FlatList, BackHandler } from 'react-native';
import { useTheme } from 'styled-components';

import { ExamsReducer, ExamsReducerActions } from './reducer';
import * as S from './styles';
import { EmptyContent } from '../../components/EmptyContent';
import { LoadingModal } from '../../components/LoadingModal';
import {
  Container,
  ItemContainer,
  SelectedItemOverlay,
} from '../../global/styles/globalComponents';
import { useStorage } from '../../hooks/useStorage';

export function Exams(props) {
  const theme = useTheme();

  const [loading, setLoading] = useState(false);
  const { fetchExams, deleteExams } = useStorage();
  const [refreshing, setRefreshing] = useState(false);

  const [state, dispatch] = useReducer(ExamsReducer, {
    exams: [],
    filteredExams: [],
    selectedExams: [],
    selectingExams: false,
  });

  const { exams, filteredExams, selectedExams, selectingExams } = state;

  const { navigate } = useNavigation();
  const isFocused = useIsFocused();

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      if (selectingExams) {
        dispatch({ type: ExamsReducerActions.RESET_SELECTION });
        return true;
      }
    });

    return () => backHandler.remove();
  }, [selectedExams]);

  async function fetchExamItems() {
    setLoading(true);

    const exams_fetched = await fetchExams();
    dispatch({ type: ExamsReducerActions.SET_EXAMS, payload: exams_fetched });

    setLoading(false);
  }

  useEffect(() => {
    if (isFocused) {
      onRefresh();
    }
  }, [isFocused]);

  useEffect(() => {
    if (exams && exams.length) {
      const filter = exams.filter((exam) => {
        return String(exam.title).toUpperCase().includes(props.searchText.toUpperCase());
      });

      dispatch({ type: ExamsReducerActions.SET_FILTERED, payload: filter });
    }
  }, [props.searchText, exams]);

  function onRefresh() {
    setRefreshing(true);
    fetchExamItems();
    setRefreshing(false);
  }

  function handleLongPress(item) {
    if (!selectingExams) dispatch({ type: ExamsReducerActions.TOGGLE_SELECTING });

    if (selectedExams.includes(item.id)) {
      const newExamsSelected = selectedExams.filter((listItem) => listItem !== item.id);

      if (newExamsSelected.length === 0) dispatch({ type: ExamsReducerActions.TOGGLE_SELECTING });

      return dispatch({
        type: ExamsReducerActions.SET_SELECTED,
        payload: [...newExamsSelected],
      });
    }

    dispatch({
      type: ExamsReducerActions.SET_SELECTED,
      payload: [...selectedExams, item.id],
    });
  }

  async function handleDeleteSelectedItems() {
    await deleteExams(selectedExams);
    dispatch({ type: ExamsReducerActions.RESET_SELECTION });
    onRefresh();
  }

  function getSelected(item) {
    return selectedExams.includes(item.id);
  }

  function RenderExams(item) {
    const isExamSelected = getSelected(item.item);

    return (
      <ItemContainer
        onPress={() => {
          if (selectingExams) handleLongPress(item.item);
          else navigate('exam_details', { id: item.item.id });
        }}
        onLongPress={() => handleLongPress(item.item)}>
        <S.ItemTitle>{item.item.title}</S.ItemTitle>
        {isExamSelected && <SelectedItemOverlay />}
      </ItemContainer>
    );
  }

  return (
    <Container>
      <LoadingModal isVisible={!filteredExams.length && loading} />
      <FlatList
        data={filteredExams}
        renderItem={RenderExams}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={EmptyContent({ emptyText: 'Nenhum simulado encontrado' })}
        onRefresh={onRefresh}
        refreshing={refreshing}
      />
      {selectingExams ? (
        <S.CreateButton onPress={handleDeleteSelectedItems}>
          <Ionicons name="trash-bin" size={24} color={theme.colors.text_on_background} />
        </S.CreateButton>
      ) : (
        <S.CreateButton
          onPress={() => {
            navigate('create_exam');
          }}>
          <AntDesign name="plus" size={24} color={theme.colors.text_on_background} />
        </S.CreateButton>
      )}
    </Container>
  );
}
