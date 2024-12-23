public class PrimeChecker{
    int number;
    boolean isPrime;
    public void isPrime(int number){
        int count=0;
        for(int i=1;i<=number;i++){
            if(number%i==0)count++;
        }
        primeStatus(count);
    }
    public void primeStatus(int count){
        if (count==2)
        System.out.println("The number is prime");
        else System.out.println("The number is not prime");
    }
    public static void main(String []args){
        PrimeChecker number1=new PrimeChecker();
        number1.number=7;
        isPrime(number1.number);
    }
}