export const ADMIN_ROLE = 'admin';

export interface User {
    username: string;
    token: string;
    role: string;
}
