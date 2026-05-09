import styled from "styled-components";

const FooterWrapper = styled.footer`
  padding: 0.5rem 1.25rem;
  border-top: 1px solid ${({ theme }) => theme.colors?.text[300]};
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
  font-size: 0.8125rem;
  color: ${({ theme }) => theme.colors?.text[300]};
  user-select: none;
`;

const Links = styled.nav`
  display: flex;
  gap: 1.25rem;

  @media (max-width: 550px) {
    display: none;
  }
`;

const Link = styled.a`
  color: ${({ theme }) => theme.colors?.primary};
  text-decoration: none;
  opacity: 0.8;

  &:hover {
    opacity: 1;
    color: ${({ theme }) => theme.colors?.secondary};
  }
`;

const Footer = () => (
  <FooterWrapper>
    <span>© 2026 Hugo Noublanche</span>
    <Links>
      <Link href="mailto:hugo.noublanche@epfl.ch">hugo.noublanche@epfl.ch</Link>
      <Link
        href="https://github.com/lemeowm"
        target="_blank"
        rel="noopener noreferrer"
      >
        github.com/lemeowm
      </Link>
    </Links>
  </FooterWrapper>
);

export default Footer;
