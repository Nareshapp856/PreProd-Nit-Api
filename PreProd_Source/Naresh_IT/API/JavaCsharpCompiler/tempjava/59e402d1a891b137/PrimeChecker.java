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
            for (int i = 2; i<=num; i++) { 
                if (num % i == 0) {
                    isPrime = false; 
                    break;
            }
         }
     }
 }
    public void primeStatus() {
        System.out.println(isPrime ? "prime." : "not prime."); 
}
    public static void main(String[] args) {
        PrimeChecker primeChecker = new PrimeChecker(20); 
        primeChecker.checkPrime();
        primeChecker.primeStatus();
    }
}
