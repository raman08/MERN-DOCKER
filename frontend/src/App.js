import './App.css';
import Home from './Pages/Home';
import DetailsView from './Pages/DetailsView';
import Header from './components/Header';
import { Route, Routes } from 'react-router-dom';
import CreateView from './Pages/CreateView';

function App() {
	return (
		<>
			<Header />
			<Routes>
				<Route path="/" exact element={<Home />} />
				<Route path="/content/:contentId" element={<DetailsView />} />
				<Route path="/create" element={<CreateView />} />
				<Route
					path="/edit/:contentId"
					element={<CreateView edit />}
				></Route>
			</Routes>
		</>
	);
}

export default App;
