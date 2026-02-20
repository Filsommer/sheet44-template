export type EtoroApiErrorResponse = { error: string };

export type MarketRecommendationsResponse = {
  ok: boolean;
  status: number;
  statusText: string;
  data: {
    ResponseType: "Instrument";
    Recommendations: number[];
  };
};
