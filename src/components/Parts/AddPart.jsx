import React, {Component} from 'react'
import {Form, FormGroup, ControlLabel, FormControl, Button} from 'react-bootstrap'
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
    // selectedOption can be null when the `x` (close) button is clicked
    if (selectedOption) {
      this.setState({ selectedOption:  selectedOption.target.value });
    }
  }

  componentDidMount () {
    let partModels = [];
    axios.get('/parts').then((response) => {
      partModels = response.data.partModels;
      this.setState({
        options: partModels,
        selectedOption: partModels[0].name
      });
    });
  }

  addPart() {
    console.log('posting to parts/add');
  }

  render() {
    return  (
      <div className='container'>
        <Form inline>
          <FormGroup>
            <ControlLabel>modèle : </ControlLabel>{' '}
            <FormControl componentClass="select" onChange={this.handleChange.bind(this)} placeholder="select">
            {
              this.state.options.map((option, index) => {
                  return (<option key={index} value={option.name}>{option.name}</option>)
              })
            }
            </FormControl>
          <FormGroup>
            <ControlLabel># de série :</ControlLabel>{' '}
            <FormControl type="text" placeholder="" value={this.state.selectedOption} />
          </FormGroup>
          </FormGroup>
          <Button bsStyle='primary' onClick={this.addPart}>ajouter</Button>
        </Form>
      </div>
    )
  }
}

export default AddPart
