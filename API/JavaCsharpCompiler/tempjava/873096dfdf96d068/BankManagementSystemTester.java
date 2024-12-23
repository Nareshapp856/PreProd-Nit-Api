class BankAccount
{
	int accountNumber;
	double balance;
	
	public BankAccount(int accountNumber, double balance) 
	{
		super();
		if(accountNumber<=0) 
		{
			System.err.println("Error Invalid Account Number.");
			System.exit(0);
		}
		else if(balance<=1000)
		{
			System.err.println("Maintain Minimum balance.");
			System.exit(0);
		}
		else
		{
			this.accountNumber = accountNumber;
			this.balance = balance;
		}
		
	}
	//Cash Depositing
	public void deposite(double amount)
	{
		if(amount<=0)
		{
			System.err.println("Transaction could Not Be Done.");
			System.exit(0);
		}
		else
		{
			balance+=amount;
			System.out.println("\nDeposit Transaction Successful.");
		}
		
	}
	//Cash WithDrawing
	public void withdraw(double amount)
	{
		
			if(balance-amount>=1000)
			{
				balance-=amount;
				System.out.println("\nWithDrawal Transaction Successful.");
			}
			else
			{
				System.err.println("Isufficiant Balance.");
				System.exit(0);
			}
	}
	
}


class SavingsAccount extends BankAccount 
{
	double interestRate;

	public SavingsAccount(int accountNumber, double balance, double interestRate) 
	{
		super(accountNumber, balance);
		if(interestRate<=0)
		{
			System.err.println("Error Invalid Input.");
			System.exit(0);
		}
		this.interestRate = interestRate;
	}
	
	public void addInterest()
	{
		double interest = balance*interestRate/100;
		balance+=interest;
	}

}


class CheckingAccount extends BankAccount 
{
	double overdraftLimit;

	public CheckingAccount(int accountNumber, double balance, double overdraftLimit) 
	{
		super(accountNumber, balance);
		if(overdraftLimit<=0)
		{
			System.err.println("Error Invalid Input");
			System.exit(0);
		}
		this.overdraftLimit = overdraftLimit;
	}
	public void withdraw(double amount)	//method overriding
	{
		if(amount>0)
		{
				if(balance-amount>=-overdraftLimit)
				{
					balance-=amount;
					System.out.println("\nWithdrawal Transaction successful.");
				}
				else 
				{
					System.err.println("Exceeds overdraft limit.");
					System.exit(0);
				}
		}
		else
		{
			System.err.println("Error Invalid Amount.");
			System.exit(0);
		}
	}
}


public class BankManagementSystemTester 
{

	public static void main(String[] args) 
	{
		System.out.println("BankAccount.");
		BankAccount bankAccount =new BankAccount(201, 2000);
		System.out.println("\nBefore Any Transaction \nBalance : "+bankAccount.balance);
		bankAccount.withdraw(1000);
		System.out.println("\nAfter Withdrawal Transaction \nBalance : "+bankAccount.balance);
		bankAccount.deposite(4000);
		System.out.println("\nAfter Deposit Transaction \nBalance : "+bankAccount.balance);

		System.out.println("\nSavingsAccount.");
		SavingsAccount savingsAccount =new SavingsAccount(301, 3000, 2.5);
		System.out.println("\nBefore Any Transaction \nBalance : "+savingsAccount.balance);
		savingsAccount.addInterest();
		System.out.println("\nAfter Adding interest \nBalance : "+savingsAccount.balance);
		savingsAccount.withdraw(2000);
		System.out.println("\nAfter Withdrawal Transaction \nBalance : "+savingsAccount.balance);
		savingsAccount.deposite(5000);
		System.out.println("\nAfter Deposit Transaction \nBalance : "+savingsAccount.balance);

		System.out.println("\nCheckingAccount.");
		CheckingAccount checkingAccount =new CheckingAccount(402, 4000, 3000);
		System.out.println("\nBefore Any Transaction \nBalance : "+checkingAccount.balance);
		checkingAccount.withdraw(2000);
		System.out.println("\nAfter Withdrawal Transaction \nBalance : "+checkingAccount.balance);
		checkingAccount.withdraw(4000);
		System.out.println("\nAfter Withdrawal Transaction \nBalance : "+checkingAccount.balance);
		checkingAccount.deposite(14000);
		System.out.println("\nAfter Deposit Transaction \nBalance : "+checkingAccount.balance);

		
	}

}
