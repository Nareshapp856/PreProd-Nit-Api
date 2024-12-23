
class BankAccount
{
    int accountNumber;
    double balance;

    BankAccount(int accountNumber, double balance)
    {
        this.accountNumber = accountNumber;
        this.balance = balance;
    }

    public void deposit(double amount)
    {
        if(amount > 0){
            balance += amount;
        }else{
            System.out.println("Error Invalid Input Amount");
        }
    }

    public void withdraw(double amount)
    {
        if(balance > 1000 && amount > 0)
        {
            balance -= amount;
        }else if((balance-amount) > 1000){
            System.out.println("Please Minimum Maintian Balance Rs.1000");
        }else{
            System.out.println("Insufficient Funds to withdraw");
        }
    }
}

class SavingAccount extends BankAccount
{
    double interestRate;

    public SavingAccount(int accountNumber, double balance, double interestRate)
    {
        super(accountNumber,balance);
        this.interestRate = interestRate;
    }

    public void addInterest()
    {
        double totalInterest = (balance / 100) * interestRate;

        System.out.println("Total Interest on Balance is Rs."+totalInterest);
    }

    public void displayDetails()
    {
        System.out.println("Saving Account Details");
        System.out.println("Account no : "+accountNumber);
        System.out.println("Balance : "+balance);
        System.out.println("Interest Rate : "+interestRate);
    }
}

class CheckingAccount extends BankAccount
{
    double overdraftLimit;
    double amt;

    public CheckingAccount(int accountNumber, double balance, double overdraftLimit)
    {
        super(accountNumber,balance);
        this.overdraftLimit = overdraftLimit;
    }

    public void withdraw(double amount)
    {
        amt = amount;
        if(balance > overdraftLimit && amount > 0)
        {
            balance -= amount;
            displayDetails();
        }else{
            System.out.println("Exceeds overdraft limit.");
        }
    }

    public void displayDetails()
    {
          System.out.println("\nChecking Account Details");
        System.out.println("Account no : "+accountNumber);
        System.out.println("Balance : "+balance);
        System.out.println("Overdraft limit : "+overdraftLimit);
       System.out.println("Amount to Withdraw : "+amt);
    }
}

public class BankManagementSystemTester
{
    public static void main(String args[])
    {
        SavingAccount sa = new SavingAccount(2886291,2000,5.5);

        CheckingAccount ca = new CheckingAccount(7693790,500,3000);

        sa.displayDetails();
        sa.addInterest();

        ca.displayDetails();
        ca.withdraw(1000);
    }
}