import React, {Component} from 'react'
// TODO - add proptypes


class FindPart extends Component {
  getPartHistory () {
    console.log('get request to /part/history');
  }

  render() {
    return  (
      <div>
        <input type='text' name='partName' />
        <button title='rechercher' name='rechercher' onClick={this.getPartHistory}>rechercher</button>
      </div>
    )
  }
}

export default FindPart
