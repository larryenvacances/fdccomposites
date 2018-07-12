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
      part: {},
      modelOptions: [],
      model: '',
      serialNumberOptions: []
    }
  }

  componentDidMount () {
    axios.get('/partModels/active').then((response) => {
      let modelOptions = [];
      modelOptions = response.data;
      this.setState({
        modelOptions: modelOptions,
        model: modelOptions[0]
      });
      
      axios.get('/parts/serialNumbersForModel?model=' + modelOptions[0]).then((response) => {
        
        console.log(response.data[0]);
        this.setState({
          serialNumberOptions: response.data,
          serialNumber: response.data[0].serialNumber
        })
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

  getPartHistory () {
    axios.get('/parts/history?fullName=' + this.state.model + '-' + this.state.serialNumber).then((response) => {
      this.setState({ part: response.data.part[0] })
    });
  }

  render() {
    return  (
      <div>
        <div className='container'>
          <Form inline>
            <FormGroup>
              <Label className="mr-sm-2">modèle à rechercher :</Label>
              <Input  className="mr-sm-4" type="select" onChange={this.handleChangeModel.bind(this)} placeholder="select">
              {
                this.state.modelOptions.map((option, index) => {
                    return (<option key={index} value={option}>{option}</option>)
                })
              }
              </Input>
            </FormGroup>
            
            <FormGroup>
              <Label className="mr-sm-2"># de série :</Label>
              <Input  className="mr-sm-4" type="select" defaultValue={this.state.serialNumberOptions[0]} onChange={this.handleChangeSerialNumber.bind(this)} placeholder="select">
              {
                this.state.serialNumberOptions.map((option, index) => {
                    return (<option key={index} value={option.serialNumber}>{option.serialNumber}</option>)
                })
              }
              </Input>
            </FormGroup>
            <Button onClick={this.getPartHistory.bind(this)}>rechercher</Button>
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
