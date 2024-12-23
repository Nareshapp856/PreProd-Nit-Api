
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

        sa.addInterest();

        ca.withdraw(1000);
    }
}