import React, {Component} from 'react'
import {Form, FormGroup, ControlLabel, FormControl, Button} from 'react-bootstrap'
import axios from 'axios'


class AddPart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: [],
      partFullName: ''
    }
  }

  handleChange = (partFullName) => {
    // partFullName can be null when the `x` (close) button is clicked
    if (partFullName) {
      this.setState({ partFullName:  partFullName.target.value });
    }
  }

  componentDidMount () {
    let partModels = [];
    axios.get('/parts').then((response) => {
      partModels = response.data.partModels;
      this.setState({
        options: partModels,
        partFullName: partModels[0].name
      });
    });
  }

  addPart() {
    axios.post('/parts/add?partModelName=' + this.state.partFullName)
      .then(function (response) {
          //handle success
          console.log(response);
      })
      .catch(function (response) {
          //handle error
          console.log(response);
      });
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
            <FormControl type="text" placeholder="" value={this.state.partFullName} />
          </FormGroup>
          </FormGroup>
          <Button bsStyle='primary' onClick={this.addPart.bind(this)}>ajouter</Button>
        </Form>
      </div>
    )
  }
}

export default AddPart
