import * as inquirer from 'inquirer';
import {TransactionUtil} from '../transaction.util';

const questions = [
    {
        message: 'Address:',
        type: 'input',
        name: 'receivingAddress'
    },
    {
        message: 'Amount:',
        type: 'input',
        name: 'amount'
    }
];
inquirer.prompt(questions).then((answers: any) => {
    TransactionUtil.send(answers.receivingAddress, +answers.amount);
});
