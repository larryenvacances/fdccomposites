import React, {Component} from 'react'
import {Form, FormGroup, Input, Label, Button} from 'reactstrap'
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
          <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
            <Label className="mr-sm-2">modèle : </Label>
            <Input  className="mr-sm-4" type="select" onChange={this.handleChange.bind(this)} placeholder="select">
            {
              this.state.options.map((option, index) => {
                  return (<option key={index} value={option.name}>{option.name}</option>)
              })
            }
            </Input>
            <Label className="mr-sm-2"># de série :</Label>
            <Input type="text" placeholder="" onInput={this.handleInput.bind(this)} value={this.state.serialNumber} />
          </FormGroup>
          <Button onClick={this.addPart.bind(this)}>ajouter</Button>
        </Form>
      </div>
    )
  }
}

export default AddPart
