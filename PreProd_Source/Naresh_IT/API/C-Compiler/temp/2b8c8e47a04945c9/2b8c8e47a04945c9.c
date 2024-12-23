#include<stdio.h>
int main
{
    float Cp,sp,profit,vat,sc;
    scanf("%d",&Cp);
    printf("Cost Price:Rs.%2f",Cp);
    profit=Cp*(27/100);
    sp=Cp+profit;
    printf("Selling Price:Rs.%2f",sp);
    vat=(12.7/100)*sp;
    printf("VAT (12.7):Rs.%f",vat);
    sc=(3.87/100)*4447;
    printf("Service Charge (3.87):Rs.%f",sc);

}