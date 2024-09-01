import { SelectedType } from '../../const';

type Props = {
  typeName: SelectedType;
  typeNameTranslation: string;
  onClick: (typeName: SelectedType) => void;
  checked: boolean;
}

function TypeListItem({ typeName, typeNameTranslation, onClick, checked }: Props): JSX.Element {
  return (
    <li
      onClick={(evt) => {
        evt.preventDefault();
        onClick(typeName);
      }}
      className="filter__item"
    >
      <input type="radio" name="type" id={typeName} checked={checked} readOnly />
      <label className="filter__label" htmlFor={typeName}>
        <svg
          className="filter__icon"
          width={36}
          height={30}
          aria-hidden="true"
        >
          <use xlinkHref={`#icon-${typeName}`} />
        </svg>
        <span className="filter__label-text">{typeNameTranslation}
        </span>
      </label>
    </li>
  );
}

export default TypeListItem;
