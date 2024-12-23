#include<stdio.h> 
int main()
{
    int i=1,n;
    // printf("Enter n value");
    scanf("%d",&n)
    for(;i<=n;i++){
    if(n%i==2) printf("%d is a prime number",n);
    }
    return 0;
}