import { Component } from 'react';
import { connect } from 'react-redux';
import SokobanGame from './SokobanGame';

// Which part of the Redux global state does our component want to receive as props?
function mapStateToProps(state) {
  return {
    level: state.level,
    playerX: state.playerX,
    playerY: state.playerY
  };
}

// Which action creators does it want to receive by props?
function mapDispatchToProps(dispatch) {
  return {
    dispatch : dispatch
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SokobanGame);