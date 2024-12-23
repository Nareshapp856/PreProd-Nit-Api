class BankAccount{
    int accountNumber;
    double balance;
    public BankAccount(int accountNumber,double balance){
        super();
        this.BankAccount=BankAccount;
        this.balance=balance;
    }
    public void deposite(){
        double amount;
        System.out.println("accountNumber:"+accountNumber);
        System.out.println("balance"+balance);
        System.out.println("amount"+amount);
        }
       public void withdraw(){
        return ();
       } 
}
class SavingAccount extends BankAccount{
   double interestRate;
   public SavingAccount(int accountNumber,double balance,double interestRate){
    super(accountNumber,balance);
    this.interestRate=interestRate;
   }
   public void addInterest(){
    System.out.println("interestRate:"+interestRate);
   }
}
class CheckingAccount extends accountNumber{
    double overdraftLimit;
    public CheckingAccount(int accountNumber,double balance,double interestRate,double overdraftLimit){
        super(accountNumber,balance,interestRate);
        this.overdraftLimit=overdraftLimit;
    }
    public void withdraw(){
        System.out.println("overdraftLimit"+overdraftLimit);
    }
}
public class BankManagementSystemTester{
    public static void main(String[] args){
     BankAccount b1=new BankAccount (223334565,3000,500.0);
     b1. deposite();
     b1.withdraw();
     
    }
}