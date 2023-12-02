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

export function Exams(props) {
  const theme = useTheme();

  const [loading, setLoading] = useState(false);
  const { fetchExams } = useStorage();
  const [refreshing, setRefreshing] = useState(false);

  const [exams, setExams] = useState([]);
  const [filteredExams, setFilteredExams] = useState([]);

  const { navigate } = useNavigation();
  const isFocused = useIsFocused();

  async function fetchExamItems() {
    setLoading(true);
    const exams_fetched = await fetchExams();

    setExams(exams_fetched);
    setFilteredExams(exams_fetched);
    setLoading(false);
  }

  useEffect(() => {
    if (isFocused && (!exams.length || props.toUpdate)) {
      onRefresh();
    }
  }, [isFocused]);

  useEffect(() => {
    if (exams && exams.length) {
      const filter = exams.filter((exam) => {
        return String(exam.title).toUpperCase().includes(props.searchText.toUpperCase());
      });

      setFilteredExams(filter);
    }
  }, [props.searchText, exams]);

  function onRefresh() {
    setRefreshing(true);
    fetchExamItems();
    setRefreshing(false);
  }

  function RenderExams(item) {
    return (
      <ItemContainer
        onPress={() => {
          navigate('exam_details', { id: item.item.id });
        }}>
        <S.ItemTitle>{item.item.title}</S.ItemTitle>
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
      <S.CreateButton
        onPress={() => {
          navigate('create_exam');
        }}>
        <AntDesign name="plus" size={24} color={theme.colors.text_on_background} />
      </S.CreateButton>
    </Container>
  );
}
