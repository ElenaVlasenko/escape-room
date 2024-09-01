import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { fetchQuestAction, resetQuestNotFound, selectIsQuestLoading, selectIsQuestNotFound, selectSelectedQuest } from '../../store/quest-slice/quest-slice';
import { useEffect } from 'react';
import { selectErrorMessage } from '../../store/error-slice/error-slice';
import ErrorPage from '../error-page/error-page';
import NotFoundPage from '../not-found-page/not-found-page';
import QuestPage from './quest-page';
import Spinner from '../../components/spinner/spinner';

function QuestPagePicker(): JSX.Element | null {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const selectedQuest = useAppSelector(selectSelectedQuest);
  const isSelectedQuestLoading = useAppSelector(selectIsQuestLoading);
  const isSelectedQuestNotFound = useAppSelector(selectIsQuestNotFound);
  const error = useAppSelector(selectErrorMessage);

  useEffect(
    () => {
      if (
        id
        && (selectedQuest === null || selectedQuest.id !== id)
        && isSelectedQuestLoading === false
        && isSelectedQuestNotFound === false
        && error === null
      ) {
        dispatch(fetchQuestAction(id));
      }

      return () => {
        if (isSelectedQuestNotFound === true) {
          dispatch(resetQuestNotFound());
        }
      };
    },
    [selectedQuest, id, isSelectedQuestLoading, isSelectedQuestNotFound, dispatch, error]
  );

  if (isSelectedQuestLoading) {
    return <Spinner />;
  }

  if (id === undefined || isSelectedQuestNotFound) {
    return <NotFoundPage />;
  }

  if (error) {
    return <ErrorPage />;
  }

  if (selectedQuest === null) {
    return <Spinner />;
  }

  return <QuestPage selectedQuest={selectedQuest} />;
}

export default QuestPagePicker;
