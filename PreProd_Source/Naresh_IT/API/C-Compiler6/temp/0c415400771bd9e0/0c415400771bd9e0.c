#include <stdio.h>
#include <string.h>
#define ASCII_SIZE 256
char findLastRepeatedChar(char str[]) {
    int count[ASCII_SIZE] = {0}; 
    int lastRepeatedIndex = -1;
    for (int i = 0; str[i]; i++) {
        count[(int)str[i]]++;
    }
    for (int i = strlen(str) - 1; i >= 0; i--) {
        if (count[(int)str[i]] > 1) {
            lastRepeatedIndex = i;
            break;}}
    return lastRepeatedIndex != -1 ? str[lastRepeatedIndex] : '\0';
}
int main() {
    char str[100];
    printf("Enter a string: ");
    fgets(str, sizeof(str), stdin); 
    str[strcspn(str, "\n")] = 0;
    char lastRepeated = findLastRepeatedChar(str);
   if (lastRepeated) {
        printf("Last repeated character: %c\n", lastRepeated);
    } else {
        printf("No repeated characters found.\n");
    }
    return 0;
}
printf("Last repeated character: %c\n", last repeated);
}else{
    printf("No repeated characters found.\n");
}
return 0;
}