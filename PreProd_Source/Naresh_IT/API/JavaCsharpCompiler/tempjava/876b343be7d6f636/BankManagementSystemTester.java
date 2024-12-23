class BankAccount
{
    int accountNumber;
    double balance;

    public BankAccount(int accountNumber,double balance)
    {
        this.accountNumber = accountNumber;
        this.balance = balance;
    }

    public void deposite(double amount)
    {
        this.balance = amount;
    }

    public void withdraw(double amount)
    {
        if(this.balance > 0)
        {
            this.balance = this.balance - amount;
            
        }
        else
        {
            System.out.println("Insufficient fudnds");
        }
    }
}

class SavingAccount extends BankAccount
{
     double interestRate;

     public SavingAccount(double interestRate)
     {
           this.interestRate = interestRate;

     }

     public void addInsterest()
     {
        this.interestRate = this.balance*0.12;
     }


}

class CheckingAccount extends BankAccount
{
    double overdraftLimit;

    public CheckingAccount(double overdraftLimit)
    {
        this.overdraftLimit = overdraftLimit;
    }

    public void withdraw(double amount)
    {
        if(this.overdraftLimit > 30000)
        {
            System.out.println("Exceeds overdraft limit");
        }
        else
        {
            super.withdraw;
        }
    }
}

class  BankManagementSystem
{
    public static void main(String[] args)
    {
        CheckingAccount c = new CheckingAccount();
        c.deposite(5000);
    }
}