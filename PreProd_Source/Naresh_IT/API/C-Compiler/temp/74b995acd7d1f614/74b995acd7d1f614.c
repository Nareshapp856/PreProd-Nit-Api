#include<stdioh>
int main()
{
    int a;
    scanf("%d",&a);
    (a%2==0)?printf("a is Even"):(a%2!=0)?printf("a is Odd"):printf("Enter Positive Input");
}