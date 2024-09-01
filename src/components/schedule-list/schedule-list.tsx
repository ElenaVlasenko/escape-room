import { Day, Slot as TSlot } from '../../types';
import Slot from './slot';

type Props = {
  day: Day;
  checkedSlotId: string | null;
  slots: TSlot[];
  onClick: (id: string, time: string) => void;
}

function SlotList({ day, slots, onClick, checkedSlotId }: Props): JSX.Element {
  return (
    <fieldset className="booking-form__date-section">
      <legend className="booking-form__date-title">{day === 'today' ? 'Сегодня' : 'Завтра'}</legend>
      <div className="booking-form__date-inner-wrapper">
        {slots.map(({ time, isAvailable }) => {
          const id = `${day}${time}`;

          return <Slot key={id} id={id} onClick={onClick} time={time} isAvailable={isAvailable} checked={id === checkedSlotId} />;
        })}
      </div>
    </fieldset>
  );
}

export default SlotList;
