#include<stdio.h>
#include<conio.h>
int main()
{
    int n,count==0,i;
    printf("enter the number");
    scanf("%d",&n);
    for(i=1;i=n/2;i++)
    {
        if(n%2==0)
        {
            count++;
        }
    }
    if(count==2)
    {
        printf("%d is prime number",n);
    }
    else
    {
        print("%d is not a prime number",n);
    }
    return 0;
}