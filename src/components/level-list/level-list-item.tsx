import { SelectedLevel } from '../../const';
import { LevelName } from '../../types';

type Props = {
  levelName: SelectedLevel;
  levelNameTranslation: string;
  onClick: (levelName: SelectedLevel) => void;
  checked: boolean;
}

function LevelListItem({ levelName, levelNameTranslation, onClick, checked }: Props): JSX.Element {
  return (
    <li className="filter__item">
      <input type="radio" name="level" id={levelName} checked={checked} readOnly />
      <label className="filter__label" htmlFor={levelName}>
        <span onClick={(evt) => {
          evt.preventDefault();
          onClick(levelName);
        }} className="filter__label-text"
        >{levelNameTranslation}
        </span>
      </label>
    </li>
  );
}

export default LevelListItem;
