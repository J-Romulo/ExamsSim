import AsyncStorage from '@react-native-async-storage/async-storage';

import { fetchQuestion, getQuestions, saveQuestion, saveQuestions } from './QuestionsRepository';

export async function getSubjects() {
  try {
    const questions = JSON.parse(await AsyncStorage.getItem('@subjects'));

    return questions ?? [];
  } catch (err) {
    console.log(err);
  }
}

export async function fetchSubjects() {
  try {
    const subjects = getSubjects();

    return subjects ?? [];
  } catch (err) {
    console.log(err);
  }
}

export async function fetchSubject(subject_id) {
  try {
    const subjects = await getSubjects();

    const subject = subjects.find((subject) => subject.id === subject_id);

    const questions = await getQuestions();

    const subjects_questions = [];

    questions?.forEach((question) => {
      const find_subject = question.subjects.find((elem) => elem === subject.id);

      if (find_subject) {
        subjects_questions.push(question);
      }
    });

    const subject_formatted = {
      ...subject,
      questions: subjects_questions,
    };

    return subject_formatted;
  } catch (err) {
    console.log(err);
  }
}

export async function fetchSubjectByTitle(subject_title) {
  try {
    const subjects = await getSubjects();

    const subject = subjects.find((subject) => subject.title === subject_title);

    const questions = await getQuestions();

    const subjects_questions = [];

    questions.forEach((question) => {
      const find_subject = question.subjects.find((elem) => elem === subject.id);

      if (find_subject) {
        subjects_questions.push(question);
      }
    });

    const subject_formatted = {
      ...subject,
      questions: subjects_questions,
    };

    return subject_formatted;
  } catch (err) {
    console.log(err);
  }
}

export async function addSubject(subject) {
  try {
    let subjects = await getSubjects();

    if (subjects) {
      subjects.push(subject);
    } else {
      subjects = [subject];
    }

    await AsyncStorage.setItem('@subjects', JSON.stringify(subjects));

    return subjects;
  } catch (err) {
    console.log(err);
  }
}

export async function saveSubject(subject) {
  try {
    const subjects = await getSubjects();

    const new_subjects = subjects.filter((subj) => subj.id !== subject.id);

    new_subjects.push(subject);

    await AsyncStorage.setItem('@subjects', JSON.stringify(new_subjects));
  } catch (err) {
    console.log(err);
  }
}

export async function deleteSubject(subject_id) {
  try {
    const subjects = await getSubjects();

    const new_subjects = subjects.filter((subj) => subj.id !== subject_id);

    await AsyncStorage.setItem('@subjects', JSON.stringify(new_subjects));
  } catch (err) {
    console.log(err);
  }
}

export async function deleteSubjects(subjects_ids) {
  try {
    const subjects = await getSubjects();

    const new_subjects = subjects.filter((subj) => !subjects_ids.includes(subj.id));

    await AsyncStorage.setItem('@subjects', JSON.stringify(new_subjects));
  } catch (err) {
    console.log(err);
  }
}

export async function dissociateQuestionFromSubject(subject_id, question_id) {
  const question = await fetchQuestion(question_id);

  question.subjects = question.subjects.filter((subject) => subject !== subject_id);

  await saveQuestion(question);
}

export async function associateQuestionsToSubject(questions_ids, subject_id) {
  const questions = await getQuestions();

  const questions_to_associate = questions.filter((quest) => questions_ids.includes(quest.id));

  const new_questions = questions_to_associate.map((question) => {
    question.subjects.push(subject_id);

    return question;
  });

  await saveQuestions(new_questions);
}
