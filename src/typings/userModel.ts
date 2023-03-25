export interface UserModelInterface {
  id: number;
  name: string;
  role: UserRoleType;
  accessToken: string;
}

type UserRoleType = 'admin' | 'user';
