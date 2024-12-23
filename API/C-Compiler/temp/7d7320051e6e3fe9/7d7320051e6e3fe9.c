#include<stdio.h>
int main() {
    int cp
    float sp;
    float profit;
    float vat;
    float sc;
    scanf("%", &cp);

    sp = cp + (0.27 * cp);
    profit = sp - cp;
    vat = 0.127 * sp;
    sc = 0.0387 * sp;

    printf("Cost Price: Rs.%.2f", cp);
    printf("Selling Price: Rs.%.2f", sp);
    printf("Profit: Rs.%.2f", profit);
    printf("VAT (12.7 ): Rs.%.2f", sp);
    printf("Service Charge (3.87 ): Rs.%.2f", sc);


    return 0;
}