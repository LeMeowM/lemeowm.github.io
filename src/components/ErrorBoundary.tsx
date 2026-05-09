import React from "react";
import styled from "styled-components";

const ErrorMsg = styled.div`
  margin-top: 0.25rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors?.secondary};
`;

type Props = { cmd: string; children: React.ReactNode };
type State = { error: Error | null };

class ErrorBoundary extends React.Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  render() {
    if (this.state.error) {
      return (
        <ErrorMsg>
          {this.props.cmd}: error: {this.state.error.message}
        </ErrorMsg>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
