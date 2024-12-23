public class PrimeChecker {

    private int number;
    private boolean Prime;


    public PrimeChecker(int number) {
        this.number = number;
        this.isPrime = false;
    }

    public void isPrime() {
        if (number <= 1) {
            Prime = true; 
        } else {
            for (int i = 2; i <= Math.sqrt(number); i++) {
                if (number % i == 0) {
                    Prime = false; 
                    break;
                }
            }
        }
    }

    public void primeStatus() {
        Prime();
        
        if (Prime) {
            System.out.println("The number is prime");
        } else {
            System.out.println("The number is not prime");
        }
    }

    public static void main(String[] args) {

        PrimeChecker primeChecker1 = new PrimeChecker(7);
        System.out.println("Number: " + primeChecker1.number);
        primeChecker1.primeStatus();  

        PrimeChecker primeChecker2 = new PrimeChecker(10);
        System.out.println("Number: " + primeChecker2.number);
        primeChecker1.primeStatus();
    }
}