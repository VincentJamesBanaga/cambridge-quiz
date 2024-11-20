// Route
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Style
import "@/styles/globalStyle.css";

// Context
import { AppProvider } from "./context/AppProvider";

// Components
import Home from "@/pages/home/Home";
import Quiz from "@/pages/quiz/Quiz";
import Result from "@/pages/result/Result";

const App = () => {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:activity/:round/:quiz" element={<Quiz />} />
          <Route path="/:activity/result" element={<Result />} />
        </Routes>
      </Router>
    </AppProvider>
  );
};

export default App;
