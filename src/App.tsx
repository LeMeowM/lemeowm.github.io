import { createContext, useEffect, useRef, useState } from "react";
import styled, { DefaultTheme, ThemeProvider } from "styled-components";
import { asciiBackground } from "asciify-engine";
import { useTheme } from "./hooks/useTheme";
import GlobalStyle from "./components/styles/GlobalStyle";
import Terminal from "./components/Terminal";
import Banner from "./components/Banner";
import Footer from "./components/Footer";
import StatusBar from "./components/StatusBar";
import Sidebar from "./components/Sidebar";

const Page = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const ContentRow = styled.div`
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: row;
  overflow: hidden;
`;

const LeftColumn = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const Main = styled.main`
  flex: 1;
  min-height: 0;
  overflow: hidden;
  position: relative;
`;

const RightPanel = styled.aside`
  width: clamp(260px, 33%, 460px);
  border-left: 1px solid ${({ theme }) => theme.colors?.primary};
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  overflow: hidden;

  @media (max-width: 900px) {
    display: none;
  }
`;

export const themeContext = createContext<
  ((switchTheme: DefaultTheme) => void) | null
>(null);

function App() {
  const { theme, themeLoaded, setMode } = useTheme();
  const [selectedTheme, setSelectedTheme] = useState(theme);
  const [cwd, setCwd] = useState<string[]>(["~"]);
  const [externalCommand, setExternalCommand] = useState<string | null>(null);
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    window.addEventListener(
      "keydown",
      e => {
        ["ArrowUp", "ArrowDown"].indexOf(e.code) > -1 && e.preventDefault();
      },
      false
    );
  }, []);

  useEffect(() => {
    setSelectedTheme(theme);
  }, [themeLoaded]);

  useEffect(() => {
    const themeColor = theme.colors?.body;
    const metaThemeColor = document.querySelector("meta[name='theme-color']");
    const maskIcon = document.querySelector("link[rel='mask-icon']");
    const metaMsTileColor = document.querySelector(
      "meta[name='msapplication-TileColor']"
    );
    metaThemeColor && metaThemeColor.setAttribute("content", themeColor);
    metaMsTileColor && metaMsTileColor.setAttribute("content", themeColor);
    maskIcon && maskIcon.setAttribute("color", themeColor);
  }, [selectedTheme]);

  useEffect(() => {
    if (!themeLoaded || !mainRef.current) return;
    const bg = asciiBackground(mainRef.current, {
      type: "rain",
      colorScheme: "auto",
      fontSize: 14,
      density: 0.3,
      speed: 0.7,
      accentColor: "auto",
    });
    return () => bg.destroy();
  }, [themeLoaded]);

  const themeSwitcher = (switchTheme: DefaultTheme) => {
    setSelectedTheme(switchTheme);
    setMode(switchTheme);
  };

  return (
    <>
      <h1 className="sr-only" aria-label="Terminal Portfolio">
        Terminal Portfolio
      </h1>
      {themeLoaded && (
        <ThemeProvider theme={selectedTheme}>
          <GlobalStyle />
          <themeContext.Provider value={themeSwitcher}>
            <Page>
              <Banner onCommand={setExternalCommand} />
              <ContentRow>
                <LeftColumn>
                  <Main ref={mainRef}>
                    <Terminal
                      onCwdChange={setCwd}
                      externalCommand={externalCommand}
                      onCommandExecuted={() => setExternalCommand(null)}
                    />
                  </Main>
                </LeftColumn>
                <RightPanel>
                  <Sidebar />
                </RightPanel>
              </ContentRow>
              <StatusBar cwd={cwd} themeName={selectedTheme.name} />
              <Footer />
            </Page>
          </themeContext.Provider>
        </ThemeProvider>
      )}
    </>
  );
}

export default App;
