#include<stdio.h>
int main(){
    int cost=3500;
   int selling_price=cost+27/100;
   int profit = selling_price-cost;
   int Vat = 12.7/100*selling_price;
   int Service_Charge = 3.87/100*selling_price;
    printf("---Calculation Results---");
    printf(" Cost Price:Rs.%d",cost);
    printf("Sellingprice: Rs.%d",selling_price);
    printf("Profit: Rs.%d",profit);
    printf("VAT(12.7): Rs.%d",Vat);
    printf("Service Charge(3.87): Rs.%d",service_Charge);
}