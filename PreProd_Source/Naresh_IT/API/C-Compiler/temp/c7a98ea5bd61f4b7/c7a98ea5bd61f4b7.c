#include<stdio.h>
int main()
{
    int n,ld,p=0;
    scanf("%d",&n);
    for(n=m; m!=0;m=m/10)
    {
        ld=m%10;
         p=p*ld;
    }
    if(m==n)
    printf("%d is an automorphic number.",n);
    else
    printf("%d is not an automorphic number.",n);
    return 0;
}