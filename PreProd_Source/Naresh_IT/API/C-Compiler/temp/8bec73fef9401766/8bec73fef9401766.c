#include<stdio.h>
int main(){
int n;
scanf("%d",&n);
(n%2==0)?printf("%d is Even",n):
(n%2!==0)?printf("%d is odd",n):printf("Enter Positive Input");

return 0;
}