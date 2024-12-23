#include<stdio.h>
int main()
{
    int n,temp,r,rev=1,i,c=1,p=1;
    //printf("Enter a number");
    scanf("%d",&n);
    temp=n;
    while(n!=0)
    {
        r=n%10;
        rev=rev*10+r;
        n=n/10;
    }
    n=rev;
    while(n!=0)
    {
        r=n%10;
        for(i=0;i<=c,i++)
        {
            p=p*i;
        }
        sum=sum+p;
        c++;
        n=n/10;
        p=1;
    }
    if(sum==temp)
    {
        printf("%d is a Disarium number.
",temp);
    }
    else
    {
        printf("%d is NOT a Disarium number.
",temp");
    }
    return 0;
}