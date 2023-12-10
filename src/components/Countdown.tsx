import React, { useState, useEffect } from "react";

interface CountdownProps {
  isCounting: boolean;
  time?: number;
}

const Countdown: React.FC<CountdownProps> = ({ isCounting, time }) => {
  const [count, setCount] = useState(time || 60);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isCounting) {
      interval = setInterval(() => {
        setCount((prevCount) => prevCount - 1);
      }, 1000 * count);
    }

    return () => {
      setCount(time || 60);
      clearInterval(interval);
    };
  }, [isCounting]);

  return (
    <p className="mt-4 text-sm text-gray-500">
      You can request Ether in {count} minutes
    </p>
  );
};

export default Countdown;
