import React from 'react'
import _ from 'lodash'
import '../defaults.css'

import { Link } from 'react-router-dom'

import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

import Shelf from './Shelf'
import * as BooksAPI from '../utils/BooksAPI'

class Home extends React.Component {
	generateLayout(books) {
		const p = this.props
		return books.map((book, i) => {
			const y = _.result(p, 'y') ||Math.ceil(Math.random() * 4) + 1
			return {
				i: book.id,
				x: (i * 2) % 12,
				y: Math.floor(i / 2) * y,
				w: 2,
				h: 1
			}
		})
	}


	state = {
		wantToRead: [],
		currentlyReading: [],
		read: []
	}



	moveBook = (id, shelf) => {
		BooksAPI.update({id}, shelf).then((response) => {
			BooksAPI.getAll().then((response) => {
				this.setState({
					wantToRead: response.filter((book) => book.shelf === 'wantToRead'),
					currentlyReading: response.filter((book) => book.shelf === 'currentlyReading'),
					read: response.filter((book) => book.shelf === 'read'),
				})
			})
		})
	}



	render() {
		return (
			<div>
				<Shelf name="Want To Read" books={this.state.wantToRead} title={'Want To Read'} moveBook={this.moveBook} /><br/>
				<Shelf name="Reading" books={this.state.currentlyReading} title={'Currently Reading'} moveBook={this.moveBook} /><br/>
				<Shelf name="Read" books={this.state.read} title={'Read'} moveBook={this.moveBook} />

				<Link to="/search">
					<Button variant="fab" color="primary" aria-label="Add" className="open-search">
						<AddIcon />
					</Button>
				</Link>
			</div>
		)
	}

	componentDidMount() {
		BooksAPI.getAll().then((response) => {
			this.setState({
				wantToRead: response.filter((book) => book.shelf === 'wantToRead'),
				currentlyReading: response.filter((book) => book.shelf === 'currentlyReading'),
				read: response.filter((book) => book.shelf === 'read'),
			})
		})
	}
}

export default Home