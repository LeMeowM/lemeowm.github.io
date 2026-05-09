import { Wrapper } from "../styles/Output.styled";
import { Link } from "../styles/Welcome.styled";

const Email: React.FC = () => {
  return (
    <Wrapper>
      <Link href="mailto:hugo.noublanche@epfl.ch">hugo.noublanche@epfl.ch</Link>
    </Wrapper>
  );
};

export default Email;
