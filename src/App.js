import MainRouter from './routers';
import {
  ToastContainer,
  Bounce,
} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App"> 
      <MainRouter />
      <ToastContainer
            className="toast-position"
            position="bottom-right"
            autoClose={8000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored" //dark
            transition={Bounce}
            role="alert"
          />
    </div>
  );
}

export default App;
