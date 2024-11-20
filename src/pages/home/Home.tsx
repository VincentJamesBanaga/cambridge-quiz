// Hooks
import useData from "@/hooks/useData";

// Components
import { Button, Layout, Text, List } from "@/components";
import { Link } from "react-router-dom";

const Home = () => {
  const {
    data: { name, heading, activities },
    loading,
  } = useData();

  const headerElem = (
    <>
      <Text
        style={{
          fontWeight: 600,
          textTransform: "uppercase",
        }}
      >
        CAE
      </Text>
      <Text
        style={{
          fontSize: "3rem",
          fontWeight: 600,
          textAlign: "center",
          marginTop: "2rem",
        }}
      >
        {name}
      </Text>
      <Text
        style={{
          fontSize: "1rem",
          textAlign: "center",
        }}
      >
        {heading}
      </Text>
    </>
  );

  return (
    <Layout
      header={headerElem}
      footer={
        <Button disabled>
          <Text
            style={{
              textAlign: "center",
              textTransform: "uppercase",
            }}
          >
            Result
          </Text>
        </Button>
      }
    >
      {loading ? (
        <Text
          style={{
            textAlign: "center",
            textTransform: "uppercase",
            fontSize: "1rem",
          }}
        >
          Loading...
        </Text>
      ) : (
        <List
          items={activities.map(({ activity_name, questions, order }) => {
            return {
              key: Math.random(),
              label: (
                <Link
                  to={`/${order}/${"round_title" in questions[0] ? 1 : 0}/${1}`}
                  style={{ textDecoration: "none" }}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      textTransform: "uppercase",
                    }}
                  >
                    {activity_name}
                  </Text>
                </Link>
              ),
            };
          })}
        />
      )}
    </Layout>
  );
};

export default Home;
