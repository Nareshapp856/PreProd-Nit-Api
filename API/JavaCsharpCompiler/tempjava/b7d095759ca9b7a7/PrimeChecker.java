public class PrimeChecker{
    int number ;
    boolean isPrime ;
    public void isPrime(){
        for(int i = 2 ; i < number/2 ; i++){
            if(number%i == 0){
                isPrime = false ;
                return ;
            }
        }
        isPrime = true ;
    }
    public void primeStatus(){
        if(isPrime)System.out.println("The number is prime");
        System.out.println("The number is not prime");
    }
    public static void main(String[] args){
        PrimeChecker p1 = new PrimeChecker();
        p1.number = 7 ;
        p1.isPrime();
        p1.primeStatus();
    }
}