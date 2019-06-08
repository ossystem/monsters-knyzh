import React from 'react';
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
                        onChange={_handleChange(el)}
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
