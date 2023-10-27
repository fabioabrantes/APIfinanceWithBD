import {Transaction} from '../server';

export function getBalance(statements:Transaction[]) {
  const balance = statements.reduce((acc, statement) => 
    statement.type === "credits" ? acc + statement.amount : acc - statement.amount,0);
  return balance;
}