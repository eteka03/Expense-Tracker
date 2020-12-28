import React , {useState,useContext} from 'react'
import {Avatar, List as MuiList , ListItemText, ListItemAvatar, ListItem,Slide, ListItemSecondaryAction, IconButton} from '@material-ui/core'
import {Delete ,MoneyOff} from '@material-ui/icons'
import useStyles from './List.styles'
import { ExpenseContext } from '../../../context/context'
const List = () => {
    const classes = useStyles()
    

    const {transactions , deleteTransaction} = useContext(ExpenseContext)

   
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
                        <ListItemText primary={transaction.category} secondary={`$ ${transaction.amount} - ${transaction.date}`} />
                    
                    <ListItemSecondaryAction>
                        <IconButton  edge="end" aria-label="delete" onClick={() => deleteTransaction(transaction.id)}>
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
