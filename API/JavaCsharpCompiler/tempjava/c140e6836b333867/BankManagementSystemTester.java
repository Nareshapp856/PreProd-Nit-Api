public class BankAccount1 {
	 protected int accountNumber;
	 protected double balance;

	 public BankAccount1(int accountNumber, double balance) {
	     this.accountNumber = accountNumber;
	     this.balance = balance;
	 }

	 
	 public void deposit(double amount) {
	     if (amount > 0) {
	         balance += amount;
	         System.out.println("Deposited: " + amount + ". New balance: " + balance);
	     } else {
	         System.out.println("Invalid deposit amount.");
	     }
	 }


	 public void withdraw(double amount) {
	     if (amount <= balance) {
	         balance -= amount;
	         System.out.println("Withdrawn: " + amount + ". Remaining balance: " + balance);
	     } else {
	         System.out.println("Insufficient funds.");
	     }
	 }


	 public double getBalance() {
	     return balance;
	 }
	}
    public class SavingAccount extends BankAccount1 {
	 
	private double interestRate;

	 
	 public SavingAccount(int accountNumber, double balance, double interestRate) {
	     
		 super(accountNumber, balance);
	     
		 this.interestRate = interestRate;
	 }

	 
	 public void addInterest() {
	     
		 double interest = balance * (interestRate / 100);
	    
	     balance += interest;
	     
	     System.out.println("Interest added: " + interest + ". New balance: " + balance);
	 }
	}
    public class CheckingAccount extends BankAccount1 {
	 private double overdraftLimit;

	
	 public CheckingAccount(int accountNumber, double balance, double overdraftLimit) {
	     super(accountNumber, balance);
	     this.overdraftLimit = overdraftLimit;
	 }

	 
	 public void withdrawWithOverdraft(double amount) {
	     if (amount <= balance + overdraftLimit) {
	         balance -= amount;
	         System.out.println("Withdrawn: " + amount + ". Remaining balance: " + balance);
	     } else {
	         System.out.println("Withdrawal denied. Exceeds overdraft limit.");
	     }
	 }
	}
    public  class Main {
	 public static void main(String[] args) {
	     
	     BankAccount1 bankAccount = new BankAccount1(10055, 5000);
	     bankAccount.deposit(1000);
	     bankAccount.withdraw(2000);
	     bankAccount.withdraw(5000);

	    
	     SavingAccount savingAccount = new SavingAccount(4444,54, 141);
	     savingAccount.deposit(2000);
	     savingAccount.addInterest();
	     savingAccount.withdraw(5000);

	    
	     CheckingAccount checkingAccount = new CheckingAccount(4214, 2555, 3000);
	     checkingAccount.deposit(1000);
	     checkingAccount.withdrawWithOverdraft(5000);
	     checkingAccount.withdrawWithOverdraft(7000); 
	 }
	}
