package corejava;

class BankAccount{
    protected int accountNumber;
    protected double balance;
    BankAccount( int accountNumber,double balance){
       super();
       this.accountNumber=accountNumber;
       this.balance=balance;

    }
    public void deposite(double amount){
              this.balance+=amount;  
    }
     public void withdraw(double amount){
       if(this.balance>0){
        this.balance-=amount;
        }
        else {
            System.out.println(" if sufficient funds are available;");
        }
    }
	@Override
	public String toString() {
		return "BankAccount [accountNumber=" + accountNumber + ", balance=" + balance + "]";
	}
     
}
class SavingAccount extends BankAccount{
  private  double interestRate;
SavingAccount(int accountNumber,double balance,double interestRate){
    super(accountNumber,balance);
    this.interestRate=interestRate;
}
public void addinterest(){
    int interst =(int) ((this.balance/100)*interestRate);
    System.out.println("adding of interst"+interst);
}
@Override
public String toString() {
	return "SavingAccount [accountNumber=" + accountNumber + ", balance=" + balance +"interestRate=" + interestRate + "]";
}

}
class CheckingAccount extends BankAccount {
private double overdraftLimit=3000;
  CheckingAccount( int accountNumber,double balance,double overdraftLimit ){
    super(accountNumber,balance);
    this.overdraftLimit=overdraftLimit ;
  }
public void CheckingAccount(){
    System.out.println("CheckingAccount"+overdraftLimit);
}

}



public class BankManagementSystemTester{
    public static void  main(String []args){
   
     SavingAccount s1=new  SavingAccount(2244, 35000, 2);
     System.out.println(s1);
     s1.addinterest();
     System.out.println("++++++++++++++++++++++++");
     CheckingAccount c1=new CheckingAccount(2244, 35000, 3000);
    System.out.println(c1);
     c1.CheckingAccount();
    
     
    
     
         } 
}