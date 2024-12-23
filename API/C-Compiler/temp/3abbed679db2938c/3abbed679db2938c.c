#include <stdio.h>

int main() {
    int num;

    case '1':
    printf("Enter a number:2 ");
    scanf("%d", &num);

    
    printf((num > 0) * (num % 2 == 0) ? "%d is Even\n" : (num > 0) * (num % 2 != 0) ? "%d is positive\n" : "2\n", num);

}
{
  printf("Enter a number:9 ");
    scanf("%d", &num);


    printf((num > 0) * (num % 2 == 0) ? "%d is Even\n" : (num > 0) * (num % 2 != 0) ? "%d is Odd\n" : "9\n", num);

    return 0;
}
