import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import VerticalAlignCenterIcon from '@material-ui/icons/VerticalAlignCenter'
import colIcon from '../../../../../../../assets/icons/colIcon.png'
// json
import codes from './codes.json'
import './styles.scss'

const useStyles = makeStyles((theme) => ({
  root: {
    borderRight: '1px solid #E5E5E5',
    
  },
  list: {
    padding: theme.spacing(0.1, 0),
  },
  listItem: {
    padding: theme.spacing(0),
  },
  avatar: {
    padding: theme.spacing(0),
    minWidth: theme.spacing(4),
    color: '#707683',
  },
  listText: {
    fontSize: '10px!important' as any,
    color: '#707683',
    marginLeft: 3,
  },
}))

const Sidebar = ({ parentCallback }:any) => {
  const classes = useStyles()

  const listClicked = () => {
      parentCallback(true)
  }

  return (
    <Box className={classes.root}>
      {codes.map(({ name }) => (
        <List className={classes.list} onClick = {() => listClicked()}>
          <ListItem className={classes.listItem}>
            <ListItemAvatar className={classes.avatar}>
              <img src={colIcon} alt="icon left missing" />
            </ListItemAvatar>
            <ListItemText primary={name} className={classes.listText + " popuplist"} />
          </ListItem>
        </List>
      ))}
    </Box>
  )
}

export default Sidebar
