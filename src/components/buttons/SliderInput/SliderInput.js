import React from 'react';
import PropTypes from 'prop-types';
import './SliderInput.css';
import FormLabel from '@material-ui/core/FormLabel';
import Slider from '@material-ui/lab/Slider';

const SliderInput = props => {
  const {
      selectedValues,
    _handleChange,
    questions
  } = props.options || props;


  return (
      <div className="slider-input">
          <FormLabel className="form-label">{questions[1]}</FormLabel>
          <Slider
              className="slider"
              value={selectedValues}
              onChange={_handleChange}
          />
          <FormLabel className="form-label">{questions[0]}</FormLabel>
      </div>

  );

};

SliderInput.propTypes = {
    selectedValues: PropTypes.number,
  questions: PropTypes.array,
  _handleChange: PropTypes.func,
  classes: PropTypes.object
};



export default SliderInput;
