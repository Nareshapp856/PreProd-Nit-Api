public class PrimeChecker{
    int number;
    boolean isPrime;
    int count =0;

    public void isPrime(){
        
        for(int i=2; i<number;i++){
            if(number%i==0){
                count ++;
            }
        }
        
    }

    public void primeStatus(){

        if(count ==2){
            System.out.println("The number is not prime.");
        }else{
            System.out.println("The number is  prime.");
        }

    }

    public static void main(String[] args){
        PrimeChecker Pc = new PrimeChecker();
        Pc.number=10;
        Pc.isPrime();
        Pc.primeStatus();

    }
}