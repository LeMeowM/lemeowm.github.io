import { useEffect } from "react";
import { profile } from "@content/profile";
import { Wrapper } from "../styles/Output.styled";

const Cv: React.FC = () => {
  useEffect(() => {
    window.open(profile.cvPath, "_blank");
  }, []);

  return (
    <Wrapper>
      Opening CV... (place your PDF at <code>public{profile.cvPath}</code> to
      enable this)
    </Wrapper>
  );
};

export default Cv;
