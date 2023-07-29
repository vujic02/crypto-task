import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";
import { AppContext } from "../context/state";

const CurrencyDetail = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const { favoriteCurrencies, setFavoriteCurrencies, loggedIn, setPath } = useContext(AppContext);

  useEffect(() => {
    const fetchData = async () => {
      const options = { method: "GET", headers: { accept: "application/json" } };

      try {
        const request = await fetch(`/ticker/${id}`, options);
        const response = await request.json();
        setData(response);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
    setPath("/details"); // eslint-disable-next-line
  }, [id]);

  const addToFavorites = () => {
    let favorites = JSON.parse(localStorage.getItem("favorites"));
    if (favorites) {
      localStorage.setItem("favorites", JSON.stringify([...favorites, id]));
      setFavoriteCurrencies([...favorites, id]);
    } else {
      localStorage.setItem("favorites", JSON.stringify([id]));
      setFavoriteCurrencies([id]);
    }
  };

  const removeFromFavorites = () => {
    let favorites = JSON.parse(localStorage.getItem("favorites"));
    if (favorites) {
      favorites.splice(favorites.indexOf(id), 1);
      localStorage.setItem("favorites", JSON.stringify([...favorites]));
      setFavoriteCurrencies([...favorites]);
    }
  };

  return (
    <div style={{ flexDirection: "column" }}>
      <div style={{ marginTop: "2rem", padding: "1rem" }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "800" }}>Symbol</TableCell>
                <TableCell align="right" sx={{ fontWeight: "800" }}>
                  Last price
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
              <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {id}
                </TableCell>
                <TableCell align="right">{data?.[6]?.toLocaleString("en-US")}</TableCell>
                <TableCell align="right">{data?.[8]?.toLocaleString("en-US")}</TableCell>
                <TableCell align="right">{data?.[9]?.toLocaleString("en-US")}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div style={{ padding: "1rem" }}>
        {loggedIn && (
          <>
            {favoriteCurrencies.includes(id) ? (
              <Button variant="contained" color="error" onClick={() => removeFromFavorites()}>
                Remove from favorites
              </Button>
            ) : (
              <Button variant="contained" onClick={() => addToFavorites()}>
                Add to favorites
              </Button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CurrencyDetail;
