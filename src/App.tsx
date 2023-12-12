import './App.css';
import Wagmi from './web3/Wagmi';
import Header from './web3/Header';
import RequestEther from './web3/RequestEther';
import Withdraw from './web3/Withdraw';

function App() {
  return (
    <Wagmi>
      <div className="flex flex-col h-screen">
        <Header />

        <RequestEther />
        
        <Withdraw />
      </div>
    </Wagmi>
  );
}

export default App;
