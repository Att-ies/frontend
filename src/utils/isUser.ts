import { getToken } from '@utils/localStorage/token';

export const isUser = getToken().role === 'ROLE_USER';
