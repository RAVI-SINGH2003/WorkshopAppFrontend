import './styles/App.css';
import {BrowserRouter as Router , Routes , Route} from  "react-router-dom";
import Header from './components/Header/Header';
import CreateWorkshop from './pages/CreateWorkshop/CreateWorkshop'
import DisplayWorkshops from './pages/DisplayWorkshops/DisplayWorkshops';
import UpdateWorkshop from './pages/UpdateWorkshop/UpdateWorkshop';
import { Toaster } from "react-hot-toast";
function App() {
  return (
    <div className="App">
      <Router>
        <div className="left_flex_item">
          <Header />
        </div>
        <div className="right_flex_item">
          <Routes>
            <Route path="/" element={<CreateWorkshop />} />
            <Route path="/workshops" element={<DisplayWorkshops />} />
            <Route path="/update/workshop/:id" element={<UpdateWorkshop/>} />
          </Routes>
        </div>
        <Toaster/>
      </Router>

    </div>
  );
}
export default App;
