import React , {useState} from 'react'
import {Avatar, List as MuiList , ListItemText, ListItemAvatar, ListItem,Slide, ListItemSecondaryAction, IconButton} from '@material-ui/core'
import {Delete ,MoneyOff} from '@material-ui/icons'
import useStyles from './List.styles'
const List = () => {
    const classes = useStyles()
    const [transactions , setTransactions] = useState([
        {id:1 ,type: "Income" , category:'Home' ,date: new Date() , amount: 50},
        {id:2 ,type: "Expense" , category:'Business' ,date: new Date() , amount: 90},
        {id:3 ,type: "Income" , category:'school' ,date: new Date() , amount: 170}
    ])
    return (
        <MuiList dense={false} className={classes.list}>
            {transactions.map(transaction => (
                <Slide direction="down" in mountOnEnter unmountOnExit key={transaction.id}>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar className={transaction.type === "Income" ? classes.avatarIncome : classes.avatarExpense}>
                                <MoneyOff />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={transaction.category} secondary={`$ ${transaction.amount} - ${transaction.date.toLocaleDateString()}`} />
                    
                    <ListItemSecondaryAction>
                        <IconButton edge="end" aria-label="delete" onClick="">
                            <Delete />

                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
                </Slide>
            ))}
        </MuiList>
    )
}

export default List
