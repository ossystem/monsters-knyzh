import React, { Component} from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import ButtonNext from '../../buttons/ButtonNext/ButtonNext';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import './BasePage.css';
import constatns from '../../../constants';

class BasePage extends Component {
  constructor (props) {
    super(props);
  }

  render () {
    const {
      currentPage,
      totalPages,
      titleText,
      questionInput,
      buttonOptions,
      monsterImg,
      showNotification,
      handleCloseNotificationButton
    } = this.props;

    return (
      <div className="base-page-container">
        <div className="top-wrapper">
          <div className="top-logo-wrapper">
            <img className="top-logo" src="/img/logo2.png" alt=""/>
            <div className="top-logo-label">
              Found your monsters
            </div>
          </div>
        </div>
        <div className="form-wrapper">
          <div className="monster-img-wrapper">
            <img className="monster-img" src={monsterImg} alt=""/>
          </div>
          <div className="notification" style={{display: showNotification? 'flex' : 'none' }}>{constatns.notSelected}
            <IconButton aria-label="Delete" size='large'  onClick={handleCloseNotificationButton} >
              <CloseIcon style={{ fontSize: 20 }} className='closeButton'/>
            </IconButton> </div>
          <div className="paginator">{currentPage} from {totalPages}</div>
          <div className="page-title">{titleText}</div>
          {questionInput}
          <ButtonNext
            options={buttonOptions}
          />
        </div>
      </div>
    );
  }
}

BasePage.propTypes = {
  questionInput: PropTypes.any,
  titleText: PropTypes.string.isRequired,
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  monsterImg: PropTypes.string,
  buttonOptions: PropTypes.shape({
    text: PropTypes.string.isRequired,
    isDisabled: PropTypes.bool,
    onClick: PropTypes.func,
    toRoute: PropTypes.string,
    className: PropTypes.string
  }).isRequired
};

export default withRouter(connect()(BasePage));
