import { QuestListItem as TquestListItem } from '../../types';
import QuestListItem from './quest-list-item';

type Props = {
  quests: TquestListItem[];
}

function QuestList({ quests }: Props): JSX.Element {
  return (
    <div className="cards-grid">
      {quests.map((quest) => <QuestListItem key={quest.id} {...quest} />)}
    </div>
  );
}

export default QuestList;
