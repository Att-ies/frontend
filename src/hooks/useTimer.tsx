import { useState, useEffect } from 'react';

interface TimerProps {
  mm: number;
  ss: number;
}

const useTimer = ({ mm, ss }: TimerProps) => {
  const [minutes, setMinutes] = useState(mm);
  const [seconds, setSeconds] = useState(ss);
  const [timer, setTimer] = useState('');

  useEffect(() => {
    const countdown = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(countdown);
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    console.log(minutes, seconds);
    setTimer(`${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`);
    return () => clearInterval(countdown);
  }, [minutes, seconds]);

  return timer;
};

export default useTimer;
