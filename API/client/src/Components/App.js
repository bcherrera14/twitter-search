import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
//import { BrowserRouter, Route } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import TweetLanding from './tweets/TweetLanding';
import TweetFavorites from './tweets/TweetFavorites';
import TweetSearch from './tweets/TweetSearch';
import Header from './Header';
import './App.css';

const App = () => {
	return (
		<div>
			<Routes>
				<Route path="/" element={<Header />}>
					<Route index element={<TweetLanding />} />
					<Route path="/search" element={<TweetSearch />} />
					<Route path="/favorites" element={<TweetFavorites />} />
				</Route>
			</Routes>
		</div>
		// <div>
		// 	<BrowserRouter>
		// 		<div>
		// 			<Header />
		// 			<Route path="/" exact component={TweetLanding} />
		// 			{/* <Route path="/tweet/search" exact component={TweetSearch} /> */}
		// 			{/* <Route path="/tweet/favorites" exact component={TweetFavorites} /> */}
		// 		</div>
		// 	</BrowserRouter>
		// </div>
	);
};

export default App;
