impot java.util.*;
class NumberPrinter {
    private int currentNumber = 1;
    private boolean isPrime(int num) {
  Scanner sc = new Scanner(System.in);
        if (num <= 1)
            return false;
        for (int i = 2; i <= Math.sqrt(num); i++) {
            if (num % i == 0)
                return false;
        }
        return true;
    }
    public synchronized void printPrime() {
        for (int i = 0; i <=100; i++) { 
            while (currentNumber % 2 == 0) { 
                try {
                    wait();
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                }
            }
            if (isPrime(currentNumber)) {
                System.out.println("Prime: " + currentNumber);
                currentNumber++;
                notify();
            }
        }
    }
    public synchronized void printEven() {
        for (int i = 0; i <= 100; i++) { 
            while (currentNumber % 2 != 0) { 
                try {
                    wait();
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                }
            }
            System.out.println("Even: " + currentNumber);
            currentNumber++;
            notify();
        }
    }
}

public class MultithreadedNumberPrinter {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        NumberPrinter numberPrinter = new NumberPrinter();

        Thread primeThread = new Thread(() -> numberPrinter.printPrime());
        Thread evenThread = new Thread(() -> numberPrinter.printEven());

        primeThread.start();
        evenThread.start();
    }
}