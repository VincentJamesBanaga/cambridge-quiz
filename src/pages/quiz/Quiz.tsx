import { useMemo } from "react";

// Router
import { useNavigate, useParams } from "react-router-dom";

// Context
import { useAppContext } from "@/hooks/useAppContext";

// Components
import { Button, Layout, Text } from "@/components";

type UserParams = {
  activity: string;
  quiz: string;
  round: string;
};

const Quiz = () => {
  const navigate = useNavigate();
  const { data, setData } = useAppContext();
  const { activity, round, quiz } = useParams<UserParams>();

  const activityItem = useMemo(() => {
    return data.activities.find((a) => a.order === Number(activity));
  }, [data, activity]);

  // Round
  const roundItem = useMemo(() => {
    return activityItem?.questions.find((q) => q.order === Number(round));
  }, [activityItem, round]);

  const roundTitle =
    roundItem && "round_title" in roundItem ? roundItem?.round_title : null;

  // Quiz
  const quizItem = useMemo(() => {
    return (
      (roundItem && "questions" in roundItem
        ? roundItem?.questions
        : activityItem?.questions) ?? []
    ).find((q) => q.order === Number(quiz));
  }, [activityItem, quiz, roundItem]);

  const feedback =
    quizItem && "feedback" in quizItem ? quizItem.feedback.split("*") : null;

  // Update Data
  const handleAnswer = (answer: boolean) => {
    const qLength = (
      (roundItem && "questions" in roundItem
        ? roundItem?.questions
        : activityItem?.questions) ?? []
    ).length;

    const rLength = (
      (roundItem && "questions" in roundItem ? roundItem?.questions : []) ?? []
    ).length;

    setData({
      type: "UPDATE_DATA",
      payload: {
        answer,
        activityId: Number(activity),
        roundId: Number(round),
        quizId: Number(quiz),
      },
    });

    if (
      Number(round) &&
      Number(round) !== rLength &&
      qLength === Number(quiz)
    ) {
      navigate(`/${activity}/${Number(round) + 1}/${Number(1)}`);
    } else if (qLength !== Number(quiz)) {
      navigate(`/${activity}/${Number(round)}/${Number(quiz) + 1}`);
    } else {
      navigate(`/${activity}/result`);
    }
  };

  const footerElem = (
    <>
      <Button
        onClick={() => {
          handleAnswer(true);
        }}
      >
        <Text
          style={{
            textAlign: "center",
            textTransform: "uppercase",
          }}
        >
          Correct
        </Text>
      </Button>
      <Button
        onClick={() => {
          handleAnswer(false);
        }}
      >
        <Text
          style={{
            textAlign: "center",
            textTransform: "uppercase",
          }}
        >
          Incorrect
        </Text>
      </Button>
    </>
  );

  return (
    <Layout
      header={
        <Text
          style={{
            width: "100%",
            fontWeight: 600,
            textTransform: "uppercase",
          }}
        >
          {`${activityItem?.activity_name}${
            roundTitle ? ` / ${roundTitle}` : ""
          }`}
        </Text>
      }
      footer={footerElem}
    >
      <div
        style={{
          padding: "0 2rem",
        }}
      >
        <Text
          style={{
            fontSize: "3rem",
            fontWeight: 600,
            marginTop: "2rem",
          }}
        >
          Q{quiz}.
        </Text>
      </div>
      <article
        style={{
          backgroundColor: "#f9f9f9",
          border: "1px solid #2699fb",
          margin: "2rem 0",
        }}
      >
        <Text
          style={{
            padding: "2rem",
          }}
        >
          {feedback?.[0]}
          <strong>{feedback?.[1]}</strong>
          {feedback?.[2]}
        </Text>
      </article>
    </Layout>
  );
};

export default Quiz;
