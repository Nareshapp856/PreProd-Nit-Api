public class PrimeChecker{
    public static void isPrime(num){
        int num,count=0;
        for(int i=1;i<=num;i++){
            if(num%i==0) count++;
        }
        if(count==2){
            System.out.println("The number is prime");
        }
        else{System.out.println("The number is composite");}

    }
    public static void main(String []args){
        int num=7;
       isPrime();
    }
}
