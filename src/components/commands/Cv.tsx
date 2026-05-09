import { useEffect } from "react";
import { Wrapper } from "../styles/Output.styled";

const CV_PATH = "/cv.pdf";

const Cv: React.FC = () => {
  useEffect(() => {
    window.open(CV_PATH, "_blank");
  }, []);

  return (
    <Wrapper>
      Opening CV... (place your PDF at <code>public/cv.pdf</code> to enable
      this)
    </Wrapper>
  );
};

export default Cv;
