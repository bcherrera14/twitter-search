import React from 'react';
import { Card } from 'react-bootstrap';
import ReactHtmlParser from 'react-html-parser';

const TweetCard = ({ tweet }) => {
	const dateArray = tweet.created_at.split(' ');
	const date = dateArray[0] + ' ' + dateArray[1] + ' ' + dateArray[2];
	const mediaImageUrl = tweet.entities.media ? tweet.entities.media[0].media_url : '/';
	const mediaClass = mediaImageUrl === '/' ? 'hide' : 'media-image align-self-center';
	const tweetUrl = tweet.entities.media ? tweet.entities.media[0].url : '/';
	const hyperlink = tweet.entities.urls.length > 0 ? tweet.entities.urls[0].url : '/';
	let hyperlinkHTML = '';
	if (hyperlink !== '/') {
		hyperlinkHTML = `<a href=${hyperlink}>${hyperlink}</a>`;
	}
	let tweetTextContent = '';
	if (hyperlink !== '/') {
		tweetTextContent = tweet.full_text.replace(hyperlink, '');
	} else {
		tweetTextContent = tweet.full_text;
	}
	if (tweetUrl !== '/') {
		tweetTextContent = tweetTextContent.replace(tweetUrl, '');
	}
	return (
		<Card style={{ width: '40rem' }}>
			<Card.Body>
				<div className="d-flex align-items-center">
					<div className="mr-2">
						<img src={tweet.user.profile_image_url} className="rounded-circle card-img" alt="profile" />
					</div>
					<div>
						<Card.Title>{tweet.user.name}</Card.Title>
						<Card.Subtitle className="mb-2 text-muted">@{tweet.user.screen_name}</Card.Subtitle>
					</div>
					<div className="ml-auto mb-4">
						<Card.Subtitle className="text-muted">{date}</Card.Subtitle>
					</div>
				</div>
				<Card.Text id="text-content" className="pt-3">
					{tweetTextContent}
					{ReactHtmlParser(hyperlinkHTML)}
				</Card.Text>
				<div className="d-flex flex-column">
					<img src={mediaImageUrl} className={mediaClass} alt="media" />
					<div className="tweet-stats">
						<i className="far fa-heart p-1" />
						<span>{tweet.favorite_count}</span>
						<i className="fas fa-retweet p-1" />
						<span>{tweet.retweet_count}</span>
					</div>
				</div>
			</Card.Body>
		</Card>
	);
};

export default TweetCard;
