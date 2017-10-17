import React, { Component } from 'react';

import { Route, Link } from 'react-router-dom';
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'

import Shelf from './Shelf.js'
import BookSearch from './BookSearch.js'
import * as BooksAPI from './BooksAPI.js'
import './App.css';

class App extends Component {
  state = {
    books: [],
    currentlyReading: [],
    wantToRead: [],
    read: [],
    crvalue: 'currentlyReading',
    wrvalue: 'wantToRead',
    rvalue: 'read'
  }

  updateQuery = (book, shelf) =>{
      let toShelf, fromShelf
      fromShelf = book.shelf
      toShelf = shelf
      console.log(fromShelf);
      console.log(toShelf);
      BooksAPI.update(book, shelf).then(res => {
        this.setState(state => ({
          toShelf: state[toShelf].push(book),
          [fromShelf]: state[fromShelf].filter((b) => b.id !== book.id)
        }))
      })
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      console.log(books);
      this.setState({ books: books })
      this.setState({
        currentlyReading: books.filter(book => book.shelf === "currentlyReading"),
        wantToRead: books.filter(book => book.shelf === "wantToRead"),
        read: books.filter(book => book.shelf === "read")
      })
    })
  }



  render() {
    const {books} = this.props
    const {query} = this.state
    let bookList
    let currentlyreading, wanttoread, read


    return (
      <div>

      <Route exact path="/" render={() => (
        <div className="list-books">
          <div className="list-books-title">
            <h2>My Reads</h2>
          </div>
          <div>
              <div className="list-books-content">
                <Shelf shelfTitle="Currently Reading" books={this.state.currentlyReading} updateShelf={this.updateQuery}></Shelf>
                <Shelf shelfTitle="Want to read" books={this.state.wantToRead} updateShelf={this.updateQuery}></Shelf>
                <Shelf shelfTitle="Read" books={this.state.read} updateShelf={this.updateQuery}></Shelf>
              </div>
          </div>
          <div className="open-search">
            <Link to="/search" onClick={() => this.setState({ showSearchPage: true })}>Add a book</Link>
          </div>
        </div>
      )}/>
      <Route path="/search" render ={({ history }) => (
        <BookSearch></BookSearch>
      )}/>

    </div>
      );
  }
}

export default App;
