class PalindromeNumberChecker{
   int number;
   boolean  isPalindrome();
   public void checkPalindrome(){
    isPalindrome=true;
    int rev=0,rem;
    int cpy=number;
      do{
        rem=number%10;
        rev=rev*10+rem;
        number=number/10;
      }
    
   }
   public void palindromeStatus(){
     number=121;
     System.out.println("Number :"+number);
     if(cpy==rev){
         System.out.println("The number is a palindrme "+cpy);
     }else{
        isPalindrome=false;
         System.out.println("The number is not a palindrme "+cpy);
     }
   }
   public static void main(String[] args){
 PalindromeNumberChecker p1 = new PalindromeNumberChecker();
    p1.palindromeStatus();

   }
}