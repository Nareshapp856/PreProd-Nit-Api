include<stdio.h>
int main(){
    int n,a,f,c=0;
    scanf("%d",&n);
    for(f=0;n>0;c++){
        a=n%10;
        f=a*a;
    }
    if(c==2){
        a=n%10;
        f=a*a;
    }
    printf("%d is an automorphic number",f);
}