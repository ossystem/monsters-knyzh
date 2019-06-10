import React, {useState} from 'react';
import PropTypes from 'prop-types';
import './SwitchInput.css';
import FormLabel from '@material-ui/core/FormLabel';
import Switch from '@material-ui/core/Switch';
import {withStyles} from "@material-ui/core";

const styles = {
    colorSwitchBase: {
        color: '#464646',
        '&$colorChecked': {
            color: '#8cbe82',
            '& + $colorBar': {
                backgroundColor: '#bee2cc',
            },
        },
    },
    colorBar: {},
    colorChecked: {}
};

const SwitchInput = props => {
  const {
      selectedValues,
    _handleChange,
    questions,
    classes
  } = props.options || props;

    const [selectedValueSwitch, setselectedValueSwitch] = useState(true);

    const  handleChangeSwitchInput = function(e){
        let newValue = !selectedValueSwitch;
        setselectedValueSwitch(newValue);
        _handleChange(questions[+!newValue]);
    };

  return (
      <div className="switch-input">
        <FormLabel className="switch-label">
          {questions[1]}
        </FormLabel>
        <Switch
            className="switch"
            checked={selectedValueSwitch}
            onChange={handleChangeSwitchInput}
            classes={{
              switchBase: classes.colorSwitchBase,
              checked: classes.colorChecked,
              bar: classes.colorBar
            }}
        />
        <FormLabel className="switch-label">
          {questions[0]}
        </FormLabel>
      </div>

  );

};

SwitchInput.propTypes = {
    selectedValues: PropTypes.any,
  questions: PropTypes.array,
  _handleChange: PropTypes.func,
  classes: PropTypes.object
};



export default withStyles(styles)(SwitchInput);
