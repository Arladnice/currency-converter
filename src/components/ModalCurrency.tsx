import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  width: "50%",
};

interface IcurrencyGraph {
  name: string;
  value: number;
}

interface BasicModalProps {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  currencyGraph: IcurrencyGraph[];
  fromCurrency: string;
  currency: string;
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
export const BasicModal: React.FC<BasicModalProps> = ({
  openModal,
  setOpenModal,
  currencyGraph,
  fromCurrency,
  currency,
}) => {
  const handleClose = () => setOpenModal(false);

  const currencyPrice: number[] = [];
  const currencyTimestamp: string[] = [];

  currencyGraph.forEach((item) => {
    currencyPrice.push(item.value);
    currencyTimestamp.push(item.name);
  });

  const data = {
    labels: currencyTimestamp,
    datasets: [
      {
        label: "Стоимость",
        data: currencyPrice,
        fill: false,
        backgroundColor: "#0071bd",
        borderColor: "#0071bd",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
      },
    },
  };

  return (
    <div>
      <Modal open={openModal} onClose={handleClose}>
        <Box sx={style}>
          <Typography variant="h6" component="h2">
            Отношение {fromCurrency} к {currency}
          </Typography>
          <Line data={data} options={options} />
        </Box>
      </Modal>
    </div>
  );
};

export default BasicModal;
