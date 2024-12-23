class PrimeChecker{
    int number;
    boolean isPrime;

    public void primeStatus(boolean isPrime){
        if(isPrime==true){
            System.out.println("The number is prime");
        } else{
            System.out.println("The number is not prime");
        }
    }

    public boolean checkPrime(int num){
        int count =0;
        for(int i=1; i<=num; i++){
            if(num%i==0){
                count++;
            }
        }
        if(count==2){
            return true;
        }else{
            return false;
        }
    }

    public static void main(String [] args){
        PrimeChecker n1 = new PrimeChecker();
        n1.number = 7;
        isPrime = n1.checkPrime(n1.number);
        n1.primeStatus(isPrime);
    }
}