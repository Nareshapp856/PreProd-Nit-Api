public class PrimeChecker {

    private int number;
    private boolean isPrime;


    public PrimeChecker(int number,boolean prime) {
        this.number = number;
        this.isPrime = prime;
    }

    public void isPrime() {
        if (number <= 1) {
            isPrime = false; 
        } else {
            for (int i = 2; i <= Math.sqrt(number); i++) {
                if (number % i == 0) {
                    isPrime = true; 
                    break;
                }
            }
        }
    }

    public void primeStatus() {
        isPrime();
        
        if (isPrime) {
            System.out.println("The number is prime");
        } else {
            System.out.println("The number is not prime");
        }
    }

    public static void main(String[] args) {

        PrimeChecker primeChecker1 = new PrimeChecker(10,false);
        System.out.println("Number: " + primeChecker1.number);
        primeChecker1.primeStatus();  

        
    }
}
