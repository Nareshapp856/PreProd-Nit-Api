#include<stdio.h>

int main()
{
    int n,s=0,r;
    printf("Enter a number:");
    /*scanf("%d",&n);*/
    s=n*n;
    if(n<=0)
    {
        r=s%10;
        if(r==n){
            printf("%d is an automorphic number.",n);
        }
        else{
            printf("%d is not an automorphic number.")
        }
    }
    else {
        printf("Invlaid input.");
    }
}