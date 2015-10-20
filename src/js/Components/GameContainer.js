import { Component } from 'react';
import { connect } from 'react-redux';
import SokobanGame from './SokobanGame';

function mapStateToProps(state) {
  return {
    level: state.level,
    id: state.id, 
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