class BankAccount
{
    int accountNumber;
    double balance;

    BankAccount(int accountNumber,double balance )
    {
        super();
        this.accountNumber=accountNumber;
        this.balance=balance;
    }

    public void deposite(double amount)
    {
        this.balance=this.balance+amount;
    }

    public void withdraw(double amount)
    {
        this.balance=this.balance-amount;
    }


}

class SavingAccount extends BankAccount
{
    double interestRate;

    SavingAccount(int accountNumber,double balance,double interestRate )
    {
        super(accountNumber,balance);
        this.interestRate=interestRate;
    }

    public void addInterest()
    {
        this.balance=this.balance+(this.balance*interestRate/100);
    }

}

class CheckingAccount extends BankAccount
{
    double overdraftLimit=3000;

     CheckingAccount(int accountNumber,double balance )
    {
        super(accountNumber,balance);
    }

    public void withdraw(double amount)
    {
        if(overdraftLimit<amount)
        {
            super.balance=super.balance-amount;
        }
        else
        {
            System.out.println("Exceeds overdraft limit");
        }
    }
}

public class BankManagementSystemTester
{
    public static void main (String [] args)
    {
        CheckingAccount c = new CheckingAccount(1234,10000);
        c.withdraw(4000);
    }
}