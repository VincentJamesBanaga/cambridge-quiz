import { useMemo } from "react";

// Router
import { useNavigate, useParams } from "react-router-dom";

// Context
import { useAppContext } from "@/hooks/useAppContext";

// Components
import { Button, Layout, Text, List } from "@/components";
import ResultItem from "./ResultItem";

type UserParams = {
  activity: string;
};

const Result = () => {
  const navigate = useNavigate();
  const { data } = useAppContext();
  const { activity } = useParams<UserParams>();

  const activityItem = useMemo(() => {
    return data.activities.find((a) => a.order === Number(activity));
  }, [data, activity]);

  const headerElem = (
    <>
      <Text
        style={{
          fontWeight: 600,
          textTransform: "uppercase",
        }}
      >
        {activityItem?.activity_name}
      </Text>
      <Text
        style={{
          fontSize: "3rem",
          fontWeight: 600,
          textAlign: "center",
          marginTop: "2rem",
        }}
      >
        Results
      </Text>
    </>
  );

  return (
    <Layout
      header={headerElem}
      footer={
        <Button
          onClick={() => {
            navigate("/");
          }}
        >
          <Text
            style={{
              textAlign: "center",
              textTransform: "uppercase",
            }}
          >
            Home
          </Text>
        </Button>
      }
    >
      <List
        items={(activityItem?.questions ?? []).reduce<
          Array<{ key: number; label: JSX.Element }>
        >((arrayData, item) => {
          if ("questions" in item) {
            const { round_title, questions } = item;
            arrayData.push({
              key: Math.random(),
              label: (
                <Text
                  style={{
                    fontWeight: 600,
                    textAlign: "center",
                    textTransform: "uppercase",
                  }}
                >
                  {round_title}
                </Text>
              ),
            });
            questions.forEach((qItem) => {
              arrayData.push({
                key: Math.random(),
                label: <ResultItem {...qItem} />,
              });
            });
          } else {
            arrayData.push({
              key: Math.random(),
              label: <ResultItem {...item} />,
            });
          }

          return arrayData;
        }, [])}
      />
    </Layout>
  );
};

export default Result;
