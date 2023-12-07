import './App.css';
import Wagmi from './web3/Wagmi';
import Header from './web3/Header';

function App() {
  return (
    <Wagmi>
      <div className="flex flex-col h-screen">
        <Header />

        <div className="flex items-center justify-center flex-grow">
          <div className="min-w-[400px] border border-gray-400 rounded">
            <div className="p-4">
            </div>
          </div>
        </div>
      </div>
    </Wagmi>
  );
}

export default App;
