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
            System.out.println(" if sufficient funds are available;")
        }
    }
}
class SavingAccount extends BankAccount{
  private  double interestRate;
SavingAccount(int accountNumber,double balance,double interestRate){
    super(accountNumber,balance);
    this.interestRate;
}
public void addinterest(){
    this.balance+=interestRate;
}
}
class CheckingAccount extends BankAccount {
private double overdraftLimit;
  CheckingAccount( int accountNumber,double balance,double overdraftLimit=3000 ){
    super(accountNumber,balance);
    this.overdraftLimit;
  }
public void CheckingAccount(){
    super.BankAccount;
    System.out.println("CheckingAccount"+overdraftLimit);
}

}



public class BankManagementSystemTester{
    public static void  main(String []args){
     BankAccount b1=new BankAccount(2244,35000);
     b1.deposite(2500);
         } 
}