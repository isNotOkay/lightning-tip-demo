import * as inquirer from 'inquirer';
import {AddressUtil} from '../address.util';

const questions = [
    {
        message: 'Address:',
        type: 'input',
        name: 'address'
    }
];
inquirer.prompt(questions).then((answers: any) => {
    AddressUtil.getAddressBalance(answers.address);
});



