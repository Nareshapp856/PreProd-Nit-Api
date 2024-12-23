#include<stdio.h>
int main()
{
    int num;
    scanf("%d",&num);
    num%10>=5 && printf("%d",(num/10+1)*10); 
    || printf("%d",(num/10)*10);
}