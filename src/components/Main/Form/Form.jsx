import { FormControl, TextField, Grid, InputLabel, Typography ,Select, MenuItem, Button } from '@material-ui/core'
import React , {useState,useEffect ,useContext} from 'react'
import { ExpenseContext } from '../../../context/context'
import {v4 as uuidv4} from 'uuid'
import useStyles from './Form.styles'
import { expenseCategories, incomeCategories } from '../../../constants/categorie'
import formatDate from '../../../utils/formatDate'
import { useSpeechContext } from '@speechly/react-client'
import CustomizedSnackbar from '../../Snackbar/Snackbar'


const Form = () => {
    const classes = useStyles()
    const initialState = {type:"Income" , category:"Business" , amount:50 , date: formatDate(new Date())}
    const {addTransaction} = useContext(ExpenseContext)
    const {segment} = useSpeechContext()
    const [formData, setFormData] = useState(initialState)
    const [open , setOpen] = useState(false)
    useEffect(() => {
        if(segment){
            if(segment.intent.intent === 'add_expense')
            setFormData({...formData , type:'Expense'})
            else if(segment.intent.intent === 'add_income'){
                setFormData({...formData , type: "Income"})
            }else if (segment.isFinal && segment.intent.intent === "create_transaction"){
                return createTransaction()
            }else if (segment.isFinal && segment.intent.intent === "cancel_transaction"){
                return setFormData(initialState)
            }


            segment.entities.forEach(e => {
                const category = `${e.value.charAt(0).toUpperCase()}${e.value.slice(1).toLocaleLowerCase()}`
                
                switch (e.type) {
                    case "amount":
                        
                    setFormData({...formData, amount: e.value})
                        break ;
                    case "category":
                        if(incomeCategories.map(cat => cat.type).includes(category)){
                            setFormData({...formData, type: "Income" ,  category})
                        }else if(expenseCategories.map(cat => cat.type).includes(category)){
                            setFormData({...formData, type: "Expense" ,  category})
                        }
                        
                    break ;
                    case "date": 
                    setFormData({...formData , date: e.value})
                    break ;
                    default:
                        break;
                }
            })

            if(segment.isFinal && formData.amount && formData.type && formData.category && formData.date){
            createTransaction();
        }
        }     

        
        
    }, [segment])

    const selectedCategories = formData.type  === "Income" ? incomeCategories : expenseCategories
    const handleChange = e => {
        const {value , name} = e.target
        name === "date" ? setFormData({...formData , [name]: formatDate(value)}) : setFormData({...formData , [name]: value})  
    }

    const createTransaction =  () => {
        if(Number.isNaN(Number(formData.amount)) || !formData.date.includes("-")) return ;
        const transaction = {...formData , amount: Number(formData.amount) , id: uuidv4()}
        console.log("transaction" , transaction)
        setOpen(true)
        addTransaction(transaction) ; 
        setFormData(initialState)
    } 
    
    return (
        <Grid container spacing={2}>
            <CustomizedSnackbar open={open} setOpen={setOpen} />
            <Grid item xs={12}>
                <Typography align="center" variant="subtitle2" gutterBottom>
                    {segment && (<>{segment.words.map(w => w.value).join(" ")} </>)}
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
                        
                        {selectedCategories.map(cat => <MenuItem key={cat.type} value={cat.type}>{cat.type}</MenuItem>)}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={6}>
                <TextField name="amount" label="Amount" type="number" fullWidth onChange={handleChange} value={formData.amount} /> 
            </Grid>
            <Grid item xs={6}>
                <TextField name="date" value={formData.date}  onChange={handleChange} label="Date" type="date" fullWidth /> 
            </Grid>
            <Button onClick={createTransaction} className={classes.button} variant="outlined" color="primary" fullWidth>Create</Button>
            
        </Grid>
    )
}

export default Form
