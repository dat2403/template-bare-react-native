import React from "react";

export const AuthContext = React.createContext<AuthContextType>({} as AuthContextType);
export const UserContext = React.createContext<UserModel | undefined>({} as UserModel);

export interface UserModel {
  username: string,
}

export interface AuthData {
  user?: UserModel,
  token?: string,
}

export type AuthContextType = {
  signIn: (payload: AuthData) => void,
  signOut: () => void,
  restore: () => void,
}

export type AuthState = {
  isLoading: boolean,
  isSignOut: boolean,
  user?: UserModel,
  token?: string,
}

export interface AuthAction {
  type: "SIGN_IN" | "SIGN_OUT" | "RESTORE";
  payload: AuthData;
}

interface AuthModuleProviderProps {
  authActions: AuthContextType,
  user: UserModel | undefined
}

/**
 * This is a provider to provide auth action and auth data
 * @return auth action and auth data
 * */
const AuthModuleProvider: React.FC<AuthModuleProviderProps> = (
  {
    authActions,
    user,
    children,
  },
) => {
  return <AuthContext.Provider value={authActions}>
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  </AuthContext.Provider>;
};


export default AuthModuleProvider;
