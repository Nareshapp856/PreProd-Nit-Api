public class PrimeChecker {
    int num;
    boolean isPrime;

    public PrimeChecker(int num) {
        this.num = num;
    }

    public void checkPrime() {
        if (num <= 1) {
            isPrime = false;
        } else {
            isPrime = true;
            for (int i = 2; i <= Math.sqrt(num); i++) { 
                if (num % i == 0) 
                    isPrime = false; // It's not prime
                    break; // No need to check further
                }
            }
        }
    }

    public void primeStatus() {
        // Print whether the number is prime or not
        System.out.println(num + " is " + (isPrime ? "prime" : "not prime")); 
    }

    public static void main(String[] args) {
        PrimeChecker primeChecker = new PrimeChecker(7); 
        primeChecker.checkPrime();
        primeChecker.primeStatus();
    }
}