#include <stdio.h>
int main(){
    int i,n=7,c=0;
    /*printf("enter a number: ");*/
   /* scanf("%d",&n);*/
    for(i=2;i<=n;i++)
    {
        if(n%i==0)c++;

    }
    printf(c==2?"%d is a Prime number.",n:"%d is not a prime number.",n )
return 0;
}