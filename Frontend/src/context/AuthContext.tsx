import {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import { useNavigate } from "react-router";
import { API_URL_CHECK_AUTH } from "./constants";

interface IAuthContext {
  isConnected: boolean;
  setIsConnected: Dispatch<SetStateAction<boolean>>;
  isLoading: boolean;
  // setIsConnected: (isConnected: boolean) => void;
}
const defaultAuthContextValue: IAuthContext = {
  isConnected: false,
  setIsConnected: () => {},
  isLoading: true,
};

export const AuthContext = createContext<IAuthContext>(defaultAuthContextValue);

interface IAuthProvider {
  children: ReactNode;
}

export const AuthProvider = ({ children }: IAuthProvider) => {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await fetch(`${API_URL_CHECK_AUTH}`, {
          method: "GET",
          credentials: "include",
        });
        if (response.ok) {
          setIsConnected(true);
        } else {
          setIsConnected(false);
          //navigate("/signin");
        }
      } catch (error) {
        console.error("Auth check failed", error);
        setIsConnected(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const value: IAuthContext = {
    isConnected,
    setIsConnected,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
