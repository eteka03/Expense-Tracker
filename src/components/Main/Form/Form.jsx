import { FormControl, TextField, Grid, InputLabel, Typography ,Select, MenuItem, Button } from '@material-ui/core'
import React from 'react'

import useStyles from './Form.styles'

const Form = () => {
    const classes = useStyles()
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography align="center" variant="subtitle2" gutterBottom>
                    ...
                </Typography>
            </Grid>
            <Grid item xs={6}>
                <FormControl fullWidth>
                    <InputLabel>Type</InputLabel>
                    <Select>
                        <MenuItem value="Income">Income</MenuItem>
                         <MenuItem value="Expense">Expenses</MenuItem>

                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={6}>
                <FormControl fullWidth>
                    <InputLabel>Category</InputLabel>
                    <Select>
                        <MenuItem value="business">Business</MenuItem>
                        <MenuItem value="salary">Salary</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={6}>
                <TextField label="Amount" type="number" fullWidth /> 
            </Grid>
            <Grid item xs={6}>
                <TextField label="Date" type="date" fullWidth /> 
            </Grid>
            <Button className={classes.button} variant="outlined" color="primary" fullWidth>Create</Button>
            
        </Grid>
    )
}

export default Form
