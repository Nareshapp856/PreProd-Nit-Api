class BankAccount {
    int accountNumber;
    double balance;
    public BankAccount(int accountNumber, double balance){
        this.accountNumber=accountNumber;
        this.balance=balance;
    }
    public void deposite(double amount){
        balance=balance+amount;
        System.out.println(" after deposite balance= "+balance);

    }
    public void withdraw( double amount){
        if(balance>=amount){
            balance=balance-amount;
             System.out.println("after withdraw balance= "+balance);

        }
        else{
            System.out.println("insuffient funds");
        }

    }



}
class SavingAccount extends BankAccount{
    double interestRate;
    public SavingAccount(int accountNumber, double balance,double interestRate){
        super(accountNumber, balance);
        this.interestRate=interestRate;
    }
    public void addInterest(){
        balance=balance+((balnce*interestRate)/100);
        System.out.println("after adding interest balance= "+balance);
    }




}
class CheckingAccount extends BankAccount{
    double overdraftLimit;
    public CheckingAccount(int accountNumber, double balance,double overdraftLimit){
        super(accountNumber,balance);
        this.overdraftLimit=overdraftLimit;
    }
    public void withdraw(double amount){
        if(amount<=overdraftLimit){
            balance=balance-amount;
            System.out.println("after withdraw balance= "+balance);
        }
        else{
            System.out.println("exceeds overdraft limit");
        }

    }


}
public class BankManagementSystemTester{
    public static void main(String args[]){
     CheckingAccount obj1=new CheckingAccount(12345,35000,3000);
     obj1.withdraw(4500);
     SavingAccount obj2=new SavingAccount(12345,35000,5);
     obj2.addInterest();
     obj2.deposite(3000);
     obj2.withdraw(2000);
    }



}
