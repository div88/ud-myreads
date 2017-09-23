import React, { Component } from 'react';

class CurrentlyReadingBooks extends Component {
  render() {
    console.log('Props', this.props);
    return(
      <div>
        <h2>Currently Reading</h2>
      </div>
    )
  }
}

export default CurrentlyReadingBooks;
