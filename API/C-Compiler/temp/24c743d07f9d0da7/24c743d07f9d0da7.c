#include <stdio.h>

int main() {
    int dayNumber;

   // printf("Enter a number (1-7): ");
    //scanf("%d", &dayNumber);

    switch (dayNumber) {
        case 1:
            printf("Monday (Valid)\n");
            break;
        case 2:
            printf("Tuesday (Valid)\n");
            break;
        case 3:
            printf("Wednesday (Valid)\n");
            break;
        case 4:
            printf("Thursday (Valid)\n");
            break;
        case 5:
            printf("Friday (Valid)\n");
            break;
        case 6:
            printf("Saturday (Valid)\n");
            break;
        case 7:
            printf("Sunday (Valid)\n");
            break;
        default:
            //printf("Invalid day number. Enter a number between 1 and 7.\n");
    }

    return 0;
}
