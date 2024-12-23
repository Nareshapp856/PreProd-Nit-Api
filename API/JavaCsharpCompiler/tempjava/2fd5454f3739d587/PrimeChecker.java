public class PrimeChecker {
    int num;
    boolean isPrime;
    public boolean  checkPrime(){
        int c=0;
        for(int i=1;i<=num/2;i++){
            if(num%i==0){
                c++;
            }    
        }
        if(c==2){
           return true;
        }
       return false;
       
    } 
    public void primeStatus(){
     if(isPrime==true){
            System.out.println("The number is prime.");
        }
        else{
            System.out.println("The number is not prime");
        }

    }
    
    public static void main(String arg[]){
     PrimeChecker p=new PrimeChecker();
     p.num=7;
     p.isPrime=true;
     p.isPrime();
     p.primeStatus();  
    }
}