 public class PrimeChecker{
    public boolean isPrime(){
        int count=0;
        for(int i=1;i<=n;i++){
            if(n%i==0){
                count++;
            }
        }
        if(count==2){
            System.out.println("Number:"+n);
            System.out.println("The number is Prime:");
        }
        else{
            System.out.println("Number:"+n);
            System.out.println("The number is not prime");
        }
        return true;
    }
    public void PrimeStatus(){
        if(isPrime()){
            System.out.println("true");
        }
        else{
            System.out.println("false");
        }
    
    }
 
    public static void main(String[]args){
        PrimeChecker p2=new PrimeChecker();
        P1.isPrime(2);
        p2.isPrime();
    }
}