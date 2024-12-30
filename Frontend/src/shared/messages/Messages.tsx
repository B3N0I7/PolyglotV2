import { useEffect } from "react";
import "./messages.css";

interface IMessage {
  message: string;
  setMessage: (message: string) => void;
  type: string;
}
export const Message = ({ message, setMessage, type }: IMessage) => {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message, setMessage]);
  if (!message) {
    return null;
  }
  return <span className={type}>{message}</span>;
};
