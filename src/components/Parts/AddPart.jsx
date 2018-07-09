import React, {Component} from 'react'
import {Form, FormGroup, ControlLabel, FormControl, Button} from 'react-bootstrap'
import axios from 'axios'


class AddPart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: [],
      model: '',
      serialNumber: ''
    }
  }

  handleChange = (model) => {
    // model can be null when the `x` (close) button is clicked
    if (model) {
      this.setState({ model:  model.target.value });
    }
  }

  handleInput = (serialNumber) => {
    this.setState({ serialNumber: serialNumber.target.value })
  }

  componentDidMount () {
    let partModels = [];
    axios.get('/parts').then((response) => {
      partModels = response.data.partModels;
      this.setState({
        options: partModels,
        model: partModels[0].name
      });
    });
  }

  addPart() {
    axios.post('/parts/add?model=' + this.state.model + '&serialNumber=' + this.state.serialNumber)
      .then((response) => {
          alert('La pièce ' + this.state.model + '-' + this.state.serialNumber + ' a été ajoutée avec succès')
      })
      .catch(function (response) {
        console.log(response);
          alert(response)
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
            <ControlLabel># de série :</ControlLabel>{' '}
            <FormControl type="text" placeholder="" onInput={this.handleInput.bind(this)} value={this.state.serialNumber} />
          </FormGroup>
          <Button bsStyle='primary' onClick={this.addPart.bind(this)}>ajouter</Button>
        </Form>
      </div>
    )
  }
}

export default AddPart
