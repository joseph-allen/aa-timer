import React, { Component } from "react";
import Beep from "../../assets/sound.wav";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CircularProgress from "@material-ui/core/CircularProgress";
import CardContent from "@material-ui/core/CardContent";
import { withStyles } from "@material-ui/styles";
import { Autorenew, PlayArrow, Pause } from "@material-ui/icons";

const countdown = require("countdown");

const styles = (theme) => ({
  Button: {
    margin: 10,
    "@media screen and (min-width: 600px)": {
      margin: 20,
    },
  },
  Paper: {
    "@media screen and (max-width: 600px)": {
      marginTop: 60,
    },
    marginTop: 70,

    paddingTop: 30,
    paddingBottom: 96,
    textAlign: "center",
    minHeight: "90vh",
  },
  Typography: {
    height: 50,
    margin: 20,
  },
  IconButton: {
    margin: 5,
  },
  Form: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    paddingBottom: 10,
    "@media screen and (min-width: 360px)": {
      flexDirection: "row",
    },
  },
  TextField: {
    width: 200,
    margin: 25,
    "@media screen and (min-width: 600px)": {
      margin: 20,
    },
  },
  Card: {
    maxWidth: 300,
    margin: "0 auto",
    "@media screen and (min-width: 600px)": {
      maxWidth: 500,
    },
  },
});

export default withStyles(styles)(
  class Countdown extends Component {
    state = {
      isRunning: true,
      currentPercentage: 100,
      timerId: 0,
      reminder: 0,
      tsMin: this.props.minutes,
      tsSec: this.props.seconds,
      manualTime: this.props.currentCountdown,
    };

    initiateCountdown = () => {
      const addMinutes = (minutes, seconds) =>
        new Date(new Date().getTime() + minutes * 60000 + seconds * 1000);

      const { tsMin, tsSec } = this.state;
      const { currentCountdown } = this.props;

      const deadline =
        tsMin === 0 && tsSec === 0
          ? addMinutes(currentCountdown, 0)
          : addMinutes(tsMin, tsSec);

      this.setState({
        timerId: countdown(
          deadline,
          (ts) => {
            this.progressCountdown(ts);
            this.checkIfFinished();
          },
          countdown.HOURS | countdown.MINUTES | countdown.SECONDS
        ),
        isRunning: true,
      });
    };

    progressCountdown = (ts) => {
      const timeLeft = ts.minutes * 60 + ts.seconds;
      const currentCountdownSeconds = this.props.currentCountdown * 60;

      this.setState(() => ({
        currentPercentage:
          ((currentCountdownSeconds - (currentCountdownSeconds - timeLeft)) /
            currentCountdownSeconds) *
          100,
        tsMin: ts.minutes,
        tsSec: ts.seconds,
      }));
    };

    checkIfFinished = () => {
      const { tsMin, tsSec, isRunning } = this.state;
      const fiveMin = 50000;

      if (tsMin === 0 && tsSec === 0 && isRunning === true) {
        const audio = new Audio(Beep);
        audio.play();

        this.clearTimer();
        this.setState({ reminder: setInterval(() => audio.play(), fiveMin) });
      }
    };

    clearTimer = (cb) => {
      window.clearInterval(this.state.timerId);
      this.setState(
        {
          timerId: 0,
          isRunning: true,
        },
        cb
      );
    };

    clearReminder = () => {
      window.clearInterval(this.state.reminder);
      this.setState({ reminder: 0 });
    };

    handleStartPause = () => {
      const { isRunning } = this.state;

      this.clearReminder();
      this.clearTimer(() => {
        if (!isRunning) this.initiateCountdown();
      });
    };

    handleReset = () => {
      this.clearReminder();
      this.clearTimer(() => {
        this.setState(
          () => ({ tsMin: this.props.minutes, tsSec: this.props.seconds }),
          this.initiateCountdown
        );
      });
    };

    componentDidUpdate(prevProps) {
      if (prevProps.currentCountdown !== this.props.currentCountdown) {
        this.handleReset();
      }
    }

    render() {
      const { classes, handleChangeTimeManually } = this.props;
      const { tsMin, tsSec, reminder } = this.state;
      return (
        <Paper className={classes.Paper}>
          <Card className={classes.Card}>
            <CardContent>
              <CircularProgress
                height={50}
                size={250}
                color="secondary"
                variant="static"
                thickness={1}
                value={this.state.currentPercentage}
              />

              <Typography
                className={classes.Typography}
                variant="h4"
                color="inherit"
                id="countdown"
              >
                {reminder === 0
                  ? `${tsMin}min - ${tsSec}s`
                  : `Reminder set to 1min`}
              </Typography>
            </CardContent>
          </Card>
          <br />
          <Button
            className={classes.Button}
            variant="contained"
            color="primary"
            onClick={this.handleReset}
          >
            <Autorenew className={classes.IconButton} />
            Reset
          </Button>
          <form
            noValidate="noValidate"
            autoComplete="off"
            className={classes.Form}
            onSubmit={(e) => {
              e.preventDefault();
              handleChangeTimeManually(this.state.manualTime);
              this.setState({ manualTime: 3.5 });
              const inputField = document.querySelector("#time");
              inputField.value = "";
            }}
          ></form>
        </Paper>
      );
    }
  }
);
