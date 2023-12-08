import AsyncStorage from '@react-native-async-storage/async-storage';

import { getSubjects } from './SubjectsRepository';

export async function getQuestions() {
  try {
    const questions = JSON.parse(await AsyncStorage.getItem('@questions'));

    return questions ?? [];
  } catch (err) {
    console.log(err);
  }
}

export async function fetchQuestions() {
  try {
    const questions = await getQuestions();

    return questions ?? [];
  } catch (err) {
    console.log(err);
  }
}

export async function addQuestion(question) {
  try {
    let questions = await getQuestions();

    if (questions && questions.length) {
      questions.push(question);
    } else {
      questions = [question];
    }

    await AsyncStorage.setItem('@questions', JSON.stringify(questions));

    return questions;
  } catch (err) {
    console.log(err);
  }
}

export async function saveQuestion(question) {
  try {
    const questions = await getQuestions();

    const new_questions = questions.filter((quest) => quest.id !== question.id);

    new_questions.push(question);

    await AsyncStorage.setItem('@questions', JSON.stringify(new_questions));
  } catch (err) {
    console.log(err);
  }
}

export async function saveQuestions(questions_to_add) {
  try {
    const questions = await getQuestions();

    const new_questions = questions.filter(
      (quest) => !questions_to_add.some((quest_add) => quest_add.id === quest.id)
    );

    await AsyncStorage.setItem(
      '@questions',
      JSON.stringify([...new_questions, ...questions_to_add])
    );
  } catch (err) {
    console.log(err);
  }
}

export async function deleteQuestion(question_id) {
  try {
    const questions = await getQuestions();

    const new_questions = questions.filter((quest) => quest.id !== question_id);

    await AsyncStorage.setItem('@questions', JSON.stringify(new_questions));
  } catch (err) {
    console.log(err);
  }
}

export async function deleteQuestions(questions_ids) {
  try {
    const questions = await getQuestions();

    const new_questions = questions.filter((quest) => !questions_ids.includes(quest.id));

    await AsyncStorage.setItem('@questions', JSON.stringify(new_questions));
  } catch (err) {
    console.log(err);
  }
}

export async function fetchQuestion(question_id) {
  try {
    const questions = await getQuestions();

    const question = questions.find((question) => question.id === question_id);

    return question;
  } catch (err) {
    console.log(err);
  }
}

export async function fetchQuestionWithSubjects(question_id) {
  try {
    const questions = await getQuestions();

    const question = questions.find((question) => question.id === question_id);

    const subjects = await getSubjects();

    const subjects_associated = [];

    question.subjects?.forEach((subject) => {
      const find_subject = subjects.find((elem) => elem.id === subject);

      if (find_subject) {
        subjects_associated.push(find_subject);
      }
    });

    const question_formatted = {
      ...question,
      subjects: subjects_associated,
    };

    return question_formatted;
  } catch (err) {
    console.log(err);
  }
}
