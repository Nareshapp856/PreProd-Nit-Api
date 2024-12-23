#include<stdio.h>
int main(){
    int n;
    scanf("%d",&n);
  for(i=0;i<=n;i++){
    if(n%2==0){
        printf("%d is a prime number");
        n++;
    }
  }
  else{
    printf("%d is not a prime number");
  }
}