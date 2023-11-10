export interface FishInterface {
  id: string;
  fishName: string;
  weight: number;
  length: number;
  description: string;
  catchDateTime: Date;
  lat: number;
  lon: number;
}

export type CreateFishResponse = {
  success: boolean;
  fish: FishInterface;
};

export type OneFishWithUser = {
  fish: FishInterface;
  userName: string;
  id: string;
};

export type GetListOfFishResponse = FishInterface[];
