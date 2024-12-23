#include<stdio.h>
int main(){
    int f , c , m, b ,cs,tm;
    scanf("%d %d %d %d %d",&f,&c,&m,&b,&cs);
    float p;
    tm=f+c+m+b+cs+tm;
    p=tm/100;
    if(f>=0 && f<=100 || c>=0 && c<=100 || m>=0 && <=100 || b>=0 && b<=100 || cs>=0 && cs<=100){
        else if(p<35 && c<35 && m<35 && c<35 && cs<35){
             printf("Fail");
        }

        if(p>=90 && p<=100){
            printf("Grade A");
        }
        if(p>=75 && p<=89){
             printf("Grade B");
        }
        if(p>=50 && p<=74){
             printf("Grade C");
        }
        if(p>=35 && p<=49){
             printf("Grade D");
        }
    }else{
         printf("error");
    }

}