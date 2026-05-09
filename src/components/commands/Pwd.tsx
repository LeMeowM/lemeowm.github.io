import { useContext } from "react";
import { Wrapper } from "../styles/Output.styled";
import { termContext } from "../Terminal";
import { pathToString } from "../../utils/filesystem";

const Pwd: React.FC = () => {
  const { cwd } = useContext(termContext);
  return <Wrapper>/home/{pathToString(cwd)}</Wrapper>;
};

export default Pwd;
