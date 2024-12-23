public class PrimeChecker{
    int number;
    boolean isPrime;
    static int count=0;
    public static void isPrime(){
        PrimeChecker n1=new PrimeChecker();
        n1.number=10;
        for(int i=1;i<=n1.number;i++){
            if(n1.number%i==0)count++;
        }
    }
    public static void primeStatus(){
        if (count==2)
        System.out.println("The number is prime");
        else System.out.println("The number is not prime");
    }
    public static void main(String []args){
        isPrime();
             primeStatus();
    }
}