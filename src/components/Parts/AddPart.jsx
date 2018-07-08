import React, {Component} from 'react'
import {Form, FormGroup, ControlLabel, FormControl, Select} from 'react-bootstrap'
import axios from 'axios'


class AddPart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: [],
      selectedOption: ''
    }
  }

  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
    // selectedOption can be null when the `x` (close) button is clicked
    if (selectedOption) {
      console.log(`Selected: ${selectedOption.label}`);
    }
  }

  componentDidMount () {
    let partModels = [];
    axios.get('/parts').then((response) => {
      partModels = response.data.partModels;
      this.setState({options: partModels});
    });
  }

  render() {
    return  (
      <div>
        <Form inline>
          <FormGroup>
            <ControlLabel># de série</ControlLabel>{' '}
            <FormControl type="text" placeholder="" />
          </FormGroup>
          <FormGroup>
            <ControlLabel>modèle</ControlLabel>{' '}
            <FormControl componentClass="select" placeholder="select">
            {
              this.state.options.map((option, index) => {
                  return (<option key={index} value={option.name}>{option.name}</option>)
              })
            }
            </FormControl>
          </FormGroup>
        </Form>
      </div>
    )
  }
}

export default AddPart
