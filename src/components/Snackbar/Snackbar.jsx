import { Snackbar } from '@material-ui/core'
import React from 'react'
import useStyles from './snackbar.styles'
import MuiAlert from '@material-ui/lab/Alert'

const CustomizedSnackbar = ({open , setOpen}) => {

    const handleClose = (e ,  reason) => {
        if(reason === "clickaway") return ;
        console.log('close')
        setOpen(false)
    }

   const classes = useStyles()
    return (
        <div className={classes.root}>
            <Snackbar anchorOrigin={{vertical: 'top' , horizontal:'right'}} open={open} autoHideDuration={3000} onClose={handleClose}>
                <MuiAlert onClose={handleClose} severity='success' elevation={6} variant="filled">
                    Transaction successfully created
                </MuiAlert>
            </Snackbar>
        </div>
    )
}

export default CustomizedSnackbar

