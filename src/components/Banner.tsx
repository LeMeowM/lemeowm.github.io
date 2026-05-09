import styled from "styled-components";

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

const Dot = styled.span`
  margin: 0 0.4rem;
  opacity: 0.5;
`;

const Banner = () => (
  <BannerWrapper>
    <span>
      <User>visitor</User>@<Host>lemeowm.github.io</Host>:~$
    </span>
    <Nav>
      {["ls", "about", "projects", "cv"].map((cmd, i, arr) => (
        <span key={cmd}>
          {cmd}
          {i < arr.length - 1 && <Dot>·</Dot>}
        </span>
      ))}
    </Nav>
  </BannerWrapper>
);

export default Banner;
