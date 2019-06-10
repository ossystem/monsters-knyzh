import React, {useState} from 'react';
import PropTypes from 'prop-types';
import './SliderInput.css';
import FormLabel from '@material-ui/core/FormLabel';
import Slider from '@material-ui/lab/Slider';

const SliderInput = props => {
  const {
    _handleChange,
    questions
  } = props.options || props;

    const [selectedValueSlider, setSelectedValueSlider] = useState(50);

    const  handleChangeSliderInput = function(e, value){
        let newValue = (selectedValueSlider >= 50) ? questions[0] : questions[1];
        setSelectedValueSlider(value);
        _handleChange(newValue);

    };

  return (
      <div className="slider-input">
          <FormLabel className="form-label">{questions[1]}</FormLabel>
          <Slider
              className="slider"
              value={selectedValueSlider}
              onChange={handleChangeSliderInput}
          />
          <FormLabel className="form-label">{questions[0]}</FormLabel>
      </div>

  );

};

SliderInput.propTypes = {
  questions: PropTypes.array,
  _handleChange: PropTypes.func,
  classes: PropTypes.object
};



export default SliderInput;
