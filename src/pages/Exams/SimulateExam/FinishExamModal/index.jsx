import { AntDesign } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import Modal from 'react-native-modal';

import * as S from './styles';
import { LoadingModal } from '../../../../components/LoadingModal';


export function FinishExamModal({ questions, isModalVisible, setModalVisible }) {
  const [correctAnswers, setCorrectAnswers] = useState(0);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  useEffect(() => {
    let correctAnswersToParse = 0;
    questions &&
      questions.length > 0 &&
      questions.forEach((question) => {
        if (question.selectedAnswer && question.selectedAnswer == question.correct_answer)
          correctAnswersToParse++;
      });

    setCorrectAnswers(correctAnswersToParse);
  }, [questions]);

  if (!questions) {
    return (
      <Modal visible={isModalVisible} hasBackdrop backdropColor="black" backdropOpacity={0.4}>
        <S.Container>
          <S.CloseButton onPress={toggleModal}>
            <AntDesign name="close" size={24} color="white" />
          </S.CloseButton>
          <LoadingModal isVisible />
        </S.Container>
      </Modal>
    );
  }
  return (
    <Modal visible={isModalVisible} hasBackdrop backdropColor="black" backdropOpacity={0.4}>
      <S.Container>
        <S.CloseButton onPress={toggleModal}>
          <AntDesign name="close" size={24} color="white" />
        </S.CloseButton>

        <S.TitleText>Simulado finalizado!</S.TitleText>
        <S.TitleText>Resultado:</S.TitleText>

        <S.TitleText>
          Você acertou {correctAnswers} de {questions?.length}
        </S.TitleText>

        <S.AnswersTable>
          <S.TableHeader>
            <S.TableColumn style={{ flex: 0.75 }}>
              <S.TableHeaderTitle>Questão</S.TableHeaderTitle>
            </S.TableColumn>

            <S.TableColumn>
              <S.TableHeaderTitle>Selecionada</S.TableHeaderTitle>
            </S.TableColumn>

            <S.TableColumn>
              <S.TableHeaderTitle>Correta</S.TableHeaderTitle>
            </S.TableColumn>
          </S.TableHeader>

          {questions.map((question, index) => {
            const backgroundColor = index % 2 === 0 ? '#FFF' : '#b7d5f0';
            return (
              <S.TableRow style={{ backgroundColor }}>
                <S.TableColumn style={{ flex: 0.5 }}>
                  <S.TableData>#{index + 1}</S.TableData>
                </S.TableColumn>

                <S.TableColumn>
                  <S.TableData>
                    {question.selectedAnswer ? Number(question.selectedAnswer) + 1 : null}
                  </S.TableData>
                </S.TableColumn>

                <S.TableColumn>
                  <S.TableData>{Number(question.correct_answer) + 1}</S.TableData>
                </S.TableColumn>
              </S.TableRow>
            );
          })}
        </S.AnswersTable>
      </S.Container>
    </Modal>
  );
}
