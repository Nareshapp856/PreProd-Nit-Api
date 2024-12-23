
class BankAccount 
{
	int accountNumber;
	double balance;
	BankAccount(int accountNumber,double balance)
	{
		this.accountNumber=accountNumber;
		this.balance=balance;
	}
	public void deposite(double amount)
	{
		balance=balance+amount;
		System.out.println("After deposit balance is:"+balance);
	}
	public void withdraw(double amount)
	{
		if(balance<0)
		{
			System.out.println("Insufficent balance");
		}
		else
		{
			balance=balance-amount;
			System.out.println("after withdraw the balance is:"+balance);
			
		}
	}
	 public double getBalance() 
	    {
	        return balance;
	    }
}
class SavingAccount extends BankAccount
{
	double interestRate;
	SavingAccount(int accountNumber,double balance,double interstRate)
	{
		super(accountNumber,balance);
		this.interestRate=interestRate;
	}
	public void addInterest()
	{
		double interest =balance*(interestRate/100);
		balance+=interest;
		System.out.println("interest added:"+interest);
		
	}	
}
class CheckingAccount extends BankAccount
{
	
	double overdraftLimit;

	public CheckingAccount(int accountNumber, double balance, double overdraftLimit) 
	{
		super(accountNumber, balance);
		this.overdraftLimit = overdraftLimit;
	}
	public void withdraw(double amount)
	{
		if(+overdraftLimit+balance>=amount)
		{
			balance=balance-amount;
			System.out.println("balance withdraw:"+amount);
		}
		else
		{
			System.out.println("Exceeds overdraft limit");	
		}
	}	
}

public class BankManagementSystemTester
{
    public static void main(String []args)
    {
        BankAccount b=new BankAccount (123,3000.0);
        b.deposite(50000);
        b.withdraw(300);

        SavingAccount s=new SavingAccount(123,3000.0,2.0);
        s.addInterest();

        CheckingAccount c=new CheckingAccount(123,300.0,200.0);
        c.withdraw(200.0);

    }
}