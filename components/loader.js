import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import {
  Circles,
  RotatingSquare,
  RotatingTriangles,
} from "react-loader-spinner";

const Loader = (props) => {
  return (
    <Backdrop
      sx={{ color: "#2196F3", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={props.open}
    >
      <Circles
        height="80"
        width="80"
        color="#2196F3"
        ariaLabel="circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </Backdrop>
  );
};

export default Loader;
