#include <stdio.h>

int main()
 {
    float tvSetPrice, sellingPrice, profit, vat, serviceCharge;

    
    printf("Enter the cost price of the TV set: Rs. ");
    scanf("%f", &tvSetPrice);

    
    sellingPrice = tvSetPrice + (0.27 * tvSetPrice);

    
    profit = sellingPrice - tvSetPrice;

    
    vat = 0.127 * sellingPrice;

   
    serviceCharge = 0.0387 * sellingPrice;

    
    printf("\n--- Calculation Summary ---\n");
    printf("Cost Price of TV Set: Rs. %.2f\n", tvSetPrice);
    printf("Selling Price  (including profit: Rs. %.2f\n", sellingPrice);
    printf("Profit: Rs. %.2f\n", profit);
    printf("VAT (12.7%%): Rs. %.2f\n", vat);
    printf("Service Charge (3.87%%
    : Rs. %.2f\n", serviceCharge);
    printf("----------------------------\n");

    return 0;
}