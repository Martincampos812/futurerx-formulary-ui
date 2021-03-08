import React, { useEffect, useState } from 'react';
import { SUCCESS_MSG, ERROR_MSG } from './PopupAlerts/Constents'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';

interface Props {
  error?: any;
  success?: any;
  delay: any;
  popupType?:any;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
    mb10: {
      marginBottom: '10px'
    }
  }),
);

function AlertMessages(props: Props) {
  const classes = useStyles();
  const [visible, setVisible] = useState(true);
  const {error,success,popupType} = props
  useEffect(() => {
    setVisible(true);
    setTimeout(() => {
      setVisible(false);
    }, props.delay);
  }, [props]);

  return (
    <div className={`${classes.root} ${classes.mb10}`}>
      {error && error.length > 1 && error.map(err => {
        return <Alert severity="error">{err.message}</Alert>
      })}
      {error && error.status != 200 && visible && <Alert severity="error">{error.data ? error.data.message : ERROR_MSG}</Alert>}
      {success && visible && <Alert severity="success">{SUCCESS_MSG[popupType]}</Alert>}
    </div>
  );
}

export default AlertMessages
