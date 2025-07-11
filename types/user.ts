export interface UserProfileI {
  id: number;
  username: string;
  email: string;
  provider: string;
  role: string;
  firstname: string | null;
  lastname: string | null;
  profileImage: string | null;
  major: string | null;
  area: string | null;
  bio: string | null;
}
