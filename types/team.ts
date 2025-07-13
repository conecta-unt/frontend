export interface TeamI {
  userId: number;
  teamId: number;
  team: TeamClassI;
  role: string;
  confirmed: boolean;
}

export interface TeamClassI {
  id: number;
  name: string;
  members: MemberI[];
}

export interface MemberI {
  userId: number;
  user: UserI;
  role: string;
  confirmed: boolean;
}

export interface UserI {
  id: number;
  username: string;
  profile: ProfileI;
}

export interface ProfileI {
  firstname: string;
  lastname: string;
}
