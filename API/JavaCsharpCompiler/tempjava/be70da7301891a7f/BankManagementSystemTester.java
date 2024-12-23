class BankAccount{
    int accountNumber;
    double balance;
    public BankAccount(int accountNumber,double balance){
        this.accountNumber=accountNumber;
        this.balance=balance;
    }
    public void deposit(double amount){
       balance+=amount;
    }
    public void withdraw(double amount){
       if(amount<=balance){
        balance-=amount;
       }else{
        System.out.println("insufficient funds");
       }
    }
}
class savingAccount extends BankAccount{
    double interestRate;
    public savingAccount(int accountNumber,double balance,double interestRate){
        super(accountNumber,balance);
        this.interestRate=interestRate;
    }
    public void addInterest(){
        balance+=balance*interestRate/100;
        System.out.println("Balance based on the interest rate :"+balance);
    }
}
class CheckingAccount extends BankAccount{
     double overdraftLimit;
     public CheckingAccount(int accountNumber,double balance,double overdraftLimit){
        super(accountNumber,balance);
        this.overdraftLimit=overdraftLimit;
    }
    public void withdraw(double amount){
        if(overdraftLimit>=3000){
            balance-=amount;
            System.out.println(" After withdrawal Account Balance :"+balance);
        }
    }
}
public class BankManagementSystemTester{
    public static void main(String[] args){
    savingAccount s=new savingAccount(1234,500.00,10);
    s.addInterest();
    CheckingAccount c=new CheckingAccount(4567,4000,3000);
    c.withdraw(2000);
    }
}