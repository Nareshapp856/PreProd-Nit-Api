#include<stdio.h>
int main()
{
    int num,a,b;
    scanf("%d",&num);
    a=(num/100)*100;
    printf("previous multiple:%d\n",a);
    b=((num/100)+1)*100
    printf("next multiple:%d",b);
        return 0;
}