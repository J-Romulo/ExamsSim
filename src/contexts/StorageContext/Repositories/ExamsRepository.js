import AsyncStorage from '@react-native-async-storage/async-storage';

import { getSubjects } from './SubjectsRepository';

export async function getExams() {
  try {
    const questions = JSON.parse(await AsyncStorage.getItem('@exams'));

    return questions ?? [];
  } catch (err) {
    console.log(err);
  }
}

export async function addExam(exam) {
  try {
    let exams = await getExams();

    if (exams) {
      exams.push(exam);
    } else {
      exams = [exam];
    }

    await AsyncStorage.setItem('@exams', JSON.stringify(exams));

    return exams;
  } catch (err) {
    console.log(err);
  }
}

export async function fetchExam(exam_id) {
  try {
    const exams = await getExams();

    const exam = exams.find((exam) => exam.id === exam_id);

    return exam;
  } catch (err) {
    console.log(err);
  }
}

export async function fetchExamWithSubjects(exam_id) {
  try {
    const exams = await getExams();
    const subjects = await getSubjects();

    const exam = exams.find((exam) => exam.id === exam_id);

    const exams_subjects = exam.subjects.map((subject) =>
      subjects.find((subj) => subj.title === subject)
    );

    return {
      ...exam,
      subjects: exams_subjects,
    };
  } catch (err) {
    console.log(err);
  }
}

export async function fetchExams() {
  try {
    const exams = await getExams();

    return exams ?? [];
  } catch (err) {
    console.log(err);
  }
}

export async function deleteExam(exam_id) {
  try {
    const exams = await getExams();

    const new_exams = exams.filter((quest) => quest.id !== exam_id);

    await AsyncStorage.setItem('@exams', JSON.stringify(new_exams));
  } catch (err) {
    console.log(err);
  }
}

export async function deleteExams(exams_ids) {
  try {
    const exams = await getExams();

    const new_exams = exams.filter((quest) => !exams_ids.includes(quest.id));

    await AsyncStorage.setItem('@exams', JSON.stringify(new_exams));
  } catch (err) {
    console.log(err);
  }
}

export async function dissociateSubjectFromExam(exam_id, subject_title) {
  const exam = await fetchExam(exam_id);

  console.log(exam);
  exam.subjects = exam.subjects.filter((subject) => subject !== subject_title);

  console.log(exam);
  await saveExam(exam);
}

export async function saveExam(exam) {
  try {
    const exams = await getExams();

    const new_exams = exams.filter((exams) => exams.id !== exam.id);

    new_exams.push(exam);

    await AsyncStorage.setItem('@exams', JSON.stringify(new_exams));
  } catch (err) {
    console.log(err);
  }
}

export async function saveExamResult(exam, result) {
  try {
    const exams = await getExams();

    const new_exams = exams.filter((exams) => exams.id !== exam.id);

    const exam_results = exam.results ?? [];
    exam_results.push({
      date: new Date(),
      correct_answers: result.correctAnswers,
      wrong_answers: result.wrongAnswers,
    });

    exam = {
      ...exam,
      results: exam_results,
    };

    new_exams.push(exam);

    await AsyncStorage.setItem('@exams', JSON.stringify(new_exams));
  } catch (err) {
    console.log(err);
  }
}
