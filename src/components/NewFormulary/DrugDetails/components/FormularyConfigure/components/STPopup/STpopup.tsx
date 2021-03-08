import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import Box from '@material-ui/core/Box'
import CardContent from '@material-ui/core/CardContent'
import Collapse from '@material-ui/core/Collapse'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import DeleteIcon from '@material-ui/icons/Delete'
// components
import Sidebar from './sidebar'
import data from './data.json'
import DescriptionCard from './descriptionCard'

import './styles.scss'
import { Button } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  card: {
    border: '1px solid #E5E5E5',
    boxShadow: 'none',
    width: '1200px'
  },
  rightPanel: {
    maxHeight: 700,
    overflowY: 'scroll',
  },
  header: {
    borderBottom: '1px solid #E5E5E5',
    padding: theme.spacing(3),
  },
  action: {
    background: '#F9F9F9',
  },
  button: {
    marginLeft: theme.spacing(2),
  },
  link: {
    color: '#666666',
  },
  actionButton: {
    margin: theme.spacing(0, 2),
  },

  h6: {
    fontSize: '16px',
  },

  spanText: {
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    height:'100%',
    color:'#707689'
  }
}))

const Header = ({ onExpand }: any) => {
  const classes = useStyles()
  return (
    <Box display="flex" alignItems="center" justifyContent="space-between">
      <Typography variant="h6" className={classes.h6}>Advanced Search</Typography>
      <IconButton size="small">
        <ExpandMoreIcon fontSize="small" onClick={onExpand} />
      </IconButton>
    </Box>
  )
}

const STPopup = () => {
  const classes = useStyles()
  const [expanded, setExpanded] = useState(true)
  const [sections, setSections] = useState<any>([])
  const [visibility, setVisibility] = useState(false)

  const handleExpand = () => {
    setExpanded(!expanded)
  }

  const handleDelete = (index: number) => {
    const filteredData = sections.filter((_: any, indx: number) => index !== indx)
    setSections(filteredData)
  }

  const sidebarCallBack = (visible) => {
    setVisibility(true)
  }

  return (
    <div className="advance-search-container">    
    <Card className={classes.card}>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
              <Sidebar parentCallback={sidebarCallBack}/>
            </Grid>
            <Grid item xs={12} md={9}>
              {visibility && 
              <Box className={classes.rightPanel} pr={1}>
                {data.map(({ title, options }: any, index: number) => (
                  <Box display="flex" alignItems="center">
                    <DescriptionCard title={title} options={options} />
                    <IconButton size="small" onClick={() => handleDelete(index)}>
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                ))}
              </Box>}
              {!visibility &&
              <span className={classes.spanText}>
                Drag the file type(s) from the list on the left to create a filter
              </span>}
            </Grid>
          </Grid>
        </CardContent>
      </Collapse>
    </Card>    
    <div className="advanced-grid-search__action">
      <div className="advanced-grid-search__action-wrapper">
                    <Button className="advanced-grid-search__btn-clear">
                        <svg className="advanced-grid-search__btn-clear--clearicon" width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M8.5 17C13.1944 17 17 13.1945 17 8.5C17 3.80554 13.1944 0 8.5 0C3.8056 0 0 3.80554 0 8.5C0 13.1945 3.8056 17 8.5 17ZM8.5 16C12.6422 16 16 12.6421 16 8.5C16 4.35791 12.6422 1 8.5 1C4.35785 1 1 4.35791 1 8.5C1 12.6421 4.35785 16 8.5 16Z" fill="#666666" />
                            <path d="M5.31803 5.31802C5.12277 5.51328 5.12277 5.82986 5.31803 6.02513L7.7929 8.5L5.31803 10.9749C5.12277 11.1701 5.12277 11.4867 5.31803 11.682C5.51329 11.8772 5.82987 11.8772 6.02514 11.682L8.50001 9.20711L10.9749 11.682C11.1701 11.8772 11.4867 11.8772 11.682 11.682C11.8773 11.4867 11.8773 11.1701 11.682 10.9749L9.20712 8.5L11.682 6.02513C11.8773 5.82986 11.8773 5.51328 11.682 5.31802C11.4867 5.12276 11.1701 5.12276 10.9749 5.31802L8.50001 7.79289L6.02513 5.31802C5.82987 5.12276 5.51329 5.12276 5.31803 5.31802Z" fill="#666666" />
                        </svg>
                        <span>Clear</span>
                    </Button>
                    <Button
                        className="advance-search-button"
                        // onClick={e => this.onSearch()}
                    >
                        Apply Search
                    </Button>
                    </div>
        </div>
    </div>
  )
}

export default STPopup
