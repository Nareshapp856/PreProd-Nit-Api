class PalindromeNumberChecker {

 int num;
 int rev=0;
 boolean Palindrome;

 public void checkpalindrome(){
    while(n>0){
       num=num%10;
       rev=rev*10+rem;
       n=n/10;
       }    
     if (num==rev){
         System.out.prinln("the number is palindrome");

      else {
          System.out.prinln("the number is not palindrome");
      }
      }


  public static void main(String[] args ){

   checkpalindrome(121);
  }
}


 }
     



