import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import InputAdornment from "@material-ui/core/InputAdornment";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import Countdown from "../Countdown/Countdown.jsx";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  margin: {
    margin: theme.spacing(3),
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

export default function Timer() {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    totalMinutes: "75",
    people: "20",
    minutes: "3",
    seconds: "00",
    submitted: false,
    currentCountdown: 3,
  });

  const submitForm = () => {
    console.log("button clicked");
    const timePerPerson = values.totalMinutes / values.people;
    setValues({
      ...values,
      submitted: true,
      minutes: Math.floor(timePerPerson),
      seconds: 60 * (timePerPerson - values.minutes),
      currentCountdown: timePerPerson,
    });
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleChangeTimeManually = (time) => {
    if (time > 0 && time <= 60) {
      setValues({
        ...values,
        currentCountdown: time,
      });
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.root}>
        <Grid
          container
          spacing={2}
          style={{ maxWidth: "980px", margin: "32px auto" }}
          direction="row"
          justify="center"
          alignItems="center"
        >
          <Grid item xs={12}>
            <Paper>
              <Typography variant="h3" gutterBottom>
                SLAA Timer
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                This website creates a timer for the timekeeper at Anonymous
                meetings.
              </Typography>
              <FormControl
                className={clsx(
                  classes.margin,
                  classes.withoutLabel,
                  classes.textField
                )}
              >
                <Input
                  type="num"
                  id="total-minutes"
                  value={values.weight}
                  onChange={handleChange("totalMinutes")}
                  endAdornment={
                    <InputAdornment position="end">
                      Total Minutes
                    </InputAdornment>
                  }
                  defaultValue="75"
                />
                <Input
                  type="num"
                  id="number-of-people"
                  value={values.weight}
                  onChange={handleChange("people")}
                  endAdornment={
                    <InputAdornment position="end">
                      People in meeting
                    </InputAdornment>
                  }
                  defaultValue="20"
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={submitForm}
                >
                  Submit
                </Button>
                {values.submitted ? (
                  <Typography>
                    Each person gets {values.minutes} minutes and{" "}
                    {values.seconds} seconds.
                  </Typography>
                ) : (
                  <p></p>
                )}
              </FormControl>
            </Paper>

            {values.submitted ? (
              <Countdown
                width={700}
                currentCountdown={values.currentCountdown}
                minutes={values.minutes}
                seconds={values.seconds}
                handleChangeTimeManually={handleChangeTimeManually}
              />
            ) : (
              <p>not yet submitted</p>
            )}
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
