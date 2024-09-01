import { Link } from 'react-router-dom';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import { Quest } from '../../types';
import { AuthorizationStatus, PageRoute } from '../../const';
import { useAppSelector } from '../../hooks/hooks';
import { selectAuthorizationStatus } from '../../store/user-slice/user-slice';

type Props = {
  selectedQuest: Quest;
}

function QuestPage({ selectedQuest }: Props): JSX.Element {
  const { coverImg, description, level, peopleMinMax, title, type } = selectedQuest;
  const authStatus = useAppSelector(selectAuthorizationStatus);

  return (
    <div className="wrapper">
      <Header />
      <main className="decorated-page quest-page">
        <div className="decorated-page__decor" aria-hidden="true">
          <picture>
            <source
              type="image/webp"
              srcSet={coverImg}
            />
            <img
              src={coverImg}
              srcSet={coverImg}
              width={1366}
              height={768}
              alt=""
            />
          </picture>
        </div>
        <div className="container container--size-l">
          <div className="quest-page__content">
            <h1 className="title title--size-l title--uppercase quest-page__title">
              {title}
            </h1>
            <p className="subtitle quest-page__subtitle">
              <span className="visually-hidden">Жанр:</span>{type}
            </p>
            <ul className="tags tags--size-l quest-page__tags">
              <li className="tags__item">
                <svg width={11} height={14} aria-hidden="true">
                  <use xlinkHref="#icon-person" />
                </svg>
                {peopleMinMax[0]}–{peopleMinMax[1]}&nbsp;чел
              </li>
              <li className="tags__item">
                <svg width={14} height={14} aria-hidden="true">
                  <use xlinkHref="#icon-level" />
                </svg>
                {level}
              </li>
            </ul>
            <p className="quest-page__description">
              {description}
            </p>
            <Link
              className="btn btn--accent btn--cta quest-page__btn"
              to={AuthorizationStatus.Auth === authStatus ? PageRoute.Booking : PageRoute.Login}
            >
              Забронировать
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default QuestPage;
