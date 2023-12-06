import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext } from 'react';

export const StorageContext = createContext({});

export function StorageProvider({ children }) {
  async function fetchSubjects() {
    try {
      const subjects = JSON.parse(await AsyncStorage.getItem('@subjects'));

      return subjects;
    } catch (err) {
      console.log(err);
    }
  }

  async function fetchSubject(subject_id) {
    try {
      const subjects = JSON.parse(await AsyncStorage.getItem('@subjects'));

      const subject = subjects.find((subject) => subject.id === subject_id);

      const questions = JSON.parse(await AsyncStorage.getItem('@questions'));

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

  async function fetchSubjectByTitle(subject_title) {
    try {
      const subjects = JSON.parse(await AsyncStorage.getItem('@subjects'));

      const subject = subjects.find((subject) => subject.title === subject_title);

      const questions = JSON.parse(await AsyncStorage.getItem('@questions'));

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

  async function addSubject(subject) {
    try {
      let subjects = JSON.parse(await AsyncStorage.getItem('@subjects'));

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

  async function saveSubject(subject) {
    try {
      const subjects = JSON.parse(await AsyncStorage.getItem('@subjects'));

      const new_subjects = subjects.filter((subj) => subj.id !== subject.id);

      new_subjects.push(subject);

      await AsyncStorage.setItem('@subjects', JSON.stringify(new_subjects));
    } catch (err) {
      console.log(err);
    }
  }

  async function deleteSubject(subject_id) {
    try {
      const subjects = JSON.parse(await AsyncStorage.getItem('@subjects'));

      const new_subjects = subjects.filter((subj) => subj.id !== subject_id);

      await AsyncStorage.setItem('@subjects', JSON.stringify(new_subjects));
    } catch (err) {
      console.log(err);
    }
  }

  async function deleteSubjects(subjects_ids) {
    try {
      const subjects = JSON.parse(await AsyncStorage.getItem('@subjects'));

      const new_subjects = subjects.filter((subj) => !subjects_ids.includes(subj.id));

      await AsyncStorage.setItem('@subjects', JSON.stringify(new_subjects));
    } catch (err) {
      console.log(err);
    }
  }

  async function dissociateQuestionFromSubject(subject_id, question_id) {
    const question = await fetchQuestion(question_id);

    question.subjects = question.subjects.filter((subject) => subject !== subject_id);

    await saveQuestion(question);
  }

  async function associateQuestionsToSubject(questions_ids, subject_id) {
    const questions = JSON.parse(await AsyncStorage.getItem('@questions'));

    const questions_to_associate = questions.filter((quest) => questions_ids.includes(quest.id));

    const new_questions = questions_to_associate.map((question) => {
      question.subjects.push(subject_id);

      return question;
    });

    await saveQuestions(new_questions);
  }

  async function fetchQuestions() {
    try {
      const questions = JSON.parse(await AsyncStorage.getItem('@questions'));

      return questions;
    } catch (err) {
      console.log(err);
    }
  }

  async function addQuestion(question) {
    try {
      let questions = JSON.parse(await AsyncStorage.getItem('@questions'));

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

  async function saveQuestion(question) {
    try {
      const questions = JSON.parse(await AsyncStorage.getItem('@questions'));

      const new_questions = questions.filter((quest) => quest.id !== question.id);

      new_questions.push(question);

      await AsyncStorage.setItem('@questions', JSON.stringify(new_questions));
    } catch (err) {
      console.log(err);
    }
  }

  async function saveQuestions(questions_to_add) {
    try {
      const questions = JSON.parse(await AsyncStorage.getItem('@questions'));

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

  async function deleteQuestion(question_id) {
    try {
      const questions = JSON.parse(await AsyncStorage.getItem('@questions'));

      const new_questions = questions.filter((quest) => quest.id !== question_id);

      await AsyncStorage.setItem('@questions', JSON.stringify(new_questions));
    } catch (err) {
      console.log(err);
    }
  }

  async function deleteQuestions(questions_ids) {
    try {
      const questions = JSON.parse(await AsyncStorage.getItem('@questions'));

      const new_questions = questions.filter((quest) => !questions_ids.includes(quest.id));

      await AsyncStorage.setItem('@questions', JSON.stringify(new_questions));
    } catch (err) {
      console.log(err);
    }
  }

  async function fetchQuestion(question_id) {
    try {
      const questions = JSON.parse(await AsyncStorage.getItem('@questions'));

      const question = questions.find((question) => question.id === question_id);

      return question;
    } catch (err) {
      console.log(err);
    }
  }

  async function addExam(exam) {
    try {
      let exams = JSON.parse(await AsyncStorage.getItem('@exams'));

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

  async function fetchExam(exam_id) {
    try {
      const exams = JSON.parse(await AsyncStorage.getItem('@exams'));

      const exam = exams.find((exam) => exam.id === exam_id);

      return exam;
    } catch (err) {
      console.log(err);
    }
  }

  async function fetchExams() {
    try {
      const exams = JSON.parse(await AsyncStorage.getItem('@exams'));

      return exams;
    } catch (err) {
      console.log(err);
    }
  }

  async function deleteExam(exam_id) {
    try {
      const exams = JSON.parse(await AsyncStorage.getItem('@exams'));

      const new_exams = exams.filter((quest) => quest.id !== exam_id);

      await AsyncStorage.setItem('@exams', JSON.stringify(new_exams));
    } catch (err) {
      console.log(err);
    }
  }

  async function deleteExams(exams_ids) {
    try {
      const exams = JSON.parse(await AsyncStorage.getItem('@exams'));

      const new_exams = exams.filter((quest) => !exams_ids.includes(quest.id));

      await AsyncStorage.setItem('@exams', JSON.stringify(new_exams));
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <StorageContext.Provider
      value={{
        addExam,
        deleteExam,
        deleteExams,
        fetchExam,
        fetchExams,

        addQuestion,
        associateQuestionsToSubject,
        deleteQuestion,
        deleteQuestions,
        dissociateQuestionFromSubject,
        fetchQuestion,
        fetchQuestions,
        saveQuestion,

        addSubject,
        deleteSubject,
        deleteSubjects,
        fetchSubject,
        fetchSubjectByTitle,
        fetchSubjects,
        saveSubject,
      }}>
      {children}
    </StorageContext.Provider>
  );
}
