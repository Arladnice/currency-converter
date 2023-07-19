import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Paper from "@mui/material/Paper";
import { visuallyHidden } from "@mui/utils";
import { useState, useEffect, useContext } from "react";
import { CurrencyContext } from "/src/context/CurrencyContext";
import axios from "axios";
import SelectCountry from "/src/components/SelectCountry";
import InputAmount from "/src/components/InputAmount";
import BasicModal from "/src/components/ModalCurrency";

interface DataCurrency {
  name: string;
  value: number;
}

interface DataCurrencyGraph {
  name: string;
  value: number;
}

function createDataCurrency(name: string, value: number): DataCurrency {
  return {
    name,
    value,
  };
}

function createDataCurrencyGraph(
  name: string,
  value: number
): DataCurrencyGraph {
  return {
    name,
    value,
  };
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = "asc" | "desc";

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(
  array: readonly T[],
  comparator: (a: T, b: T) => number
) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof DataCurrency;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Валюта",
  },
  {
    id: "value",
    numeric: true,
    disablePadding: false,
    label: "Значение",
  },
];

interface EnhancedTableProps {
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof DataCurrency
  ) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler =
    (property: keyof DataCurrency) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            sx={{ padding: "2rem" }}
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default function CurrencyTable() {
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof DataCurrency>("name");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rows, setRows] = useState<DataCurrency[]>([]);
  const [currency, setCurrency] = useState("");
  const [currencyGraph, setCurrencyGraph] = useState<DataCurrencyGraph[]>([]);
  const [openModal, setOpenModal] = React.useState(false);

  const { fromCurrency, setFromCurrency, firstAmount } =
    useContext(CurrencyContext)!;

  useEffect(() => {
    axios
      .get("https://api.freecurrencyapi.com/v1/latest", {
        params: {
          apikey: "fca_live_R1bjwclp0miUejau7WN75x420xahH198rn9tN5Kr",
          base_currency: fromCurrency,
        },
      })
      .then((response) => {
        setRows([]);
        for (let [key, value] of Object.entries(response.data.data)) {
          if (value) {
            setRows((prevArray) => [
              ...prevArray,
              createDataCurrency(key, value as number),
            ]);
          }
        }
      })
      .catch((error) => console.log(error));
  }, [fromCurrency]);

  useEffect(() => {
    if (currency) {
      axios
        .get("https://api.freecurrencyapi.com/v1/historical", {
          params: {
            apikey: "fca_live_R1bjwclp0miUejau7WN75x420xahH198rn9tN5Kr",
            date_from: "2022-12-31",
            date_to: "2023-07-17",
            currencies: currency,
          },
        })
        .then((response) => {
          setCurrencyGraph([]);
          for (let [key, value] of Object.entries(response.data.data)) {
            if (value) {
              setCurrencyGraph((prevArray) => [
                ...prevArray,
                createDataCurrencyGraph(
                  key,
                  (value as Record<string, number>)[currency]
                ),
              ]);
            }
          }
        })
        .catch((error) => console.log(error));
    }
  }, [currency]);

  const handleRequestSort = (
    _: React.MouseEvent<unknown>,
    property: keyof DataCurrency
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleClick = (_: React.MouseEvent<unknown>, name: string) => {
    setCurrency(name);
    setOpenModal(true);
  };

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = stableSort(rows, getComparator(order, orderBy)).slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <Box sx={{ padding: "2rem" }}>
          <InputAmount />
        </Box>
        <Box sx={{ margin: "0 2rem" }}>
          <SelectCountry
            value={fromCurrency}
            setValue={setFromCurrency}
            label="Текущая валюта"
          />
        </Box>
        <TableContainer>
          <Table sx={{ minWidth: 750 }} size={"medium"}>
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.name)}
                    role="checkbox"
                    tabIndex={-1}
                    key={index}
                    sx={{ cursor: "pointer" }}
                  >
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                      sx={{ padding: "2rem" }}
                    >
                      {row.name}
                    </TableCell>
                    <TableCell align="right">
                      {row.value * Number(firstAmount)}
                    </TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage={"Строк на странице"}
        />
      </Paper>
      <BasicModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        currencyGraph={currencyGraph}
        fromCurrency={fromCurrency}
        currency={currency}
      />
    </Box>
  );
}
