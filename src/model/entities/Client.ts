import Transaction from "./Transaction";

export default interface Client{
  id: string;
  cpf: string;
  name: string;
  transactions: Transaction[];
}