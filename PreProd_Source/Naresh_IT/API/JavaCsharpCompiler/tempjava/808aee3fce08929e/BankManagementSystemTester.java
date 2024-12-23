public class BankManagementSystemTester 
{
	private int accountNumber;
	private double balance;
	
	public BankManagementSystemTester(int accountNumber, double balance) 
	{
		super();
		this.accountNumber = accountNumber;
		this.balance = balance;
	}
	
	public int getAccountNumber() {
		return accountNumber;
	}

    public void setAccountNumber(int accountNumber) {
		this.accountNumber = accountNumber;
	}

    public double getBalance() {
		return balance;
	}

    public void setBalance(double balance) {
		this.balance = balance;
	}

    public void deposit(double amount)
	{
		if(amount<=0)
		{
			System.out.println("Invalid amount");
		}
		else
		{
		this.balance+=amount;
		System.out.println("Sucessfully Deposited");
		}
	}
	
	public void withdraw(double amount)
	{
		if(amount>this.balance)
		{
			System.out.println("Insufficient balance");
		}
		else
		{
			this.balance-=amount;
			System.out.println("Withdrawl sucessfull");
		}
	}
	
	public void BankDetails()
	{
	System.out.println("Account number :"+accountNumber);
	System.out.println("Balance :"+balance);
	}
	
}

public class SavingAccount extends BankManagementSystemTester 
{
	double interestRate;

	public SavingAccount(int accountNumber, double balance, double interestRate) 
	{
		super(accountNumber, balance);
		this.interestRate = interestRate;
	}
	
	public void addInterest()
	{
		double interest = getBalance()*interestRate/100;
		setBalance(interest+getBalance());
		System.out.println("Balance after adding interest :"+getBalance());
	}
}

public class CheckingAccount extends BankManagementSystemTester
{
	double overdraftLimit;

	public CheckingAccount(int accountNumber, double balance, double overdraftLimit) 
	{
		super(accountNumber, balance);
		this.overdraftLimit = overdraftLimit;
	}
	
	public void withdraw(double amount)
	{
		if(amount>overdraftLimit)
		{
			System.out.println("Exceeds overdraft limit");
		}
		else
		{
			setBalance(getBalance()-amount);
			System.out.println("Withdrawl sucessfull");
			System.out.println("After withdrawl balance :"+getBalance());
		}
	}
	
}

public class BankAccountMain {

	public static void main(String[] args) 
	{
		SavingAccount savingAccount = new SavingAccount(9999999, 2000, 4);
		savingAccount.BankDetails();
		savingAccount.deposit(6000);
		savingAccount.BankDetails();
		savingAccount.withdraw(1000);
		//savingAccount.withdraw(1000);
		savingAccount.BankDetails();
		savingAccount.addInterest();
		//savingAccount.BankDetails();
		
		CheckingAccount checkingAccount = new CheckingAccount(savingAccount.getAccountNumber(), savingAccount.getBalance(), 3000);
		checkingAccount.withdraw(5000);
	}

}


