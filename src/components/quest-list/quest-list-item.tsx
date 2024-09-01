import { MouseEventHandler } from 'react';
import { QuestListItem as TquestListItem } from '../../types';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../../const';

type Props = TquestListItem;

function QuestListItem({ id, level, peopleMinMax, previewImg, title }: Props): JSX.Element {
  const navigate = useNavigate();

  const handleBackButtonClick: MouseEventHandler<HTMLAnchorElement> = (evt) => {
    evt.preventDefault();
    navigate(`${AppRoute.Quest}/${id}`);
  };

  return (
    <div className="quest-card">
      <div className="quest-card__img">
        <picture>
          <source
            type={previewImg}
            srcSet={previewImg}
          />
          <img
            src={previewImg}
            srcSet={previewImg}
            width={344}
            height={232}
            alt={title}
          />
        </picture>
      </div>
      <div className="quest-card__content">
        <div className="quest-card__info-wrapper">
          <a className="quest-card__link" href=""
            onClick={handleBackButtonClick}
          >
            {title}
          </a>
        </div>
        <ul className="tags quest-card__tags">
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
      </div>
    </div>
  );
}

export default QuestListItem;
