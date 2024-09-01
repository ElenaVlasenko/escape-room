import { Navigate } from 'react-router-dom';
import { PageRoute } from '../const';

type Props = {
  condition: boolean;
  routOnFalse: PageRoute;
  children: JSX.Element;
};

function ConditionalRoute(props: Props): JSX.Element {
  const { condition, children, routOnFalse } = props;

  return condition ? children : <Navigate to={routOnFalse} replace />;
}

export default ConditionalRoute;
