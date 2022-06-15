import React, { Component } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';

function Copyright() {
  return (
    <Typography variant='body2' color='text.secondary'>
      {'Copyright © '}
      <Link color='inherit' href='https://mui.com/'>
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date() };
    console.log('Im in constructor');
    // this.handleClick = this.handleClick.bind();
  }

  static getDerivedStateFromProps(props, state) {
    console.log('🚀 => props, state', props, state);
    console.log('Im in componentDidMount');
  }
  static getDerivedStateFromError(error) {
    console.log('Im in getDerivedStateFromError');
  }

  componentDidMount() {
    console.log('Im in componentDidMount');
  }

  componentWillUnmount() {
    console.log('Im in componentWillUnmount');
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log('🚀 => prevProps, prevState', prevProps, prevState);
    console.log('Im in getSnapshotBeforeUpdate');
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log(
      '🚀 => prevProps, prevState, snapshot',
      prevProps,
      prevState,
      snapshot
    );
    console.log('Im in getSnapshotBeforeUpdate');
  }

  handleClick() {
    alert('Clicked');
  }

  render() {
    console.log('render');
    return (
      <Box
        component='footer'
        sx={{
          py: 3,
          px: 2,
          mt: 'auto',
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[200]
              : theme.palette.grey[800],
        }}
      >
        <Container maxWidth='sm'>
          <button onClick={this.handleClick}>Click here</button>
          <Typography variant='body1'>
            My sticky footer can be found here.
          </Typography>
          <Copyright />
        </Container>
      </Box>
    );
  }
}

export default Footer;