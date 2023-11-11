import { useState, useEffect } from 'react';

export function useCountdown({ hours, minutes, seconds, question_id }) {
  const countDownDate = new Date();
  countDownDate.setHours(countDownDate.getHours() + Number(hours));
  countDownDate.setMinutes(countDownDate.getMinutes() + Number(minutes));
  countDownDate.setSeconds(countDownDate.getSeconds() + Number(seconds));

  const [countDown, setCountDown] = useState(countDownDate.getTime() - new Date().getTime());

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date();
      const timeRemaining = countDownDate - now;

      if (timeRemaining <= 0) {
        clearInterval(intervalId);
        setCountDown(0);
      } else {
        setCountDown(timeRemaining);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [hours, minutes, seconds, question_id]);

  return getReturnValues(countDown);
}

function getReturnValues(countDown) {
  // calculate time left
  const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
  const hours = Math.floor((countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

  return [days, hours, minutes, seconds];
}
