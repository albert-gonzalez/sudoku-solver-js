import React from "react";
import Header from "./components/header/Header";
import Main from "./pages/main/Main";

function App() {
  return (
    <div className="flex flex-col h-full">
      <Header />
      <Main />
    </div>
  );
}

export default App;
