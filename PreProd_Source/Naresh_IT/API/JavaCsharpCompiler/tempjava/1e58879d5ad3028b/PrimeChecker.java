
    public class PrimeChecker
    {
     int number;
     boolean isPrime;
     public PrimeChecker(int number)
     {
         this.number = number;
        isPrime = false;
    }

    public void checkPrime() {
        if (number > 1)
        {
            isPrime = true;
            for (int i = 2; i <= number / 2; i++)
            {
                if (number % i == 0)
                {
                    isPrime = false;
                    return;
                }
            }
        }
    }

    public void primeStatus()
    {
        if (isPrime)
        {
            System.out.println("The number is prime");
        } else
        {
            System.out.println("The number is not prime");
        }
    }

    public static void main(String[] args)
    {
        PrimeChecker primeChecker1 = new PrimeChecker(7);
        System.out.println("Number: " + primeChecker1.number);
        primeChecker1.checkPrime();
        primeChecker1.primeStatus();
    }
}