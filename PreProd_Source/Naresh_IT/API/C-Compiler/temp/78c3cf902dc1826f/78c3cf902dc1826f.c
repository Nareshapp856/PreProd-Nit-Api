#include <stdio.h>
int main(){
    int i,n=7,c=0;
    /*printf("enter a number: ");*/
    scanf("%d",&n);
    for(i=2;i<=n;i++)
    {
        if(n%i==0)
        c=c+i;

    }
    if (c==2)
    printf(" n is a prime number.")
return 0;
}