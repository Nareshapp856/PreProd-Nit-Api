#include<stdio.h>
int main()
{
    float  n,,sp,profit,vat,sc;
    scanf("%d",&n);
    printf("Cost Price:Rs.%2f\n",n);
    profit=(27/100)*3500;
    sp=n+profit;
    printf("Selling Price:Rs.%2f\n",sp);
    vat=(12.7/100)*sp;
    printf("VAT (12.7):Rs.%f\n",vat);
    sc=(3.87/100)*4447;
    printf("Service Charge (3.87):Rs.%f\n",sc);

}