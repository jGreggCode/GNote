import { Route, Routes } from "react-router";

// PAGES
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import NoteDetailPage from "./pages/NoteDetailPage";
import toast from "react-hot-toast";

const App = () => {
  return (
    <div>
      <button onClick={() => toast.error("congrats")}>Click Me</button>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/note/:id" element={<NoteDetailPage />} />
      </Routes>
    </div>
    // https://www.youtube.com/watch?v=F9gB5b4jgOI&t=4946s
  );
};

export default App;
