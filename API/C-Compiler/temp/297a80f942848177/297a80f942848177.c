#include<stdio.h>
int main(){
    int Selling Price, Profit, VAT, Service Charge;
    scanf("%d %d %d %d\n", &Selling Price, &Profit, &VAT, 
    &Service Charge);
    int Cost Price=Profit-Selling Price;
    printf("Cost Price:%d\n", Cost Price);
    int Selling Price=Cost Price+Profit;
    printf("Selling Price:%d\n", Selling Price);
    int VAT=12.7% of Selling Price;
    printf("VAT: %d\n", VAT);
    int Service Charge=3.87% of Selling Price;
    printf("Service Charge:%d\n", Service Charge);
    return 0;
}