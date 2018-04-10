import React from 'react';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';

const theme = createMuiTheme({
  drawerWidth: 256,
});

function Customize(WrappedComponent) {
  return class extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        a: 1,
      };
    }
    render() {
      return (
        <MuiThemeProvider theme={theme}>
          <WrappedComponent {...this.props} />
        </MuiThemeProvider>
      );
    }
  };
}

export default Customize;
