import React from 'react';
import PropTypes from 'prop-types';
import './RadioButton.css';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import {withStyles} from "@material-ui/core";


const styles = {
  root: {
    '&$checked': {
      color: '#7ec69a',
    },
  },
  checked: {}
};

const RadioButton = props => {
  const {
    selectedValues,
    _handleChange,
    questions,
    classes
  } = props.options || props;



  const  handleChangeRadioButton = function(e){
    _handleChange(e.target.value)
  };


  return (
      <RadioGroup
          className="radio-button"
          value={selectedValues}
          onChange={handleChangeRadioButton}
      >
        {questions.map((el, index) => {
          return (
              <FormControlLabel
                  key={index}
                  value={el}
                  className="radio-label"
                  control={
                    <Radio
                        classes={{
                          root: classes.root,
                          checked: classes.checked,
                        }}
                    />}
                  label={el}
              />
          );
        })}
      </RadioGroup>

  );

};

RadioButton.propTypes = {
  selectedValues: PropTypes.string.isRequired,
  questions: PropTypes.array,
  _handleChange: PropTypes.func,
  classes: PropTypes.object
};



export default withStyles(styles)(RadioButton);
