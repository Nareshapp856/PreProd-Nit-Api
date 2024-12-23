#include<stdio.h>
#include<math.h>
int main()
{
    int num,r,sum=0,c=0;
    scanf("%d",&num);

    while(num!=0)
    {
r=num%10;

num=num/10;
c++;
    }
    temp=num;
    while(num!=0)
    {
sum=sum+pow(r,c)
    }
    if(n==sum)
    {
        printf("%d is an Armstrong number.",num);
    }
    else
    {
        printf("%d is not an Armstrong number.",num);
    }
}