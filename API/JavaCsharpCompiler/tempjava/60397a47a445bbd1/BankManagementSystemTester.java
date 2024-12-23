class BankAcount 
{
	int accountNumber;
	double balance;
	
	public BankAcount(int accountNumber, double balance) 
	{
		this.accountNumber = accountNumber;
		this.balance = balance;
	}
	
	void deposit(double amount)
	{
		balance += amount;
		System.out.println("Rs."+amount+" is deposited successfully.");
		System.out.println("Your current balance is Rs."+balance);
		System.out.println();
	}
	
	void withdraw(double amount)
	{
		if(balance<amount)
		{
			System.err.println("Insufficient Balance!!");
			System.exit(0);
		}
		else
		{
		balance -= amount;
		System.out.println("Rs."+amount+" is withdrawn successfully.");
		System.out.println("Your current balance is Rs."+balance);
		System.out.println();
		}
	}
	
	void displayInfo()
	{
		System.out.println("Account Number: "+accountNumber);
		System.out.println("Current Balance: Rs."+balance);
		System.out.println();
	}
}


class SavingsAcount extends BankAcount 
{
	double interestRate;

	public SavingsAcount(int accountNumber, double balance, double interestRate) 
	{
		super(accountNumber, balance);
		this.interestRate = interestRate;
	}
	
	void addInterest()
	{
		balance += (interestRate/100) * balance;
		System.out.println("Interest rate: "+interestRate+"%");
		System.out.println("Balance after adding interest: Rs."+balance);
		System.out.println();
	}
}


class CheckingAcount extends BankAcount 
{
	double overdraftLimit;

	public CheckingAcount(int accountNumber, double balance, double overdraftLimit) 
	{
		super(accountNumber, balance);
		this.overdraftLimit = overdraftLimit;
	}
	
	void withdraw(double amount)
	{
		if(balance - amount >= -overdraftLimit)
		{
			balance -= amount;
			System.out.println("Amount withdrawn: Rs."+amount);
			System.out.println("Current Balance: Rs."+balance);
		}
		else
		{
			System.err.println("Exceeds Overdraft Limit!!");
		}
		
	}
}



public class BankManagementSystemTester 
{
	public static void main(String[] args) 
	{
		SavingsAcount s1 = new SavingsAcount(123456789, 2000, 3);
		s1.displayInfo();
		s1.deposit(2000);
		s1.withdraw(1000);
		s1.addInterest();
		
		CheckingAcount c1 = new CheckingAcount(123456789, 2000, 3000);
		c1.displayInfo();
		c1.withdraw(4000);
		c1.withdraw(2000);
	}


	}

