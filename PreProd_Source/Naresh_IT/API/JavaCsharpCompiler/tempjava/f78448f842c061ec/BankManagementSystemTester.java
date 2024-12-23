package Inheritance;
class BankAccount{
	int accountNumber;
	double balance;
	public BankAccount(int accountNumber,double balance) {
	this.accountNumber = accountNumber;
	this.balance=balance;
	System.out.println("Account Number:"+accountNumber);
	System.out.println("Current Balance:"+balance);
	}
	public void deposit(double amount ) {
		balance=balance+amount;
		System.out.println("Deposited Balance:"+balance);
	}
	public void withdraw(double amount) {
	if(amount<=balance) {
		balance=balance-amount;
		System.out.println("Withdraw Amount:"+balance);
	}
	else {
		System.out.println("Insufficient balance");
	}
		
	}
}
class savingAccount extends BankAccount{
	double interestRate;

	public savingAccount(int accountNumber,double balance,double interestRate) {
		super(accountNumber, balance);
		this.interestRate=interestRate;
	}
	public void addInterest() {
		balance=balance+interestRate;
		System.out.println("Interest rate Balance:"+balance);		
	}
	
}
class checkingAccount extends BankAccount{
	double overdraftLimit;
	public checkingAccount(int accountNumber,double balance,double interestRate,double overdraftLimit) {
		super(accountNumber,balance);
		this.overdraftLimit=overdraftLimit;
	}
	public void withdraw(double amount) {
		if(amount-amount>=-overdraftLimit) {
			balance=balance-amount;
			System.out.println("After withdrawal:"+balance);
		}
		else {
			System.out.println("Exceeds overdraft limit");
		}
		
	}
}

public class BankingSystem {


	public static void main(String[] args) {
		BankAccount bank = new BankAccount(1233445,5000);
		bank.deposit(1000);
		bank.withdraw(500);
		
		savingAccount acc = new savingAccount(1234445,6000,250);
		acc.withdraw(300);
		acc.deposit(200);
		acc.addInterest();
		
		checkingAccount check = new checkingAccount(123344,2000,200,3000);
		check.withdraw(200);
		check.deposit(500);
		
	}

}