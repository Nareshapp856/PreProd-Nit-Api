public class PrimeChecker{
    int number;
    boolean isPrime;
    static int count=0;
    public static void isPrime(){
        PrimeChecker n1=new PrimeChecker();
        n1.number=7;
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
        isPrime();
    }
}