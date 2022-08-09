import { useLocation } from "react-router-dom";

export function withLocation(Component) {
  return (props) => <Component {...props} redirectUrl={useLocation()} />;
}
