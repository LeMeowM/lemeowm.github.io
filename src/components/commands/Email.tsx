import { profile } from "@content/profile";
import { Wrapper } from "../styles/Output.styled";
import { Link } from "../styles/Welcome.styled";

const Email: React.FC = () => {
  return (
    <Wrapper>
      <Link href={`mailto:${profile.email}`}>{profile.email}</Link>
    </Wrapper>
  );
};

export default Email;
