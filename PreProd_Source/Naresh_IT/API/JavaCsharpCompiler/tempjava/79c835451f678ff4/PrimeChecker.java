class PrimeChecker{
    public boolean isPrime(int n){
        int count=0;
        for(int i=1;i<=n;i++){
            if(n%i==0){
                count++;
            }
        }
        if(count==2){
            System.out.println("Number:"+n);
            System.out.println("The number is Prime:");
        }
        else{
            System.out.println("Number:"+n);
            System.out.println("The number is not prime");
        }
    }
    public static void main(String[]args){
        PrimeChecker P1=new Prime();
        P1.isPrime(7);
    }
}