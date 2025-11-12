import { useEffect, useState } from "react";
import { Clock } from "lucide-react";

interface CountdownTimerProps {
  endTime: Date;
}

export const CountdownTimer = ({ endTime }: CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const difference = endTime.getTime() - Date.now();
    
    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      expired: false,
    };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [endTime]);

  if (timeLeft.expired) {
    return (
      <div className="flex items-center gap-2 rounded-lg border border-destructive bg-destructive/10 p-4">
        <Clock className="h-5 w-5 text-destructive" />
        <span className="font-semibold text-destructive">Đấu giá đã kết thúc</span>
      </div>
    );
  }

  const isUrgent = timeLeft.days === 0 && timeLeft.hours < 1;

  return (
    <div
      className={`flex items-center gap-2 rounded-lg border p-4 ${
        isUrgent
          ? "border-destructive bg-destructive/10 animate-pulse-slow"
          : "border-primary bg-primary/5"
      }`}
    >
      <Clock className={`h-5 w-5 ${isUrgent ? "text-destructive" : "text-primary"}`} />
      <div className="flex items-center gap-2 text-sm font-semibold">
        {timeLeft.days > 0 && (
          <div className="flex flex-col items-center">
            <span className={`text-2xl font-bold ${isUrgent ? "text-destructive" : "text-primary"}`}>
              {timeLeft.days}
            </span>
            <span className="text-xs text-muted-foreground">ngày</span>
          </div>
        )}
        <div className="flex flex-col items-center">
          <span className={`text-2xl font-bold ${isUrgent ? "text-destructive" : "text-primary"}`}>
            {String(timeLeft.hours).padStart(2, "0")}
          </span>
          <span className="text-xs text-muted-foreground">giờ</span>
        </div>
        <span className="text-2xl">:</span>
        <div className="flex flex-col items-center">
          <span className={`text-2xl font-bold ${isUrgent ? "text-destructive" : "text-primary"}`}>
            {String(timeLeft.minutes).padStart(2, "0")}
          </span>
          <span className="text-xs text-muted-foreground">phút</span>
        </div>
        <span className="text-2xl">:</span>
        <div className="flex flex-col items-center">
          <span className={`text-2xl font-bold ${isUrgent ? "text-destructive" : "text-primary"}`}>
            {String(timeLeft.seconds).padStart(2, "0")}
          </span>
          <span className="text-xs text-muted-foreground">giây</span>
        </div>
      </div>
    </div>
  );
};
