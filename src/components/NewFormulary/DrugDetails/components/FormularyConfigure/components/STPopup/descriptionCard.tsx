import React, { useState } from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import Link from '@material-ui/core/Link'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import Box from '@material-ui/core/Box'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import Collapse from '@material-ui/core/Collapse'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Tooltip from '@material-ui/core/Tooltip'
import InputAdornment from '@material-ui/core/InputAdornment'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import SaveIcon from '@material-ui/icons/Save'
import EditIcon from '@material-ui/icons/Edit'
import './styles.scss'
// components
import  Dropdown  from './Dropdown'
// types
import { IActioncolorT } from './types'

const useStyles = makeStyles((theme) => ({
  card: {
    border: '2px solid',
    boxShadow: 'none',
    margin: theme.spacing(2, 0),
    width: '100%',
  },
  header: {
    borderBottom: '1px solid #E5E5E5',
    padding: theme.spacing(2),
  },
  headerTitle: {
    fontWeight: 'bold',
  },
  headerIcon: {
    width: 4,
    height: 4,
    marginLeft: theme.spacing(2),
  },
  expandButton: {
    marginLeft: theme.spacing(2),
  },
  content: {
    background: '#F9F9F9',
    paddingBottom: '0 !important',
  },
  contentTitle: {
    fontWeight: 'bold',
    fontSize: 12,
  },
  link: {
    fontSize: 12,
    marginLeft: theme.spacing(2),
    color: '#666666',
  },
  textField: {
    fontSize: 15,
    margin: theme.spacing(0, 3),
    borderRadiu: 3,
    padding: theme.spacing(0, 1),
  },
  textLong: {
    width: '90%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  customCheckbox: {
    marginLeft: 30,
    fontSize: '12px',
  },
}))

const LightTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 0.87)',
    border: '1px solid #E6E6E6',
    fontSize: 15,
    padding: theme.spacing(2),
    fontWeight: 400,
  },
}))(Tooltip)

const Header = ({
  classes, title, onExpand, onSetAction,
}: any) => {
  const [description, setDescription] = useState({
    onAdd: false,
    onSave: false,
    text: '',
  })

  const handleDescriptionAdd = () => {
    setDescription({
      ...description,
      onSave: false,
      onAdd: !description.onAdd,
    })
  }

  const handleDescriptionSave = () => {
    if (description.text) { setDescription({ ...description, onAdd: false, onSave: true }) } else { setDescription({ ...description, onAdd: false, onSave: false }) }
  }

  const handleDescriptionChange = ({ target: { value } }: any) => {
    setDescription({ ...description, text: value })
  }

  const handleKeyPress = (e: any) => {
    if (e.keyCode === 13) {
      handleDescriptionSave()
    }
  }

  return (
    <Box display="flex" alignItems="center" justifyContent="space-between">
      <Box display="flex" alignItems="center" width="100%">
        <Typography className={classes.headerTitle}>{title}</Typography>
        <IconButton size="small" color="primary" className={classes.headerIcon}>
          <ErrorOutlineIcon fontSize="small" onClick={onExpand} />
        </IconButton>
        {description.onAdd && (
          <OutlinedInput
            margin="dense"
            fullWidth
            value={description.text}
            onChange={handleDescriptionChange}
            onKeyDown={handleKeyPress}
            endAdornment={(
              <InputAdornment position="end">
                <IconButton size="small" onClick={handleDescriptionSave}>
                  <SaveIcon fontSize="small" />
                </IconButton>
              </InputAdornment>
            )}
            className={classes.textField}
          />
        )}
        {description.onSave && (
          <Typography>
            <Box ml={3} display="flex">
              <LightTooltip title={description.text} placement="top">
                <div className={classes.textLong}>{description.text}</div>
              </LightTooltip>
              <IconButton size="small" onClick={handleDescriptionAdd}>
                <EditIcon fontSize="small" />
              </IconButton>
            </Box>
          </Typography>
        )}
      </Box>
      <Box display="flex" alignItems="center">
        <Dropdown
          name="action"
          height={30}
          width={120}
          options={['include', 'exclude']}
          onSetAction={onSetAction}
        />
        <IconButton size="small" className={classes.expandButton}>
          <ExpandMoreIcon fontSize="small" onClick={onExpand} />
        </IconButton>
      </Box>
    </Box>
  )
}

const DescriptionCard = ({ title, options }: any) => {
  const classes = useStyles()
  const [expanded, setExpanded] = React.useState(true)
  const [action, setAction] = useState<string>('include')
  const [actionColor] = useState<IActioncolorT>({
    include: '#4caf50',
    exclude: '#f44336',
  })

  const handleExpand = () => {
    setExpanded(!expanded)
  }

  return (
    <Card className={classes.card} style={{ borderColor: actionColor[action] }}>
      <CardHeader
        className={classes.header}
        title={(
          <Header
            classes={classes}
            title={title}
            onExpand={handleExpand}
            onSetAction={setAction}
          />
        )}
      />
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent className={classes.content  + " mnCustomClasses"}>
          <Typography className={classes.contentTitle + " cardTitle"}>
            {options.title}
          </Typography>
          <Box mt={1}>
            {
              options.data.map((label: string) => (
                <FormControlLabel
                  value="start"
                  control={<Checkbox color="primary" className={classes.customCheckbox + " mnCheck"} />}
                  label={label}
                  labelPlacement="end"
                />
              ))
            }
          </Box>
        </CardContent>
      </Collapse>
    </Card>
  )
}

export default DescriptionCard
