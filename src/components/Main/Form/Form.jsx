import { FormControl, TextField, Grid, InputLabel, Typography ,Select, MenuItem, Button } from '@material-ui/core'
import React , {useState ,useContext} from 'react'
import { ExpenseContext } from '../../../context/context'
import {v4 as uuidv4} from 'uuid'
import useStyles from './Form.styles'

const Form = () => {
    const classes = useStyles()
    const initialState = {type:"Income" , category:"business" , amount:50 , date: new Date()}
    const {addTransaction} = useContext(ExpenseContext)

    const [formData, setFormData] = useState(initialState)
    
    
    const handleChange = e => {
        const {value , name} = e.target

        setFormData({...formData , [name]: value})
   
        console.log("formData",formData)
    }

    const createTransaction =  () => {
        const transaction = {...formData , amount: Number(formData.amount) , id: uuidv4()}

        addTransaction(transaction) ; 
        setFormData(initialState)
    } 
    
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
                    <Select name="type" value={formData.type} onChange={handleChange}>
                        <MenuItem value="Income">Income</MenuItem>
                         <MenuItem value="Expense">Expenses</MenuItem>

                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={6}>
                <FormControl fullWidth>
                    <InputLabel>Category</InputLabel>
                    <Select name="category" value={formData.category} onChange= { handleChange}>
                        <MenuItem value="business">Business</MenuItem>
                        <MenuItem value="salary">Salary</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={6}>
                <TextField name="amount" label="Amount" type="number" fullWidth onChange={handleChange} value={formData.amount} /> 
            </Grid>
            <Grid item xs={6}>
                <TextField name="date" value={formData.date} onChange={handleChange} label="Date" type="date" fullWidth /> 
            </Grid>
            <Button onClick={createTransaction} className={classes.button} variant="outlined" color="primary" fullWidth>Create</Button>
            
        </Grid>
    )
}

export default Form
