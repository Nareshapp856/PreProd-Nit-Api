// Define the PrimeChecker class
class PrimeChecker {
    // Non-static instance variables
    int number;
    boolean isPrime;

    // Constructor to initialize the number
    public PrimeChecker(int number) {
        this.number = number;
        this.isPrime = false; // Initial assumption is that the number is not prime
    }

    // Method to check if the number is prime
    public void checkPrime() {
        if (number <= 1) {
            isPrime = false; // Numbers less than or equal to 1 are not prime
            return;
        }
        
        // Check divisibility from 2 to sqrt(number)
        for (int i = 2; i <= Math.sqrt(number); i++) {
            if (number % i == 0) {
                isPrime = false; // If divisible, it is not prime
                return;
            }
        }
        isPrime = true; // If no divisor is found, the number is prime
    }

    // Method to display the status of the number (prime or not)
    public void primeStatus() {
        if (isPrime) {
            System.out.println("The number is prime");
        } else {
            System.out.println("The number is not prime");
        }
    }
}

// Main class to test the PrimeChecker class
public class Main {
    public static void main(String[] args) {
        // Create an object of the PrimeChecker class with a number
        PrimeChecker primeChecker1 = new PrimeChecker(7);
        primeChecker1.checkPrime(); // Check if 7 is prime
        System.out.println("Number: " + primeChecker1.number);
        primeChecker1.primeStatus(); // Print the status of the number
        
        // Create another object of the PrimeChecker class with another number
        PrimeChecker primeChecker2 = new PrimeChecker(10);
        primeChecker2.checkPrime(); // Check if 10 is prime
        System.out.println("\nNumber: " + primeChecker2.number);
        primeChecker2.primeStatus(); // Print the status of the number
    }
}
