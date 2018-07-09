import React, {Component} from 'react'
import {Form, FormGroup, ControlLabel, FormControl, Select, Button} from 'react-bootstrap'
import ReactJson from 'react-json-view';
import axios from 'axios'
// TODO - add proptypes


class FindPart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      serialNumber: '',
      part: {}
    }
  }

  getPartHistory () {
    axios.get('/parts/history?fullName=' + this.state.serialNumber).then((response) => {
      this.setState({ part: response.data.part[0] })
    })
  }

  handleInput = (serialNumber) => {
    this.setState({ serialNumber: serialNumber.target.value })
  }

  render() {
    return  (
      <div>
        <div className='container'>
          <Form inline>
            <FormGroup>
              <ControlLabel>pièce à rechercher</ControlLabel>
              <FormControl type="text" placeholder="# de série" value={this.state.serialNumber} onInput={this.handleInput} />
            </FormGroup>
              <Button bsStyle='primary' onClick={this.getPartHistory.bind(this)}>rechercher</Button>
          </Form>
        </div>
        <ReactJson src={this.state.part} />
      </div>
    )
  }
}

export default FindPart
