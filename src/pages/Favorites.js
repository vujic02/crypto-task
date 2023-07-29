import { useContext, useEffect } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { AppContext } from "../context/state";
import WebsocketTableRow from "../components/WebsocketTableRow";

const Favorites = () => {
  const { favoriteCurrencies, setPath } = useContext(AppContext);

  useEffect(() => {
    setPath("/favorites"); // eslint-disable-next-line
  }, []);

  return (
    <div style={{ marginTop: "2rem", padding: "1rem" }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "800" }}>Name</TableCell>
              <TableCell align="right" sx={{ fontWeight: "800" }}>
                Last
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: "800" }}>
                Change
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: "800" }}>
                Change Percent
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: "800" }}>
                High
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: "800" }}>
                Low
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {favoriteCurrencies &&
              favoriteCurrencies.map((item, idx) => (
                <TableRow key={idx} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <WebsocketTableRow symbol={item} />
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Favorites;
