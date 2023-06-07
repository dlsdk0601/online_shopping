import { useEffect, useState } from "react";
import { range } from "lodash";

const Stars = (props: { starScore: number; className?: string }) => {
  const [starList, setStarList] = useState<number[]>([]);

  useEffect(() => {
    const newArray = range(1, props.starScore + 1);
    setStarList(() => [...newArray]);
  }, [props.starScore]);

  return (
    <ul className={`stars ${props.className && props.className}`}>
      {starList.map((_, index) => (
        <li key={`star-${index}`}>
          <i className="fa fa-star" />
        </li>
      ))}
    </ul>
  );
};

export default Stars;
