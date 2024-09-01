import { SelectedType, TYPE_TRANSLATION } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { selectSelectedType, setSelectedType } from '../../store/quests-slice/quests-slice';
import TypeListItem from './type-list-item';

function TypeList(): JSX.Element {

  const selectedType = useAppSelector(selectSelectedType);
  const dispatch = useAppDispatch();

  const handleClick = (typeName: SelectedType): void => {
    dispatch(setSelectedType(typeName));
  };

  return (
    <ul className="filter__list">
      {
        Object.entries(TYPE_TRANSLATION).map(
          ([typeName, typeNameTranslation]) => (
            <TypeListItem
              key={typeName}
              typeName={typeName as SelectedType}
              typeNameTranslation={typeNameTranslation}
              checked={selectedType === typeName as SelectedType}
              onClick={handleClick}
            />)
        )
      }
    </ul>
  );
}

export default TypeList;
