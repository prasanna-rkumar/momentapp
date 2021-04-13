import './App.css';
import NavBar from './components/NavBar';
import AddImage from './components/NavBar/AddImage';
import { AppProvider } from './contexts/AppContext';

function App() {
  return (
    <AppProvider>
      <div className="App">
        <NavBar />
        <AddImage />
        <main className="grid grid-cols-12 gap-4 mt-16">
          <SideBars />
          <div className="bg-white col-span-6 p-4 flex flex-col gap-4 justify-start items-center">
            <Posts />
            <Posts />
            <Posts />
            <Posts />
            <Posts />
            <Posts />
            <Posts />
            <Posts />
            <Posts />
          </div>
          <SideBars />
        </main>
      </div>
    </AppProvider>
  );
}

const Posts = () => (
  <div className="w-full h-96 bg-gray-600">

  </div>
);

const SideBars = () => (
  <div className="sticky top-16 bg-gray-700 h-96 col-span-3"></div>
);

export default App;
