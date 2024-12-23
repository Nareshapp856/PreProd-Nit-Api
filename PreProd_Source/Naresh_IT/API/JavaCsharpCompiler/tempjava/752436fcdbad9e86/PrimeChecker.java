public class PrimeChecker{
    int number;
    // boolean isPrime;

    public boolean isPrime(){
        
        if(number ==1){
            return false;
            }
        for(int i=2; i<number;i++){
            if(number%i==0){
                return true;
            }
        }

    }

    public void primeStatus(){
        if(true){
            System.out.println("The number is prime".);
        }else{
            System.out.println("The number is not prime".);
        }

    }

    public static void main(String[] args){
        PrimeChecker Pc = new PrimeChecker();
        Pc.number=7;
        Pc.isPrime();
        Pc.primeStatus();

    }
}