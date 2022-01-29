import { useEffect, useState } from "react";

interface ICountdownConfig {
  every: "second" | "minute" | "hour";
}

const toTwoDigits = (num: string) => {
  return +num < 10 ? "0" + +num : num;
};

export const useCountdown = (_deadline: number, config: ICountdownConfig) => {
  const [countDown, setCountDown] = useState({
    hours: "00" as string,
    minutes: "00" as string,
    seconds: "00" as string,
  });

  const interval =
    config.every === "second" ? 1000 : config.every === "minute" ? 60000 : config.every === "hour" ? 3600000 : 1000;

  useEffect(() => {
    if (_deadline > 0) {
      if (_deadline >= Date.parse(new Date().toString()) / 1000) {
        setInterval(() => getTimeCountdown(_deadline), interval);
      } else {
        setCountDown({
          hours: toTwoDigits("00"),
          minutes: toTwoDigits("00"),
          seconds: toTwoDigits("00"),
        });
      }
    }

    return () => {
      if (_deadline > 0) {
        getTimeCountdown(_deadline);
      }
    };
  }, [_deadline]);

  const getTimeCountdown = (deadline: number) => {
    const time = deadline * 1000 - Date.parse(new Date().toString());
    return setCountDown({
      hours: toTwoDigits(Math.floor((time / (1000 * 60 * 60)) % 24).toString()),
      minutes: toTwoDigits(Math.floor((time / 1000 / 60) % 60).toString()),
      seconds: toTwoDigits(Math.floor((time / 1000) % 60).toString()),
    });
  };

  return countDown;
};
