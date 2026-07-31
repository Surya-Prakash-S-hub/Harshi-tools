import { LayoutRenderer } from "./components/MainFolder"
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <>
      <LayoutRenderer />
      <ToastContainer position="bottom-right"/>
    </>
  )
}

export default App
