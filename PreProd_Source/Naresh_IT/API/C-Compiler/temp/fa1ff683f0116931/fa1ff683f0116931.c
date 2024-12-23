#include<stdio.h>
int main()
{
    int sp,cp,profit,VAT,service charge;
    scanf("%d%d%d%d%d",&sp,&cp,&profit,&VAT,&servicecharge);
    sp=cp+profit;
    cp=sp-profit;
    profit=sp-cp;
    VAT=sp*12.7/100;
    service charge=sp*3.87/100;
    printf("%d%d%d%d%d",cp,sp,profit,VAT,service charge);
}