import React, { useState, useEffect, useContext } from "react";
import { useWebSocket } from "react-use-websocket/dist/lib/use-websocket";
import { TableCell } from "@mui/material";
import { AppContext } from "../context/state";
import { useNavigate } from "react-router-dom";

const WebsocketTableRow = ({ symbol }) => {
  const { currentIds, setCurrentIds, socketUrl } = useContext(AppContext);
  const [messageHistory, setMessageHistory] = useState([]);
  const [placeholderData, setPlaceholderData] = useState(null);
  const { sendMessage, lastMessage } = useWebSocket(socketUrl);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const options = { method: "GET", headers: { accept: "application/json" } };

      try {
        const request = await fetch(`/ticker/${symbol}`, options);
        const response = await request.json();
        setPlaceholderData(response);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData(); // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (lastMessage !== null && JSON.parse(lastMessage.data)[1] !== "hb") {
      setMessageHistory(JSON.parse(lastMessage.data)[1]);
    } // eslint-disable-next-line
  }, [lastMessage, setMessageHistory]);

  let channelId = lastMessage && JSON.parse(lastMessage.data)[0];
  let subscribe = JSON.stringify({
    event: "subscribe",
    channel: "ticker",
    symbol: `${symbol}`,
  });

  const handleSubscribe = () => sendMessage(subscribe);

  useEffect(() => {
    handleSubscribe(); // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (currentIds !== []) {
      setCurrentIds([...currentIds, channelId]);
    } else {
      setCurrentIds([channelId]);
    } // eslint-disable-next-line
  }, [channelId]);

  return (
    <>
      <TableCell
        onClick={() => navigate(`../details/${symbol}`)}
        component="th"
        scope="row"
        sx={{ color: "#1976d2", textDecoration: "underline", cursor: "pointer" }}
      >
        {symbol}
      </TableCell>
      <TableCell align="right">
        {messageHistory && messageHistory[6]}
        {!messageHistory && placeholderData?.[6]}
      </TableCell>
      <TableCell align="right">
        {messageHistory && messageHistory[4]}
        {!messageHistory && placeholderData?.[4]}
      </TableCell>
      <TableCell align="right">
        {messageHistory && messageHistory[5] * 100}
        {!messageHistory && placeholderData?.[5] * 100}%
      </TableCell>
      <TableCell align="right">
        {messageHistory && messageHistory[8]}
        {!messageHistory && placeholderData?.[8]}
      </TableCell>
      <TableCell align="right">
        {messageHistory && messageHistory[9]}
        {!messageHistory && placeholderData?.[9]}
      </TableCell>
    </>
  );
};

export default WebsocketTableRow;
