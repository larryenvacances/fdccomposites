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
      serialNumber: '',
      modelOptions: [],
      model: '',
      serialNumberOptions: [],
      rework: false
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

    axios.get('/partModels/active').then((response) => {
      let modelOptions = [];
      modelOptions = response.data;
      this.setState({
        modelOptions: modelOptions,
        model: modelOptions[0]
      });
      
      axios.get('/parts/serialNumbersForModel?model=' + modelOptions[0]).then((response) => {
        
        console.log(response.data[0]);
        if (response.data[0] !== undefined) {
          this.setState({
            serialNumberOptions: response.data,
            serialNumber: response.data[0].serialNumber
          })
        }
      });
    });

  }

  handleChangeModel = (model) => {
    // model can be null when the `x` (close) button is clicked
    if (model) {
      axios.get('/parts/serialNumbersForModel?model=' + model.target.value).then((response) => {
        this.setState({
          serialNumberOptions: response.data,
          serialNumber: response.data[0].serialNumber
        })
      });
      this.setState({ model:  model.target.value });
    }
  }

  handleChangeSerialNumber = (serialNumber) => {
    if (serialNumber) {
      this.setState({ serialNumber: serialNumber.target.value });
    }
  };

  handleChangeStage = (stage) => {
    // model can be null when the `x` (close) button is clicked
    if (stage) {
      this.setState({ stage:  stage.target.value });
    }
  }

  handleChangeRework = () => {
    this.setState({ rework: !this.state.rework })
  }

  editPart() {
    axios.post('/parts/edit?fullName=' + this.state.model + '-' + this.state.serialNumber + '&stage=' + this.state.stage + '&rework=' + this.state.rework)
      .then((response) => {
          alert('La pièce ' + this.state.model + '-' + this.state.serialNumber + ' a été modifiée avec succès')
      })
      .catch(function (response) {
        console.log(response);
        alert(response)
      });
  }

  deletePart() {
    if (window.confirm('Voulez-vous supprimer la pièce ' + this.state.model + '-' + this.state.serialNumber + '? Cette action est permanente.')) {
      axios.delete('/parts?fullName=' + this.state.model + '-' + this.state.serialNumber).then((response) => {
        alert('La pièce ' + this.state.model + '-' + this.state.serialNumber + ' a été supprimée avec succès');
      });
    } 
  }

  render() {
    return  (
      <div className='container'>
        <Form inline>
          <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
            <FormGroup>
              <Label className="mr-sm-2">modèle à éditer :</Label>
              <Input className="mr-sm-4" type="select" onChange={this.handleChangeModel.bind(this)} placeholder="select">
              {
                this.state.modelOptions.map((option, index) => {
                    return (<option key={index} value={option}>{option}</option>)
                })
              }
              </Input>
            </FormGroup>
            
            <FormGroup>
              <Label className="mr-sm-2"># de série :</Label>
              <Input className="mr-sm-4" type="select" defaultValue={this.state.serialNumberOptions[0]} onChange={this.handleChangeSerialNumber.bind(this)} placeholder="select">
              {
                this.state.serialNumberOptions.map((option, index) => {
                    return (<option key={index} value={option.serialNumber}>{option.serialNumber}</option>)
                })
              }
              </Input>
            </FormGroup>
            <FormGroup>
            <Label className="mr-sm-2">stage : </Label>{' '}
              <Input className="mr-sm-4" type="select" onChange={this.handleChangeStage.bind(this)} placeholder="select">
              {
                this.state.stages.map((option, index) => {
                    return (<option key={index} value={option.name}>{option.name}</option>)
                })
              }
              </Input>
            </FormGroup>
            <Label check>
            <Input onChange={this.handleChangeRework.bind(this)} type="checkbox" />{' '}
              rework
            </Label>
          </FormGroup>
          <Button className="mr-sm-2" onClick={this.editPart.bind(this)}>modifier</Button>
          <Button className="btn-danger" onClick={this.deletePart.bind(this)}>supprimer</Button>
        </Form>
      </div>
    )
  }
}

export default EditPart

