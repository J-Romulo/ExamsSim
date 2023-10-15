import * as S from './styles'
import { useStorage } from "../../../hooks/useStorage"
import { useState, useEffect } from 'react'
import { LoadingModal } from '../../../components/LoadingModal';
import { FlatList, Text, View } from 'react-native'
import { Container } from '../../../global/styles/globalComponents';

export function SimulateExam({ route }){
    const { id } = route.params;
    const {fetchExam, fetchSubjectByTitle, loading} = useStorage()
    const [ exam, setExam ] = useState()
    const [questions, setQuestions] = useState([])
    const [currentQuestion, setCurrentQuestion] = useState()
    const [currentQuestionindex, setCurrentQuestionIndex] = useState(0)

    async function fetchExamItem(){
        const exam = await fetchExam(id)

        const questions = await Promise.all(
            exam.subjects.map(async (subject) => {
                return await fetchQuestions(subject)
            })
        )

        setExam(exam)
        setQuestions(questions.flat())
        setCurrentQuestion(questions.flat()[0])
    }

    async function fetchQuestions(subject_id){
        const subject = await fetchSubjectByTitle(subject_id)

        return subject.questions
    }

    useEffect(() => {
        if(id){
            fetchExamItem()
        }
    }, [id])

    function nextQuestion(){
        setCurrentQuestion(questions[currentQuestionindex+1])
        setCurrentQuestionIndex(currentQuestionindex+1)
    }

    function RenderQuestion(item){
        return(
            <S.ItemContainer
                onPress={() => {
                    nextQuestion()
                }}
            >
                <S.ItemTitle>{item.item}</S.ItemTitle>
            </S.ItemContainer>
        )
    }

    if(!currentQuestion){
        return(
            <Container>
                <LoadingModal isVisible={loading} />
            </Container>
        )
    }
    return(
        <Container>
            <LoadingModal isVisible={loading} />
            <S.FieldLabel>Questão</S.FieldLabel>
            <S.FieldValue>{currentQuestion.question}</S.FieldValue>

            <S.QuestionsHeader>
                <S.FieldLabel>Alternativas</S.FieldLabel>
            </S.QuestionsHeader>

            <FlatList 
                data={currentQuestion?.answers}
                renderItem={RenderQuestion}
                keyExtractor={(item) => item}
            />
        </Container>
    )
}