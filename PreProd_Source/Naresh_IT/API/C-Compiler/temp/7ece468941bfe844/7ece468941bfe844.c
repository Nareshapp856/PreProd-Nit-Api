#include<stdio.h>

int main(){
    float cost_price;
    scanf("%f",&cost_price);
    float selling_price,profit,vat,service_charge;

    selling_price=cost_price + (27.0/100)*3500;
    profit= selling_price - cost_price;

    vat=(12.7/100)*selling_price;
    service_charge=(3.87/100)*selling_price;

    printf("Cost Price: Rs.%.2f\nSelling Price: Rs.%.2f\nProfit: Rs.%.2f\nVAT (12.7 ): Rs.%.2f\nService Charge (3.87 ): Rs.%.2f",cost_price,selling_price,profit,vat,service_charge)

    return 0;
}