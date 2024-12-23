public class PrimeChecker{
    int number;
    boolean isPrime;

    public void isPrime(){
        int count =0;
        for(int i=2; i<number;i++){
            if(number%i==0){
                count ++;
            }
        }

    }

    public void primeStatus(){
        if(count ==2){
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