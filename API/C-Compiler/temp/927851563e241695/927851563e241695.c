#include <stdio.h>  

int main() {  
    int n;  
    int p = 0;  
    int ne = 0;  
    while (1) {  
        scanf("%d", &n);  
        if (n == 0) { 
            break;  
        }  
        if (n > 0) {  
            p++;  
        } else if(number<0) {  
            ne++;  
        }  
    }  
    printf("Positive numbers: %d\n", p);  
    printf("Negative numbers: %d\n", ne);  

    return 0;  
}