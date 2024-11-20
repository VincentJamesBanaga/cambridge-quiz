import React from "react";

// Interface
import { AnswerItem } from "@/schema/quizInterface";

// Components
import { Text } from "@/components";

type ResultItemProps = {
  order: number;
  is_correct: boolean;
  user_answers: AnswerItem[];
};

const ResultItem: React.FC<ResultItemProps> = ({
  order,
  is_correct,
  user_answers,
}) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 1rem",
      }}
    >
      <Text
        style={{
          textAlign: "center",
          textTransform: "uppercase",
        }}
      >
        Q{order}
      </Text>
      <Text
        style={{
          textAlign: "center",
          textTransform: "uppercase",
          fontWeight: 600,
        }}
      >
        {is_correct === user_answers?.[0]?.answer ? "Correct" : "Wrong"}
      </Text>
    </div>
  );
};

export default ResultItem;
