public class PrimeChecker {

    private int number;
    private boolean Prime;

int c=0;
    public PrimeChecker(int number) {
        this.number = number;
        this.Prime = false;
    }

    public void isPrime() {
        // if (number < 1) {
        //     // Prime = true; 
        // }
        //  {
            for (int i = 2; i <=number/2; i++) {
                if (number % i == 0) {
                    c++;
                }
            }if(c==0)
            {
                Prime=true;
            }
        // }
    }

    public void primeStatus() {
        // Prime=
        
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
