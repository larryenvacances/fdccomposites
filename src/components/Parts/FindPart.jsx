import React, {Component} from 'react'
import {Form, FormGroup, Label, Input, Button} from 'reactstrap'
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
              <Label className="mr-sm-2">pièce à rechercher :</Label>
              <Input className="mr-sm-2" type="text" placeholder="# de série" value={this.state.serialNumber} onInput={this.handleInput} />
            </FormGroup>
              <Button bsStyle='primary' onClick={this.getPartHistory.bind(this)}>rechercher</Button>
          </Form>
          <div style={{textAlign: 'left'}}>
            <ReactJson displayDataTypes={false} src={this.state.part} />
          </div>
        </div>
      </div>
    )
  }
}

export default FindPart
