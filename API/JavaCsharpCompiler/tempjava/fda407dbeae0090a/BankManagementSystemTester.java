
class BankAccount {
    private int accountNumber;
    protected double balance;

    
    public BankAccount(int accountNumber, double balance) {
        this.accountNumber = accountNumber;
        this.balance = balance;
    }

    public void deposit(double amount) {
        if (amount > 0) {
            balance += amount;
            System.out.println("Deposited: " + amount);
        } else {
            System.out.println("Deposit amount must be positive.");
        }
    }


    public void withdraw(double amount) {
        if (amount <= balance) {
            balance -= amount;
            System.out.println("Withdrawn: " + amount);
        } else {
            System.out.println("Insufficient funds.");
        }
    }


    public void displayBalance() {
        System.out.println("Account Number: " + accountNumber + ", Balance: " + balance);
    }
}
class SavingsAccount extends BankAccount {
    private double interestRate;


    public SavingsAccount(int accountNumber, double balance, double interestRate) {
        super(accountNumber, balance);
        this.interestRate = interestRate;
    }

    
    public void addInterest() {
        double interest = balance * (interestRate / 100);
        balance += interest;
        System.out.println("Interest added: " + interest);
    }
}


class CheckingAccount extends BankAccount {
    private double overdraftLimit;


    public CheckingAccount(int accountNumber, double balance, double overdraftLimit) {
        super(accountNumber, balance);
        this.overdraftLimit = overdraftLimit;
    }

    
    @Override
    public void withdraw(double amount) {
        if (amount <= balance + overdraftLimit) {
            balance -= amount;
            System.out.println("Withdrawn: " + amount);
        } else {
            System.out.println("Exceeds overdraft limit.");
        }
    }
}


public class Main {
    public static void BankManagementSystemTester(String[] args) {

        BankAccount account1 = new BankAccount(1001, 5000);
        account1.deposit(1000);
        account1.withdraw(2000);
        account1.displayBalance();

        
        SavingsAccount savingsAccount = new SavingsAccount(1002, 10000, 5);
        savingsAccount.addInterest();
        savingsAccount.displayBalance();

        
        CheckingAccount checkingAccount = new CheckingAccount(1003, 2000, 3000);
        checkingAccount.withdraw(4000);
        //checkingAccount.withdraw(6000); 
        checkingAccount.displayBalance();
    }
}
