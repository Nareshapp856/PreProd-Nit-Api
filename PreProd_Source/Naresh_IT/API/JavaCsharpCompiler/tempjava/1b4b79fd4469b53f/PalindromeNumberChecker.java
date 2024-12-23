class PalindromeNumberChecker {
    public void Number(int n){ 
        int i =n;
        int r=0;
        int rev;

        while(i!==0){
            rev=i%10;
            r= r*10 + rev;
            i=i/10;
        }
        if (r==n){
            system.out.println(r);
        }
        else{
            system.out.println(n);
        }
 public static void main (String []args){
    Number A1 = new Number();
       A1.Number(121);
 }
    }
   




    
}