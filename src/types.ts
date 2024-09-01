//Приключения, Ужасы,  Мистика, Детектив, Sci-fi
export enum TypeName {
  HORROR = 'horror',
  MYSTIC = 'mystic',
  DETECTIVE = 'detective',
  ADVENTURES = 'adventures',
  SCI_FI = 'sci-fi',
}

export const ALL_TYPES = 'all-quests';

export enum LevelName {
  EASY = 'easy',
  MIDDLE = 'medium',
  HARD = 'hard'
}

export const ANY_LEVEL = 'any';

export type QuestListItem = {
  id: string;
  title: string;
  previewImg: string;
  previewImgWebp: string;
  level: LevelName;
  type: TypeName;
  peopleMinMax: [number, number];
};

export type Quest = QuestListItem & {
  description: string;
  coverImg: string;
  coverImgWebp: string;
}

export type ItemOf<T> = T extends (infer U)[] ? U : never;

export type Day = 'today' | 'tomorrow';

export type Slot = {
  time: string;
  isAvailable: boolean;
};

export type Booking = {
  id: string;
  location: {
    address: string;
    coords: [number, number];
  };
  slots: Record<Day, Slot[]>;
}

export type Reservation = {
  date: string;
  time: string;
  contactPerson: string;
  phone: string;
  withChildren: boolean;
  peopleCount: number;
  id: string;
  location: {
    address: string;
    coords: [
      string
    ];
  };
  quest: QuestListItem;
}

export type AuthParams = {
  email: string;
  password: string;
};

export type User = {
  email: string;
  token: string;
};
