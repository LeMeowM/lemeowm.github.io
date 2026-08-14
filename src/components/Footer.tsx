// The footer links live in content/navigation.ts, the copyright line in
// content/profile.ts — edit them there.
import styled from "styled-components";
import { footerLinks } from "@content/navigation";
import { profile } from "@content/profile";

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
    <span>{profile.copyright}</span>
    <Links>
      {footerLinks.map(({ label, url, external }) => (
        <Link
          key={url}
          href={url}
          {...(external
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
        >
          {label}
        </Link>
      ))}
    </Links>
  </FooterWrapper>
);

export default Footer;
