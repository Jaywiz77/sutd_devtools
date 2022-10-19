import logo from './logo.svg';
import './App.css';
import CrudUi from './components/crudUi'; 
function App() {
  return (
    <div  style={{textAlign:'center'}}>
      <h1 style={{color:"darkred"}}>BOS TAs</h1>
    <div style={{display:'flex',width:'100%',justifyContent:'center'}}>
      <CrudUi/>
    </div>
    </div>


  );
}

export default App;
