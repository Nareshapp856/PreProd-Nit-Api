#include<stdio.h>
int main()
{
    int n;
    printf("enter month n");
    scanf("%d",&n);
    switch(n)
    {
        case 1:(n==1);printf("31 day")
        break;
        case 2:(n==2);printf("28 or 29 day");
        break;
        case 3:(n==3);printf("30 day");
        break;
        case 4:(n==4);printf("30 day");
        break;
        case 5:(n==5);printf("31 dqy");
        break;
        case 6:(n==6);printf("30 day");
        break;
        case 7:(n==7);printf("31 days");
        break;
        case 8:(n==8);printf("31 day");
        break;
        case 9:(n==9);printf("30 day");
        break;
        case 10:(n==10);printf("31 day");
        break;
        case 11:(n==11);printf("30 day");
        break;
        case 12:(n==12);printf("31 day");
        break;
        case 13:(n==13);printf("invalid month number");
    }
  return 0;     
}
