import { useContext } from "react";
import { Wrapper } from "../styles/Output.styled";
import { termContext } from "../Terminal";

const Echo: React.FC = () => {
  const { arg } = useContext(termContext);

  let outputStr = arg.join(" ");
  outputStr = outputStr.replace(/^['"`]+|['"`]+$/g, "");

  return <Wrapper>{outputStr}</Wrapper>;
};

export default Echo;
