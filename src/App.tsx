import Home from "./pages/Home";
import Play from "./pages/Play";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import HowToPlay from "./pages/HowToPlay";
import PageNotFound from "./pages/PageNotFound";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route
          path="/play/:cardNumber"
          element={
            <Layout>
              <Play />
            </Layout>
          }
        />
        <Route
          path="/how-to-play"
          element={
            <Layout>
              <HowToPlay />
            </Layout>
          }
        />

        {/* 404 */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
