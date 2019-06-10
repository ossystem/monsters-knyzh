import React, {useState} from 'react';
import PropTypes from 'prop-types';
import './CheckboxInput.css';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import {withStyles} from "@material-ui/core";

const styles = {
  root: {
    '&$checked': {
      color: '#8cbe82',
    },
  },
  checked: {}
};



const CheckboxInput = props => {
  const {
    _handleChange,
    questions,
    classes
  } = props.options || props;

  const [selectedValuesArray, setSelectedValuesArray] = useState([]);


  const  handleChangeCheckboxInput = function(el){
    console.log(selectedValuesArray);


    return e => {
      let array = selectedValuesArray.slice();
      if (e.target.checked) {
        console.log('element', el);
        array.push(el);
      } else {
        console.log('element', el);
        const index = array.findIndex(i => i === el);
        if (index >= 0) {
          array.splice(index, 1);
        }
      }
      setSelectedValuesArray(array);
      _handleChange(array.join(', '));

    };



  };

  return (
      <FormGroup className="checkbox">
        {questions.map((el, index) => {
          return (
              <FormControlLabel
                  key={index}
                  label={el}
                  className="checkbox-label"
                  control={
                    <Checkbox
                        onChange={handleChangeCheckboxInput(el)}
                        classes={{
                          root: classes.root,
                          checked: classes.checked,
                        }}
                    />
                  }
              />
          );
        })}
      </FormGroup>

  );

};

CheckboxInput.propTypes = {
  questions: PropTypes.array,
  _handleChange: PropTypes.func,
  classes: PropTypes.object
};



export default withStyles(styles)(CheckboxInput);
