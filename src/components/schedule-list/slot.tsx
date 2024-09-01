import { Slot as TSlot } from '../../types';

type Props = TSlot & {
  id: string;
  onClick: (id: string, time: string) => void;
  checked: boolean;
  isAvailable: boolean;
}

function Slot({ id, time, onClick, checked, isAvailable }: Props): JSX.Element {
  return (
    <label className="custom-radio booking-form__date">
      <input
        onClick={() => onClick(id, time)}
        type="radio"
        id={id}
        name="date"
        required
        defaultValue={time}
        checked={checked}
        readOnly
        disabled={!isAvailable}
      />
      <span className="custom-radio__label">{time}</span>
    </label>
  );
}

export default Slot;
