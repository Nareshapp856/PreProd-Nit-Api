public class PrimeChecker {
    int num;
    boolean isPrime;

    public PrimeChecker(int num) {
        this.num = num;
    }

    public void checkPrime() {
        // A number less than or equal to 1 is not prime
        if (num <= 1) {
            isPrime = false;
        } else {
            isPrime = true; // Assume the number is prime
            // Check divisibility from 2 to the square root of num
            for (int i = 2; i <= Math.sqrt(num); i++) { 
                if (num % i == 0) { // If num is divisible by i
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
        PrimeChecker primeChecker = new PrimeChecker(29); 
        primeChecker.checkPrime();
        primeChecker.primeStatus();
    }
}