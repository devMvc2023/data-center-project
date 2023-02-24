import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Global } from "@emotion/react";
import GlobalStyle from "style/global";
import Navbar from "component/element/navbar";
import Router from "routes";
import { Header, Main } from "component/common/page-layout/page-layout";
import { ProfileProvider } from "context/profileProvider";

function App() {
  return (
    <ProfileProvider>
      <BrowserRouter>
        <Global styles={GlobalStyle} />
        <Header>
          <Navbar />
        </Header>
        <Main>
          <Routes>
            <Route path="/*" element={<Router />} />
          </Routes>
        </Main>
      </BrowserRouter>
    </ProfileProvider>
  );
}

export default App;
