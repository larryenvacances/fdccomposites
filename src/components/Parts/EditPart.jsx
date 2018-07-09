import React, {Component} from 'react'
import {Form, FormGroup, ControlLabel, FormControl, Select, Button} from 'react-bootstrap'
import ReactJson from 'react-json-view';
import axios from 'axios'
// TODO - add proptypes


class EditPart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stages: [],
      stage: '',
      serialNumber: ''
    }
  }

  componentDidMount () {
    let stages = [];
    axios.get('/stages').then((response) => {
      stages = response.data.stages;
      this.setState({
        stages: stages,
        stage: stages[0].name
      });
    });
  }

  handleInput = (serialNumber) => {
    this.setState({ serialNumber: serialNumber.target.value })
  }

  handleChange = (stage) => {
    // model can be null when the `x` (close) button is clicked
    if (stage) {
      this.setState({ stage:  stage.target.value });
    }
  }

  editPart() {
    axios.post('/parts/edit?fullName=' + this.state.serialNumber + '&stage=' + this.state.stage)
      .then((response) => {
          alert('La pièce ' + this.state.model + '-' + this.state.serialNumber + ' a été modifiée avec succès')
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
            <ControlLabel># de série :</ControlLabel>{' '}
            <FormControl type="text" placeholder="" onInput={this.handleInput.bind(this)} value={this.state.serialNumber} />
            <ControlLabel>stage : </ControlLabel>{' '}
            <FormControl componentClass="select" onChange={this.handleChange.bind(this)} placeholder="select">
            {
              this.state.stages.map((option, index) => {
                  return (<option key={index} value={option.name}>{option.name}</option>)
              })
            }
            </FormControl>
          </FormGroup>
          <Button bsStyle='primary' onClick={this.editPart.bind(this)}>modifier</Button>
        </Form>
      </div>
    )
  }
}

export default EditPart

