import 'tailwindcss/tailwind.css';
import Footer from './components/Footer';
import NavBar from './components/NavBar';

function App() {
  return (
    <div className="bg-purple-200 text-black min-h-screen">
      <NavBar />
      <Footer/>
    </div>
  );
}

export default App;

