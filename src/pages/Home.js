import { useContext, useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/state";

const Home = () => {
  const [data, setData] = useState(null);
  const { setPath } = useContext(AppContext);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const options = { method: "GET", headers: { accept: "application/json" } };

      try {
        const request = await fetch("/tickers?symbols=ALL", options);
        const response = await request.json();
        setData(response.slice(0, 5));
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
    setPath("/"); // eslint-disable-next-line
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
            {data &&
              data.map((item, idx) => (
                <TableRow key={idx} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell
                    onClick={() => navigate(`details/${item[0]}`)}
                    component="th"
                    scope="row"
                    sx={{ color: "#1976d2", textDecoration: "underline", cursor: "pointer" }}
                  >
                    {item[0]}
                  </TableCell>
                  <TableCell align="right">{item[7]?.toLocaleString("en-US")}</TableCell>
                  <TableCell align="right">{item[5]?.toLocaleString("en-US")}</TableCell>
                  <TableCell align="right">{item[6] * 100}%</TableCell>
                  <TableCell align="right">{item[9]?.toLocaleString("en-US")}</TableCell>
                  <TableCell align="right">{item[10]?.toLocaleString("en-US")}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Home;
