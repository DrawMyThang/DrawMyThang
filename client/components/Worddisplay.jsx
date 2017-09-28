import React from 'react';
import socket from 'socket.io-client';

class Worddisplay extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			word: '',
		}
		this.showWord = this.showWord.bind(this);
	}
	componentDidMount() {
		this.props.socket.on('display word', this.showWord);
	}

	showWord(data) {
		console.log('word data', data);
		if (this.props.uid === data.uid) {
			this.setState({
				word: data.word,
			});
		} else {
			this.setState({
				word: '',
			});
		}

	}
	render () {

    return (
        <div>
            <h1 id="word-to-draw">
                {this.state.word}
            </h1>
        </div>
    );
  }
}

export default Worddisplay;