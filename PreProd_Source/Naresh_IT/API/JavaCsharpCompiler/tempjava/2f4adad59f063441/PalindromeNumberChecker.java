 class PalindromeNumberChecker{
   //boolean  isPalindrome();
   //public void checkPalindrome(){
//isPalindrome=true;

    
   }
   public void palindromeStatus(){
     int number;
    int rev=0,rem;
    int cpy=number;
      do{
        rem=number%10;
        rev=rev*10+rem;
        number=number/10;
      }
     System.out.println("Number :"+number);
     if(cpy==rev){
         System.out.println("The number is a palindrme "+p1.cpy);
     }else{

         System.out.println("The number is not a palindrme "+p1.cpy);
     }
   }
   public static void main(String[] args){
 PalindromeNumberChecker p1 = new PalindromeNumberChecker();
    p1.number=151;
    p1.palindromeStatus();

   }
}