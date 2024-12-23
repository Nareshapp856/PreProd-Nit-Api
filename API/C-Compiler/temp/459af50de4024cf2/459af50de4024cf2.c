#include<stdio.h> 
int main()
{
    n=7;

    scanf("%d",&n);
    for(i=2;i<=n;i++){
    if(n%i==2) printf("%d is a prime number");
    }
    return 0;
}