import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/hooks';
import { resetFilters } from '../../store/quests-slice/quests-slice';

function FiltersIsEmpty(): JSX.Element {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(resetFilters());
  };

  return (
    <>
      <p>
        Таких квестов у нас пока нет...
      </p>
      <Link onClick={handleClick} to=''>
        Сбросить фильтры
      </Link>
    </>
  );
}

export default FiltersIsEmpty;
