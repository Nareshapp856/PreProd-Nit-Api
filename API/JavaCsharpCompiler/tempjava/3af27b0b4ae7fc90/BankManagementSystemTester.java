class BankAccount{
	protected int accountNumber;
	protected double balance;
	
	public BankAccount(int accountNumber, double balance) {
		super();
		if(accountNumber <= 0) {
			System.out.println("Enter valid Account number.");
		}
		this.accountNumber = accountNumber;
		this.balance = balance;
	}

	public void deposit(double amount) {
		if(amount > 0) {
			balance += amount;
			System.out.println("Deposited: " + amount + ". New Balance: " + balance);
		}
		else {
			System.out.println("Invalid deposit amount.");
		}
	}
	
	public void withdraw(double amount) {
		if(amount > 0 && balance >= amount) {
			balance -= amount;
			System.out.println("Withdrawn: " + amount + ". New Balance: " + balance);
		}
		else if(amount > balance) {
			System.out.println("Insufficient funds.");
		}
		else {
			System.out.println("Invalid withdraw amount.");
		}
	}
}

class SavingAccount extends BankAccount{
	protected double interestRate;
	
	public SavingAccount(int accountNumber, double balance, double interestRate) {
		super(accountNumber, balance);
		if(interestRate < 0) {
			System.out.println("Enter valid Interest rate");
		}
		this.interestRate = interestRate;
	}
	
	public void addInterest() {
		double interest = balance * (interestRate / 100);
		balance += interest;
		System.out.println("Interest Added: " + interest + ". New Balance: " + balance);
	}
}

class CheckingAccount extends BankAccount{
	protected double overdraftLimit;
	
	public CheckingAccount(int accountNumber, double balance, double overdraftLimit) {
		super(accountNumber, balance);
		this.overdraftLimit = overdraftLimit;
	}
	
	public void withdraw(double amount) {
		if(balance + overdraftLimit >= amount) {
			double newBalance = balance - amount;
			System.out.println("Withdrawn: " + amount + ". New Balance: " + newBalance);
		}
		else if(amount > balance + overdraftLimit){
			System.out.println("Exceeds overdraft limit.");
		}
		else {
			System.out.println("Invalid withdraw amount.");
		}
	}
}

public class BankManagementSystemTester {
	public static void main(String []args) {
		SavingAccount s = new SavingAccount(101, 5000, 5);
		System.out.println("Saving Account Details: ");
		s.deposit(2000);
		s.addInterest();
		s.withdraw(7000);
		
		CheckingAccount c = new CheckingAccount(101, 5000, 3000);
		System.out.println("\nChecking account: ");
		c.deposit(1000);
		c.withdraw(1000);
		
	}
}