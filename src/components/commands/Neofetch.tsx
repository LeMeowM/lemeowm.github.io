import styled, { useTheme } from "styled-components";
import Panel from "../Panel";

const startTime = Date.now();

const Container = styled.div`
  display: flex;
  gap: 2.5rem;
  margin-top: 0.25rem;
  margin-bottom: 0.75rem;
  flex-wrap: wrap;
`;

const Art = styled.pre`
  color: ${({ theme }) => theme.colors?.primary};
  line-height: 1.4;
  flex-shrink: 0;
`;

const Info = styled.div`
  line-height: 1.75rem;
`;

const Label = styled.span`
  color: ${({ theme }) => theme.colors?.secondary};
  font-weight: 700;
`;

const Sep = styled.div`
  color: ${({ theme }) => theme.colors?.text[300]};
  margin-bottom: 0.25rem;
`;

const Swatches = styled.div`
  display: flex;
  gap: 0.25rem;
  margin-top: 0.25rem;
`;

const Swatch = styled.span<{ bg: string }>`
  display: inline-block;
  width: 1.25rem;
  height: 1.25rem;
  background-color: ${({ bg }) => bg};
  border-radius: 2px;
`;

const CAT_ART = `
  /\\_/\\
 ( ^.^ )
  > ~ <
  |   |
 (_|_|_)
`.trimStart();

const Neofetch: React.FC = () => {
  const theme = useTheme();

  const elapsed = Math.floor((Date.now() - startTime) / 1000);
  const uptime =
    elapsed < 60
      ? `${elapsed}s`
      : `${Math.floor(elapsed / 60)}m ${elapsed % 60}s`;

  const resolution =
    typeof window !== "undefined"
      ? `${window.innerWidth} × ${window.innerHeight}`
      : "unknown";

  const swatchColors = [
    theme.colors?.body,
    theme.colors?.primary,
    theme.colors?.secondary,
    theme.colors?.text[100],
    theme.colors?.text[200],
    theme.colors?.text[300],
  ].filter(Boolean) as string[];

  const rows: [string, string][] = [
    ["user", "hugo@lemeowm.github.io"],
    ["os", "lemeowm.github.io"],
    ["host", "Terminal Portfolio"],
    ["kernel", "React 18 + TypeScript 5"],
    ["shell", "vite-react-tsx"],
    ["resolution", resolution],
    ["theme", theme.name],
    ["uptime", uptime],
    ["langs", "Python, Rust, Java, C, Scala, TS, Lua, SQL"],
    ["domains", "RE · Crypto · Systems · Verification"],
  ];

  return (
    <Panel title="neofetch">
      <Container>
        <Art>{CAT_ART}</Art>
        <Info>
          <div>
            <Label>hugo</Label>@<Label>lemeowm.github.io</Label>
          </div>
          <Sep>{"─".repeat(32)}</Sep>
          {rows.map(([label, value]) => (
            <div key={label}>
              <Label>{label}</Label>: {value}
            </div>
          ))}
          <Swatches>
            {swatchColors.map(c => (
              <Swatch key={c} bg={c} title={c} />
            ))}
          </Swatches>
        </Info>
      </Container>
    </Panel>
  );
};

export default Neofetch;
