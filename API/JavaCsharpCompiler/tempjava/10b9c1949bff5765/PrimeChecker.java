 public class PrimeChecker {
    
    int number=8;
    boolean isPrime;

    public void checkPrime() {
        if (number <= 1) {
            isPrime = false;
            return;
        }
        for (int i = 2; i * i <= number; i++) {
            if (number % i == 0) {
                isPrime = false;
                return;
            }
        }
        isPrime = true;
    }
    public void displayResult() {
        if (isPrime) {
            System.out.println(number + " is a prime number.");
        } else {
            System.out.println(number + " is not a prime number.");
        }
    }
    public static void main(String[] args) {
        PrimeChecker primeChecker1 = new PrimeChecker();
        primeChecker1.checkPrime(); 
        primeChecker1.displayResult(); 
    }
}
