import React from 'react';
import TweetCard from './TweetCard';

const TweetFeed = ({ statuses }) => {
	const tweetCards = statuses.map((tweet) => {
		return <TweetCard key={tweet.id_str} tweet={tweet} />;
	});
	return <div className="card-grid d-flex flex-column">{tweetCards}</div>;
};

export default TweetFeed;
