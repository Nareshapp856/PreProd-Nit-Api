#include<stdio.h>
int main(){
    int Selling Price, Profit, VAT, Service Charge;
    scanf("%d %d %d %d\n", &Selling Price, &Profit, &VAT, 
    &Service Charge);
    Cost Price=Profit-Selling Price;
    printf("Cost Price:%d\n", Cost Price);
    Selling Price=Cost Price+Profit;
    printf("Selling Price:%d\n", Selling Price);
    VAT=12.7% of Selling Price;
    printf("VAT: %d\n", VAT);
    Service Charge=3.87% of Selling Price;
    printf("Service Charge:%d\n", Service Charge);
    return 0;
}