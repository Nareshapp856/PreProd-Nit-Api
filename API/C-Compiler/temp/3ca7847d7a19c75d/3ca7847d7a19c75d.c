#include<stdio.h>
int main(){
    int n,i,c;
    char ch;
    if(scanf("%d%c",&n,&ch) != 2 || ch != '\n'){
        printf("Invalid input.Enter a positive integer.")
    }
    
    for(i=0;i<=n;i++){
        if(n%1==0){
            c++;
        }
    }
    if(c==2){
        printf("%d is a prime number.");
    }
    else{
        printf("%d is not a prime number.");
    }
}