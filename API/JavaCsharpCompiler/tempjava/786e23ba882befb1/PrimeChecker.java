public class PrimeChecker {

    int number;
   boolean isPrime;
    int c;
    public PrimeChecker(int number,boolean prime) {
        number = number;
        isPrime = prime;
    }

    public void isPrime() 
    {
        c=0;
        if (number <= 1) {
            isPrime = false; 
        } else {
            for (int i = 2; i <=number/2; i++) {
                if (number % i == 0) {
                    c++;
                }
            }
            if(c==0)
            {
                isPrime=true;
            }
            else{
                isPrime=false;
            }
        }
    }

    public void primeStatus() {
        
        if (this.isPrime) {
            System.out.println("The number is prime");
        } else {
            System.out.println("The number is not prime");
        }
    }

    public static void main(String[] args) {

        PrimeChecker primeChecker1 = new PrimeChecker(7,false);
        System.out.println("Number: " + primeChecker1.number);
        primeChecker1.isPrime();
        primeChecker1.primeStatus();  }
}