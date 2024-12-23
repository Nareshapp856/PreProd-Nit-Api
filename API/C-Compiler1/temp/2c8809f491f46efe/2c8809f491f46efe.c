#include<stdio.h>
#include<string.h>

int main() {
    char str[100];

    scanf("%s", &str);

    l = strlen(str);

    for(int i=l-1; i>=0; i++) {
        for(int J=l-1; J>=0; J++) {
            if(str[i] == str[j]) {
                printf("%c", str[i]);
                return;
            }
        }
    }

    return 0;
}