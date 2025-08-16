// auth.d.ts
declare module '#auth-utils' {
  interface User {
    id: number;
    email: string;
    name: string;
  }

  interface UserSession {
    lastLoggedIn: Date;
  }
}

export {}