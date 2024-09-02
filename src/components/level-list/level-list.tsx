import { LEVEL_TRANSLATION, SelectedLevel } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { selectSelectedLevel, setSelectedLevel } from '../../store/quests-slice/quests-slice';
import LevelListItem from './level-list-item';

function LevelList(): JSX.Element {

  const selectedLevel = useAppSelector(selectSelectedLevel);
  const dispatch = useAppDispatch();

  const handleClick = (levelName: SelectedLevel): void => {
    dispatch(setSelectedLevel(levelName));
  };

  return (
    <ul className="filter__list">
      {
        Object.entries(LEVEL_TRANSLATION).map(
          ([levelName, levelNameTranslation]) => (
            <LevelListItem
              key={levelName}
              levelName={levelName as SelectedLevel}
              levelNameTranslation={levelNameTranslation}
              checked={selectedLevel === levelName as SelectedLevel}
              onClick={handleClick}
            />)
        )
      }
    </ul>
  );
}

export default LevelList;
