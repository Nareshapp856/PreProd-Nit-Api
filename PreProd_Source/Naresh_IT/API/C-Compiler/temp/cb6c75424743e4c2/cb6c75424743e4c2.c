#include<stdio.h>
int main()
{
    int r,m,n;
    printf("Enter the number:")
    scanf("%d",&m);
    m=n;
    m=m*n;
    r=m%10;
    if(n==r)
    {
        printf(" Automorphic Number");
    }
    else{
        printf("Not an Automorphic Number");
    }
    return 0;
}