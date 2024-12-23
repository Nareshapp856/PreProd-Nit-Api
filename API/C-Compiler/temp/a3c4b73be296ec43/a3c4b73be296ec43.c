#include<stdio.h>
int main()
{
    int n;
    scanf("%d",&n);
    if(n<0)
    {
        printf("Invalid input. Enter a positive integer.");
    
    else if(n/2==0)
    {
        printf("%d is not a prime number.",n);
    }
    }
    else{
        printf("%d is a prime number.",n);
    
    }
}