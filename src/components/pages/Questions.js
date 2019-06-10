import React, { Component } from 'react';
import { connect } from 'react-redux';
import constants from '../../constants';
import BasePage from './BasePage/BasePage';
import ButtonNext from '../buttons/ButtonNext/ButtonNext';
import RadioButton from "../buttons/RadioButton/RadioButton";
import CheckboxInput from "../buttons/CheckboxInput/CheckboxInput";
import SwitchInput from "../buttons/SwitchInput/SwitchInput";
import SliderInput from "../buttons/SliderInput/SliderInput";

class Questions extends Component {
  constructor (props) {
    super(props);

    let step = 2;
    let questionNumber = 1;

    const {questions, title, img, inputType} = constants.possibleAnswers[step][questionNumber];

    let initialValue = this.getInitialValue(inputType, questions);

    this.state = {
      questions,
      title,
      img,
      inputType,
      step: step,
      questionNumber: questionNumber,
      selectedValues: initialValue,
      showNotification: false
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleCloseNotificationButton = this.handleCloseNotificationButton.bind(this);
    this._nextPage = this.nextPage.bind(this);
  }
  
  getInitialValue(inputType, questions){
    switch (inputType) {
      case 'CheckboxInput':
        return '';
      default:
        return questions[0];
    }
    
  }
  handleCloseNotificationButton (e) {
    this.setState({
      showNotification: false
    });
  }

  handleInputChange(value) {
    if (value){
      this.setState({
        selectedValues: value,
        showNotification: false
      });
    } else  {
      this.setState({
        selectedValues: value
      });
    }
  }

  nextPage () {
    if(!this.state.selectedValues.length){
      this.setState({
        showNotification: true
      });
      return;
    }

    const answers = this.props.answers;

    answers[this.state.step][this.state.questionNumber] =
      [this.state.selectedValues]
    ;

    this.props.dispatch({
      type: 'CHANGE_ANSWERS',
      value: answers
    });

    let nextQuestion = this.state.questionNumber + 1;
    let nextStep = this.state.step + 1;
    if (constants.possibleAnswers[this.state.step] && constants.possibleAnswers[this.state.step][nextQuestion]){
      const {questions, title, img, inputType} = constants.possibleAnswers[this.state.step][nextQuestion];
      let initialValue = this.getInitialValue(inputType, questions);
          this.setState({
            questions,
            title,
            img,
            inputType,
            questionNumber: nextQuestion,
            selectedValues: initialValue
        });
    } else if( constants.possibleAnswers[nextStep] && constants.possibleAnswers[nextStep][1]){
      const {questions, title, img, inputType} = constants.possibleAnswers[nextStep][1];
      let initialValue = this.getInitialValue(inputType, questions);
          this.setState({
            questions,
            title,
            img,
            inputType,
            step: nextStep,
            questionNumber: 1,
            selectedValues: initialValue
          });
    } else {
      this.props.dispatch({
        type: 'SET_TOKEN',
        token: null
      });
      this.props.history.push('/results');
    }

  }


  render () {

    const { classes } = this.props;

    const ButtonType =  this.state.inputType || 'RadioButton';

    const components =  {
      'RadioButton' : RadioButton,
      'CheckboxInput' : CheckboxInput,
      'SwitchInput': SwitchInput,
      'SliderInput':  SliderInput
    };

    const ButtonElement = components[ButtonType];

    const  questionInput =  (
          <ButtonElement
              selectedValues = {this.state.selectedValues}
              questions = {this.state.questions}
              classes = {classes}
              _handleChange={this.handleInputChange}
          />
      );


    // if last question
    let ifLastStep = this.state.step ===  Object.keys(constants.possibleAnswers).length + 1;
    let ifLastQuestion = Object.keys(constants.possibleAnswers[this.state.step]).length;
    let ifSubmitButton = ifLastStep && ifLastQuestion;

    return (
      <div>
        <BasePage
          titleText={this.state.title}
          currentPage={this.state.step}
          totalPages={4}
          questionInput={questionInput}
          monsterImg={this.state.img}
          showNotification={this.state.showNotification}
          handleCloseNotificationButton= {this.handleCloseNotificationButton}
          buttonOptions={{
            className: 'on-form ' + (ifSubmitButton && 'green-btn') ,
            text:  ifSubmitButton ? 'Submit' :  'Next',
            onClick: this._nextPage,
            isDisabled: !this.state.selectedValues.length
          }}
        />
        <ButtonNext
          className={'mob ' + + (ifSubmitButton && 'green-btn')}
          text={ifSubmitButton ? 'Submit' :  'Next'}
          onClick={this._nextPage}
          isDisabled={!this.state.selectedValues.length}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  answers: state.answers
});

export default connect(mapStateToProps)(Questions);
