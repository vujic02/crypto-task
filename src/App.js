import "./App.css";
import Header from "./components/Header";
import { ContextWrapper } from "./context/state";
import { Home, CurrencyDetail as Details, Favorites } from "./pages";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <ContextWrapper>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="details/:id" element={<Details />} />
          </Routes>
        </BrowserRouter>
      </ContextWrapper>
    </div>
  );
}

export default App;
