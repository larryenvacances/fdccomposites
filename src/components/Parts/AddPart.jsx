import React, {Component} from 'react'
import {Form, FormGroup, ControlLabel, FormControl, Select} from 'react-bootstrap'
// TODO - add proptypes


class AddPart extends Component {
  state = {
    selectedOption: ''
  }

  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
    // selectedOption can be null when the `x` (close) button is clicked
    if (selectedOption) {
      console.log(`Selected: ${selectedOption.label}`);
    }
  }

  componentDidMount () {
  }

  render() {
    const { selectedOption } = this.state;

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
              <option value='CAE001'>CAE001</option>
              <option value='CAE002'>CAE002</option>
              <option value='CAE003'>CAE003</option>
              <option value='CAE004'>CAE004</option>
              <option value='CAE005'>CAE005</option>
              <option value='CAE006'>CAE006</option>
              <option value='DAE001'>DAE001</option>
              <option value='DAE002'>DAE002</option>
              <option value='DAE003'>DAE003</option>
              <option value='DAE004'>DAE004</option>
              <option value='DAE005'>DAE005</option>
              <option value='DAE006'>DAE006</option>
              <option value='DAE007'>DAE007</option>
              <option value='DAE008'>DAE008</option>
              <option value='DAE009'>DAE009</option>
              <option value='DAE010'>DAE010</option>
              <option value='DAE011'>DAE011</option>
              <option value='DAE012'>DAE012</option>
              <option value='DAE015'>DAE015</option>
              <option value='DAE050'>DAE050</option>
              <option value='DAE022'>DAE022</option>
              <option value='DRS001 (Assemblage Complet)'>DRS001 (Assemblage Complet)</option>
              <option value='DRS002 (Tray)'>DRS002 (Tray)'</option>
              <option value='DRS003 (Airfoil)'>DRS003 (Airfoil)</option>
              <option value='DRS004 (Cover)'>DRS004 (Cover)</option>
              <option value='DRS005 (Tray-RTM)'>RS005 (Tray-RTM)</option>
              <option value='DRS006 (Airfoil-RTM)'>DRS006 (Airfoil-RTM)</option>
              <option value='DRS007 (Cover-RTM)'>DRS007 (Cover-RTM)</option>
              <option value='FIA001 (Gallery Fairing Aft)'>FIA001 (Gallery Fairing Aft)</option>
              <option value='FAI002 (Gallery Fairing FWD Fuel Assy)'>FAI002 (Gallery Fairing FWD Fuel Assy)</option>
              <option value='MDA001'>MDA001</option>
              <option value='MDA002'>MDA002</option>
              <option value='MDA003'>MDA003</option>
              <option value='MDA004'>MDA004</option>
              <option value='MDA005'>MDA005</option>
              <option value='SID001 (Fairing M20)'>SID001 (Fairing M20)</option>
              <option value='SID002 (Splice)'>SID002 (Splice)</option>
              <option value='SID003 (Shelf M20)'>SID003 (Shelf M20)</option>
              <option value='SID004 (Shelf M38)'>SID004 (Shelf M38)</option>
              <option value='SID005 (Radome M38)'>SID005 (Radome M38)</option>
              <option value='VIK001'>VIK001</option>
              <option value='VIK002&007 (Portes RH&LH)'>VIK002&007 (Portes RH&LH)</option>
              <option value='VIK003&008 (Skin Extérieur RH&LH)'>VIK003&008 (Skin Extérieur RH&LH)</option>
              <option value='VIK004 (Table de Ribs 1020-2)'>VIK004 (Table de Ribs 1020-2)</option>
              <option value='VIK005&010 (Window Angle)'>VIK005&010 (Window Angle)</option>
              <option value='VIK009 (Table de ribs 1020-1)'>VIK009 (Table de ribs 1020-1)</option>
              <option value='VIK0011 (Cover Control Column 1247)'>VIK0011 (Cover Control Column 1247)</option>
              <option value='VIK012 (Cover Control Column 1244)'>VIK012 (Cover Control Column 1244)</option>
              <option value='VIK014 (Nacelle Fairing LH)'>VIK014 (Nacelle Fairing LH)</option>
              <option value='VIK015 (Nacelle Fairing RH)'>VIK015 (Nacelle Fairing RH)</option>
              <option value='VIK017 (Table de ribs 1020-3)'>VIK017 (Table de ribs 1020-3)</option>
              <option value='VIK018 (Rib 1029)'>VIK018 (Rib 1029)</option>
              <option value='VIK019 (Rib1032)'>VIK019 (Rib1032)</option>
            </FormControl>
          </FormGroup>
        </Form>
      </div>
    )
  }
}

export default AddPart
