export type EtoroApiErrorResponse = { error: string };

export type CuratedListItem = {
  instrumentId: number;
};

export type CuratedList = {
  uuid: string;
  name: string;
  description: string;
  listImageUrl: string;
  items: CuratedListItem[];
};

export type CuratedListsResponse = {
  ok: boolean;
  status: number;
  statusText: string;
  data: {
    curatedLists: CuratedList[];
  };
};
