#include<stdio.h>
int main()
{
    int n=371,ld,p=1,m;
    scanf("%d",&n);
    for(n=m; m!=0)
    {
        ld=m%10;
         p=p*ld;
    }
    if(m==p)
    printf("%d is an automorphic number.",m);
    else
    printf("%d is not an automorphic number.",m);
    return 0;
}