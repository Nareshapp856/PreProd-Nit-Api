// Source code is decompiled from a .class file using FernFlower decompiler.
import java.util.Scanner;

public class Palindrome {
   public Palindrome() {
   }

   public static void isPalindrome(int var0) {
      int var1 = var0;

      int var2;
      for(var2 = 0; var0 > 0; var0 /= 10) {
         int var3 = var0 % 10;
         var2 = var2 * 10 + var3;
      }

      if (var1 == var2) {
         System.out.println("Number is plaindrome");
      } else {
         System.out.println("Number is not palindrome");
      }

   }

   public static void main(String[] var0) {
      System.out.println("Enter choice number");
      Scanner var2 = new Scanner(System.in);
      int var1 = var2.nextInt();

      while(var1 != 3) {
         System.out.println("1. for palindrome");
      }

      System.out.println("2. for perfectnumber");
      System.out.println("3 for exit");
      int var3;
      switch (var1) {
         case 1:
            System.out.println("Enter number for palindriome");
            var3 = var2.nextInt();
            isPalindrome(var3);
            break;
         case 2:
            System.out.println("Enter number for perfectnumber");
            var3 = var2.nextInt();
            isPalindrome(var3);
            break;
         case 3:
            System.exit(0);
      }

   }
}
