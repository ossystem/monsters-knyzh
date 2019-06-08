import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ArrowForward } from '@material-ui/icons';
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


  return (
      <div className="switch-input">
        <FormLabel className="switch-label">
          {questions[0]}
        </FormLabel>
        <Switch
            className="switch"
            checked={selectedValues}
            onChange={_handleChange}
            classes={{
              switchBase: classes.colorSwitchBase,
              checked: classes.colorChecked,
              bar: classes.colorBar
            }}
        />
        <FormLabel className="switch-label">
          {questions[1]}
        </FormLabel>
      </div>

  );

};

SwitchInput.propTypes = {
    selectedValues: PropTypes.bool,
  questions: PropTypes.array,
  _handleChange: PropTypes.func,
  classes: PropTypes.object
};



export default withStyles(styles)(SwitchInput);
