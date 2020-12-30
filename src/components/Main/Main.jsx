import { Card , CardContent, CardHeader, Divider, Grid, Typography } from '@material-ui/core'
import React , {useContext} from 'react'
import { ExpenseContext } from '../../context/context'
import Form from './Form/Form'
import List from './List/List'
import useStyles from './main.styles'

const Main = () => {
   const classes = useStyles()
   const {totalBalance} = useContext(ExpenseContext)
    return (
        <Card className={classes} >
            <CardHeader title="Expense Tracker" subheader="Powered by speechly"/>
                <CardContent className={classes.cartContent}>
                    <Typography variant="h5" align="center">
                        Total balance {totalBalance}
                    </Typography>
                    <Typography variant="subtitle1" style={{lineHeight:'1.5em' , margintop:'20px'}}>
                        {/* InfoCard ...*/}
                        Try saying: Add income for $100 in Category for Monday...
                    </Typography>
                     
                    <Divider className={classes.divider} />
                    <Form />
                </CardContent>

                   
                    

                    <CardContent className={classes.cartContent}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <List/> 
                            </Grid>
                        </Grid>
                    </CardContent>
           

        </Card>
    )
}

export default Main
