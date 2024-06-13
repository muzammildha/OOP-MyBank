#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
console.log(chalk.blue("Welcome to My Bank,How can we Serve You?"));
// Bank Account Class
class BankAccount {
    accountNumber;
    balance;
    constructor(accountNumber, balance) {
        this.accountNumber = accountNumber;
        this.balance = balance;
    }
    // Debit Money
    withdraw(amount) {
        if (this.balance >= amount) {
            this.balance -= amount;
            console.log(chalk.bold.blue(`Withdraw of $${amount} successful. Remaining balance is: $${this.balance}`));
        }
        else {
            console.log(chalk.red("Insufficient balance."));
        }
    }
    // Credit Money
    deposit(amount) {
        if (amount > 100) {
            amount -= 1; // $1 fee charged if more than $100 is deposited
        }
        this.balance += amount;
        console.log(`Deposit of $${amount} successful. Remaining balance: $${this.balance}`);
    }
    // Check Balance
    checkBalance() {
        console.log(`Current balance is $${this.balance}`);
    }
}
// Customer class
class Customer {
    firstName;
    lastName;
    gender;
    age;
    mobileNumber;
    account;
    constructor(firstName, lastName, gender, age, mobileNumber, account) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.age = age;
        this.mobileNumber = mobileNumber;
        this.account = account;
    }
}
// Create bank accounts
const accounts = [
    new BankAccount(9001, 1000),
    new BankAccount(9002, 4000),
    new BankAccount(9003, 2000),
];
// Create customers
const customers = [
    new Customer("Muzammil", "Ahmed", "Male", 15, +923012009503, accounts[0]),
    new Customer("Abdul", "Samad", "Male", 45, +923163776685, accounts[1]),
    new Customer("Mubashir", "Ali", "Male", 45, +93777748463, accounts[2]),
];
// Function to interact with bank account
async function service() {
    do {
        const { accountNumber } = await inquirer.prompt([{
                name: "accountNumber",
                type: "input",
                message: "Enter your account number:",
                validate: (input) => !isNaN(Number(input)) || chalk.green("Please enter a valid number")
            }]);
        const customer = customers.find(customer => customer.account.accountNumber === Number(accountNumber));
        if (customer) {
            console.log(`Welcome, ${customer.firstName} ${customer.lastName}!\n`);
            const { Select } = await inquirer.prompt([{
                    name: "Select",
                    type: "list",
                    message: "Select an operation",
                    choices: ["Deposit", "Withdraw", "Check Balance", "Exit"]
                }]);
            switch (Select) {
                case "Deposit":
                    console.log(chalk.greenBright("1$ will be charged on deposit of 100$ or more"));
                    const { amount: depositAmount } = await inquirer.prompt({
                        name: "amount",
                        type: "input",
                        message: "Enter the amount to deposit:",
                        validate: (input) => !isNaN(Number(input)) || chalk.green("Please enter a valid number")
                    });
                    customer.account.deposit(Number(depositAmount));
                    break;
                case "Withdraw":
                    const { amount: withdrawAmount } = await inquirer.prompt({
                        name: "amount",
                        type: "input",
                        message: "Enter the amount to withdraw:",
                        validate: (input) => !isNaN(Number(input)) || chalk.green("Please enter a valid number")
                    });
                    customer.account.withdraw(Number(withdrawAmount));
                    break;
                case "Check Balance":
                    customer.account.checkBalance();
                    break;
                case "Exit":
                    console.log(chalk.blue("Exiting bank program..."));
                    console.log(chalk.blue("\nThank you for using our bank services. Have a great day!"));
                    return;
            }
        }
        else {
            console.log(chalk.red("Invalid Account Number. Please try again."));
        }
    } while (true);
}
service();
