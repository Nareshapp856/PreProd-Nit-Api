#include<stdio.h>
int main()
{
    int n ;
    int count =0;
    scanf("%d",&n); // 7
    for(int i =1 ;i <= n ;i++)
    {
         if(n % i == 0) 
         {
         count=count+1;
         }
    }
    
    if(count==2)
    {
        printf("%d is a prime number." ,n );
        else
        printf("%d is not a prime number." ,n ); 
    }
return 0;
}