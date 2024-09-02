import { Link } from 'react-router-dom';
import { Reservation } from '../../types';
import { AppRoute } from '../../const';
import { useAppDispatch } from '../../hooks/hooks';
import { deleteReservationAction } from '../../store/user-slice/user-slice';

type Props = Reservation;

function ReservationListItem({ id, date, location, peopleCount, time, quest }: Props): JSX.Element {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(deleteReservationAction(id));
  };

  return (
    <div className="quest-card">
      <div className="quest-card__img">
        <picture>
          <source
            type="image/webp"
            srcSet={quest.previewImg}
          />
          <img
            src={quest.previewImg}
            srcSet={quest.previewImg}
            width={344}
            height={232}
            alt={quest.title}
          />
        </picture>
      </div>
      <div className="quest-card__content">
        <div className="quest-card__info-wrapper">
          <Link className="quest-card__link" to={`${AppRoute.Quest}/${quest.id}`}>
            {quest.title}
          </Link>
          <span className="quest-card__info">
            [{date},&nbsp;{time}. {location.address}]
          </span>
        </div>
        <ul className="tags quest-card__tags">
          <li className="tags__item">
            <svg width={11} height={14} aria-hidden="true">
              <use xlinkHref="#icon-person" />
            </svg>
            {peopleCount}&nbsp;чел
          </li>
          <li className="tags__item">
            <svg width={14} height={14} aria-hidden="true">
              <use xlinkHref="#icon-level" />
            </svg>
            {quest.level}
          </li>
        </ul>
        <button
          onClick={handleClick}
          className="btn btn--accent btn--secondary quest-card__btn"
          type="button"
        >
          Отменить
        </button>
      </div>
    </div>
  );
}

export default ReservationListItem;
