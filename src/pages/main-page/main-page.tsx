import FiltersIsEmpty from '../../components/filters-is-empty/filters-is-empty';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import LevelList from '../../components/level-list/level-list';
import QuestList from '../../components/quest-list/quest-list';
import TypeList from '../../components/type-list/type-list';
import { useAppSelector } from '../../hooks/hooks';
import { selectFilteredQuests } from '../../store/quests-slice/quests-slice';

function MainPage(): JSX.Element {
  const quests = useAppSelector(selectFilteredQuests);

  return (
    <div className="wrapper">
      <Header />
      <main className="page-content">
        <div className="container">
          <div className="page-content__title-wrapper">
            <h1 className="subtitle page-content__subtitle">
              квесты в Санкт-Петербурге
            </h1>
            <h2 className="title title--size-m page-content__title">
              Выберите тематику
            </h2>
          </div>
          <div className="page-content__item">
            <form className="filter" action="#" method="get">
              <fieldset className="filter__section">
                <legend className="visually-hidden">Тематика</legend>
                <TypeList />
              </fieldset>
              <fieldset className="filter__section">
                <legend className="visually-hidden">Сложность</legend>
                <LevelList />
              </fieldset>
            </form>
          </div>
          <h2 className="title visually-hidden">Выберите квест</h2>
          {quests.length ? <QuestList quests={quests} /> : <FiltersIsEmpty />}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default MainPage;
