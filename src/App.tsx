import './App.css';
import Wagmi from './web3/Wagmi';
import Header from './web3/Header';
import RequestEther from './web3/RequestEther';

function App() {
  return (
    <Wagmi>
      <div className="flex flex-col h-screen">
        <Header />

        <RequestEther />
        
      </div>
    </Wagmi>
  );
}

export default App;
