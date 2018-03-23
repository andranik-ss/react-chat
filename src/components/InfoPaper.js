import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';

const styles = theme => ({
  paper: {
    padding: theme.spacing.unit * 3,
  },
});

const InfoPaper = ({ classes }) => (
  <Paper className={classes.paper}>
    <Typography variant="display1" gutterBottom>
      Start messaging…
    </Typography>
    <Typography variant="body1" gutterBottom>
      Use <strong>Global</strong> to explore communities around here.
    </Typography>
    <Typography variant="body1" gutterBottom>
      Use <strong>Recents</strong> to see your recent conversations.
    </Typography>
  </Paper>
);

InfoPaper.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default withStyles(styles)(InfoPaper);
