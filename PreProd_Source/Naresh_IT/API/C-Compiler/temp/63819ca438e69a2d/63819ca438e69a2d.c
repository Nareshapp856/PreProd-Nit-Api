#include<stdio.h>
int main()
{

    int base,expo,r,rev,res,n;

    //printf("Enter A Number :");
    scanf("%d",&n);
   // int m=n;

    for(base=1; base<=n; base++)
    {
        res=base*expo;
        for(expo=1;expo<=res; expo++)
        {
            r=m%10;
            rev=rev*10+r;
            n/=10;
        }
    }
    if("m==rev")
       printf("%m is an Armstrong number.");
    else
       printf("%m is not an Armstrong number.");

    return 0;
}