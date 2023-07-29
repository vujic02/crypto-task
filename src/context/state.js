import { createContext, useEffect, useLayoutEffect, useState } from "react";
import { useWebSocket } from "react-use-websocket/dist/lib/use-websocket";

// Create the context
export const AppContext = createContext();

export const ContextWrapper = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [favoriteCurrencies, setFavoriteCurrencies] = useState([]);
  const [currentIds, setCurrentIds] = useState([]);
  const [socketUrl, setSocketUrl] = useState("wss://api-pub.bitfinex.com/ws/2");
  const [path, setPath] = useState("");

  const { sendMessage } = useWebSocket(socketUrl);

  useLayoutEffect(() => {
    const isLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn"));
    const favorites = JSON.parse(localStorage.getItem("favorites"));
    if (isLoggedIn) {
      setLoggedIn(isLoggedIn);
    }
    if (favorites && favorites.length > 0) {
      setFavoriteCurrencies([...favorites]);
    }
  }, []);

  useEffect(() => {
    const handleUnsubscribe = (channelId) =>
      sendMessage(
        JSON.stringify({
          event: "unsubscribe",
          chanId: channelId,
        })
      );
    if (path !== "/favorites") {
      currentIds.forEach((channelId) => {
        return handleUnsubscribe(channelId);
      });
    } // eslint-disable-next-line
  }, [path]);

  return (
    <AppContext.Provider
      value={{
        loggedIn,
        setLoggedIn,
        favoriteCurrencies,
        setFavoriteCurrencies,
        currentIds,
        setCurrentIds,
        socketUrl,
        setSocketUrl,
        path,
        setPath,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
