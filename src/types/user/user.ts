import { FishInterface } from '../fish';

export interface UserInterface {
  id: string;
  userName: string;
  createdAt: Date;
  mainFishingSpotLat: number;
  mainFishingSpotLon: number;
}
export interface RegisterUserResponse {
  id: string;
  userName: string;
}

export interface RegisterUserDto {
  userName: string;
  pwd: string;
}

export interface FishWithUserInterface extends FishInterface {
  user: UserInterface;
}
