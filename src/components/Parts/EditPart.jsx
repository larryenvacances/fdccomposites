import React, {Component} from 'react'
import {Form, FormGroup, Label, Input, Button} from 'reactstrap'
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
          <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
            <Label className="mr-sm-2"># de série :</Label>{' '}
            <Input className="mr-sm-4" type="text" placeholder="" onInput={this.handleInput.bind(this)} value={this.state.serialNumber} />
            <Label className="mr-sm-2">stage : </Label>{' '}
            <Input type="select" onChange={this.handleChange.bind(this)} placeholder="select">
            {
              this.state.stages.map((option, index) => {
                  return (<option key={index} value={option.name}>{option.name}</option>)
              })
            }
            </Input>
          </FormGroup>
          <Button onClick={this.editPart.bind(this)}>modifier</Button>
        </Form>
      </div>
    )
  }
}

export default EditPart

