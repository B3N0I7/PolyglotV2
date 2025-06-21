import {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

interface IAuthContext {
  isConnected: boolean;
  setIsConnected: Dispatch<SetStateAction<boolean>>;
  // setIsConnected: (isConnected: boolean) => void;
}
const defaultAuthContextValue: IAuthContext = {
  isConnected: false,
  setIsConnected: () => {},
};

export const AuthContext = createContext<IAuthContext>(defaultAuthContextValue);

interface IAuthProvider {
  children: ReactNode;
}

export const AuthProvider = ({ children }: IAuthProvider) => {
  const [isConnected, setIsConnected] = useState<boolean>(
    () => localStorage.getItem("userToken") !== null
  );

  const value: IAuthContext = {
    isConnected,
    setIsConnected,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
