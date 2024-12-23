#include<stdio.h>
int main()
{
    int marks,s1,s2,s3,s4,s5,totalmarks,p;
    scanf("%d",&s1);
    scanf("%d",&s2);
    scanf("%d",&s3);
    scanf("%d",&s3);
    scanf("%d",&s5);
    if(totalmarks>0||totalmarks<100)
    printf("invalid");
    switch(marks)
    case 10:
    totalmarks=s1+s2+s3+s4+s5;
    if(p<90||p>100)
    p=totalmarks/5;
    printf("Grade A");
    if(p<75||p>89)
    p=totalmarks/5;
    printf("Grade B");
    if(p<50||p>74)
    p=totalmarks/5;
    printf("Grade c");
    if(p<35||p>49)
    p=totalmarks/100;
    printf("Grade d");
    else
    printf("fail");
    
}