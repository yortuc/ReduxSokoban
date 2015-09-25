import { Component } from 'react';
import { connect } from 'react-redux';
import SokobanGame from './SokobanGame';

function mapStateToProps(state) {
  return {
    level: state.level,
    playerX: state.playerX,
    playerY: state.playerY
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch : dispatch
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SokobanGame);