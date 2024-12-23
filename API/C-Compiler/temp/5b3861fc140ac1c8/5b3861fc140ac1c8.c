#include<stdio.h>
int main(){
    float cP
    scanf("%f",&cP);

    printf("Cost Price: Rs.%.2f",cP);

    // 1. Selling pr
    float sp = cp + (cp*27)/100;
    printf("Selling Price: Rs.%.2f",sP);

    // 2.profit
    float pro = sp-cP;
    printf("Profit: Rs.%.2f",pro);

    // 3. Vat
    float vat = (sp*12)/100;
    printf("VAT (12.7 ): Rs.%.2f",vat);

    // 4.servic charge
    float serCh = (sp*3.87)/100;
    printf("Service Charge (3.87 ): Rs.%.2f",serCh);

    return 0;
}