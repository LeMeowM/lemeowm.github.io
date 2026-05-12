import React from "react";
import { PanelTitle, PanelWrapper } from "./styles/Panel.styled";

type Props = React.HTMLAttributes<HTMLDivElement> & {
  title: string;
};

const Panel: React.FC<Props> = ({ title, children, ...rest }) => (
  <PanelWrapper {...rest}>
    <PanelTitle>─ {title} ─</PanelTitle>
    {children}
  </PanelWrapper>
);

export default Panel;
