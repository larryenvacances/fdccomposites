import React, {Component} from 'react'
import {Form, FormGroup, ControlLabel, FormControl, Select, Button} from 'react-bootstrap'
// TODO - add proptypes


class FindPart extends Component {
  getPartHistory () {
    console.log('get request to /part/history');
  }

  render() {
    return  (
      <div>
        <Form inline>
          <FormGroup>
            <ControlLabel>pièce à rechercher</ControlLabel>{' '}
            <FormControl type="text" placeholder="# de série" />
            <Button bsStyle='primary' onClick={this.getPartHistory}>rechercher</Button>
          </FormGroup>
        </Form>
      </div>
    )
  }
}

export default FindPart
