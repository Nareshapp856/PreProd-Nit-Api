class BankAccount
{
    int accountNumber;
    double balance;

    BankAccount(int accountNumber,double balance)
    {
        this.accountNumber=accountNumber;
        this.balance=balance;
    }

    public void deposite(double amount)
    {
        if(amount>0)
        {
        balance=balance+amount;
        System.out.println("Balance After deposite is:"+balance);
        }

        else
        {
            System.out.println("Invalid amount");
        }
    }

    public void withdraw(double amount)
    {
        if(amount<=balance)
        {
        balance=balance-amount;
        System.out.println("Your balance after withdraw:"+withdraw);
        }

        else{
            System.out.println("Invalid balance");
        }
    }
}

class SavingAccount extends BankAccount
{
     double interestRate;

     SavingAccount(int accountNumber,double balance,double interestRate)
     {
        super(accountNumber,balance);
        this.interestRate=interestRate;
     }

     public void addInterest()
     {
        // super.deposite();
        // super.withdraw();
        balance=balance+balance*interestRate;
        System.out.println("Your balance after adding interestRate"+interestRate);
     }
}

class CheckingAccount extends from BankAccount
{
    double overdraftLimit;

    CheckingAccount(int accountNumber,double balance,double overdraftLimit)
    {
        super(accountNumber,balance);
        this.overdraftLimit=overdraftLimit;
    }

    public void withdraw(double amount)
    {
        if(amount<=overdraftLimit)
        {
            // super.deposite();
            // super.withdraw();
            balance=balance-amount;
            System.out.println("After checking overdraftLimit your balance is:"+balance);
        }

        else{
            System.out.println("Exceeds overdraft limit");
        }
    }
}

public class BankManagementSystemTester
{
    public static void main(String args[])
    {
        SavingAccount s=new SavingAccount(1256,30000,2.5);
        System.out.println("Saving acount details:");
        s.deposite(2000);
        s.withdraw(1000);
          s.addInterest();
        

        CheckingAccount c=new CheckingAccount(1234,50000,3000);
        System.out.println("Checking account details:");
        c.deposite(1000);
        c.withdraw(25000);
        c.withdraw(5000);

    }
}