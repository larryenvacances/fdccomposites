import React, {Component} from 'react'
import {Form, FormGroup, Label, Input, Button} from 'reactstrap'
import axios from 'axios'
// TODO - add proptypes

import ReactTable from "react-table";
import "react-table/react-table.css";


class FindPart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      serialNumber: '',
      part: {},
      modelOptions: [],
      model: '',
      partOptions: []
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

      
      axios.get('/parts/partsForModel?model=' + modelOptions[0]).then((response) => {
        
        this.setState({
          partOptions: response.data
        })
      });
    });


  }

  handleChangeModel = (model) => {
    // model can be null when the `x` (close) button is clicked
    if (model) {
      axios.get('/parts/partsForModel?model=' + model.target.value).then((response) => {
        this.setState({
          partOptions: response.data,
          serialNumber: response.data[0].serialNumber
        })
      });
      this.setState({ model:  model.target.value });
    }
  }

  getPartHistory () {
    axios.get('/parts/history?fullName=' + this.state.model + '-' + this.state.serialNumber).then((response) => {
      this.setState({ part: response.data.part[0] })
    });
  }

  render() {
    const { partOptions } = this.state;
    console.log(partOptions);
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
          </Form>
          <div style={{textAlign: 'left'}}>
            <ReactTable 
              data={partOptions}
              columns={[
                {
                  Header: '# de série',
                  accessor: 'serialNumber'
                },
                {
                  Header: 'étape de production',
                  accessor: 'stage'
                },
                {
                  Header: 'rework',
                  id: 'rework',
                  accessor: p => p.isRework.toString()
                },
                {
                  Header: 'dernière modification',
                  id: 'lastModifiedDate',
                  accessor: p => { return new Date(p.lastModifiedDate).toLocaleString() }
                }
              ]}
              defaultPageSize={5}
              SubComponent={ row => {
                return (
                  <div style={{ padding: '20px' }}>
                  <ReactTable 
                    data={partOptions[row.index].history}
                    columns={[
                      {
                        Header: 'étape de production',
                        accessor: 'stage'
                      },
                      {
                        Header: 'rework',
                        id: 'historyRework',
                        accessor: p => p.isRework.toString()
                      },
                      {
                        Header: 'utilisateur ayant effectué le changement',
                        accessor: 'lastModifiedBy'
                      },
                      {
                        Header: "date d'arrivée",
                        id: 'historyLastModifiedDate',
                        accessor: p => { return new Date(p.lastModifiedDate).toLocaleString() }
                      }
                    ]}
                    defaultPageSize={5}
                  />
                  </div>
                )
              }}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default FindPart
