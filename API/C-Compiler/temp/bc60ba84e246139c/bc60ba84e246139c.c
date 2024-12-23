#include<stdio.h>
int main()
{
int n;
scanf("%d",&n);
(n%2==0)?printf("%d is Even",n):
(n%2!==0)?printf("%d is Odd",n):printf("Enter Positive Input",n);
return 0;
}