import { Link } from 'react-router-dom';
import { PageRoute } from '../../const';

function ReservationsIsEmpty(): JSX.Element {
  return (
    <>
      <p>
        Кажется, пока вы не добавили ни одного квеста
      </p>
      <Link to={PageRoute.Main} >К квестам</Link>
    </>
  );
}

export default ReservationsIsEmpty;
