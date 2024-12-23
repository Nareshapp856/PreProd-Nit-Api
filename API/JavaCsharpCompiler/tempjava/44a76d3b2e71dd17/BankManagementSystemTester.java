class BankAccount
{
    int accountNumber;
    double balance;

    public BankAccount(int accountNumber,double balance)
    {
        this.accountNumber=accountNumber;
        this.balance=balance;
    }
    public void deposite(double amount)
    {
        
            balance=balance+amount;
             System.out.println("after deposite balance is"+balance);
        
    }
    public void withdraw(double amount)
    {
        
            balance=balance-amount;
            System.out.println("after withdraw balance is " 
            +balance);
      
    }

}

class SavingAccount extends BankAccount
{
double interestRate;

public SavingAccount(double interestRate,int accountNumber,double balance)
{
    super(accountNumber,balance);
    this.interestRate=interestRate;
}
public void addInterest()
{
    balance=balance+((balance*interestRate)/100);
    System.out.println("after interest balanve is "+balance);

}
}

class CheckingAccount extends BankAccount
{
    double overdraftLImit;

    public CheckingAccount(double overdraftLImit,int accountNumber,double balance)
    {   
        super(accountNumber,balance);
        this.overdraftLImit=overdraftLImit;
    }
    public void withdraw(double amount)
    {
        if (balance-amount < overdraftLImit)
        {
            System.out.println("Exceeds overdraft limit");
        }
        else
        {
            balance=balance-amount;
            System.out.println("after withdraw balance is " 
            +balance);
        }
    }
}



public class BankManagementSystemTester
{
    public static void main(String [] args)
    {
        CheckingAccount c1=new CheckingAccount(3000,12345,20000);
        c1.withdraw(10000);
        c1.deposite(1000);
        c1.withdraw(1000);
        SavingAccount s=new SavingAccount(3,345,50000);
        s.addInterest();
    }
}