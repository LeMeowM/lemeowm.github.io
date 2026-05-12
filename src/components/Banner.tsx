import styled from "styled-components";

type Props = {
  onCommand: (cmd: string) => void;
};

const BannerWrapper = styled.header`
  padding: 0.5rem 1.25rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors?.text[300]};
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
  font-size: 0.875rem;
  line-height: 1;
  user-select: none;
`;

const User = styled.span`
  color: ${({ theme }) => theme.colors?.secondary};
`;

const Host = styled.span`
  color: ${({ theme }) => theme.colors?.primary};
`;

const Nav = styled.nav`
  color: ${({ theme }) => theme.colors?.text[300]};
  font-size: 0.8125rem;
  letter-spacing: 0.02em;

  @media (max-width: 550px) {
    display: none;
  }
`;

const NavCmd = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: inherit;
  font: inherit;
  padding: 0;
  letter-spacing: inherit;

  &:hover {
    color: ${({ theme }) => theme.colors?.primary};
  }
`;

const Dot = styled.span`
  margin: 0 0.4rem;
  opacity: 0.5;
`;

const Avatar = styled.img`
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.colors?.primary};
  filter: grayscale(40%);
  margin-right: 0.5rem;
  vertical-align: middle;
  flex-shrink: 0;
  object-fit: cover;

  @media (max-width: 550px) {
    display: none;
  }
`;

const navItems: { label: string; cmd: string }[] = [
  { label: "ls", cmd: "ls" },
  { label: "about", cmd: "about" },
  { label: "projects", cmd: "cd projects" },
  { label: "cv", cmd: "cv" },
];

const Banner: React.FC<Props> = ({ onCommand }) => (
  <BannerWrapper>
    <span style={{ display: "flex", alignItems: "center" }}>
      <Avatar src="/Profile.webp" alt="Hugo" />
      <User>visitor</User>@<Host>lemeowm.github.io</Host>:~$
    </span>
    <Nav>
      {navItems.map(({ label, cmd }, i) => (
        <span key={label}>
          <NavCmd onClick={() => onCommand(cmd)}>{label}</NavCmd>
          {i < navItems.length - 1 && <Dot>·</Dot>}
        </span>
      ))}
    </Nav>
  </BannerWrapper>
);

export default Banner;
