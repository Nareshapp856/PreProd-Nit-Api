#inclide <stdio.h>
int main()
{
    int num;
    printf("enter the number");
    scanf("%d",&num);
    sum=o;
    num=1;
    while(num!=0){
        sum=sum^(num%10,3);
        num=num/10;

    }
    if(num==sum){
        printf("enter it is armstrong number");
    }
    else(sum!=sum){
        printf("enter it is not armstrong number");
    }
}