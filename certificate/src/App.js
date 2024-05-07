import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";   

import { Form } from './entry-form';
import GeneratePDF from './generatepdf';

function App() {
  return (
    <div className="App">
      <Router>
          <Routes>
            <Route exact path="/" element = {<Form/>} />
            <Route path="/generate-pdf" element={<GeneratePDF />} />
          </Routes>
      </Router>
    </div>
  );
}

export default App;
