
public class PrimeChecker {
 
    int number;
    boolean isPrime;
    public void isPrime() {
        if (number <= 1) {
            isPrime = false; 
            return;
        }
        
       
        for (int i = 2; i <= Math.sqrt(number); i++) {
            if (number % i == 0) {
                isPrime = false; 
                return;
            }
        }
        isPrime = true;  
    }

   
    public void primeStatus() {
        if (isPrime) {
            System.out.println("The number is prime");
        } else {
            System.out.println("The number is not prime");
        }
    }
}

    public static void main(String[] args) {
        
        PrimeChecker primeChecker1 = new PrimeChecker(7);
        primeChecker1.checkPrime(); 
        System.out.println("Number: " + primeChecker1.number);
        primeChecker1.primeStatus();
        
    
        PrimeChecker primeChecker2 = new PrimeChecker(10);
        primeChecker2.checkPrime(); 
        System.out.println("\nNumber: " + primeChecker2.number);
        primeChecker2.primeStatus(); 
    }

