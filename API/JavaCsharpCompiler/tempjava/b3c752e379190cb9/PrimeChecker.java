class PrimeChecker{
    int num=28;
     public static boolean isPrime(int num) {
        int sum = 0;
        for (int i = 1; i <= num / 2; i++) {
            if (num % i == 0) {
                sum += i;
            }
        }
        return sum == num;
}
  public static void main(String []args){
    isPrime();
    System.out.println("The number is prime");
    
  }
}