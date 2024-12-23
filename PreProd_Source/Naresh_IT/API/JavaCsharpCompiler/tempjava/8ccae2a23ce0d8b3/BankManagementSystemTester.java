
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
}

class CheckingAccount extends BankAccount
{
    double overdraftLimit;

    public CheckingAccount(int accountNumber, double balance, double overdraftLimit)
    {
        super(accountNumber,balance);
        this.overdraftLimit = overdraftLimit;
    }

    public void withdraw(double amount)
    {
        if(balance > overdraftLimit && amount > 0)
        {
            balance -= amount;
        }else{
            System.out.println("Exceeds overdraft limit.");
        }
    }
}

public class BankManagementSystemTester
{
    public static void main(String args[])
    {
        SavingAccount sa = new SavingAccount(2886291,2000,5.5);

        CheckingAccount ca = new CheckingAccount(7693790,500,3000);

        System.out.println("Saving Account Details");
        System.out.println("Account no : "+sa.accountNumber);
        System.out.println("Balance : "+sa.balance);
        System.out.println("Interest Rate : "+sa.interestRate);
        sa.addInterest();

        Syetem.out.println("\nChecking Account Details");
        Syetem.out.println("Account no : "+ca.accountNumber);
        Syetem.out.println("Balance : "+ca.balance);
        Syetem.out.println("Overdraft limit : "+ca.overdraftLimit);
        // Syetem.out.println()
        ca.withdraw(1000);
    }
}