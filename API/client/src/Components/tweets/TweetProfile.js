import React from 'react';
import axios from 'axios';
import { Card, Button, Spinner } from 'react-bootstrap';

class TweetProfile extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			name: '',
			screenName: '',
			profileImage: '',
			token_type: '',
			access_token: '',
			tweets: null,
			loading: false
		};
		this.getUserData = this.getUserData.bind(this);
		this.getAuthToken = this.getAuthToken.bind(this);
		this.getTweets = this.getTweets.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}

	getAuthToken() {
		axios
			// .get('https://sifterapp.azurewebsites.net/api/tweets/token')
			.get('http://localhost:5000/api/tweets/token')
			.then((response) => {
				console.log(response);
				this.setState({
					token_type: response.data.token_type,
					access_token: response.data.access_token,
					username: this.props.username
				});
			})
			.catch((error) => {
				console.log(error);
			});
	}

	componentDidMount() {
		this.setState({ loading: true });
		this.getAuthToken();
	}

	getUserData() {
		let config = {
			params: {
				screenName: this.props.username,
				type: this.state.token_type,
				token: this.state.access_token
			}
		};
		axios
			// .get('https://sifterapp.azurewebsites.net/api/tweets/users', config)
			.get('http://localhost:5000/api/tweets/users', config)
			.then((response) => {
				const userData = response.data;
				this.setState({
					name: userData.name,
					screenName: userData.screen_name,
					profileImage: userData.profile_image_url.replace('normal', '400x400'),
					loading: false
				});
			})
			.catch((error) => {
				console.log(error);
			});
	}

	getTweets() {
		let config = {
			params: {
				searchTerm: 'from:' + this.props.username,
				result_type: 'recent',
				type: this.state.token_type,
				token: this.state.access_token
			}
		};
		axios
			// .get('https://sifterapp.azurewebsites.net/api/tweets/search', config)
			.get('http://localhost:5000/api/tweets/search', config)
			.then((response) => {
				this.setState({
					tweets: response.data.statuses
				});
			})
			.catch((error) => {
				console.log(error);
			});
	}

	handleClick() {
		this.props.modalShow();
		this.props.getRandomTweet(this.state.tweets);
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevState.username !== this.state.username) {
			this.getUserData();
			this.getTweets();
		}
		

	}

	render() {
		const spinnerClass = this.state.loading ? 'd-flex align-self-center mb-auto mt-auto' : 'hide';
		const cardBodyClass = this.state.loading ? 'hide' : 'd-flex flex-column';
		return (
			<Card style={{ height: '385px', width: '20rem' }} className="m-5">
				<Spinner className={spinnerClass} animation="border" variant="primary" />
				<Card.Body className={cardBodyClass}>
					<Card.Title className="align-self-center">{this.state.name}</Card.Title>
					<Card.Subtitle className="align-self-center mb-2 text-muted">
						@{this.state.screenName}
					</Card.Subtitle>
					<img
						src={this.state.profileImage}
						className="rounded-circle profile-img align-self-center p-3"
						alt="profile"
					/>
					<Button variant="primary" className="ml-auto mr-auto mt-2" onClick={() => this.handleClick()}>
						View Tweet
					</Button>
				</Card.Body>
			</Card>
		);
	}
}

export default TweetProfile;
