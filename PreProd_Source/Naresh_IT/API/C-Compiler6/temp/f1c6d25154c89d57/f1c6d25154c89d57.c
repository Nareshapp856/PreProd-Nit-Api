#include<stdio.h>
#include<string.h>
int main() {
    char s[]="Welcome to Nareshit";
    char s[]="abcdefg";
    char s[]="banana";
    int i,j,n;
    int l=strlen(s);
    for(i=0;i<strlen(s);i++){
        for(j=1;j<strlen(s);j++){
            if(s[i]==s[j]){
                printf("%c", s[i]);
                return 0;
            }
    }
    }
    
    return 0;
}