import { authType } from 'src/types/enum';

export interface JwtPayload {
  email: string;
  id: number;
  role: authType;
}
