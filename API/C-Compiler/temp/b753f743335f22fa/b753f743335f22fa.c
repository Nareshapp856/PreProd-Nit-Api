#include<stdio.h>
int main()
{
    int num;
    scanf("%d",&num);
 num%10>=5 && printf("Previous multiple: %d",(num/10+1)*10); || printf("Next multiple: %d",(num/10)*10);
}