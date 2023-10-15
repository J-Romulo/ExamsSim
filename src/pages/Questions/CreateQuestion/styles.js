import styled from 'styled-components/native';

export const AnswersContainer = styled.View`
    display: flex;
`

export const AnswersHeader = styled.View`
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
`

export const Label = styled.Text`
    font-size: 16px;
    font-weight: bold;
`

export const AddAnswerButton = styled.TouchableOpacity`
    width: 30px;
    height: 30px;
    border-radius: 50px;
    border-style: solid;
    border-color: gray;
    border-width: 1px;
    background-color: white;

    display: flex;
    align-items: center;
    justify-content: center;
`

export const DeleteAnswerButton = styled.TouchableOpacity`
    width: 20px;
    height: 20px;
    border-radius: 50px;
    border-style: solid;
    border-color: gray;
    border-width: 1px;
    background-color: red;

    display: flex;
    align-items: center;
    justify-content: center;

    position: absolute;
    right: 1px;
`

export const CorrectAnswerContainer = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`

export const ErrorMessage = styled.Text`
    font-size: 13px;
    color: red;
`

export const RadioButtonContainer = styled.View`
    display: flex;
    align-items: center;
`